---
sidebar_position: 1
sidebar_label: Quick start developing with TIP-3
description: >-
  This page helps you to instantly start developing with TIP-3 and deploy your
  own token here and now. Read next guides, if you want to go deeper.
---

# Quick start developing with TIP-3

## Source code

You can inspect the source code of TIP-3 token implementation by [link](https://github.com/broxus/tip3).

## How to deploy your own token

:::info
You need to have an installed Smart Contract Development Environment. If you haven't already, follow [this tutorial](../setting-up-the-venom-smart-contract-development-environment).
:::

### Initialize your token project

```shell
npx locklift init --path my-first-token
> [INFO]  New Locklift project initialized in .
> [INFO]  Installing required dependencies...
> [INFO]  
> added 181 packages, and audited 182 packages in 13s

> 23 packages are looking for funding
>   run `npm fund` for details

> found 0 vulnerabilities

> [INFO]  LockLift initialized in my-first-token happy hacking!
```

### Install dependencies

Add TIP-3 implementation repository as a `devDependencies` in the corresponding section of the `package.json` file

```json title="package.json" showLineNumbers
{
  "devDependencies": {
    "tip3": "https://github.com/broxus/tip3#v5",
    ...
  },
}
```

Then run `npm install` to fetch dependencies needed.

Specify installed contracts to the `compiler.externalContracts` section of `locklift.config.ts`, by providing a path to contracts artifacts (`.abi.json`, `.tvc` files, etc., most commonly placed in a `build` folder of smart contracts projects) and contract names array.

```json title="locklift.config.ts" showLineNumbers
compiler: {
    ...
    externalContracts: {
      "node_modules/tip3/build": ["TokenRoot", "TokenWallet"],
    },
  }
```

Now we can compile our contracts and make sure that artifacts were created

```shell
npx locklift build

> Found 1 sources
>
> factorySource generated
> Built

ls ./build

> ...
> TokenRoot.abi.json
> TokenRoot.code
> TokenRoot.base64
> TokenRoot.tvc
> ...
> TokenWallet.abi.json
> TokenWallet.code
> TokenWallet.base64
> TokenWallet.tvc
> ...
```

Let's move to deploy. Firstly, we make a new deploy script in `scripts` directory for the `TokenRoot` contract.&#x20;

```typescript title="01-deploy-token-root.ts" showLineNumbers
import { Address, getRandomNonce, toNano, zeroAddress } from "locklift"
import BigNumber from "bignumber.js"

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!
  
  // Address of initial token supply recipient (write your own)
  const initialSupplyTo   = new Address("0:7542...")
  // Address of token owner (write your own)
  const rootOwner         = new Address("0:7542...")
  // Name of the token     
  const name              = "First Venom Token"
  // Symbol of the token
  const symbol            = "FVT"
  // How many token will be issued instantly after deploy                
  const initialSupply     = 0
  // The number of decimals the token uses        
  const decimals          = 18
  // If `true`, disables token minting
  const disableMint       = false
  // If `true`, disables token burning by root                
  const disableBurnByRoot = false
  // If `true`, pauses token burning                
  const pauseBurn         = false
                  
  
  /* 
    Returns compilation artifacts based on the .tsol file name
      or name from value config.externalContracts[pathToLib].
  */
  const TokenWallet = locklift.factory.getContractArtifacts("TokenWallet")
  
  /* 
    Deploy the TIP-3 Token Root contract.
    @params deployWalletValue: Along with the deployment of the root token,
      the wallet will be automatically deployed to the owner. 
      This is the amount of EVERs that will be sent to the wallet.
  */
  const { contract: tokenRoot } = await locklift.factory.deployContract({
    contract: "TokenRoot",
    publicKey: signer.publicKey,
    initParams: {
      deployer_: zeroAddress, // this field should be zero address if deploying with public key (see source code)
      randomNonce_: getRandomNonce(),
      rootOwner_: rootOwner,
      name_: name,
      symbol_: symbol,
      decimals_: decimals,
      walletCode_: TokenWallet.code,
    },
    constructorParams: {
      initialSupplyTo: initialSupplyTo,
      initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
      deployWalletValue: toNano(1),
      mintDisabled: disableMint,
      burnByRootDisabled: disableBurnByRoot,
      burnPaused: pauseBurn,
      remainingGasTo: zeroAddress,
    },
    value: toNano(5),
  })

  console.log(`${name}: ${tokenRoot.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e)
    process.exit(1)
  })

```

Finally, we can deploy a new token to `local` network. For this, make sure the local node is running. If not, run the following command

```shell
docker run -d --name local-node -e USER_AGREEMENT=yes -p80:80 tonlabs/local-node
```

and run the deploy script

```shell
npx locklift run -s ./scripts/01-deploy-token.ts -n local

> Found 1 sources

> factorySource generated
> Built
> First Venom Token: 0:69f2407386ca20390878565da97124be717f65496cb03e14aaa676709a6ccb2b
```

Congratulations, your first token on the Venom network has been deployed!
