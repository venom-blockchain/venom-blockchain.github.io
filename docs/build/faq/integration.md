---
sidebar_position: 0
sidebar_label: Integration
---

# FAQ - Integration

<details>
<summary>
How to connect Venom Wallet to my dApp?
</summary>

The easiest way to connect your dApp to Venom Wallet is to use [Venom Connect](https://www.npmjs.com/package/venom-connect). It is a library that allows you to connect to Venom Wallet (both mobile and browser extension) and interact with it. This library provides you with a handy interface for building connect popup for our venom wallet and then gives us an interface for working with the venom network.

Let's check a simple React example:

According to venom-connect documentation, we should just create a `VenomConnect` instance in our code. Let's implement some functions for returns `VenomConnect` instance

```typescript title="src/venom-connect/configure.ts" lineNumbers="true"
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

export const initVenomConnect = async () => {
  return new VenomConnect({
    theme: 'dark',
    checkNetworkId: 1010,
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            package: ProviderRpcClient,

            packageOptions: {
              fallback: VenomConnect.getPromise('venomwallet', 'extension') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: () =>
                EverscaleStandaloneClient.create({
                  connection: {
                    id: 1010,
                    group: 'venom_testnet',
                    type: 'jrpc',
                    data: {
                      endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
                    },
                  },
                }),
              forceUseFallback: true,
            },

            id: 'extension',
            type: 'extension',
          },
        ],
        defaultWalletWaysToConnect: [
          'mobile',
          'ios',
          'android',
        ],
      },
    },
  });
};
```

Now we can add initialization in our main App file:

```typescript title="App.tsx" lineNumbers="true"
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { initVenomConnect } from './venom-connect/configure';
import VenomConnect from 'venom-connect';

function App() {
  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      ...
    </div>
  );
}

export default App;
```

Then, just call `venomConnect.connect()` method from somewhere (ex. by clicking on some "Connect Wallet" button). Check [this](../development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend.md#connecting-venom-wallet-to-your-app) guide for the complete example.

You can read about all configuration options in venom-connect official [repository](https://github.com/web3sp/venom-connect). Also, it has an [example](https://github.com/web3sp/venom-connect/tree/main/examples/react).
</details>

<details>
<summary>
What if I need very specific logic for connecting the Wallet to my dApp?
</summary>

So, in this case, you can use the library that venom-connect has been built on [inpage-provider](https://github.com/broxus/everscale-inpage-provider) and [standalone-client](https://github.com/broxus/everscale-standalone-client) - basic libraries for interaction with the venom network, so you can build your system for wallet connection. Check the documentation for these libraries in its repositories for more information.

A very simple example of using inpage-provider will look like this:

The first thing we need to do is make sure that the wallet is installed in a browser

```typescript
import { ProviderRpcClient } from 'everscale-inpage-provider';

const providerClient = new ProviderRpcClient();

async function myApp() {
  if (!(await providerClient.hasProvider())) {
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

const providerClient = new ProviderRpcClient({
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
  await providerClient.ensureInitialized();

  //...
}
```

Next, we need to request permission to get account info and interaction with it

```typescript
//...

const { accountInteraction } = await providerClient.requestPermissions({
  permissions: ['basic', 'accountInteraction'],
});

if (accountInteraction == null) {
  throw new Error('Insufficient permissions');
}
```

We've connected to Venom wallet, and now we can interact with blockchain: transfer funds, call contract methods, and read their state.

</details>

<details>
<summary>
I need to call a smart contract method before the user connects the wallet. How can I do it?
</summary>

You should use [standalone-client](https://github.com/broxus/everscale-standalone-client) as a fallback for [inpage-provider](https://github.com/broxus/everscale-inpage-provider). It allows you to call smart contract's get methods without sending any transactions. Library venom-connect also gives you access to the standalone interface. You can use [getStandalone](https://github.com/web3sp/venom-connect#getstandalone) method to achieve this. You can check [this](../development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-auction.md) guide when we use the standalone-client from `getStandalone` method to get the current auction information.

</details>

<details>
<summary>
I'm developing a payment processing system. Which instrument of your ecosystem can help me?
</summary>

You can check [this](https://github.com/broxus/ever-wallet-api) project. It will help you with transaction indexing and payment processing. It is a REST API that allows you to get information about transactions and payments. It also allows you to create payment requests and get payment notifications. You can check the documentation for this project in its repository.

</details>

<details>
<summary>
I need to have personal access to Venom's transaction history. How can I achieve this?
</summary>

You can achieve this with two modules. Both of them, in fact, is a light node of Venom Blockchain, but it has some extra interfaces for you to process incoming blocks and transaction. One of them is [ton-indexer](https://github.com/broxus/ton-indexer) and the other one is [ton-kafka-producer](https://github.com/broxus/ton-kafka-producer). The first one uses rocksdb as storage for blockchain data storage, as you can see, works with Apache Kafka.

The main idea is ton-indexer was written with Rust so you should use the Rust ecosystem for your project - use ton-indexer as a module of your Rust project to operate with incoming blockchain data, analyze it and store parts of data you need somewhere. When you are using ton-kafka-producer, you can use whatever you want to read Kafka's topics, which will be filled with blockchain data constantly, but of course, you need to have the Apache Kafka cluster.

</details>