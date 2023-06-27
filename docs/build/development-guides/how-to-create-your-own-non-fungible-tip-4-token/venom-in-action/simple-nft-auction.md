---
sidebar_position: 0
sidebar_label: Simple NFT auction
description: >-
  This guide shows you how you can perform on-chain interaction with previously
  deployed TIP-4 token
---

# Venom In Action. Simple NFT auction

:::warning
During the following of this guide's code-listings you can meet keywords like `pragma ever-solidity` or keyword `ever` as a unit of the transfer value. It will be changed to `venom` soon. Follow the news and updates.
:::

:::info
This guide will be more complicated as compared with the Tokensale implementation. It's recommended to pass it secondarily.
:::

First of all, as usual, we should set up our development environment with the locklift. For this smart-contracts guideline, you need to include both [TIP-3](../../how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3.md#install-dependencies) and [TIP-4](../../how-to-create-your-own-non-fungible-tip-4-token/quick-start-developing-with-tip-4.md#install-dependencies) dependencies, because our Auction will be accepted in TIP-3 tokens. Let's explore some scheme of our contracts interaction and describe it

![Our smart-contracts interaction logic](<../assets/auction.svg>)

NFT creation is a green arrow flow, and auction bids are yellow. Let's describe a processes

1. User mints its own NFT via Collection contract
2. Then, the user deploys an Auction
3. Auction deploys its own TIP-3 TokenWallet via the given TokenRoot address (a familiar mechanic for you from TIP-3 Tokensale guide)
4. The user sends minted NFT to Auction, which implements `INftTransfer` interface and accepts this NFT
5. Another users sends TIP-3 tokens (bid) to Auction with `notify = true` parameter (see TIP-3 specs or TIP-3 guide)
6. Auction's TokenWallet sends a callback to Auction, which handles TIP-3 transfer - checks if the incoming bid amount is more than the previous bid, and updates a leader bid address
7. When time is over, `finishAuction` function will send NFT to the auction winner or old owner, if there are no bids were accepted

That's all! As you can see, the main mechanic of our interaction is callbacks. Let's start implementing our contracts. First, implement Collection and NFT contracts same as in TIP-4 [quick start](../quick-start-developing-with-tip-4.md) guide.

```solidity title="Collection.tsol" showLineNumbers
pragma ever-solidity >= 0.61.2;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;


import '@broxus/tip4/contracts/TIP4_2/TIP4_2Collection.tsol';
import '@broxus/tip4/contracts/TIP4_3/TIP4_3Collection.tsol';
import './Nft.tsol';

contract Collection is TIP4_2Collection, TIP4_3Collection {

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
        string json,
        TvmCell codeIndex,
        TvmCell codeIndexBasis
    ) TIP4_1Collection (
        codeNft
    ) TIP4_2Collection (
        json
    ) TIP4_3Collection (
        codeIndex,
        codeIndexBasis
    ) 
    public {
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
        TvmCell stateNft = _buildNftState(codeNft, id);

        address nftAddr = new Nft{
            stateInit: stateNft,
            value: 0,
            flag: 128
        }(
            msg.sender,
            msg.sender,
            _remainOnNft,
            json,
            _codeIndex,
            _indexDeployValue,
            _indexDestroyValue
        ); 

        emit NftCreated(
            id, 
            nftAddr,
            msg.sender,
            msg.sender, 
            msg.sender
        );
    
    }

    function _buildNftState(TvmCell code, uint256 id)
        internal
        pure
        virtual
        override (TIP4_2Collection, TIP4_3Collection)
        returns (TvmCell)
    {
        return tvm.buildStateInit({contr: Nft, varInit: {_id: id}, code: code});
    }
}
```

```solidity title="NFT.tsol" showLineNumbers
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import '@broxus/tip4/contracts/TIP4_1/TIP4_1Nft.tsol';
import '@broxus/tip4/contracts/TIP4_2/TIP4_2Nft.tsol';
import '@broxus/tip4/contracts/TIP4_3/TIP4_3Nft.tsol';


contract Nft is TIP4_1Nft, TIP4_2Nft, TIP4_3Nft {

    constructor(
        address owner,
        address sendGasTo,
        uint128 remainOnNft,
        string json,
        TvmCell codeIndex,
        uint128 indexDeployValue,
        uint128 indexDestroyValue
    ) TIP4_1Nft(
        owner,
        sendGasTo,
        remainOnNft
    ) TIP4_2Nft (
        json
    ) TIP4_3Nft (
        indexDeployValue,
        indexDestroyValue,
        codeIndex
    ) 
    public {
        
    }

    function _beforeTransfer(
        address to, 
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._destructIndex(sendGasTo);
    }

    function _afterTransfer(
        address to, 
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._deployIndex();
    }

    function _beforeChangeOwner(
        address oldOwner, 
        address newOwner,
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._destructIndex(sendGasTo);
    }   

    function _afterChangeOwner(
        address oldOwner, 
        address newOwner,
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._deployIndex();
    }
}
```

:::info
We won't explain this code blocks because it's already done in TIP-4 [quick start](../quick-start-developing-with-tip-4.md)
:::

Then, let's deal with `Auction` contract. We'll get started from the state and constructor, as usual. Do not forget to add the interfaces we need.

```solidity code title="Auction.tsol" showLineNumbers
pragma ever-solidity >= 0.61.2;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

// Interfaces we needs
// This interface for transferring NFT to winner
import "@broxus/tip4/contracts/TIP4_1/interfaces/ITIP4_1NFT.tsol";
// This interface to accept NFT from owner
import "@broxus/tip4/contracts/TIP4_1/interfaces/INftTransfer.tsol";
// This interface for implementing tip-3 tokens receiving callback
import "@broxus/tip3/contracts/interfaces/IAcceptTokensTransferCallback.tsol";
// This interface for deploying TokenWallet
import "@broxus/tip3/contracts/interfaces/ITokenRoot.tsol";
// This interface to return lower bids
import "@broxus/tip3/contracts/interfaces/ITokenWallet.tsol";


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

Remember about gas management and token wallet deploying mechanics from the previous Venom In Action [guide](../../how-to-create-your-own-fungible-tip-3-token/venom-in-action/simple-tokensale.md). Implement `onTokenWallet` callback the same way.

```solidity title="Auction.tsol" showLineNumbers
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

Ok, the next callback we need is `onNftTransfer`, which will be called when the NFT owner sends NFT to the auction address

```solidity title="Auction.tsol" showLineNumbers
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

```solidity title="Auction.tsol" showLineNumbers
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

That's it. How hard is that? The last thing we need - is `finishAuction` function.

```solidity title="Auction.tsol" showLineNumbers
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

You can explore this sample (with tests and some scripts) by going to this [repository](https://github.com/venom-blockchain/guides/tree/master/nft-auction-contracts). But we should talk about scripts we need because this sample needs not only deploy scripts. Moving on.

We can take collection deploying script and NFT minting scripts from [TIP-4 quick start](../quick-start-developing-with-tip-4.md#deploy-action). Script for auction deploying is not really hard too.

```typescript title="3-deploy-auction.ts" showLineNumbers
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

```typescript title="" showLineNumbers
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

Pay attention to `callback` parameter of NFT's `transfer` method

```js
callbacks: [[AUCTION_ADDRESS, {value: toNano(0.1), payload: ""}]] 
```

This is a really important step. You may lose your NFT if don't specify a callback for our auction, because a callback `onNftTransfer` won't be called. The same idea should be used by your auction participants. They should send TIP-3 tokens to Auction with `notify: true` parameter:

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
