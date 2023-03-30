---
sidebar_position: 2
sidebar_label: Frontend for NFT auction
description: >-
  This section will demonstare 
---

# Venom In Action. Frontend for NFT auction

During this series, we wrote auction smart contracts. So with this guide, we will build a simple dapp for our NFT auction. Previous guides already showed us how to interact with smart contracts, but here we will check one of the most popular mechanics - sending fungible tokens (TIP-3).

:::info
This guide will not include frontend development basements and React essentials. We focus our attention only on venom smart contracts integration.
:::

## Starting with React and Venom Connect

For building a web interface, we will use [React](https://reactjs.org/) library. Of course, you can use any library you want. We are starting with the command, that allows us to scaffold React application

```shell
npx create-react-app nft-auction-web --template typescript
```

One of the previous frontend guides has a [section](../../how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend.md#connecting-venom-wallet-to-your-app) where we reviewed the venom-connect library in detail. So let's create a venom-connect initialization function

```typescript title="src/venom-connect/configure.ts" showLineNumbers
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
import { ProviderRpcClient } from 'everscale-inpage-provider';

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

## Working with TIP-3 TokenWallet

Let's add some methods for working with TIP-3 TokenWallet. We have worked on this case already in [tokensale](../../how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend.md#reading-the-users-token-balance-from-deployed-smart-contract) guide. We need to get connected user's TokenWallet address and check its balance.

```typescript title="src/pages/Main.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
...
// Do not forget about ABI. We need it to call our smart contracts!
import tokenRootAbi from '../abi/TokenRoot.abi.json';
import tokenWalletAbi from '../abi/TokenWallet.abi.json';
// Store it somwhere....for example in separate files for constants
import { TOKEN_ROOT_ADDRESS } from '../utils/constants';

function Main({ venomConnect }: Props) {
  ...
  // User's token (TIP-3) balance
  const [balance, setBalance] = useState<string | undefined>();
  // User's TokenWallet (TIP-3) address
  const [tokenWalletAddress, setTokenWalletAddress] = useState<string | undefined>();
  ...
  // This method calls balance function of deployed TokenWallet smart contract (can be called with standalone client as provider)
  const getTokenWalletAddress = async (
    provider: ProviderRpcClient,
    userWalletAddress: string
  ): Promise<string | undefined> => {
    const contract = new provider.Contract(tokenRootAbi, new Address(TOKEN_ROOT_ADDRESS));
    const tokenWallet = (await contract.methods
      .walletOf({
        answerId: 0,
        walletOwner: userWalletAddress,
      } as never)
      .call()) as any;
    if (!tokenWallet) return undefined;
    return tokenWallet.value0._address;
  };
  // updating of user's TIP-3 balance
  const updateBalance = async () => {
    if (!tokenWalletAddress || !standaloneProvider) return;
    try {
      const contract = new standaloneProvider.Contract(tokenWalletAbi, new Address(tokenWalletAddress));
      // We check a contract state here to acknowledge if TokenWallet already deployed
      // As you remember, wallet can be deployed with first transfer on it.
      // If our wallet isn't deployed, so it's balance is 0 :)
      const contractState = await venomProvider.rawApi.getFullContractState({ address: tokenWalletAddress });
      if (contractState.state) {
        // But if this deployed, just call a balance function
        const result = (await contract.methods.balance({ answerId: 0 } as never).call()) as any;
        const tokenBalance = result.value0;
        // formatBalance is just a beauty helper to divide our balance by 10 ** 9 (decimals...our TIP-3 decimals is 9)
        setBalance(formatBalance(tokenBalance));
      } else {
        setBalance('0');
      }
    } catch (e) {
      console.error(e);
    }
  };
  // updating of user's TokenWallet (TIP-3) address (placed in hook)
  const updateTokenWalletAddress = async (provider: ProviderRpcClient, userWalletAddress: string) => {
    if (tokenWalletAddress) return;
    const walletAddress = await getTokenWalletAddress(provider, userWalletAddress);
    setTokenWalletAddress(walletAddress);
  };
  ...
  // two hooks to init connected user's TokenWallet address and balance.
  useEffect(() => {
    if (address && standaloneProvider) {
      updateTokenWalletAddress(standaloneProvider, address);
    }
  }, [address]);
  useEffect(() => {
    if (tokenWalletAddress) updateBalance();
  }, [tokenWalletAddress]);
  ...
```

This is enough for our task. Let's implement a component, that will show us the auction info.

## Displaying Auction information

Let's implement a component, filled with all the auction data we need. Here is nothing special to show. We need just to read a smart contract state, so let's implement a full listing immediately:

```typescript title="src/components/NftAuction.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { BaseNftJson, formatBalance, formatDate } from '../utils/helpers';

// Do not forget about ABI. We need it to call our smart contracts!
import auctionAbi from '../abi/Auction.abi.json';
import nftAbi from '../abi/NFT.abi.json';
// Store it somwhere....for example in separate files for constants
import { AUCTION_ADDRESS } from '../utils/constants';

type Props = {
  address: string | undefined;
  balance: string | undefined;
  standaloneProvider: ProviderRpcClient | undefined;
  venomProvider: ProviderRpcClient | undefined;
  tokenWalletAddress: string | undefined;
  checkBalance: () => void;
};
type NftAnswer = {
  _nft: Address;
};
// uncommented get methods of this component are obvious
function NftAuction({ address, balance, standaloneProvider, venomProvider, tokenWalletAddress, checkBalance }: Props) {
  const auctionContract = standaloneProvider
    ? new standaloneProvider.Contract(auctionAbi, new Address(AUCTION_ADDRESS))
    : undefined;
  // Some state variables from Auction smart contract. You can just check ABI.
  const [nftUrl, setNftUrl] = useState<string | undefined>();
  const [currenBid, setCurrentBid] = useState<string | undefined>();
  const [currentWinner, setCurrentWinner] = useState<string | undefined>();
  const [endTime, setEndTime] = useState<string | undefined>();
  const [needUpdate, setNeedUpdate] = useState(false);
  const getNftAddress = async (): Promise<Address | undefined> => {
    if (!auctionContract) return undefined;
    const answer = (await auctionContract.methods._nft({} as never).call()) as NftAnswer;
    if (!answer) return undefined;
    return answer._nft;
  };
  // we need to read the NFT contract here to get NFT itself (NFT data json)
  const getNftUrl = async (provider: ProviderRpcClient, nftAddress: Address): Promise<string> => {
    const nftContract = new provider.Contract(nftAbi, nftAddress);
    const result = (await nftContract.methods.getJson({ answerId: 0 } as never).call()) as { json: string };
    const json = JSON.parse(result.json ?? '{}') as BaseNftJson;
    return json.preview?.source || '';
  };
  // loadNFT - get NFT address from Auction contract and get data from NFT contract
  const loadNft = async (provider: ProviderRpcClient) => {
    const nftAddress = await getNftAddress();
    if (!nftAddress) return;
    const _nftUrl = await getNftUrl(provider, nftAddress);
    if (!_nftUrl) return;
    setNftUrl(_nftUrl);
  };
  const getCurrentBid = async (): Promise<string | undefined> => {
    if (!auctionContract) return undefined;
    const { _currentBid } = await auctionContract.methods._currentBid({} as never).call();
    return formatBalance(_currentBid) || '0';
  };
  const getCurrentWinner = async (): Promise<string | undefined> => {
    if (!auctionContract) return undefined;
    const result = (await auctionContract.methods._currentWinner({} as never).call()) as any;
    return result._currentWinner._address;
  };
  const getEndTime = async (): Promise<string | undefined> => {
    if (!auctionContract) return undefined;
    const { _endTime } = await auctionContract.methods._endTime({} as never).call();
    return formatDate(_endTime);
  };
  // Bring it all together :) We need it for hook
  const loadAuctionInfo = async (provider: ProviderRpcClient) => {
    try {
      await loadNft(provider);
      const _currentBid = await getCurrentBid();
      setCurrentBid(_currentBid);
      const _currentWinner = await getCurrentWinner();
      setCurrentWinner(_currentWinner);
      const _endTime = await getEndTime();
      setEndTime(_endTime);
    } catch (e) {
      console.error(e);
    }
  };
  const updateData = async () => {
    await checkBalance();
    const _currentBid = await getCurrentBid();
    setCurrentBid(_currentBid);
    const _currentWinner = await getCurrentWinner();
    setCurrentWinner(_currentWinner);
    setNeedUpdate(false);
  };
  // Main hooks for loading and updating our info
  useEffect(() => {
    if (standaloneProvider) loadAuctionInfo(standaloneProvider);
  }, [standaloneProvider]);
  useEffect(() => {
    if (needUpdate && standaloneProvider) updateData();
  }, [needUpdate]);
  return (
    <div className="card">
      <div className="card__wrap">
        <h1>My Venom NFT Auction</h1>
        <div className="item-info">
          <span>Ends:</span>
          {endTime && <b>{endTime} UTC</b>}
        </div>
        {nftUrl && <img src={nftUrl} alt="nft" />}
        <div className="info-group">
          <div className="item-info">
            <span>Last Bid</span>
            {currenBid && <b>{currenBid} TST</b>}
          </div>
          <div className="item-info item-info_copy">
            {currentWinner && <p id="copyText">{currentWinner}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default NftAuction;
```

Hope that we consolidated the reading from a smart contract with this component :)

The last thing we need to implement - is the possibility to participate in the auction

## Auction Participation

As we remember from our [smart contracts](simple-nft-auction.md) logic, we need just to send TIP-3 tokens to the `Auction` contract. So we need to implement a component for this logic...just a form. How to send TIP-3 tokens somewhere? Just call a `transfer` method of the user's `TokenWalet` contract. 

```typescript title="src/components/AuctionSendForm.tsx" showLineNumbers
import React, { useState } from 'react';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
// this helper is doing just multiplying by 10 ** 9 (decimals)
import { getValueForSend } from '../utils/helpers';

// Do not forget about ABI. We need it to call our smart contracts!
import tokenWalletAbi from '../abi/TokenWallet.abi.json';
// Store it somwhere....for example in separate files for constants
import { AUCTION_ADDRESS } from '../utils/constants';

type Props = {
  address: string;
  balance: string | undefined;
  venomProvider: ProviderRpcClient | undefined;
  tokenWalletAddress: string;
  setNeedUpdate: (value: boolean) => void;
};
function AuctionSendForm({ address, balance, venomProvider, tokenWalletAddress, setNeedUpdate }: Props) {
  // amount of tokens to bet with helpers to increase/decrease it and change
  // we need it just for our layout (input firld with increase/decrease buttons)
  const [tokenAmount, setTokenAmount] = useState<number | undefined>(0);
  const increaseAmount = () => {
    if (!tokenAmount && Number(balance) >= 1) {
      setTokenAmount(1);
    } else if (tokenAmount && tokenAmount + 1 <= Number(balance)) setTokenAmount(tokenAmount + 1);
  };
  const decreaseAmount = () => {
    if (!tokenAmount || tokenAmount <= 0) return;
    setTokenAmount(tokenAmount - 1);
  };
  const onChangeAmount = (e: string) => {
    if (e === '') setTokenAmount(undefined);
    if (Number(e) <= Number(balance)) setTokenAmount(Number(e));
  };
  // main function of all dAPP! :)
  const bet = async () => {
    try {
      if (!venomProvider || !tokenAmount) return;
      // TokenWallet address was passed here from somewhere (from NftAuction component)
      const tokenWalletContract = new venomProvider.Contract(tokenWalletAbi, new Address(tokenWalletAddress));
      // Just a common call of smart contract, nothing special and pretty easy
      // The only one difference - usage of .send() function
      // When we use send(), firstly we call our venom wallet (logged user's wallet) and then venom wallet will call our target contract internally (by sendTransaction method)
      // So you need to call send() when you own callee internally (by wallet address)
      const result = await tokenWalletContract.methods
        .transfer({
          amount: getValueForSend(tokenAmount),
          recipient: new Address(AUCTION_ADDRESS),
          deployWalletValue: 0,
          remainingGasTo: new Address(address),
          notify: true,
          payload: '',
        } as never)
        .send({ from: new Address(address), amount: getValueForSend(1), bounce: true });
      if (result?.id?.lt && result?.endStatus === 'active') {
        // when our tx is success we need to refresh parent component with new data
        setNeedUpdate(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="item-info item-info_mt">
        <span>My Token Balance</span>
        <b>{balance}</b>
      </div>
      <div className="card__amount">
        <div className="number">
          <span>Amount</span>
          <button className="number__minus" type="button" onClick={decreaseAmount} />
          <input
            type="number"
            min={0}
            value={tokenAmount !== undefined ? tokenAmount : ''}
            onChange={(e) => {
              onChangeAmount(e.target.value);
            }}
          />
          <button className="number__plus" type="button" onClick={increaseAmount} />
        </div>
        <a className={!tokenAmount ? 'btn disabled' : 'btn'} onClick={bet}>
          Bid
        </a>
      </div>
    </>
  );
}

export default AuctionSendForm;
```

Then we need to place this form component to our previous NftAuction component and pass variables, that were passed from the Main page.

```typescript title="src/components/NftAuction.tsx" showLineNumbers
import React, { useEffect, useState } from 'react';
...
import AuctionSendForm from './AuctionSendForm';
...
function NftAuction({ address, balance, standaloneProvider, venomProvider, tokenWalletAddress, checkBalance }: Props) {
  ...
  return (
    <div className="card">
      <div className="card__wrap">
        <h1>My Venom NFT Auction</h1>
        <div className="item-info">
          <span>Ends:</span>
          {endTime && <b>{endTime} UTC</b>}
        </div>
        {nftUrl && <img src={nftUrl} alt="nft" />}
        <div className="info-group">
          <div className="item-info">
            <span>Last Bid</span>
            {currenBid && <b>{currenBid} TST</b>}
          </div>
          <div className="item-info item-info_copy">
            {currentWinner && <p id="copyText">{currentWinner}</p>}
          </div>
        </div>
        {address && tokenWalletAddress && (
          <AuctionSendForm
            address={address}
            balance={balance}
            venomProvider={venomProvider}
            tokenWalletAddress={tokenWalletAddress}
            setNeedUpdate={setNeedUpdate}
          />
        )}
      </div>
    </div>
  );
}
export default NftAuction;
```

That's all. Build your app, host it and congratulations! Now you try to perform one of the most popular actions - sending non-fungible tokens from dapp.

Remember, that it's just an example and not production code. We didn't keep in mind some loaders and state managers. Also, we didn't implement some traction of other users' behavior (updating of page, when someone has placed a bid). You can check out the implementation of this example with some styles and features in the [repository](https://github.com/venom-blockchain/guides/tree/master/nft-auction-frontend).