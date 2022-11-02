---
sidebar_position: 0
sidebar_label: How to connect Dapp UI to Venom
---

# How to connect Dapp UI to Venom

## Project Setup <a href="#project-setup" id="project-setup"></a>

Make sure you have:

1. The Venom wallet extension  
2. Node.js and NPM [Downloaded and Installed](https://nodejs.org/)

### Install Dependencies

Open a terminal inside the base directory of your project. Inside the folder, follow the command

```
npm i everscale-inpage-provider --save
```

## Connecting to the Venom Wallet <a href="#connecting-to-the-metamask-wallet" id="connecting-to-the-metamask-wallet"></a>

The first thing we need to do is make sure that the wallet is installed in a browser

```typescript
import { ProviderRpcClient } from 'everscale-inpage-provider';

const ever = new ProviderRpcClient();

async function myApp() {
  if (!(await ever.hasProvider())) {
  /**
    * Handle this case by showing the user a link to the Venom extension
    */
    throw new Error('Extension is not installed');
  }

  //...
}
```

and check if it is connected

```typescript
//...

const ever = new ProviderRpcClient({
/**
  * Fallback function which will be called if injected provider was not found.
  */
  fallback: () => {}
});


async function myApp() {
  //...

 /**
   * Waits until provider API will be available.
   * Calls `fallback` if no provider was found
   * @throws ProviderNotFoundException when no provider is found
   */
  await ever.ensureInitialized();

  //...
}
```

Next, we need to request permission to get account info and interaction with it

```typescript
//...

const { accountInteraction } = await ever.requestPermissions({
  permissions: ['basic', 'accountInteraction'],
});

if (accountInteraction == null) {
  throw new Error('Insufficient permissions');
}
```

We've connected to Venom wallet, and now we can interact with blockchain: transfer funds, call contract methods, and read their state.

### How to call smart contracts from code

First, you need to initialize an instance of a contract by its ABI, and address

```typescript
//...

const DePoolAbi = {...}
const dePoolAddress = new Address('0:bb...e9');

const dePool = new ever.Contract(DePoolAbi, dePoolAddress);
```

`Contract` is an abstraction that makes it easy to interact with smart contracts on the Venom network.

```typescript
const transaction = await dePool
    .methods
    .addOrdinaryStake({
      stake: '10000000000',
    }).send({
      from: selectedAddress,
      amount: '10500000000',
      bounce: true,
    });

  console.log(transaction);

  try {
    const output = await dePool
      .methods
      .getParticipantInfo({
        addr: selectedAddress,
      })
      .call();
    console.log(output);
  } catch (e) {
    if (e instanceof TvmException) {
      console.error(e.code);
    }
  }
```
