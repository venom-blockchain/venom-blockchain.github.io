"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[4140],{4137:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>u});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),c=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},h=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),d=c(a),u=r,m=d["".concat(i,".").concat(u)]||d[u]||p[u]||o;return a?n.createElement(m,l(l({ref:t},h),{},{components:a})):n.createElement(m,l({ref:t},h))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var c=2;c<o;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5228:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=a(7462),r=(a(7294),a(4137));const o={sidebar_position:0,sidebar_label:"Glossary",slug:"/learn/glossary"},l="Glossary",s={unversionedId:"start/learn/glossary",id:"start/learn/glossary",title:"Glossary",description:"Account",source:"@site/docs/start/learn/glossary.md",sourceDirName:"start/learn",slug:"/learn/glossary",permalink:"/learn/glossary",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0,sidebar_label:"Glossary",slug:"/learn/glossary"},sidebar:"docsSidebar",previous:{title:"Presskit",permalink:"/general/presskit"},next:{title:"Tokens and Assets",permalink:"/learn/tokens-and-assets"}},i={},c=[{value:"Account",id:"account",level:3},{value:"Wallet account",id:"wallet-account",level:3},{value:"Address",id:"address",level:3},{value:"Block",id:"block",level:3},{value:'Block Explorer <a href="#block-explorer" id="block-explorer"></a>',id:"block-explorer-",level:3},{value:'Bridge <a href="#bridge" id="bridge"></a>',id:"bridge-",level:3},{value:"Consensus",id:"consensus",level:3},{value:"Constructor message",id:"constructor-message",level:3},{value:"Commission",id:"commission",level:3},{value:"Crypto wallet",id:"crypto-wallet",level:3},{value:'Dapp <a href="#dapps" id="dapps"></a>',id:"dapp-",level:3},{value:"External message",id:"external-message",level:3},{value:"Hash of the code",id:"hash-of-the-code",level:3},{value:"Default Wallet",id:"default-wallet",level:3},{value:"Transaction",id:"transaction",level:3},{value:"Homogeneous",id:"homogeneous",level:3},{value:"Heterogeneous",id:"heterogeneous",level:3},{value:"Giver",id:"giver",level:3},{value:"Keys",id:"keys",level:3},{value:"Interoperability",id:"interoperability",level:3},{value:"Internal message",id:"internal-message",level:3},{value:"Mainnet",id:"mainnet",level:3},{value:"Masterchain",id:"masterchain",level:3},{value:"Multisig wallet",id:"multisig-wallet",level:3},{value:"Multi-blockchain",id:"multi-blockchain",level:3},{value:"Workchain",id:"workchain",level:3},{value:"Validator",id:"validator",level:3},{value:"Delegator",id:"delegator",level:3},{value:"Nominator",id:"nominator",level:3},{value:"Seed phrase",id:"seed-phrase",level:3},{value:"Smart contract",id:"smart-contract",level:3},{value:"Staking pool",id:"staking-pool",level:3},{value:"Shardchain",id:"shardchain",level:3},{value:"Virtual machine",id:"virtual-machine",level:3},{value:"Wallet types",id:"wallet-types",level:3}],h={toc:c};function p(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"glossary"},"Glossary"),(0,r.kt)("h3",{id:"account"},"Account"),(0,r.kt)("p",null,"An account on a blockchain is a unique identifier for a user that holds cryptocurrency and allows for transactions and smart contract execution. In the Venom blockchain, every account is a smart contract with its code, and there is no concept of externally-owned accounts (owned by key pair). This approach is called Account Abstraction and enables flexible authentication options beyond private key ownership."),(0,r.kt)("h3",{id:"wallet-account"},"Wallet account"),(0,r.kt)("p",null,"A wallet account is a specific type of ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"Smart Contract")," designed to store and interact with your VENOM token balance and other ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"Smart Contracts"),"."),(0,r.kt)("p",null,"Users who intend to send Venom tokens to network participants must first deploy a wallet account."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Learn how to create a wallet account by ",(0,r.kt)("a",{parentName:"p",href:"/general/wallet/create-a-new-wallet-account"},"Clicking Here"))),(0,r.kt)("p",null,"All supported cryptocurrency wallets can calculate the address of your wallet account based on its type (",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#default-wallet"},"Default"),", ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multisig-wallet"},"Multisig"),") and your ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#keys"},"Public key")," even before it is deployed. You will be able to receive token transfers to this address immediately, as it has been calculated."),(0,r.kt)("h3",{id:"address"},"Address"),(0,r.kt)("p",null,"The smart contract's unique public identifier in the network stores the code and state of the contract and serves as the entry point for messages directed to it."),(0,r.kt)("p",null,"The address is composed of two parts: the identifier of the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#workchain"},"Workchain")," and the computed part."),(0,r.kt)("p",null,"Example: ",(0,r.kt)("inlineCode",{parentName:"p"},"0:4de50f6789111213a3141516b7fed892fc123ca22158c0d6d0d34daf4c6a7a0a")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"0")," \u2013 ",(0,r.kt)("em",{parentName:"p"},"workchain","_","id,")," ",(0,r.kt)("inlineCode",{parentName:"p"},"3de...7a0a")," ",(0,r.kt)("em",{parentName:"p"},"\u2013 computed","_","part")),(0,r.kt)("p",null,"A workchain","_","id is an integer identifier defining a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#workchain"},"Workchain"),"."),(0,r.kt)("p",null,"The computed part of the address is a 256-bit internal address determined by the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#hash-of-the-code"},"Hash of the code")," and the data contained in the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#constructor-message"},"Constructor Message"),". It can be calculated even before the contract is deployed on the network. This means that it is possible to send messages, including value-bearing messages, to contracts that have not yet been deployed."),(0,r.kt)("h3",{id:"block"},"Block"),(0,r.kt)("p",null,"A group of information that includes ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#transaction"},"Transactions"),", outbound messages, and updates to the state."),(0,r.kt)("h3",{id:"block-explorer-"},"Block Explorer ",(0,r.kt)("a",{href:"#block-explorer",id:"block-explorer"})),(0,r.kt)("p",null,"A web application where a user can explore the blocks, messages, transactions, and accounts in the network."),(0,r.kt)("h3",{id:"bridge-"},"Bridge ",(0,r.kt)("a",{href:"#bridge",id:"bridge"})),(0,r.kt)("p",null,"A network of relayers that connect two or more blockchains enables the transfer of assets from one chain to another. Venom network supports bridges with Ethereum, Binance Smart Chain, and Fantom Opera."),(0,r.kt)("h3",{id:"consensus"},"Consensus"),(0,r.kt)("p",null,"A fault-tolerant mechanism employed in blockchain networks to reach an agreement on a specific data value among a group of participants. The Venom network's algorithm is a Proof-of-stake consensus algorithm from the Byzantine Fault Tolerant (BFT) family of algorithms."),(0,r.kt)("h3",{id:"constructor-message"},"Constructor message"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"An Account"),", or ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"Smart Contract"),", is established by sending a specific constructor message to its address. The message includes the smart contract's initial code and initial data."),(0,r.kt)("h3",{id:"commission"},"Commission"),(0,r.kt)("p",null,"Validators are rewarded for their participation in network security by handling transactions and taking part in the consensus process."),(0,r.kt)("h3",{id:"crypto-wallet"},"Crypto wallet"),(0,r.kt)("p",null,"A hardware or software wallet that stores ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#keys"},"Public/Private Keys"),", and ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#seed-phrase"},"Seed Phrases")," for signing cryptocurrency transactions. ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#crypto-wallet"},"Crypto Wallets")," in the Venom ecosystem are able to work with ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"Wallet Accounts"),", calculate their address by the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#keys"},"Public Key"),", deploy them, and perform token transfers."),(0,r.kt)("h3",{id:"dapp-"},"Dapp ",(0,r.kt)("a",{href:"#dapps",id:"dapps"})),(0,r.kt)("p",null,"A decentralized application is typically presented as a web interface that interacts with smart contracts deployed on the blockchain network, instead of a centralized API. Users typically interact with dApps through a cryptocurrency wallet or browser."),(0,r.kt)("h3",{id:"external-message"},"External message"),(0,r.kt)("p",null,"A message that is not generated by a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"Smart Contract")," within the Venom network but is received from off-chain. A common example occurs when a user wants to transfer funds from one ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"Account")," to another. In this case, the user sends a signed external message to ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"The Wallet Account"),", and the ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"Wallet Account")," authorizes the sender and permits them to pay for the transaction fee from their balance. External messages differ from ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#internal-message"},"Internal Messages"),' as they cannot carry value and therefore cannot pay for their own processing (i.e., their "gas").'),(0,r.kt)("h3",{id:"hash-of-the-code"},"Hash of the code"),(0,r.kt)("p",null,"Sha256 hash of the contract code and the initial state."),(0,r.kt)("h3",{id:"default-wallet"},"Default Wallet"),(0,r.kt)("p",null,"A wallet account with straightforward logic for transferring funds, suitable for the majority of users."),(0,r.kt)("h3",{id:"transaction"},"Transaction"),(0,r.kt)("p",null,"The outcome of message execution that comprises information about the sender, the transaction logical time, incoming and outgoing messages, and the impact of the transaction on the state."),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Components of a transaction"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The account to which the transaction belongs."),(0,r.kt)("li",{parentName:"ul"},"The logical time of the transaction."),(0,r.kt)("li",{parentName:"ul"},"One or zero inbound messages m processed by the transaction."),(0,r.kt)("li",{parentName:"ul"},"The number of generated outbound messages n\u22650."),(0,r.kt)("li",{parentName:"ul"},"The outbound messages m1, \u2026, mn."),(0,r.kt)("li",{parentName:"ul"},"The initial state of account (including its balance)."),(0,r.kt)("li",{parentName:"ul"},"The final state of account (including its balance)."),(0,r.kt)("li",{parentName:"ul"},"The total fees collected by the validators."))),(0,r.kt)("h3",{id:"homogeneous"},"Homogeneous"),(0,r.kt)("p",null,"In a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multi-blockchain"},"Multi-Blockchain")," system, all the blockchains can be of the same type and have the same rules (i.e. using the same format of transactions, the same virtual machine for executing ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#smart-contract"},"Smart-Contract")," code, sharing the same cryptocurrency, etc.) and this similarity is deliberately exploited, but with different data in each blockchain. In this scenario, the system is considered homogeneous."),(0,r.kt)("h3",{id:"heterogeneous"},"Heterogeneous"),(0,r.kt)("p",null,"In a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multi-blockchain"},"Multi-Blockchain")," system, when different blockchains (typically referred to as ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#workchain"},"Workchains"),' in this case) can have different "rules", the system is considered heterogeneous.'),(0,r.kt)("h3",{id:"giver"},"Giver"),(0,r.kt)("p",null,"Giver, used in Locklift is a smart contract that provides VENOM tokens to other contracts on the network during the development and testing phases. The Giver contract is typically deployed during the development and testing phases of a project."),(0,r.kt)("p",null,"By default giver deployed on the ",(0,r.kt)("inlineCode",{parentName:"p"},"0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415")," address in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/evernode-se"},"local-node"),"."),(0,r.kt)("h3",{id:"keys"},"Keys"),(0,r.kt)("p",null,"The private and public keys are large numbers that are utilized in a complex mathematical process for encrypting, decrypting, signing, and verifying messages."),(0,r.kt)("h3",{id:"interoperability"},"Interoperability"),(0,r.kt)("p",null,"The capability of a blockchain to transfer information and share data with other blockchains."),(0,r.kt)("h3",{id:"internal-message"},"Internal message"),(0,r.kt)("p",null,"The message type that one contract sends to another contract."),(0,r.kt)("h3",{id:"mainnet"},"Mainnet"),(0,r.kt)("p",null,'Mainnet, short for "main network," refers to the primary public blockchain network.'),(0,r.kt)("h3",{id:"masterchain"},"Masterchain"),(0,r.kt)("p",null,"The master blockchain holds the necessary information to achieve ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#consensus"},"Consensus")," among validators."),(0,r.kt)("h3",{id:"multisig-wallet"},"Multisig wallet"),(0,r.kt)("p",null,"A multi-signature wallet is a wallet that is employed by two or more users to increase security by requiring multiple signatures to sign transactions before execution."),(0,r.kt)("h3",{id:"multi-blockchain"},"Multi-blockchain"),(0,r.kt)("p",null,"A blockchain where multiple chains can coexist simultaneously."),(0,r.kt)("h3",{id:"workchain"},"Workchain"),(0,r.kt)("p",null,"A type of blockchain in the Venom network under the Masterchain, which has its own state transition functions, cryptographic primitives, transaction or block structures, and native cryptocurrency, while leveraging the security of the Masterchain."),(0,r.kt)("h3",{id:"validator"},"Validator"),(0,r.kt)("p",null,"Designated nodes, known as validators, produce and sign new blocks in the blockchain."),(0,r.kt)("h3",{id:"delegator"},"Delegator"),(0,r.kt)("p",null,"A delegator allocates its tokens to a validator to participate in maintaining network security. Delegators share revenue and risks with their validators."),(0,r.kt)("h3",{id:"nominator"},"Nominator"),(0,r.kt)("p",null,"A participant in network decentralization by bonding their tokens, nominates a validator to participate in the consensus protocol and create blocks."),(0,r.kt)("h3",{id:"seed-phrase"},"Seed phrase"),(0,r.kt)("p",null,"A seed phrase is a sequence of words generated by a ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#crypto-wallet"},"Cryptocurrency Wallet")," that grants access to the cryptocurrency associated with that wallet."),(0,r.kt)("h3",{id:"smart-contract"},"Smart contract"),(0,r.kt)("p",null,"Code that performs arbitrary state changes within the blockchain, executable on ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#tvm"},"TVM")," is the Turing complete ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#virtual-machine"},"Virtual Machine"),"."),(0,r.kt)("h3",{id:"staking-pool"},"Staking pool"),(0,r.kt)("p",null,"Any network participant can deploy a smart contract that enables other network participants to nominate its owner for the role of a validator and participate in the distribution of the validator reward."),(0,r.kt)("h3",{id:"shardchain"},"Shardchain"),(0,r.kt)("p",null,"It follows the same rules and block format as the workchain, but is responsible for only a subset of accounts, based on several initial (most significant) bits of the account address. Since all these shardchains share a common block format and rules, the Venom Blockchain is homogeneous in this aspect, similar to what has been proposed in one of the Ethereum scaling proposals."),(0,r.kt)("h3",{id:"virtual-machine"},"Virtual machine"),(0,r.kt)("p",null,"The Venom network supports a Turing-complete virtual machine for executing smart contract code."),(0,r.kt)("h3",{id:"wallet-types"},"Wallet types"),(0,r.kt)("p",null,"Types of ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#wallet-account"},"Wallet Account")," smart contracts. Currently, it supports two types of wallets ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#default-wallet"},"Default")," and ",(0,r.kt)("a",{parentName:"p",href:"/learn/glossary#multisig-wallet"},"Multisig")))}p.isMDXComponent=!0}}]);