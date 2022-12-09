"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[5405],{4137:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>u});var o=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,o,s=function(e,n){if(null==e)return{};var t,o,s={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=o.createContext({}),c=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=c(e.components);return o.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},p=o.forwardRef((function(e,n){var t=e.components,s=e.mdxType,r=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(t),u=s,A=p["".concat(l,".").concat(u)]||p[u]||m[u]||r;return t?o.createElement(A,a(a({ref:n},d),{},{components:t})):o.createElement(A,a({ref:n},d))}));function u(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var r=t.length,a=new Array(r);a[0]=p;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:s,a[1]=i;for(var c=2;c<r;c++)a[c]=t[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}p.displayName="MDXCreateElement"},294:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var o=t(7462),s=(t(7294),t(4137));const r={sidebar_position:1,sidebar_label:"Frontend for NFT collection",description:"This section will show you how to work with TIP-4.3 standard and why you need to support it."},a="Venom In Action. Frontend for NFT collection",i={unversionedId:"build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-collection",id:"build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-collection",title:"Venom In Action. Frontend for NFT collection",description:"This section will show you how to work with TIP-4.3 standard and why you need to support it.",source:"@site/docs/build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-collection.md",sourceDirName:"build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action",slug:"/build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-collection",permalink:"/build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-collection",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Frontend for NFT collection",description:"This section will show you how to work with TIP-4.3 standard and why you need to support it."},sidebar:"buildSidebar",previous:{title:"Simple NFT auction",permalink:"/build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/simple-nft-auction"},next:{title:"How to connect Dapp UI to Venom",permalink:"/build/integration-guides/how-to-connect-dapp-ui-to-venom"}},l={},c=[{value:"Some words about salt in TIP-4.3",id:"some-words-about-salt-in-tip-43",level:2},{value:"Starting with React and Venom Connect",id:"starting-with-react-and-venom-connect",level:2},{value:"Getting all collection&#39;s NFTs",id:"getting-all-collections-nfts",level:2},{value:"Getting all owner&#39;s NFTs of concrete collection",id:"getting-all-owners-nfts-of-concrete-collection",level:2}],d={toc:c};function m(e){let{components:n,...t}=e;return(0,s.kt)("wrapper",(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"venom-in-action-frontend-for-nft-collection"},"Venom In Action. Frontend for NFT collection"),(0,s.kt)("p",null,"This guide will help you to show your NFT collection to everyone. Let's create a web application for listing our collection. We will implement two tabs - the first one will show all collection NFTs and the second one will show all NFTs of the user, logged by Venom Wallet."),(0,s.kt)("admonition",{type:"info"},(0,s.kt)("p",{parentName:"admonition"},"This guide will not include frontend development basements and React essentials. We focus our attention only on venom smart contracts integration.")),(0,s.kt)("h2",{id:"some-words-about-salt-in-tip-43"},"Some words about salt in TIP-4.3"),(0,s.kt)("p",null,"Before you start, you should remember the ",(0,s.kt)("a",{parentName:"p",href:"/standards/TIP-4/3"},"TIP-4.3")," standard. As you may know, this standard requires us to deploy ",(0,s.kt)("inlineCode",{parentName:"p"},"Index")," smart contracts by every NFT's owner changing. These contracts contain a different salt. One of the contracts salts with the owner's address and collection address, and the other one salts with the owner's address and zero address (0:0000..00). The main purpose of this action is to have constant contracts in the network, which point to the original NFT, and their code depends on the owner's address and collection address (or zero address). So we can easily calculate their hashcode and find them all with just a single query."),(0,s.kt)("p",null,"Salting with the owner's address and collection address allows us to find all ",(0,s.kt)("inlineCode",{parentName:"p"},"Index"),"es of the concrete NFTs of the collection, and, hence the concrete owner's NFTs itself of the concrete collection."),(0,s.kt)("p",null,"And what about ",(0,s.kt)("inlineCode",{parentName:"p"},"Index"),", which was salted by zero address instead of the collection's address? This ",(0,s.kt)("inlineCode",{parentName:"p"},"Index"),", as you might guess, points only to the owner. It can help us to find all NFTs of the owner across all collections in the network."),(0,s.kt)("p",null,'You may ask: "How to find all NFTs of the concrete collection?". Well, our ',(0,s.kt)("inlineCode",{parentName:"p"},"Collection")," contract is implementing ",(0,s.kt)("inlineCode",{parentName:"p"},"nftCodeHash"),' method, which will return the code hash you need for searching. Another concern you may think about is "Why can\'t we just salt NFTs themselves?". It is true, we can. But the ',(0,s.kt)("inlineCode",{parentName:"p"},"Index")," code is always the same (that's why you shouldn't compile it by yourself and should use TVC from a repository), while NFT's code may contain a special project's mechanisms. It allows all dApps and services to index any collections and NFTs regardless of projects (games, simple art collections etc)."),(0,s.kt)("h2",{id:"starting-with-react-and-venom-connect"},"Starting with React and Venom Connect"),(0,s.kt)("p",null,"For building a web interface, we will use ",(0,s.kt)("a",{parentName:"p",href:"https://reactjs.org/"},"React")," library. Of course, you can use any library you want. We are starting with the command, that allows us to scaffold React application"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"npx create-react-app my-tokensale-web --template typescript\n")),(0,s.kt)("p",null,"The previous frontend guide has a ",(0,s.kt)("a",{parentName:"p",href:"/build/development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend#connecting-venom-wallet-to-your-app"},"section")," where we reviewed the venom-connect library in detail. So let's create a venom-connect initialization function"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/venom-connect/configure.ts" lineNumbers="true"',title:'"src/venom-connect/configure.ts"',lineNumbers:'"true"'},"import { VenomConnect } from 'venom-connect';\nimport { ProviderRpcClient } from 'everscale-inpage-provider';\nimport { EverscaleStandaloneClient } from 'everscale-standalone-client';\n\nexport const initVenomConnect = async () => {\n  return new VenomConnect({\n    theme: 'dark',\n    checkNetworkId: 1010,\n    providersOptions: {\n      venomwallet: {\n        walletWaysToConnect: [\n          {\n            package: ProviderRpcClient,\n\n            packageOptions: {\n              fallback: VenomConnect.getPromise('venomwallet', 'extension') || (() => Promise.reject()),\n              forceUseFallback: true,\n            },\n            packageOptionsStandalone: {\n              fallback: () =>\n                EverscaleStandaloneClient.create({\n                  connection: {\n                    id: 1010,\n                    group: 'venom_testnet',\n                    type: 'jrpc',\n                    data: {\n                      endpoint: 'https://jrpc-testnet.venom.foundation/rpc',\n                    },\n                  },\n                }),\n              forceUseFallback: true,\n            },\n\n            id: 'extension',\n            type: 'extension',\n          },\n        ],\n        defaultWalletWaysToConnect: [\n          'mobile',\n          'ios',\n          'android',\n        ],\n      },\n    },\n  });\n};\n")),(0,s.kt)("p",null,"Now we call the initialization function from our main app file and pass the VenomConnect instance to our Main page:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/App.tsx" lineNumbers="true"',title:'"src/App.tsx"',lineNumbers:'"true"'},"import React, { useEffect, useState } from 'react';\nimport './styles/main.css';\n\nimport { VenomConnect } from 'venom-connect';\nimport { initVenomConnect } from './venom-connect/connector';\nimport Main from './pages/Main';\n\nfunction App() {\n  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();\n  const init = async () => {\n    const _venomConnect = await initVenomConnect();\n    setVenomConnect(_venomConnect);\n  };\n  useEffect(() => {\n    init();\n  }, []);\n  return <Main venomConnect={venomConnect} />;\n}\n\nexport default App;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/pages/Main.tsx" lineNumbers="true"',title:'"src/pages/Main.tsx"',lineNumbers:'"true"'},"import React, { useEffect, useState } from 'react';\nimport { VenomConnect } from 'venom-connect';\n\ntype Props = {\n  venomConnect: VenomConnect | undefined;\n};\n\nfunction Main({ venomConnect }: Props) {\n    return (\n        <div className=\"App\">\n        </div>\n    );\n}\n\nexport default Main;\n")),(0,s.kt)("p",null,"Let's create a button for connecting the venom wallet. When the user is connected, we should show the user's address, so let's create something like a web app menu header."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/pages/Main.tsx" lineNumbers="true"',title:'"src/pages/Main.tsx"',lineNumbers:'"true"'},"import React, { useEffect, useState } from 'react';\nimport { VenomConnect } from 'venom-connect';\n\nimport ConnectWallet from './components/ConnectWallet'\n\ntype Props = {\n  venomConnect: VenomConnect | undefined;\n};\n\nfunction Main({ venomConnect }: Props) {\n  const [venomProvider, setVenomProvider] = useState<any>();\n  const [standaloneProvider, setStandAloneProvider] = useState<ProviderRpcClient | undefined>();\n  const [address, setAddress] = useState();\n  // This method allows us to gen a wallet address from inpage provider\n  const getAddress = async (provider: any) => {\n    const providerState = await provider?.getProviderState?.();\n    return providerState?.permissions.accountInteraction?.address.toString();\n  };\n  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated\n  const checkAuth = async (_venomConnect: any) => {\n    const auth = await _venomConnect?.checkAuth();\n    if (auth) await getAddress(_venomConnect);\n  };\n  // Method for getting a standalone provider from venomConnect instance\n  const initStandalone = async () => {\n    const standalone = await venomConnect?.getStandalone();\n    setStandAloneProvider(standalone);\n  };\n  // Handling click of login button. We need to call connect method of out VenomConnect instance, this action will call other connect handlers\n  const onLogin = async () => {\n    if (!venomConnect) return;\n    await venomConnect.connect();\n  };\n  // This handler will be called after venomConnect.login() action\n  // connect method returns provider to interact with wallet, so we just store it in state\n  const onConnect = async (provider: any) => {\n    setVenomProvider(provider);\n    await onProviderReady(provider);\n  };\n  // This handler will be called after venomConnect.disconnect() action\n  // By click logout. We need to reset address and balance.\n  const onDisconnect = async () => {\n    venomProvider?.disconnect();\n    setAddress(undefined);\n  };\n  // When our provider is ready, we need to get address and balance from.\n  const onProviderReady = async (provider: any) => {\n    const venomWalletAddress = provider ? await getAddress(provider) : undefined;\n    setAddress(venomWalletAddress);\n  };\n  useEffect(() => {\n    // connect event handler\n    const off = venomConnect?.on('connect', onConnect);\n    if (venomConnect) {\n      initStandalone();\n      checkAuth(venomConnect);\n    }\n    // just an empty callback, cuz we don't need it\n    return () => {\n      off?.();\n    };\n  }, [venomConnect]);\nreturn (\n    <div className=\"box\">\n      <header>\n        {address ? (\n          <>\n            {' '}\n            <p>{address}</p>\n            <a className=\"logout\" onClick={onDisconnect}>\n              Logout\n            </a>\n          </>\n        ) : (\n          <a className=\"btn\" onClick={onLogin}>\n            Connect wallet\n          </a>\n        )}\n      </header>\n    </div>\n  );\n}\nexport default Main;\n")),(0,s.kt)("p",null,"Then let's add the tabs for our header. As we mentioned above, we will need two tabs:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/pages/Main.tsx" lineNumbers="true"',title:'"src/pages/Main.tsx"',lineNumbers:'"true"'},"import React, { useEffect, useState } from 'react';\n...\n\nenum Tab {\n  COLLECTION_ITEMS,\n  MY_ITEMS,\n}\n\nfunction Main({ venomConnect }: Props) {\n  ...\n  const [activeTab, setActiveTab] = useState<Tab>(Tab.COLLECTION_ITEMS);\n  ...\n  return (\n    <div className=\"box\">\n      <header>\n          <div className=\"menu\">\n            <a\n              className={activeTab === Tab.COLLECTION_ITEMS ? 'menu_item active' : 'menu_item'}\n              onClick={() => setActiveTab(Tab.COLLECTION_ITEMS)}\n            >\n              Collection items\n            </a>\n            <a\n              className={activeTab === Tab.MY_ITEMS ? 'menu_item active' : 'menu_item'}\n              onClick={() => setActiveTab(Tab.MY_ITEMS)}\n            >\n              My items\n            </a>\n          </div>\n         ...\n  );\n}\nexport default Main;\n")),(0,s.kt)("p",null,"There is the other component we will need for our tabs - the Gallery component. It hasn't any methods and is responsible just for layout:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/components/Gallery.tsx" linenumber="true"',title:'"src/components/Gallery.tsx"',linenumber:'"true"'},'import React from \'react\';\ntype Props = {\n  // array of strings wit himage urls\n  collectionsItems: string[] | undefined;\n  isLoading: boolean;\n  title?: string;\n  listIsEmpty?: boolean;\n};\nfunction Gallery({ collectionsItems, title, listIsEmpty, isLoading }: Props) {\n  return (\n    <div className="lots">\n      {title && <h1>{title}</h1>}\n      {listIsEmpty && <h1>The list is empty</h1>}\n      <div className="lots__list">\n        {\n          collectionsItems?.map((item, index) => (\n            <div className="lots__item" key={`${index} ${item}`}>\n              <img src={item} alt="img" />\n            </div>\n          ))\n        }\n      </div>\n    </div>\n  );\n}\nexport default Gallery;\n')),(0,s.kt)("p",null,"Now we can implement our tabs. Let's start with the tab for all NFTs of the collection"),(0,s.kt)("h2",{id:"getting-all-collections-nfts"},"Getting all collection's NFTs"),(0,s.kt)("p",null,"To fetch all collection's NFTs we should produce these steps:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"Get the NFT's code hash by calling the method ",(0,s.kt)("inlineCode",{parentName:"li"},"nftCodeHash")," of the ",(0,s.kt)("inlineCode",{parentName:"li"},"Collection")," contract"),(0,s.kt)("li",{parentName:"ol"},"Call the ",(0,s.kt)("inlineCode",{parentName:"li"},"getAccountsByCodeHash")," function of the standalone client. It will return NFT addresses"),(0,s.kt)("li",{parentName:"ol"},"Call every NFT with the standalone client to fetch its ",(0,s.kt)("inlineCode",{parentName:"li"},"_json")," (TIP-4.2) field"),(0,s.kt)("li",{parentName:"ol"},"Take the preview field from parsed JSON")),(0,s.kt)("p",null,"Firstly, let's create some utility functions for handy work with NFTs:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/utils/nft.tsx" lineNumbers="true"',title:'"src/utils/nft.tsx"',lineNumbers:'"true"'},"import { Address, ProviderRpcClient } from 'everscale-inpage-provider';\n// Of course you need to place a contract ABI somewhere\nimport nftAbi from '../abi/NFT.abi.json';\n\n// TIP-4.2. standard (https://docs.venom.foundation/standards/TIP-4/2)\ninterface BaseNftJson {\n  name?: string;\n  description?: string;\n  preview?: {\n    source: string;\n    mimetype: string;\n  };\n  files?: Array<{\n    source: string;\n    mimetype: string;\n  }>;\n  external_url?: string;\n}\n\n// Extract an preview field of NFT's json\nexport const getNftImage = async (provider: ProviderRpcClient, nftAddress: Address): Promise<string> => {\n  const nftContract = new provider.Contract(nftAbi, nftAddress);\n  // calling getJson function of NFT contract\n  const getJsonAnswer = (await nftContract.methods.getJson({ answerId: 0 } as never).call()) as { json: string };\n  const json = JSON.parse(getJsonAnswer.json ?? '{}') as BaseNftJson;\n  return json.preview?.source || '';\n};\n\n// Returns array with NFT's images urls\nexport const getCollectionItems = async (provider: ProviderRpcClient, nftAddresses: Address[]): Promise<string[]> => {\n  return Promise.all(\n    nftAddresses.map(async (nftAddress) => {\n      const imgInfo = (await getNftImage(provider, nftAddress)) as string;\n      return imgInfo;\n    })\n  );\n};\n")),(0,s.kt)("p",null,"Now we can implement a component, that will show all collection's NFTs. It is not really hard:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/components/CollectionItems.tsx" lineNumbers="true"',title:'"src/components/CollectionItems.tsx"',lineNumbers:'"true"'},"import React, { useEffect, useState } from 'react';\nimport { Address, ProviderRpcClient } from 'everscale-inpage-provider';\nimport Gallery from './Gallery';\n// Store it somwhere....for example in separate files for constants\nimport { COLLECTION_ADDRESS } from '../utils/constants';\n// Do not forget about contract ABI. You need it if you need to call any smart contract\nimport collectionAbi from '../abi/Collection.abi.json';\n// Our implemented util\nimport { getCollectionItems } from '../utils/nft';\ntype Props = {\n  standaloneProvider: ProviderRpcClient | undefined;\n};\nfunction CollectionItems({ standaloneProvider }: Props) {\n  // Just a strings array. Each string is an URL of NFT image.\n  const [collectionItems, setCollectionItem] = useState<string[] | []>([]);\n  const [listIsEmpty, setListIsEmpty] = useState(false);\n  // This method returns an NFT code hash by calling Collection contract. We need code hash for searching all NFTs\n  // Returned code hash is a code hash ONLY for NFT of concrete collection\n  const getNftCodeHash = async (provider: ProviderRpcClient): Promise<string> => {\n    const collectionAddress = new Address(COLLECTION_ADDRESS);\n    const contract = new provider.Contract(collectionAbi, collectionAddress);\n    const { codeHash } = await contract.methods.nftCodeHash({ answerId: 0 } as never).call({ responsible: true });\n    return BigInt(codeHash).toString(16);\n  };\n  // Method, that return NFT's addresses by single query with fetched code hash\n  const getNftAddresses = async (codeHash: string): Promise<Address[] | undefined> => {\n    const addresses = await standaloneProvider?.getAccountsByCodeHash({ codeHash });\n    return addresses?.accounts;\n  };\n  // Main method of this component. \n  const loadNFTs = async (provider: ProviderRpcClient) => {\n    setListIsEmpty(false);\n    try {\n      const nftCodeHash = await getNftCodeHash(provider);\n      if (!nftCodeHash) {\n        return;\n      }\n      const nftAddresses = await getNftAddresses(nftCodeHash);\n      if (!nftAddresses || !nftAddresses.length) {\n        if (nftAddresses && !nftAddresses.length) setListIsEmpty(true);\n        return;\n      }\n      const nftURLs = await getCollectionItems(provider, nftAddresses);\n      setCollectionItem(nftURLs);\n    } catch (e) {\n      console.error(e);\n    }\n  };\n  useEffect(() => {\n    if (standaloneProvider) loadNFTs(standaloneProvider);\n  }, [standaloneProvider]);\n  return (\n    <div>\n      {collectionItems && (\n        <Gallery collectionsItems={collectionItems} listIsEmpty={listIsEmpty} />\n      )}\n    </div>\n  );\n}\nexport default CollectionItems;\n")),(0,s.kt)("p",null,"Step-by-step as we described before. Now we can implement another tab."),(0,s.kt)("h2",{id:"getting-all-owners-nfts-of-concrete-collection"},"Getting all owner's NFTs of concrete collection"),(0,s.kt)("p",null,"Let's describe the steps for this task's solution:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"Take an ",(0,s.kt)("inlineCode",{parentName:"li"},"Index")," code and salt them with described struct (owner, collection)"),(0,s.kt)("li",{parentName:"ol"},"Call the ",(0,s.kt)("inlineCode",{parentName:"li"},"getBocHash")," function of the standalone provider. Pass there a code from the previous step"),(0,s.kt)("li",{parentName:"ol"},"Call the ",(0,s.kt)("inlineCode",{parentName:"li"},"getAccountsByCodeHash")," function of the standalone client. It will return Index addresses"),(0,s.kt)("li",{parentName:"ol"},"Call the ",(0,s.kt)("inlineCode",{parentName:"li"},"getInfo")," function of each fetched from the previous step ",(0,s.kt)("inlineCode",{parentName:"li"},"Index")," contract. You will get an array with NFT addresses"),(0,s.kt)("li",{parentName:"ol"},"Call every NFT with the standalone client to fetch its ",(0,s.kt)("inlineCode",{parentName:"li"},"_json")," (TIP-4.2) field"),(0,s.kt)("li",{parentName:"ol"},"Take the preview field from parsed JSON")),(0,s.kt)("p",null,"First of all, let's add another utility function, that will help us to extract NFT's images from its Index addresses:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/utils/nft.ts" linenumber="true"',title:'"src/utils/nft.ts"',linenumber:'"true"'},"...\nimport indexAbi from '../abi/Index.abi.json';\n...\nexport const getNftsByIndexes = async (provider: ProviderRpcClient, indexAddresses: Address[]): Promise<string[]> => {\n  const nftAddresses = await Promise.all(\n    indexAddresses.map(async (indexAddress) => {\n      const indexContract = new provider.Contract(indexAbi, indexAddress);\n      const indexInfo = (await indexContract.methods.getInfo({ answerId: 0 } as never).call()) as IndexInfo;\n      return indexInfo.nft;\n    })\n  );\n  return getCollectionItems(provider, nftAddresses)\n}\n")),(0,s.kt)("p",null,"That's it. It will help us with our component. Let's implement him:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/components/MyItems.tsx" linenumbers="true"',title:'"src/components/MyItems.tsx"',linenumbers:'"true"'},"import React, { useEffect, useState } from 'react';\nimport { Address, ProviderRpcClient } from 'everscale-inpage-provider';\nimport Gallery from './Gallery';\n// Store it somwhere....for example in separate files for constants\nimport { COLLECTION_ADDRESS } from '../utils/constants';\n// Our implemented util\nimport { getNftsByIndexes } from '../utils/nft';\ntype Props = {\n  address?: string;\n  standaloneProvider: ProviderRpcClient | undefined;\n  myCollectionItems: string[] | undefined;\n  setMyCollectionItems: (value: string[] | undefined) => void;\n};\nfunction MyItems({ address, standaloneProvider, myCollectionItems, setMyCollectionItems }: Props) {\n  const [listIsEmpty, setListIsEmpty] = useState(false);\n  // Method to returning a salted index code (base64)\n  const saltCode = async (provider: ProviderRpcClient, ownerAddress: string) => {\n    // Index StateInit you should take from github. It ALWAYS constant!\n    const INDEX_BASE_64 = 'te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==';\n    // Gettind a code from Index StateInit\n    const tvc = await provider.splitTvc(INDEX_BASE_64);\n    if (!tvc.code) throw new Error('tvc code is empty');\n    // Salt structure that we already know\n    const saltStruct = [\n      { name: 'collection', type: 'address' },\n      { name: 'owner', type: 'address' },\n      { name: 'type', type: 'fixedbytes3' }, // according on standards, each index salted with string 'nft'\n    ] as const;\n    const { code: saltedCode } = await provider.setCodeSalt({\n      code: tvc.code,\n      salt: {\n        structure: saltStruct,\n        abiVersion: '2.1',\n        data: {\n          collection: new Address(COLLECTION_ADDRESS),\n          owner: new Address(ownerAddress),\n          type: btoa('nft'),\n        },\n      },\n    });\n    return saltedCode;\n  };\n  // Method, that return Index'es addresses by single query with fetched code hash\n  const getAddressesFromIndex = async (codeHash: string): Promise<Address[] | undefined> => {\n    const addresses = await standaloneProvider?.getAccountsByCodeHash({ codeHash });\n    return addresses?.accounts;\n  };\n\n  // Main method of this component\n  const loadNFTs = async (provider: ProviderRpcClient, ownerAddress: string) => {\n    setListIsEmpty(false);\n    try {\n      // Take a salted code\n      const saltedCode = await saltCode(provider, ownerAddress);\n      // Hash it\n      const codeHash = await provider.getBocHash(saltedCode);\n      if (!codeHash) {\n        return;\n      }\n      // Fetch all Indexes by hash\n      const indexesAddresses = await getAddressesFromIndex(codeHash);\n      if (!indexesAddresses || !indexesAddresses.length) {\n        if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);\n        return;\n      }\n      // Fetch all image URLs\n      const nftURLs = await getNftsByIndexes(provider, indexesAddresses);\n      setMyCollectionItems(nftURLs);\n    } catch (e) {\n      console.error(e);\n    }\n  };\n  useEffect(() => {\n    if (address && standaloneProvider) loadNFTs(standaloneProvider, address);\n    if (!address) setListIsEmpty(false);\n  }, [address]);\n  return (\n    <Gallery\n      isLoading={isLoading}\n      collectionsItems={myCollectionItems}\n      title={address ? undefined : 'Please connect your wallet'}\n      listIsEmpty={listIsEmpty}\n    />\n  );\n}\nexport default MyItems;\n")),(0,s.kt)("details",null,(0,s.kt)("summary",null,"But what about searching all user NFTs across all collections?"),"All you need is just to change a salt process:",(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/components/MyItems.tsx" linenumbers="true"',title:'"src/components/MyItems.tsx"',linenumbers:'"true"'},"const saltCode = async (provider: ProviderRpcClient, ownerAddress: string) => {\n    // Index StateInit you should take from github. It ALWAYS constant!\n    const INDEX_BASE_64 = 'te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==';\n    // Gettind a code from Index StateInit\n    const tvc = await provider.splitTvc(INDEX_BASE_64);\n    if (!tvc.code) throw new Error('tvc code is empty');\n    const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000'\n    // Salt structure that we already know\n    const saltStruct = [\n      { name: 'zero_address', type: 'address' },\n      { name: 'owner', type: 'address' },\n      { name: 'type', type: 'fixedbytes3' }, // according on standards, each index salted with string 'nft'\n    ] as const;\n    const { code: saltedCode } = await provider.setCodeSalt({\n      code: tvc.code,\n      salt: {\n        structure: saltStruct,\n        abiVersion: '2.1',\n        data: {\n          zero_address: new Address(ZERO_ADDRESS), // just pass it here for code hash you need\n          owner: new Address(ownerAddress),\n          type: btoa('nft'),\n        },\n      },\n    });\n    return saltedCode;\n  };\n"))),(0,s.kt)("p",null,"As you can see, both components are similar. Maybe you need to combine them...think about it :)"),(0,s.kt)("p",null,"The last thing we should do - to place our components on our main page"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/pages/Main.tsx" linenumber="true"',title:'"src/pages/Main.tsx"',linenumber:'"true"'},"import React, { useEffect, useState } from 'react';\n\n...\n// Our main components\nimport CollectionItems from '../components/CollectionItems';\nimport MyItems from '../components/MyItems';\n...\nfunction Main({ venomConnect }: Props) {\n  ...\n  return (\n    <div className=\"box\">\n      <header>\n        <div className=\"menu\">\n          <a\n            className={activeTab === Tab.COLLECTION_ITEMS ? 'menu_item active' : 'menu_item'}\n            onClick={() => setActiveTab(Tab.COLLECTION_ITEMS)}\n          >\n            Collection items\n          </a>\n          <a\n            className={activeTab === Tab.MY_ITEMS ? 'menu_item active' : 'menu_item'}\n            onClick={() => setActiveTab(Tab.MY_ITEMS)}\n          >\n            My items\n          </a>\n        </div>\n        {address ? (\n          <>\n            {' '}\n            <p>{address}</p>\n            <a className=\"logout\" onClick={onDisconnect}>\n              <img src={LogOutImg} alt=\"Log out\" />\n            </a>\n          </>\n        ) : (\n          <a className=\"btn\" onClick={onLogin}>\n            Connect wallet\n          </a>\n        )}\n      </header>\n      <img className=\"decor\" alt=\"fon\" src={fonImg} />\n      {activeTab === Tab.COLLECTION_ITEMS ? (\n        <CollectionItems standaloneProvider={standaloneProvider} />\n      ) : (\n        <MyItems\n          address={address}\n          standaloneProvider={standaloneProvider}\n          myCollectionItems={myCollectionItems}\n          setMyCollectionItems={setMyCollectionItems}\n        />\n      )}\n    </div>\n  );\n}\nexport default Main;\n")),(0,s.kt)("p",null,"That's all. Build your app, host it and congratulations! You have your first dApp!"),(0,s.kt)("p",null,"Remember, that it's just an example and not production code. We didn't keep in mind some balance loaders and state managers. You can check out the implementation of this example with some styles and features in the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/venom-blockchain/guides/tree/master/nft-frontend"},"repository"),"."))}m.isMDXComponent=!0}}]);