---
sidebar_position: 0
sidebar_label: Simple NFT auction
description: >-
  This guide shows you how you can perform on-chain interaction with previously
  deployed TIP-4 token
---

# Venom In Action. Simple NFT auction

:::info
This guide will be more complicated as compared with Tokensale implementation. It's recommended to pass it secondarily.
:::

Fist of all, as usual, we should setup our development environment with locklift. For this smart-contracts guideline you need to include both [TIP-3](../../03-how-to-create-your-own-fungible-tip-3-token/01-quick-start-developing-with-tip-3.md#install-dependencies) and [TIP-4](../../05-how-to-create-your-own-non-fungible-tip-4-token/01-quick-start-developing-with-tip-4.md#install-dependencies) dependencies, because our Auction will be accepted in TIP-3 tokens. Let's explore some scheme of our contracts interaction and describe it

![Our smart-contracts interaction logic](<../../../../../static/img/tip4auction.svg>)

NFT creating is a green arrows flow, auction bids is a yellow. Let's describe a processes

1. User mints its own NFT via Collection contract
2. Then user deploys an Auction
3. Auction deploys its own TIP-3 TokenWallet via given TokenRoot address (familiar mechanic for you from TIP-3 Tokensale guide)
4. User sends minted NFT to Auction, which one implementing `INftTransfer` interface and accept this NFT
5. Another users sends TIP-3 tokens (bid) to Auction with `notify = true` parameter (see TIP-3 specs or TIP-3 guide)
6. Auction's TokenWallet send a callback to Auction, which one handle TIP-3 transfer - checks if incoming bid amount more than previous bid, and updates a leader bid address
7. When time is over, finishAuction function will send NFT to auction winner or old owner, if there is no bids was accepted

That's all! As you can see, the main mechanic of our interaction is a callbacks. Let's start implement our contracts. First, implement Collection and NFT contracts same as in TIP-4 [quick start](../01-quick-start-developing-with-tip-4.md) guide.

```solidity title="Collection.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;


import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Collection.sol';
import './Nft.sol';

contract Collection is TIP4_2Collection {

    /**
    * Errors
    **/
    uint8 constant sender_is_not_owner = 101;
    uint8 constant value_is_less_than_required = 102;

    /// _remainOnNft - the number of crystals that will remain after the entire mint 
    /// process is completed on the Nft contract
    uint128 _remainOnNft = 0.3 ton;

    constructor(
        TvmCell codeNft,
        string json
    ) TIP4_1Collection (
        codeNft
    ) TIP4_2Collection (
        json
    ) public {
        tvm.accept();
    }

    function mintNft(
        string json
    ) external virtual {
        require(msg.value > _remainOnNft + 0.1 ton, value_is_less_than_required);
        tvm.rawReserve(0, 4);

        uint256 id = uint256(_totalSupply);
        _totalSupply++;

        TvmCell codeNft = _buildNftCode(address(this));
        TvmCell stateNft = tvm.buildStateInit({
            contr: Nft,
            varInit: {_id: id},
            code: codeNft
        });

        address nftAddr = new Nft{
            stateInit: stateNft,
            value: 0,
            flag: 128
        }(
            msg.sender,
            msg.sender,
            _remainOnNft,
            json
        ); 

        emit NftCreated(
            id, 
            nftAddr,
            msg.sender,
            msg.sender, 
            msg.sender
        );
    
    }
}
```

```solidity title="NFT.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import '@itgold/everscale-tip/contracts/TIP4_1/TIP4_1Nft.sol';
import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Nft.sol';

contract Nft is TIP4_1Nft, TIP4_2Nft {

    constructor(
        address owner,
        address sendGasTo,
        uint128 remainOnNft,
        string json
    ) TIP4_1Nft(
        owner,
        sendGasTo,
        remainOnNft
    ) TIP4_2Nft (
        json
    ) public {
        tvm.accept();
    }

}
```

:::info
We won't explain this code blocks because of it's already done in TIP-4 [quick start](../01-quick-start-developing-with-tip-4.md)
:::

Then, let's deal with `Auction` contract. We'll get started from state and constructor, as usual. Do not forget to add interfaces we need.

```solidity code title="Auction.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

// Interfaces we needs
// This interface for transferring NFT to winner
import "@itgold/everscale-tip/contracts/TIP4_1/interfaces/ITIP4_1NFT.sol";
// This interface to accept NFT from owner
import "@itgold/everscale-tip/contracts/TIP4_1/interfaces/INftTransfer.sol";
// This interface for implementing tip-3 tokens receiving callback
import "tip3/contracts/interfaces/IAcceptTokensTransferCallback.sol";
// This interface for deploying TokenWallet
import "tip3/contracts/interfaces/ITokenRoot.sol";
// This interface to return lower bids
import "tip3/contracts/interfaces/ITokenWallet.sol";


contract Auction is INftTransfer, IAcceptTokensTransferCallback {
    
    uint256 static _nonce; // random nonce for affecting on address
    address static _owner; // owner of auction and nft

    uint32  public _startTime; // auction start time timestmp in seconds
    uint32  public _endTime; // auction end time timestamp in seconds

    address public _nft; // nft which will be sell
    
    uint128 public _currentBid; // state for holding current max bid
    address public _currentWinner; // current max bid owner

    address public _tokenRoot; // this token we will receive for bids
    address public _tokenWallet; // wallet for receive bids

    bool public _nftReceived; // is auction already receive nft
    bool public _closed; // action end flag

    constructor(
        uint32 startTime,
        uint32 endTime,
        address tokenRoot,
        address sendRemainingGasTo
    ) public {
        tvm.accept();
        tvm.rawReserve(0.2 ever, 0);
        
        _nftReceived = false;
        _closed = false;

        _startTime = startTime;
        _endTime = endTime;

        _tokenRoot = tokenRoot;
        // familiar wallet deploying mechanic
        ITokenRoot(_tokenRoot).deployWallet {
            value: 0.2 ever,
            flag: 1,
            callback: Auction.onTokenWallet
        } (
            address(this),
            0.1 ever
        );
        // memento gas management :)
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }
}
```

Remember about gas management and token wallet deploying mechanics from previous Venom In Action [guide](../../03-how-to-create-your-own-fungible-tip-3-token/02-venom-in-action/00-simple-tokensale.md). Implement `onTokenWallet` callback the same way.

```solidity title="Auction.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...
contract Auction is INftTransfer, IAcceptTokensTransferCallback {
...
    function onTokenWallet(address value) external {
        require (
            msg.sender.value != 0 &&
            msg.sender == _tokenRoot,
            101
        );
        tvm.rawReserve(0.2 ever, 0);
        // just store our auction's wallet address for future interaction
        _tokenWallet = value;
        _owner.transfer({ value: 0, flag: 128, bounce: false });
    }
...
}
```

Ok, the next callback we need is `onNftTransfer`, that will be called when NFT owner send NFT to Auction address

```solidity title="Auction.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...
contract Auction is INftTransfer, IAcceptTokensTransferCallback {
...
    function onNftTransfer(
        uint256, // id,
        address oldOwner,
        address, // newOwner,
        address, // oldManager,
        address, // newManager,
        address, // collection,
        address gasReceiver,
        TvmCell // payload
    ) override external {
        tvm.rawReserve(0.2 ever, 0);
        if (oldOwner != _owner || _nftReceived) {
        // we should return an NFT, received from address, differenced from owner we sets in state
            mapping(address => ITIP4_1NFT.CallbackParams) empty;
            // just operating with interface
            ITIP4_1NFT(msg.sender).transfer{
                value: 0,
                flag: 128,
                bounce: false
            }(
                oldOwner,
                gasReceiver,
                empty
            );
        } else {
            // positive case: we got an NFT for selling!
            _nft = msg.sender;
            _nftReceived = true;
        }
    }
...
}
```

Great! Now we are ready to accept bids. Let's implement another callback `onAcceptTokensTransfer`, that our `TokenWallet` will call any time it got an incoming token transaction. Take attention! This is the main logic of our auction!

```solidity title="Auction.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...
contract Auction is INftTransfer, IAcceptTokensTransferCallback {
...
    function onAcceptTokensTransfer(
        address, // tokenRoot,
        uint128 amount,
        address sender,
        address, // senderWallet,
        address remainingGasTo,
        TvmCell payload
    ) override external {
        require (msg.sender.value != 0 && msg.sender == _tokenWallet, 101);
        tvm.rawReserve(0.2 ever, 0);
        // check bid correctness:
        // * _nftReceived shoul be true (if not, it means that owner didn't send NFT yet)
        // * now must be between start and end
        // * received bid amount must be more than previous bid amount
        if (
            _nftReceived      &&
            now >= _startTime &&
            now <= _endTime   &&
            amount > _currentBid
        ) {
            // bid updating
            uint128 oldBit = _currentBid;
            address oldWinner = _currentWinner;
            _currentBid = amount;
            _currentWinner = sender;
            if (oldBit > 0) {
                // returning previous bid
                TvmCell empty;
                // REMEMBER that msg.sender is our TokenWallet! So we just call them to transfer back
                ITokenWallet(msg.sender).transfer{value: 0, flag: 128}(
                    oldBit,
                    oldWinner,
                    0,
                    remainingGasTo,
                    true,
                    empty
                );
            }
        } else {
            // if bid wasn't correct - we return it to sender
            // REMEMBER that msg.sender is our TokenWallet! So we just call them to transfer back
            ITokenWallet(msg.sender).transfer{value: 0, flag: 128}(
                amount,
                sender,
                0,
                remainingGasTo,
                true,
                payload
            );
        }
    }
...
}
```

That's it. How hard is that? The last thing we need - finishAuction function.

```solidity title="Auction.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...
contract Auction is INftTransfer, IAcceptTokensTransferCallback {
...
    // anyone can call this function!
    // so owner has no way to cheat
    function finishAuction(
        address sendRemainingGasTo
    ) public {
        // it can be finished only after endTime we set
        require(now >= _endTime, 102);
        require(msg.value >= 1 ever, 103);
        // remember about gas management...and about gas constants libraries too :)
        tvm.rawReserve(0.2 ever, 0);
        if (_currentBid > 0) {
            // bid more than zero, so somebody has won! let's send NFT to winner
            _closed = true;
            mapping(address => ITIP4_1NFT.CallbackParams) noCallbacks;
            TvmCell empty;
            ITIP4_1NFT(_nft).transfer{
                value: 0.1 ever,
                flag: 1,
                bounce: false
            }(
                _currentWinner,
                sendRemainingGasTo,
                noCallbacks
            );
            // do not forget to send bid amount for auction owner!
            ITokenWallet(_tokenWallet).transfer{value: 0, flag: 128}(
                _currentBid,
                _owner,
                0.1 ever,
                sendRemainingGasTo,
                true,
                empty
            );
        } else {
            _closed = true;
            // there is no bids, sad :(
            // returning NFT back to owner...may be next time :(
            mapping(address => ITIP4_1NFT.CallbackParams) noCallbacks;
            ITIP4_1NFT(_nft).transfer{
                value: 0.1 ever,
                flag: 1,
                bounce: false
            }(
                _owner,
                sendRemainingGasTo,
                noCallbacks
            );
        }
    }
...
}
```

You can explore this sample (with tests and some scripts) by going to this <todo: link> repository. But we should talks about scripts we need, because this sample needs not only deploy scripts. Moving on.

We can take collection deploying script and NFT minting scripts from [TIP-4 quick start](../01-quick-start-developing-with-tip-4.md#deploy-action). Script for auction deploying not a really hard too.

```typescript title="3-deploy-auction.ts" lineNumbers="true"
import { Address, getRandomNonce, WalletTypes } from "locklift";

// you can pass this parameter by cli or get them by some file reading for example or calculate an address with locklift.provider.getExpectedAddress()
// we just hardcode it here
const TOKEN_ROOT_ADDRESS = new Address("0:72150b21cc717202dedfb787068970e9d78b6a7e15447f3c1695420768f9aafb")

async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    // creating new account for Collection calling (or you can get already deployed by locklift.factory.accounts.addExistingAccount)
    const someAccount = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: signer.publicKey
    });
    const { contract: sample, tx } = await locklift.factory.deployContract({
        contract: "Auction",
        publicKey: signer.publicKey,
        initParams: {
            _owner: someAccount.address,
            _nonce: getRandomNonce()
        },
        constructorParams: {
            startTime: Math.floor(Date.now() / 1000) + 3600, // just for example. Of course you should put timestamp you want (in seconds)
            endTime: Math.floor(Date.now() / 1000) + 14400,
            tokenRoot: TOKEN_ROOT_ADDRESS,
            sendRemainingGasTo: someAccount.address
        },
        value: locklift.utils.toNano(5),
    });
  
    console.log(`Auction deployed at: ${sample.address.toString()}`);
}
  
main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
```

The next script, that can be useful for you - sending NFT to Auction. Let's code

```typescript title="" lineNumbers="true"
import { Address, toNano, WalletTypes } from "locklift";

// you can pass this parameters by cli or get them by some file reading for example or calculate an address with locklift.provider.getExpectedAddress()
// we just hardcode it here
const NFT_ADDRESS = new Address("0:304150265fbbe8680759cb7ec98cfa598b8a109396338b2916de1684a36a7679")
const AUCTION_ADDRESS = new Address("0:94ebb201aa8e3d436fe1d1a9ecd80dbd46b44c11567cc69cbc11f8295f98dd32")

async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    // creating new account for Collection calling (or you can get already deployed by locklift.factory.accounts.addExistingAccount)
    const someAccount = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: signer.publicKey
    });
    // instantiate NFT contract
    const nftInstance = await locklift.factory.getDeployedContract(
        "NFT",
        NFT_ADDRESS
    )
    // and call a transfer method to auction from owner
    await nftInstance.methods.transfer({
        to: AUCTION_ADDRESS,
        sendGasTo: someAccount.address,
        // attention! Next field is important for calling our onNftTransfer callback!
        // you may lose your NFT if you don't set up callback for auction here!
        callbacks: [[AUCTION_ADDRESS, {value: toNano(0.1), payload: ""}]] 
    }).send({
        from: someAccount.address,
        amount: toNano(2)
    })
  
    console.log(`NFT has been sent`);
}
  
main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
```

Pay attention on `callback` parameter of NFT's `transfer` method

```
callbacks: [[AUCTION_ADDRESS, {value: toNano(0.1), payload: ""}]] 
```

This is really important step. You may lose your NFT if don't specify callback for our auction, because callback `onNftTransfer` won't be called. Same idea should be used by your auction participants. They should send TIP-3 tokens to Auction with `notify: true` parameter:

```typescript
await tokenWalletInstance.methods.transfer({
        amount: 1000000000, // with decimals
        recipient: AUCTION_ADDRESS, // because it got it's own wallet
        deployWalletValue: 0, // we know, that auction wallet deployed already
        remainingGasTo: someAccount.address,
        notify: true, // IMPORTANT to set it "true" for onAcceptTokensTransfer to be called 
        payload: ""
}).send({
    from: someAccount.address,
    amount: toNano(2)
})
```

All you need now is a write some tests with locklift supports. This all-in-one example with locklift environment, some simple tests and deploy scripts is available in [repo](https://github.com/venom-blockchain/guides/tree/master/nft-auction-contracts).
