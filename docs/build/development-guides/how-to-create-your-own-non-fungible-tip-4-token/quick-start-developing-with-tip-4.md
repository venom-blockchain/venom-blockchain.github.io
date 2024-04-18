---
sidebar_position: 1
sidebar_label: Quick start developing with TIP-4
description: >-
  This page helps you to instantly start developing with TIP-4 and deploy your
  NFT collection here and now. Read the next guides, if you want to go deeper.
---

# Quick start developing with TIP-4

:::warning
During the following of this guide's code-listings you can meet keywords like `pragma ever-solidity` or keyword `ever` as a unit of the transfer value. It will be changed to `venom` soon. Follow the news and updates.
:::

## Source Code

You can inspect the source code of TIP-4 token implementation by [link](https://github.com/broxus/tip4).

## How to deploy your own NFT collection

:::info
You need to have an installed Smart Contract Development Environment. If you haven't already, follow [this tutorial](../setting-up-the-venom-smart-contract-development-environment).
:::

### Initialize your NFT project

```shell
npx locklift init --path my-first-nft
> [INFO]  New Locklift project initialized in .
> [INFO]  Installing required dependencies...
> [INFO]  
> added 181 packages, and audited 182 packages in 13s

> 23 packages are looking for funding
>   run `npm fund` for details

> found 0 vulnerabilities

> [INFO]  LockLift initialized in my-first-nft happy hacking!
```

### Install dependencies

TIP-4 is accessible from npm. Let's install it

```shell
npm i --save-dev @broxus/tip4
```

### Implement base contracts

Next, you should implement two interfaces in two contracts. Firstly, let's deal with Nft contract. The only thing we should do for basics is implementing `TIP4_1Nft``&#x20;

```solidity title="Nft.tsol" showLineNumbers
pragma ever-solidity >= 0.62.0;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import '@broxus/tip4/contracts/TIP4_1/TIP4_1Nft.sol';

contract Nft is TIP4_1Nft {

    constructor(
        address owner,
        address sendGasTo,
        uint128 remainOnNft
    ) TIP4_1Nft(
        owner,
        sendGasTo,
        remainOnNft
    ) public {}

}
```

Now we should go for the Collection contract. We should implement `TIP4_1Collection` and write some method for NFT deploying.

```solidity title="Collection.tsol" showLineNumbers
pragma ever-solidity >= 0.62.0;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import '@broxus/tip4/contracts/TIP4_1/TIP4_1Collection.tsol';
import './Nft.tsol';

contract Collection is TIP4_1Collection {

    constructor(
        TvmCell codeNft
    ) TIP4_1Collection (
        codeNft
    ) public {
        tvm.accept();
    }

    function mintNft() external virtual {
        require(msg.value > 0.4 ever, 101);
        tvm.rawReserve(0, 4);

        uint256 id = uint256(_totalSupply);
        _totalSupply++;

        TvmCell codeNft = _buildNftCode(address(this));
        TvmCell stateNft = tvm.buildStateInit({
            contr: Nft,
            varInit: {_id: id},
            code: codeNft
        });
        new Nft{
            stateInit: stateNft,
            value: 0,
            flag: 128
        }(
            msg.sender,
            msg.sender,
            0.3 ever
        );     
    }
}
```

The previous code uses only TIP-4.1 part of TIP-4. But it is kinda useless. To work with your NFT with full NFT experience you should implement [TIP-4.2](../../../standards/TIP/TIP-4/2.md) - standard, which helps you with NFT metadata storing. Also, you will need [TIP-4.3](../../../standards/TIP/TIP-4/3.md) - standard, which helps other dApps to find all your NFT with single query (GQL or JRPC). You should study the information about these standards by links. Implementation of 4.2 and 4.3 is pretty simple.

```solidity title="Nft.tsol" showLineNumbers
pragma ever-solidity >= 0.62.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

// importing all standards bases
import '@broxus/tip4/contracts/TIP4_1/TIP4_1Nft.tsol';
import '@broxus/tip4/contracts/TIP4_2/TIP4_2Nft.tsol';
import '@broxus/tip4/contracts/TIP4_3/TIP4_3Nft.tsol';


contract Nft is TIP4_1Nft, TIP4_2Nft, TIP4_3Nft {

    // just call constructors of all implemented classes
    constructor(
        address owner,
        address sendGasTo,
        uint128 remainOnNft,
        string json, // for TIP-4.2
        TvmCell codeIndex, // for TIP-4.3
        uint128 indexDeployValue, // for TIP-4.3
        uint128 indexDestroyValue // for TIP-4.3
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

    // Also, you need to implement some handlers, linked with NFT transferring
    // Maybe you need to implement something special, but you can also use default handlers
    
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

:::warning
Notice, that Index (and IndexBasis) code must be precompiled! You shouldn't compile these contracts by yourself. Just take it from [here](https://github.com/venom-blockchain/guides/tree/master/nft-auction-contracts/precompiled), place it somewhere in your project, and add them as external contracts in your locklift config like this:

```typescript title="locklift.config.ts" lineNumbers="false"
...
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

    // Or specify version of compiler
    version: "0.62.0",

    // Specify config for extarnal contracts as in exapmple
    externalContracts: {
      "../path/to/precompiled/indexes": ['Index', 'IndexBasis']
    }
    ...
```

:::

### Deploy action

Let's move to deploy action. We need two scripts for this quick start: one for `Collection` deploying, and the second for calling `mintNft` function, that we have implemented.

```typescript title="1-deploy-collection.ts" showLineNumbers
async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const nftArtifacts = await locklift.factory.getContractArtifacts("NFT");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Collection",
    publicKey: signer.publicKey,
    initParams: {},
    constructorParams: {
        codeNft: nftArtifacts.code,
        codeIndex: indexArtifacts.code,
        codeIndexBasis: indexBasisArtifacts.code,
        json: `{"collection":"tutorial"}` // EXAMPLE...not by TIP-4.2
    },
    value: locklift.utils.toNano(5),
  });

  console.log(`Collection deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

```

```typescript title="2-call-mintNft.ts" showLineNumbers
import { toNano, WalletTypes } from "locklift";

// you can get this parameter as (await locklift.keystore.getSigner("0"))! if you have a seed phrase sets up in key section of locklift config
// or you can pass this parameter by cli or get them by some file reading for example
// if phrase or secret was not set up in key section, calling (await locklift.keystore.getSigner("0"))! will give you a different results from launch to lauch
// we just hardcode it here
const COLLECTION_DEPLOY_PUBLIC_KEY = "e85f61aaef0ea43afc14e08e6bd46c3b996974c495a881baccc58760f6349300"

async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const collectionArtifacts = await locklift.factory.getContractArtifacts("Collection");
    const nftArtifacts = await locklift.factory.getContractArtifacts("NFT");

    // calculation of deployed Collection contract address
    const collectionAddress = await locklift.provider.getExpectedAddress(
        collectionArtifacts.abi,
        {
            tvc: collectionArtifacts.tvc,
            publicKey: COLLECTION_DEPLOY_PUBLIC_KEY,
            initParams: {} // we don't have any initParams for collection
        }
    );
    // initialize contract object by locklift
    const collectionInsance = await locklift.factory.getDeployedContract(
        "Collection",
        collectionAddress
    );

    // creating new account for Collection calling (or you can get already deployed by locklift.factory.accounts.addExistingAccount)
    const { account: someAccount } = await locklift.factory.accounts.addNewAccount({
        type: WalletTypes.WalletV3,
        value: toNano(10),
        publicKey: signer.publicKey
    });
    // call mintNft function
    // firstly get current nft id (totalSupply) for future NFT address calculating
    const {count: id} = await collectionInsance.methods.totalSupply({ answerId: 0 }).call();
    await collectionInsance.methods.mintNft({ json: `{"name":"hello world"}` }).send({ from: someAccount.address, amount: toNano(1)});
    const {nft: nftAddress} = await collectionInsance.methods.nftAddress({ answerId: 0, id: id }).call();
  
    console.log(`NFT: ${nftAddress.toString()}`);
}
  
main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
  
```

Finally, we can deploy a new token to the `local` network. For this, make sure the local node is running, if not follow the next command

```shell
docker run -d --name local-node -e USER_AGREEMENT=yes -p80:80 tonlabs/local-node
```

and run our scripts

```shell
npx locklift run -s ./scripts/1-deploy-collection.ts -n local
> [INFO]  factorySource generated
> [INFO]  Built
> Collection deployed at: 0:882c1f7af09efaf506ab313daecb6ce127acfab7d082e28e6dbcff839aa58bba
npx locklift run -s ./scripts/2-call-mintNft.ts -n local
> [INFO]  factorySource generated
> [INFO]  Built
> NFT: 0:64a4ea8fa80bf3d2ba78c0a602e39a045786a70b69e879f90e9abe2a2f7f33fe</code></pre>
```

Now you know how to deploy your own NFT collection and mint NFT with TIP-4 standard!
