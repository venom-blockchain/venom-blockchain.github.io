---
sidebar_position: 1
sidebar_label: Frontend for NFT collection
description: >-
  This section will show you how to work with TIP-4.3 standard and why you need to support it.
---

# Venom In Action. Frontend for NFT collection

This guide will help you to show your NFT collection to everyone. Let's create a web application for listing our collection. We will implement two tabs - the first one will show all collection NFTs and the second one will show all NFTs of the user, logged by Venom Wallet.

:::info
This guide will not include frontend development basements and React essentials. We focus our attention only on venom smart contracts integration.
:::

## Some words about salt in TIP-4.3

Before you start, you should remember the [TIP-4.3](../../../../standards/TIP/TIP-4/3.md) standard. As you may know, this standard requires us to deploy `Index` smart contracts by every NFT's owner changing. These contracts contain a different salt. One of the contracts salts with the owner's address and collection address, and the other one salts with the owner's address and zero address (0:0000..00). The main purpose of this action is to have constant contracts in the network, which point to the original NFT, and their code depends on the owner's address and collection address (or zero address). So we can easily calculate their hashcode and find them all with just a single query.

Salting with the owner's address and collection address allows us to find all `Index`es of the concrete NFTs of the collection, and, hence the concrete owner's NFTs itself of the concrete collection.

And what about `Index`, which was salted by zero address instead of the collection's address? This `Index`, as you might guess, points only to the owner. It can help us to find all NFTs of the owner across all collections in the network.

You may ask: "How to find all NFTs of the concrete collection?". Well, our `Collection` contract is implementing `nftCodeHash` method, which will return the code hash you need for searching. Another concern you may think about is "Why can't we just salt NFTs themselves?". It is true, we can. But the `Index` code is always the same (that's why you shouldn't compile it by yourself and should use TVC from a repository), while NFT's code may contain a special project's mechanisms. It allows all dApps and services to index any collections and NFTs regardless of projects (games, simple art collections etc).

## Starting with React and Venom Connect

For building a web interface, we will use [React](https://reactjs.org/) library. Of course, you can use any library you want. We are starting with the command, that allows us to scaffold React application

```shell
npx create-react-app my-tokensale-web --template typescript
```

The previous frontend guide has a [section](../../how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend.md#connecting-venom-wallet-to-your-app) where we reviewed the venom-connect library in detail. So let's create a venom-connect initialization function

```typescript title="src/venom-connect/connector.ts" showLineNumbers
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

Now we call the initialization function from our main app file and pass the VenomConnect instance to our Main page:

```typescript title="src/App.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import './styles/main.css';

import { VenomConnect } from 'venom-connect';
import { initVenomConnect } from './venom-connect/connector';
import Main from './pages/Main';

function App() {
  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);
  return <Main venomConnect={venomConnect} />;
}

export default App;
```

```typescript title="src/pages/Main.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function Main({ venomConnect }: Props) {
    return (
        <div className="App">
        </div>
    );
}

export default Main;
```

Let's create a button for connecting the venom wallet. When the user is connected, we should show the user's address, so let's create something like a web app menu header.

```typescript title="src/pages/Main.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function Main({ venomConnect }: Props) {
  const [venomProvider, setVenomProvider] = useState<any>();
  const [standaloneProvider, setStandAloneProvider] = useState<ProviderRpcClient | undefined>();
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
  // Method for getting a standalone provider from venomConnect instance
  const initStandalone = async () => {
    const standalone = await venomConnect?.getStandalone();
    setStandAloneProvider(standalone);
  };
  // Handling click of login button. We need to call connect method of out VenomConnect instance, this action will call other connect handlers
  const onLogin = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
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
      initStandalone();
      checkAuth(venomConnect);
    }
    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [venomConnect]);
return (
    <div className="box">
      <header>
        {address ? (
          <>
            {' '}
            <p>{address}</p>
            <a className="logout" onClick={onDisconnect}>
              Logout
            </a>
          </>
        ) : (
          <a className="btn" onClick={onLogin}>
            Connect wallet
          </a>
        )}
      </header>
    </div>
  );
}
export default Main;
```

Then let's add the tabs for our header. As we mentioned above, we will need two tabs:

```typescript title="src/pages/Main.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
...

enum Tab {
  COLLECTION_ITEMS,
  MY_ITEMS,
}

function Main({ venomConnect }: Props) {
  ...
  const [activeTab, setActiveTab] = useState<Tab>(Tab.COLLECTION_ITEMS);
  ...
  return (
    <div className="box">
      <header>
          <div className="menu">
            <a
              className={activeTab === Tab.COLLECTION_ITEMS ? 'menu_item active' : 'menu_item'}
              onClick={() => setActiveTab(Tab.COLLECTION_ITEMS)}
            >
              Collection items
            </a>
            <a
              className={activeTab === Tab.MY_ITEMS ? 'menu_item active' : 'menu_item'}
              onClick={() => setActiveTab(Tab.MY_ITEMS)}
            >
              My items
            </a>
          </div>
         ...
  );
}
export default Main;
```

There is the other component we will need for our tabs - the Gallery component. It hasn't any methods and is responsible just for layout:

```typescript title="src/components/Gallery.tsx" linenumber="true"
import React from 'react';
type Props = {
  // array of strings wit himage urls
  collectionsItems: string[] | undefined;
  isLoading: boolean;
  title?: string;
  listIsEmpty?: boolean;
};
function Gallery({ collectionsItems, title, listIsEmpty, isLoading }: Props) {
  return (
    <div className="lots">
      {title && <h1>{title}</h1>}
      {listIsEmpty && <h1>The list is empty</h1>}
      <div className="lots__list">
        {
          collectionsItems?.map((item, index) => (
            <div className="lots__item" key={`${index} ${item}`}>
              <img src={item} alt="img" />
            </div>
          ))
        }
      </div>
    </div>
  );
}
export default Gallery;
```

Now we can implement our tabs. Let's start with the tab for all NFTs of the collection

## Getting all collection's NFTs

To fetch all collection's NFTs we should produce these steps:

1. Get the NFT's code hash by calling the method `nftCodeHash` of the `Collection` contract
2. Call the `getAccountsByCodeHash` function of the standalone client. It will return NFT addresses
3. Call every NFT with the standalone client to fetch its `_json` (TIP-4.2) field
4. Take the preview field from parsed JSON

Firstly, let's create some utility functions for handy work with NFTs:

```typescript title="src/utils/nft.tsx" showLineNumbers
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
// Of course you need to place a contract ABI somewhere
import nftAbi from '../abi/NFT.abi.json';

// TIP-4.2. standard (https://docs.venom.foundation/standards/TIP/TIP-4/2)
interface BaseNftJson {
  name?: string;
  description?: string;
  preview?: {
    source: string;
    mimetype: string;
  };
  files?: Array<{
    source: string;
    mimetype: string;
  }>;
  external_url?: string;
}

// Extract an preview field of NFT's json
export const getNftImage = async (provider: ProviderRpcClient, nftAddress: Address): Promise<string> => {
  const nftContract = new provider.Contract(nftAbi, nftAddress);
  // calling getJson function of NFT contract
  const getJsonAnswer = (await nftContract.methods.getJson({ answerId: 0 } as never).call()) as { json: string };
  const json = JSON.parse(getJsonAnswer.json ?? '{}') as BaseNftJson;
  return json.preview?.source || '';
};

// Returns array with NFT's images urls
export const getCollectionItems = async (provider: ProviderRpcClient, nftAddresses: Address[]): Promise<string[]> => {
  return Promise.all(
    nftAddresses.map(async (nftAddress) => {
      const imgInfo = (await getNftImage(provider, nftAddress)) as string;
      return imgInfo;
    })
  );
};
```

Now we can implement a component, that will show all collection's NFTs. It is not really hard:

```typescript title="src/components/CollectionItems.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import Gallery from './Gallery';
// Store it somwhere....for example in separate files for constants
import { COLLECTION_ADDRESS } from '../utils/constants';
// Do not forget about contract ABI. You need it if you need to call any smart contract
import collectionAbi from '../abi/Collection.abi.json';
// Our implemented util
import { getCollectionItems } from '../utils/nft';
type Props = {
  standaloneProvider: ProviderRpcClient | undefined;
};
function CollectionItems({ standaloneProvider }: Props) {
  // Just a strings array. Each string is an URL of NFT image.
  const [collectionItems, setCollectionItem] = useState<string[] | []>([]);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  // This method returns an NFT code hash by calling Collection contract. We need code hash for searching all NFTs
  // Returned code hash is a code hash ONLY for NFT of concrete collection
  const getNftCodeHash = async (provider: ProviderRpcClient): Promise<string> => {
    const collectionAddress = new Address(COLLECTION_ADDRESS);
    const contract = new provider.Contract(collectionAbi, collectionAddress);
    const { codeHash } = await contract.methods.nftCodeHash({ answerId: 0 } as never).call({ responsible: true });
    return BigInt(codeHash).toString(16);
  };
  // Method, that return NFT's addresses by single query with fetched code hash
  const getNftAddresses = async (codeHash: string): Promise<Address[] | undefined> => {
    const addresses = await standaloneProvider?.getAccountsByCodeHash({ codeHash });
    return addresses?.accounts;
  };
  // Main method of this component. 
  const loadNFTs = async (provider: ProviderRpcClient) => {
    setListIsEmpty(false);
    try {
      const nftCodeHash = await getNftCodeHash(provider);
      if (!nftCodeHash) {
        return;
      }
      const nftAddresses = await getNftAddresses(nftCodeHash);
      if (!nftAddresses || !nftAddresses.length) {
        if (nftAddresses && !nftAddresses.length) setListIsEmpty(true);
        return;
      }
      const nftURLs = await getCollectionItems(provider, nftAddresses);
      setCollectionItem(nftURLs);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (standaloneProvider) loadNFTs(standaloneProvider);
  }, [standaloneProvider]);
  return (
    <div>
      {collectionItems && (
        <Gallery collectionsItems={collectionItems} listIsEmpty={listIsEmpty} />
      )}
    </div>
  );
}
export default CollectionItems;
```

Step-by-step as we described before. Now we can implement another tab.

## Getting all owner's NFTs of concrete collection

Let's describe the steps for this task's solution:

1. Take an `Index` code and salt them with described struct (owner, collection)
2. Call the `getBocHash` function of the standalone provider. Pass there a code from the previous step
3. Call the `getAccountsByCodeHash` function of the standalone client. It will return Index addresses
4. Call the `getInfo` function of each fetched from the previous step `Index` contract. You will get an array with NFT addresses
5. Call every NFT with the standalone client to fetch its `_json` (TIP-4.2) field
6. Take the preview field from parsed JSON

First of all, let's add another utility function, that will help us to extract NFT's images from its Index addresses:

```typescript title="src/utils/nft.ts" linenumber="true"
...
import indexAbi from '../abi/Index.abi.json';
...
export const getNftsByIndexes = async (provider: ProviderRpcClient, indexAddresses: Address[]): Promise<string[]> => {
  const nftAddresses = await Promise.all(
    indexAddresses.map(async (indexAddress) => {
      const indexContract = new provider.Contract(indexAbi, indexAddress);
      const indexInfo = (await indexContract.methods.getInfo({ answerId: 0 } as never).call()) as IndexInfo;
      return indexInfo.nft;
    })
  );
  return getCollectionItems(provider, nftAddresses)
}
```

That's it. It will help us with our component. Let's implement him:

```typescript title="src/components/MyItems.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import Gallery from './Gallery';
// Store it somwhere....for example in separate files for constants
import { COLLECTION_ADDRESS } from '../utils/constants';
// Our implemented util
import { getNftsByIndexes } from '../utils/nft';
type Props = {
  address?: string;
  standaloneProvider: ProviderRpcClient | undefined;
  myCollectionItems: string[] | undefined;
  setMyCollectionItems: (value: string[] | undefined) => void;
};
function MyItems({ address, standaloneProvider, myCollectionItems, setMyCollectionItems }: Props) {
  const [listIsEmpty, setListIsEmpty] = useState(false);
  // Method to returning a salted index code (base64)
  const saltCode = async (provider: ProviderRpcClient, ownerAddress: string) => {
    // Index StateInit you should take from github. It ALWAYS constant!
    const INDEX_BASE_64 = 'te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==';
    // Gettind a code from Index StateInit
    const tvc = await provider.splitTvc(INDEX_BASE_64);
    if (!tvc.code) throw new Error('tvc code is empty');
    // Salt structure that we already know
    const saltStruct = [
      { name: 'collection', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'type', type: 'fixedbytes3' }, // according on standards, each index salted with string 'nft'
    ] as const;
    const { code: saltedCode } = await provider.setCodeSalt({
      code: tvc.code,
      salt: {
        structure: saltStruct,
        abiVersion: '2.1',
        data: {
          collection: new Address(COLLECTION_ADDRESS),
          owner: new Address(ownerAddress),
          type: btoa('nft'),
        },
      },
    });
    return saltedCode;
  };
  // Method, that return Index'es addresses by single query with fetched code hash
  const getAddressesFromIndex = async (codeHash: string): Promise<Address[] | undefined> => {
    const addresses = await standaloneProvider?.getAccountsByCodeHash({ codeHash });
    return addresses?.accounts;
  };

  // Main method of this component
  const loadNFTs = async (provider: ProviderRpcClient, ownerAddress: string) => {
    setListIsEmpty(false);
    try {
      // Take a salted code
      const saltedCode = await saltCode(provider, ownerAddress);
      // Hash it
      const codeHash = await provider.getBocHash(saltedCode);
      if (!codeHash) {
        return;
      }
      // Fetch all Indexes by hash
      const indexesAddresses = await getAddressesFromIndex(codeHash);
      if (!indexesAddresses || !indexesAddresses.length) {
        if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);
        return;
      }
      // Fetch all image URLs
      const nftURLs = await getNftsByIndexes(provider, indexesAddresses);
      setMyCollectionItems(nftURLs);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (address && standaloneProvider) loadNFTs(standaloneProvider, address);
    if (!address) setListIsEmpty(false);
  }, [address]);
  return (
    <Gallery
      isLoading={isLoading}
      collectionsItems={myCollectionItems}
      title={address ? undefined : 'Please connect your wallet'}
      listIsEmpty={listIsEmpty}
    />
  );
}
export default MyItems;
```

<details>
<summary>
But what about searching all user NFTs across all collections?
</summary>
All you need is just to change a salt process:

```typescript title="src/components/MyItems.tsx" showLineNumbers
const saltCode = async (provider: ProviderRpcClient, ownerAddress: string) => {
    // Index StateInit you should take from github. It ALWAYS constant!
    const INDEX_BASE_64 = 'te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==';
    // Gettind a code from Index StateInit
    const tvc = await provider.splitTvc(INDEX_BASE_64);
    if (!tvc.code) throw new Error('tvc code is empty');
    const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000'
    // Salt structure that we already know
    const saltStruct = [
      { name: 'zero_address', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'type', type: 'fixedbytes3' }, // according on standards, each index salted with string 'nft'
    ] as const;
    const { code: saltedCode } = await provider.setCodeSalt({
      code: tvc.code,
      salt: {
        structure: saltStruct,
        abiVersion: '2.1',
        data: {
          zero_address: new Address(ZERO_ADDRESS), // just pass it here for code hash you need
          owner: new Address(ownerAddress),
          type: btoa('nft'),
        },
      },
    });
    return saltedCode;
  };
```

</details>

As you can see, both components are similar. Maybe you need to combine them...think about it :)

The last thing we should do - to place our components on our main page

```typescript title="src/pages/Main.tsx" linenumber="true"
import React, { useEffect, useState } from 'react';

...
// Our main components
import CollectionItems from '../components/CollectionItems';
import MyItems from '../components/MyItems';
...
function Main({ venomConnect }: Props) {
  ...
  return (
    <div className="box">
      <header>
        <div className="menu">
          <a
            className={activeTab === Tab.COLLECTION_ITEMS ? 'menu_item active' : 'menu_item'}
            onClick={() => setActiveTab(Tab.COLLECTION_ITEMS)}
          >
            Collection items
          </a>
          <a
            className={activeTab === Tab.MY_ITEMS ? 'menu_item active' : 'menu_item'}
            onClick={() => setActiveTab(Tab.MY_ITEMS)}
          >
            My items
          </a>
        </div>
        {address ? (
          <>
            {' '}
            <p>{address}</p>
            <a className="logout" onClick={onDisconnect}>
              <img src={LogOutImg} alt="Log out" />
            </a>
          </>
        ) : (
          <a className="btn" onClick={onLogin}>
            Connect wallet
          </a>
        )}
      </header>
      <img className="decor" alt="fon" src={fonImg} />
      {activeTab === Tab.COLLECTION_ITEMS ? (
        <CollectionItems standaloneProvider={standaloneProvider} />
      ) : (
        <MyItems
          address={address}
          standaloneProvider={standaloneProvider}
          myCollectionItems={myCollectionItems}
          setMyCollectionItems={setMyCollectionItems}
        />
      )}
    </div>
  );
}
export default Main;
```

That's all. Build your app, host it and congratulations! You have your new dApp and know how to work with salts...also you meet on-chain indexers!

Remember, that it's just an example and not production code. We didn't keep in mind some loaders and state managers. You can check out the implementation of this example with some styles and features in the [repository](https://github.com/venom-blockchain/guides/tree/master/nft-frontend).
