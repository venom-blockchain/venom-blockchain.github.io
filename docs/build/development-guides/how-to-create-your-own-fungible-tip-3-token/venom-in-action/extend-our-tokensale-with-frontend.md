---
sidebar_position: 1
sidebar_label: Extend our Tokensale with frontend
description: >-
  This section will show you how you can interact with your Tokensale contract
  via a web interface. You will create a dAPP, in fact.
---

# Venom In Action. Extend our Tokensale with frontend

It's good to have smart contracts for distributing our fungible token, but to
have a human-friendly interface to working with our smart contracts is
better. Let's implement some web interface for transforming our simple smart contract to a complete dapp.

For building a web interface, we will use [React](https://reactjs.org/) library. Of course, you can use any library you want. We are starting with the command, that allows us to scaffold React application

```shell
npx create-react-app my-tokensale-web --template typescript
```

:::info
This guide will not include frontend development basements and React essentials. We focus our attention only on venom smart contracts integration.
:::

## Connecting Venom Wallet to your app

Suppose we already have some layout for our web application and you know how to use it with React. First of all, we need to connect our [venom wallet](../../../../start/general/ecosystem.md#venom-wallet) with our app. For this task we will use [venom-connect](https://www.npmjs.com/package/venom-connect) library. This library provides us with a handy interface for building connect popup for our venom wallet and then gives us an interface for working with the venom network. The library has been built on [inpage-provider](https://github.com/broxus/everscale-inpage-provider) and [standalone-client](https://github.com/broxus/everscale-standalone-client) - basic libraries for interaction with the venom network, so you can build your own system for wallet connection, but we will just use a ready-made tool. Let's install it and the corresponding tools for working with it.

```shell
npm install --save venom-connect everscale-inpage-provider everscale-standalone-client
```

According to venom-connect documentation, we should just create a `VenomConnect` instance in our code. Let's implement some functions for returns `VenomConnect` instance. You can read about all configuration options in venom-connect official documentation. Also, it has an [example](https://github.com/web3sp/venom-connect/tree/main/examples/react).

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

Now we can add initializating in our main `App.tsx` file:

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

For a better experience, let's move our page to another component, that will be included in the root `App.tsx`

```typescript title="src/Main.tsx" lineNumbers="true"
import React, { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';
import logo from './logo.svg';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function Main({ venomConnect }: Props) {
    return (
        <div className="App">
          ...
        </div>
    );
}

export default Main;
```

```typescript title="App.tsx" lineNumbers="true"
import React, { useEffect, useState } from 'react';
...

function App() {

  ...

  return (
    <Main venomConnect={venomConnect} />
  );
}

export default App;
```

Then we should call `venomConnect.connect()` method. Let's create a button for connection initializing. We need a separate React component for that action. This component will receive our initialized instance and call `connect` function.

```typescript title="src/components/ConnectWallet.ts" lineNumbers="true"
import React from 'react';
import { VenomConnect } from 'venom-connect';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function ConnectWallet({ venomConnect }: Props) {
  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };
  return (
    <div>
      <>
        <h1>My Venom Crowdsale</h1>
        <p>Connect Wallet to continue</p>
        <a className="btn" onClick={login}>
          Connect wallet
        </a>
      </>
    </div>
  );
}
  
export default ConnectWallet;
```

Now we can add this component to our `Main.tsx` file, and pass the venom-connect instance from.

```typescript title="Main.tsx" lineNumbers="true"
import React from 'react';
import { VenomConnect } from 'venom-connect';

import ConnectWallet from './components/ConnectWallet'

type Props = {
  venomConnect: VenomConnect | undefined;
};

function Main({ venomConnect }: Props) {
  return (
    <div className="App">
      <ConnectWallet venomConnect={venomConnect} />
    </div>
  );
}
  
export default Main;
```

That's it. Now you can see the widget popup window after clicking on `Connect Wallet` element. If you choose Browser Extension inside the popup, you will see that your Venom Wallet extension will show you a connection popup.

## Getting the user's wallet address from the connected wallet

But now the user doesn't know if his connection was successful. Let's add a header, that shows the wallet address after the wallet has been connected. And, of course, the disconnect button. In that case, we need to add some code. Pay attention to code comments

```typescript title="Main.tsx" lineNumbers="true"
import React, { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';

import ConnectWallet from './components/ConnectWallet'

type Props = {
  venomConnect: VenomConnect | undefined;
};

function Main({ venomConnect }: Props) {
  const [venomProvider, setVenomProvider] = useState<any>();
  const [address, setAddress] = useState();
  // This method allows us to gen a wallet address from inpage provider
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };
  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };
  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
  };
  // When our provider is ready, we need to get address and balance from.
  const onProviderReady = async (provider: any) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setAddress(venomWalletAddress);
  };
  useEffect(() => {
    // connect event handler
    const off = venomConnect?.on('connect', onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }
    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [venomConnect]);
  return (
    <div className="App">
      {address && (
        <header>
          <p>{address}</p>
          <a className="logout" onClick={onDisconnect}>
            <img src='img' alt="Log out" />
          </a>
        </header>
      )}
      <ConnectWallet venomConnect={venomConnect} />
    </div>
  );
}
export default Main;
```

## Reading the user's token balance from deployed smart-contract

We got a user's address! That's great, but I think we need to show the user's token balance too. for address fetching, you have operated with inpage-provider part of wallet interaction. We will use provider later to interact with the blockchain, especially for sending token purchase transactions. But for reading public data from the blockchain, it's possible to use a standalone client. The next listing will show you how to read the smart contract state with a standalone client, provided by venom-connect

```typescript title="Main.tsx" lineNumbers="true"
...

// Importing of our contract ABI from smart-contract build action. Of cource we need ABI for contracts calls.
import tokenRootAbi from './abi/TokenRoot.abi.json';
import tokenWalletAbi from './abi/TokenWallet.abi.json';

...

function Main({ venomConnect }: Props) {

  ...

  // We will store token balance from contract
  const [balance, setBalance] = useState<string | undefined>();
  let tokenWalletAddress: string | undefined; // User's TIP-3 TokenWallet address
  
  ...

  // This function will call walletOf function of TokenRoot contract, to obtain TokenWallet of connecte4d user.
  const setupTokenWalletAddress = async (standalone: ProviderRpcClient, wallet: string): Promise<string | undefined> => {
    try {
      const contractAddress = new Address('0:91470b9a77ada682c9f9aee5ae0a4e2ea549ee51f7b0f2cba5182ffec2eb233f'); // Our TokenRoot address in venom testnet
      // We will use standalone-client form our venomConnect instance to call a view method of contract
      const contract = new standalone.Contract(tokenRootAbi, contractAddress); // creating a contract instance with contract address and interface (ABI)
      // Smart-contract calling. Function walletOf of TokenRoot will calculate user's tokenWallet address by it's VenomWallet address (wich was connected)
      const tokenWallet = (await contract.methods
        .walletOf({
          answerId: 0,
          walletOwner: wallet,
        } as never)
        .call()) as any;
      if (!tokenWallet) return undefined;
      tokenWalletAddress = tokenWallet.value0._address;
      return tokenWalletAddress;
    } catch (e: any) {
      console.error(e);
    }
    return undefined;
  };
  // Same idea for token balance fetching. Usage of standalone client and balance method of TIP-3 TokenWallet
  // We already knows user's TokenWallet address
  const getBalance = async (wallet: string) => {
    if (!venomConnect) return;
    const standalone: ProviderRpcClient | undefined = await venomConnect?.getStandalone('venomwallet');
    if (standalone) {
      if (!tokenWalletAddress) {
        await setupTokenWalletAddress(standalone, wallet);
      }
      if (!venomProvider || !tokenWalletAddress) return;
      try {
        const contractAddress = new Address(tokenWalletAddress);
        const contract = new standalone.Contract(tokenWalletAbi, contractAddress);
        // We check a contract state here to acknowledge if TokenWallet already deployed
        // As you remember, wallet can be deployed with first transfer on it.
        // If our wallet isn't deployed, so it's balance is 0 :)
        const contractState = await venomProvider.rawApi.getFullContractState({ address: tokenWalletAddress });
        if (contractState.state) {
          // But if this deployed, just call a balance function
          const result = (await contract.methods.balance({ answerId: 0 } as never).call()) as any;
          const tokenBalance = result.value0; // It will be with decimals. Format if you want by dividing with 10**decimals
          setBalance(tokenBalance);
        } else {
          setBalance('0');
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('Standalone is not available now');
    }
  };

  ...

  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
    // Balance reseting
    setBalance(undefined);
    tokenWalletAddress = undefined;

  };

  ...

  // Hook for balance setup
  useEffect(() => {
    if (address) getBalance(address);
  }, [address]);

  return (
    <div className="App">
      {address && (
        <header>
          <p>{address}</p>
          <p>{balance}</p>
          <a className="logout" onClick={onDisconnect}>
            <img src='img' alt="Log out" />
          </a>
        </header>
      )}
      <ConnectWallet venomConnect={venomConnect} />
    </div>
  );
}
  
export default Main;
```

That's it. Now we know how to read the state from the deployed smart contract! Straight from venom blockchain! The last ability we need to implement - is token purchasing.

## Sending token purchase transaction

Let's implement some buying tokens form. It should be shown only after the wallet has been connected. We need to get purchasing amount from the user and send the purchase transaction from the user's wallet with inpage-provider, provided by venom-connect. Starts with a component for our form.

```typescript title="components/SaleForm.tsx" lineNumbers="true"
import React, { useState } from 'react';
import { VenomConnect } from 'venom-connect';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

// we will user bignumber library to operate with deposit values (remember about decimals multiply)
import BigNumber from 'bignumber.js';

// Importing of our contract ABI from smart-contract build action. Of cource we need ABI for contracts calls.
import tokenSaleAbi from '../abi/Tokensale.abi.json';

type Props = {
  balance: string | undefined;
  getBalance: (wallet: string) => void;
  venomConnect: VenomConnect | undefined;
  address: string | undefined;
  provider: ProviderRpcClient | undefined;
};

function SaleForm({ balance, venomConnect, address, provider, getBalance }: Props) {
  const [tokenAmount, setTokenAmount] = useState<number | undefined>(0);

  const onChangeAmount = (e: string) => {
    if (e === '') setTokenAmount(undefined);
    setTokenAmount(Number(e));
  };

  const buyTokens = async () => {
    if (!venomConnect || !address || !tokenAmount || !provider) return;
    const userAddress = new Address(address);
    const contractAddress = new Address("0:fac0dea61ab959bf5fc5d325b6ef97ef45ef371c8649042e92b64e46c3c854d5"); // Our Tokensale contract address
    const deposit = new BigNumber(tokenAmount).multipliedBy(10 ** 8).toString(); // Contract's rate parameter is 1 venom = 10 tokens
    // Creating an instance for Tokensale contract
    const contract = new provider.Contract(tokenSaleAbi, contractAddress);
    // another 1 venom for connection. You will receive a change, as you remember
    const amount = new BigNumber(deposit).plus(new BigNumber(1).multipliedBy(10 ** 9)).toString();;
    try {
      // and just call buyTokens method according to smart contract
      const result = await contract.methods
        .buyTokens({
          deposit,
        } as never)
        .send({
          from: userAddress,
          amount,
          bounce: true,
        });
      if (result?.id?.lt && result?.endStatus === 'active') {
        setTokenAmount(undefined);
        getBalance(address);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <h1>My Venom Crowdsale</h1>
      <div className="item-info">
        <span>My Token Balance</span>
        <b>{balance}</b>
      </div>
      <div className="card__amount">
        <div className="number">
          <span>Amount</span>
          <input
            type="number"
            min={0}
            value={tokenAmount !== undefined ? tokenAmount : ''}
            onChange={(e) => {
              onChangeAmount(e.target.value);
            }}
          />
        </div>
        <a className={!tokenAmount ? 'btn disabled' : 'btn'} onClick={buyTokens}>
          Buy
        </a>
      </div>
    </>
  );
}

export default SaleForm;
```

That's it. Now we should place our new form on our `Main` page. Remember, that we should show the form only after the user's wallet has been connected.

```typescript title="Main.tsx" lineNumbers="true"
...
function Main({ venomConnect }: Props) {
  ...
  return (
    <div className="App">
      {address && (
        <header>
          <p>{address}</p>
          <p>{balance}</p>
          <a className="logout" onClick={onDisconnect}>
            <img src='img' alt="Log out" />
          </a>
        </header>
      )}
       {address ? (
          // SaleForm if we are connected
          <SaleForm
            address={address}
            balance={balance}
            venomConnect={venomConnect}
            provider={venomProvider}
            getBalance={getBalance}
          />
        ) : (
          // ConnectWallet if we are not connected
          <ConnectWallet venomConnect={venomConnect} />
        )}
    </div>
  );
}
```

<details>

<summary>Hint - add your token to the user's wallet</summary>

Inpage provider can help you to ask the user if it wants to add your distributable token to the wallet extension. Implementation of this feature is pretty simple. Just add a button somewhere on your layout (we will create another block with the token address and new button) and create a click handler, where `provider.addAsset()` function will be called.

```typescript title="components/SaleForm.tsx" lineNumbers="true"
import React, { useState } from "react";

...

import AddTokenImg from "../styles/img/add_token.svg";

...

function SaleForm({ balance, venomConnect, address, provider, getBalance }: Props) {
  ...
  // handler that helps us to ask user about adding our token to the user's venom wallet
  const onTokenAdd = () => {
    console.log(provider?.addAsset({
      account: new Address(address as string), // user's wallet address
      params: {
        rootContract: new Address("0:91470b9a77ada682c9f9aee5ae0a4e2ea549ee51f7b0f2cba5182ffec2eb233f"), // TokenRoot address
      },
      type: "tip3_token", // tip3 - is a standart we use
    }))
  }

  ...

  return (
    <>
      <h1>My Venom Crowdsale</h1>
      <div className="item-info">
        <span>Distributed Token</span>
        <b>0:914...33f</b> 
        <a className="add" onClick={onTokenAdd}>
          <img src={AddTokenImg} alt="add_token" />
        </a>
      </div>
      ...
  )
```

Now when the user clicks an add button we have created, venom wallet asks the user to add our distributing token.

</details>

That's all. Build your app, host it and congratulations! You have your first dApp!

Remember, that it's just an example and not production code. We didn't keep in mind some balance loaders and state managers. You can check out the implementation of this example with some styles and features in the [repository](https://github.com/venom-blockchain/guides/tree/master/tokensale-frontend).
