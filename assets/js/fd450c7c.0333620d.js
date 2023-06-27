"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[1243],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),l=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),h=l(n),m=a,d=h["".concat(s,".").concat(m)]||h[m]||u[m]||r;return n?o.createElement(d,i(i({ref:t},p),{},{components:n})):o.createElement(d,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=h;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<r;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7475:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var o=n(7462),a=(n(7294),n(4137));const r={sidebar_position:1,sidebar_label:"Integration"},i="Venom Blockchain FAQ: Integration with Venom Blockchain",c={unversionedId:"faq/integration",id:"faq/integration",title:"Venom Blockchain FAQ: Integration with Venom Blockchain",description:"How to connect Venom Wallet to my dApp?",source:"@site/docs/faq/integration.md",sourceDirName:"faq",slug:"/faq/integration",permalink:"/faq/integration",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Integration"},sidebar:"faqSidebar",previous:{title:"Venom Blockchain FAQs",permalink:"/faq/"},next:{title:"Programming smart contracts",permalink:"/faq/programming"}},s={},l=[],p={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"venom-blockchain-faq-integration-with-venom-blockchain"},"Venom Blockchain FAQ: Integration with Venom Blockchain"),(0,a.kt)("details",null,(0,a.kt)("summary",null,"How to connect Venom Wallet to my dApp?"),(0,a.kt)("p",null,"The easiest way to connect your dApp to Venom Wallet is to use ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/venom-connect"},"Venom Connect"),". It is a library that allows you to connect to Venom Wallet (both mobile and browser extension) and interact with it. This library provides you with a handy interface for building a connect popup for our Venom Wallet and then gives you an interface for working with the Venom network."),(0,a.kt)("p",null,"Check out ",(0,a.kt)("a",{parentName:"p",href:"/build/development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend#connecting-venom-wallet-to-your-app"},"this")," paragraph of the frontend guide, which explains how to use Venom Connect in your project. Moreover, you can check the final source code of this guide ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/venom-blockchain/guides/tree/master/tokensale-frontend"},"here"),"."),(0,a.kt)("p",null,"You can read about all configuration options in the venom-connect official ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/web3sp/venom-connect"},"repository"),". Also, it has an ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/web3sp/venom-connect/tree/main/examples/react"},"example"),".")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"What if I need very specific logic for connecting the Wallet to my dApp?"),(0,a.kt)("p",null,"So, in this case, you can use the libraries that venom-connect has been built on: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/everscale-inpage-provider"},"inpage-provider")," and ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/everscale-standalone-client"},"standalone-client"),". These are basic libraries for interaction with the Venom network, allowing you to build your system for wallet connection. Check the documentation for these libraries in their respective repositories for more information.")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"I need to call a smart contract method before the user connects the wallet. How can I do it?"),(0,a.kt)("p",null,"You should use ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/everscale-standalone-client"},"standalone-client")," as a fallback for ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/everscale-inpage-provider"},"inpage-provider"),". It allows you to call smart contract's 'get' methods without sending any transactions. The venom-connect library also provides access to the standalone interface. You can use the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/web3sp/venom-connect#getstandalone"},"'getStandalone'")," method to achieve this. You can refer to ",(0,a.kt)("a",{parentName:"p",href:"/build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-auction"},"this")," guide for an example of how to use the standalone-client with the ",(0,a.kt)("inlineCode",{parentName:"p"},"getStandalone")," method to retrieve current auction information.")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"I'm developing a payment processing system. Which instrument of your ecosystem can help me?"),(0,a.kt)("p",null,"You can check ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/ever-wallet-api"},"this")," project. It will help you with transaction indexing and payment processing. It is a REST API that allows you to get information about transactions and payments. It also allows you to create payment requests and get payment notifications. You can check the documentation for this project in its repository.")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"I need to have personal access to Venom's transaction history. How can I achieve this?"),(0,a.kt)("p",null,"You can achieve this with two modules. Both of them, in fact, are light nodes of the Venom Blockchain, but they have some extra interfaces for you to process incoming blocks and transactions. One of them is ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/ton-indexer"},"ton-indexer"),", and the other one is ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/broxus/ton-kafka-producer"},"ton-kafka-producer"),". The first one uses rocksdb as storage for blockchain data, as you can see, and works with Apache Kafka."),(0,a.kt)("p",null,"The main idea is that ton-indexer was written in Rust, so you should use the Rust ecosystem for your project. Use ton-indexer as a module in your Rust project to operate with incoming blockchain data, analyze it, and store the required data elsewhere. When using ton-kafka-producer, you can use any method to read Kafka's topics, which will be constantly filled with blockchain data. However, you will need an Apache Kafka cluster.")))}u.isMDXComponent=!0}}]);