"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[1835],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>d});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),c=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},h=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),u=c(a),d=r,m=u["".concat(i,".").concat(d)]||u[d]||p[d]||o;return a?n.createElement(m,l(l({ref:t},h),{},{components:a})):n.createElement(m,l({ref:t},h))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var c=2;c<o;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},6456:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=a(7462),r=(a(7294),a(3905));const o={sidebar_position:0,sidebar_label:"Glossary",slug:"/learn/glossary"},l="Glossary",s={unversionedId:"start/learn/glossary",id:"start/learn/glossary",title:"Glossary",description:"Wallet account",source:"@site/docs/start/learn/00-glossary.md",sourceDirName:"start/learn",slug:"/learn/glossary",permalink:"/learn/glossary",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0,sidebar_label:"Glossary",slug:"/learn/glossary"},sidebar:"docsSidebar",previous:{title:"Presskit",permalink:"/general/presskit"},next:{title:"Architecture",permalink:"/learn/architecture"}},i={},c=[{value:"Wallet account",id:"wallet-account",level:3},{value:"Address",id:"address",level:3},{value:"Block",id:"block",level:3},{value:'Block Explorer <a href="#block-explorer" id="block-explorer"></a>',id:"block-explorer-",level:3},{value:'Bridge <a href="#bridge" id="bridge"></a>',id:"bridge-",level:3},{value:"Consensus",id:"consensus",level:3},{value:"Constructor message",id:"constructor-message",level:3},{value:"Commission",id:"commission",level:3},{value:"Crypto wallet",id:"crypto-wallet",level:3},{value:'Dapp <a href="#dapps" id="dapps"></a>',id:"dapp-",level:3},{value:"External message",id:"external-message",level:3},{value:"Hash of the code",id:"hash-of-the-code",level:3},{value:"Default Wallet",id:"default-wallet",level:3},{value:"Transaction",id:"transaction",level:3},{value:"Homogeneous",id:"homogeneous",level:3},{value:"Heterogeneous",id:"heterogeneous",level:3},{value:"Hypercube routing",id:"hypercube-routing",level:3},{value:"Keys",id:"keys",level:3},{value:'Interoperability\u200b <a href="#interoperability" id="interoperability"></a>',id:"interoperability-",level:3},{value:"Internal message",id:"internal-message",level:3},{value:'Mainnet\u200b <a href="#mainnet" id="mainnet"></a>',id:"mainnet-",level:3},{value:"Masterchain",id:"masterchain",level:3},{value:"Multisig wallet",id:"multisig-wallet",level:3},{value:"Multi-blockchain",id:"multi-blockchain",level:3},{value:"Workchain",id:"workchain",level:3},{value:"Validator",id:"validator",level:3},{value:"Delegator",id:"delegator",level:3},{value:"Nominator",id:"nominator",level:3},{value:"Seed phrase",id:"seed-phrase",level:3},{value:"Smart contract",id:"smart-contract",level:3},{value:"Staking pool",id:"staking-pool",level:3},{value:"Shardchain",id:"shardchain",level:3},{value:"Virtual machine",id:"virtual-machine",level:3},{value:"Wallet types",id:"wallet-types",level:3}],h={toc:c};function p(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"glossary"},"Glossary"),(0,r.kt)("h3",{id:"wallet-account"},"Wallet account"),(0,r.kt)("p",null,"A wallet account is your identity in the Venom ecosystem, a special case of a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"smart contract")," designed to interact with your Venom balance and ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"smart contracts"),"."),(0,r.kt)("p",null,"Any users who need to send Venom tokens to participants in the network must have is deployed the wallet account."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"How to create a wallet account ",(0,r.kt)("a",{parentName:"p",href:"/general/create-a-new-wallet-account"},"read here"))),(0,r.kt)("p",null,"All supported crypto wallets can calculate the address of your wallet account depending on its type (",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#default-wallet"},"default"),", ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multisig-wallet"},"multisig"),") and your ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#keys"},"public key")," even before it is deployed. You will be able to receive token transfers to this address immediately as it was calculated."),(0,r.kt)("h3",{id:"address"},"Address"),(0,r.kt)("p",null,"The unique public identifier of the smart contract in the network stores code and state of the contract, and is the entry point for messages addressed to it."),(0,r.kt)("p",null,"The address consists of two parts - the identifier of the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#workchain"},"workchain")," and the computed part."),(0,r.kt)("p",null,"Example: ",(0,r.kt)("inlineCode",{parentName:"p"},"0:4de50f6789111213a3141516b7fed892fc123ca22158c0d6d0d34daf4c6a7a0a")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"0")," \u2013 ",(0,r.kt)("em",{parentName:"p"},"workchain","_","id,")," ",(0,r.kt)("inlineCode",{parentName:"p"},"3de...7a0a")," ",(0,r.kt)("em",{parentName:"p"},"\u2013 computed","_","part")),(0,r.kt)("p",null,"A workchain","_","id is an integer identifier defining a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#workchain"},"workchain"),"."),(0,r.kt)("p",null,"A computed part of the address is a 256-bit internal address determined by the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#hash-of-the-code"},"hash of the code")," and of the data contained in the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#constructor-message"},"constructor message"),". We can calculate it even before the contract is deployed on the network. And It is possible to send messages, including value-bearing messages, to previously undeployed contracts."),(0,r.kt)("h3",{id:"block"},"Block"),(0,r.kt)("p",null,"A collection of data such as ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#transaction"},"transactions"),", outbound messages, and an update of the state."),(0,r.kt)("h3",{id:"block-explorer-"},"Block Explorer ",(0,r.kt)("a",{href:"#block-explorer",id:"block-explorer"})),(0,r.kt)("p",null,"\u200bA web application where a user can explore the blocks, messages, transactions, and accounts in the network."),(0,r.kt)("h3",{id:"bridge-"},"Bridge ",(0,r.kt)("a",{href:"#bridge",id:"bridge"})),(0,r.kt)("p",null,"A network of relayers that connect two or more blockchains makes it to able to transfer assets from one chain to another. Venom network supports bridges with Ethereum, Binance Smart Chain, and Fantom Opera."),(0,r.kt)("h3",{id:"consensus"},"Consensus"),(0,r.kt)("p",null,"Is a fault-tolerant mechanism that is used in blockchain networks to reach an agreement on a particular data value between a group of participants. The algorithm of the Venom network is a Proof-of-stake consensus algorithm from a family of Byzantine Fault Tolerant (BFT) algorithms."),(0,r.kt)("h3",{id:"constructor-message"},"Constructor message"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"An account"),", or ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"smart contract"),", is created by sending a special constructor message to its address",(0,r.kt)("strong",{parentName:"p"},".")," The body of such a message contains the initial code of the smart contract and the initial data of the smart contract."),(0,r.kt)("h3",{id:"commission"},"Commission"),(0,r.kt)("p",null,"Reward validators for participating in network security by processing transactions and participating in the consensus."),(0,r.kt)("h3",{id:"crypto-wallet"},"Crypto wallet"),(0,r.kt)("p",null,"A hardware or software wallet that stores ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#keys"},"public/private key"),", and",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#seed-phrase"}," seed phrase")," for signing cryptocurrency transactions. ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#crypto-wallet"},"Crypto wallets")," in the Venom ecosystem are able to work with ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"wallet accounts"),", calculate their address by the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#keys"},"public key"),", deploy them, and perform token transfers."),(0,r.kt)("h3",{id:"dapp-"},"Dapp ",(0,r.kt)("a",{href:"#dapps",id:"dapps"})),(0,r.kt)("p",null,"A decentralized application is usually presented as a web UI that interacts with smart contracts deployed on the blockchain network, instead of the centralized API. A common user interacts with Dapp through the crypto wallet or crypto browser."),(0,r.kt)("h3",{id:"external-message"},"External message"),(0,r.kt)("p",null,"Any message that was not produced by a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"smart contract")," within the Venom network, but was received from off-chain. The most typical example arises when a user wants to transfer some funds from an ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"account")," controlled by his to some other account. In this case, the user sends a signed external message to ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"the wallet account"),", then the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"wallet account")," authorizes the sender and allows them to pay for the transaction fee from their balance. There is a difference between external messages and ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#internal-message"},"internal messages")," because the External message cannot bear value, so they cannot pay for their \u201cgas\u201d (i.e., their processing) themselves."),(0,r.kt)("h3",{id:"hash-of-the-code"},"Hash of the code"),(0,r.kt)("p",null,"Sha256 hash of the contract code and the initial state"),(0,r.kt)("h3",{id:"default-wallet"},"Default Wallet"),(0,r.kt)("p",null,"Wallet account with simple logic for transferring funds. Suitable for most users"),(0,r.kt)("h3",{id:"transaction"},"Transaction"),(0,r.kt)("p",null,"A result of message execution that contains information about the sender, the transaction logical time, incoming and outgoing messages, and how a transaction affects the state."),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Components of a transaction"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The account to which the transaction belongs."),(0,r.kt)("li",{parentName:"ul"},"The logical time of the transaction."),(0,r.kt)("li",{parentName:"ul"},"One or zero inbound messages m processed by the transaction."),(0,r.kt)("li",{parentName:"ul"},"The number of generated outbound messages n\u22650."),(0,r.kt)("li",{parentName:"ul"},"The outbound messages m1, \u2026, mn."),(0,r.kt)("li",{parentName:"ul"},"The initial state of account (including its balance)."),(0,r.kt)("li",{parentName:"ul"},"The final state of account (including its balance)."),(0,r.kt)("li",{parentName:"ul"},"The total fees collected by the validators."))),(0,r.kt)("h3",{id:"homogeneous"},"Homogeneous"),(0,r.kt)("p",null,"In a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multi-blockchain"},"multi-blockchain")," system, all blockchains may be essential of the same type and have the same rules (i.e., use the same format of transactions, the same virtual machine for executing ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"smart-contract "),"code, share the same cryptocurrency, and so on), and this similarity is explicitly exploited, but with different data in each blockchain. In this case, we say that the system is homogeneous."),(0,r.kt)("h3",{id:"heterogeneous"},"Heterogeneous"),(0,r.kt)("p",null,"When, in a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multi-blockchain"},"multi-blockchain")," system, different blockchains (which will usually be called ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#workchain"},"workchains")," in this case) can have different \u201crules\u201d. Then we say that the system is heterogeneous."),(0,r.kt)("h3",{id:"hypercube-routing"},"Hypercube routing"),(0,r.kt)("p",null,"The way of delivering messages from one ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#shardchain"},"shardchain")," to another"),(0,r.kt)("h3",{id:"keys"},"Keys"),(0,r.kt)("p",null,"The private and public keys: Very large numbers that are used in a lengthy math process to encrypt, decrypt, sign, and verify messages."),(0,r.kt)("h3",{id:"interoperability-"},"Interoperability",(0,r.kt)("a",{parentName:"h3",href:"https://wiki.polkadot.network/docs/glossary#interoperability"},"\u200b")," ",(0,r.kt)("a",{href:"#interoperability",id:"interoperability"})),(0,r.kt)("p",null,"The ability of blockchain to transfer information and exchange data with other blockchains."),(0,r.kt)("h3",{id:"internal-message"},"Internal message"),(0,r.kt)("p",null,"The type of message that one contract sends to another contract."),(0,r.kt)("h3",{id:"mainnet-"},"Mainnet",(0,r.kt)("a",{parentName:"h3",href:"https://wiki.polkadot.network/docs/glossary#mainnet"},"\u200b")," ",(0,r.kt)("a",{href:"#mainnet",id:"mainnet"})),(0,r.kt)("p",null,'Short for "main network" is the primary public network of blockchain.'),(0,r.kt)("h3",{id:"masterchain"},"Masterchain"),(0,r.kt)("p",null,"The master blockchain contains the information necessary to reach a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#consensus"},"consensus")," between validators."),(0,r.kt)("h3",{id:"multisig-wallet"},"Multisig wallet"),(0,r.kt)("p",null,"A multi-signature wallet is a wallet that is used by two or more users to enhance security by requiring signatures from multiple parties to sign transactions before execution."),(0,r.kt)("h3",{id:"multi-blockchain"},"Multi-blockchain"),(0,r.kt)("p",null,"Blockchain in which many chains can exist at once."),(0,r.kt)("h3",{id:"workchain"},"Workchain"),(0,r.kt)("p",null,"A blockchain type in Venom network under the Masterchain with its own state transition functions, cryptographic primitives, transaction or block structures, and native cryptocurrencies using the security of the Masterchain."),(0,r.kt)("h3",{id:"validator"},"Validator"),(0,r.kt)("p",null,"Specially designated nodes, produce and sign new blocks in the blockchain."),(0,r.kt)("h3",{id:"delegator"},"Delegator"),(0,r.kt)("p",null,"A delegator provides its tokens to the validator to participate in maintaining the network security. Delegators share revenue with their validators, and they also share risks."),(0,r.kt)("h3",{id:"nominator"},"Nominator"),(0,r.kt)("p",null,"A participant in network decentralization by bonding their tokens nominates a validator to participate in consensus protocol and produce blocks."),(0,r.kt)("h3",{id:"seed-phrase"},"Seed phrase"),(0,r.kt)("p",null,"A seed phrase is a series of words generated by ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#crypto-wallet"},"the cryptocurrency wallet")," that gives you access to the cryptocurrency associated with that wallet."),(0,r.kt)("h3",{id:"smart-contract"},"Smart contract"),(0,r.kt)("p",null,"Code that performs arbitrary state changes within the blockchain, executable on ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#tvm"},"TVM")," is the Turing complete",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#virtual-machine"}," virtual machine"),"."),(0,r.kt)("h3",{id:"staking-pool"},"Staking pool"),(0,r.kt)("p",null,"Any network member can deploy a smart contract that allows other network members to nominate its owner for the role of a validator and participate in the distribution of the validator reward"),(0,r.kt)("h3",{id:"shardchain"},"Shardchain"),(0,r.kt)("p",null,"It is having the same rules and block format as the workchain itself, but is responsible only for a subset of accounts, depending on several first (most significant) bits of the account address. Because all these shardchains share a common block format and rules, the Venom Blockchain is homogeneous in this respect, similar to what has been discussed in one of the Ethereum scaling proposals"),(0,r.kt)("h3",{id:"virtual-machine"},"Virtual machine"),(0,r.kt)("p",null,"Venom supports the Turing complete virtual machine used to execute smart contract code"),(0,r.kt)("h3",{id:"wallet-types"},"Wallet types"),(0,r.kt)("p",null,"Types of ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"wallet account")," smart contracts. At the current moment supports two types of wallets ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#default-wallet"},"Default")," and ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multisig-wallet"},"Multisig")))}p.isMDXComponent=!0}}]);