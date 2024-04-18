"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[2997],{4137:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var o=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,i=function(e,n){if(null==e)return{};var t,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=o.createContext({}),p=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return o.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(t),m=i,k=u["".concat(s,".").concat(m)]||u[m]||d[m]||r;return t?o.createElement(k,a(a({ref:n},c),{},{components:t})):o.createElement(k,a({ref:n},c))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,a=new Array(r);a[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var p=2;p<r;p++)a[p]=t[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},6056:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var o=t(7462),i=(t(7294),t(4137));const r={sidebar_position:1,sidebar_label:"Quick start developing with TIP-3",description:"This page helps you to instantly start developing with TIP-3 and deploy your own token here and now. Read next guides, if you want to go deeper."},a="Quick start developing with TIP-3",l={unversionedId:"build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3",id:"build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3",title:"Quick start developing with TIP-3",description:"This page helps you to instantly start developing with TIP-3 and deploy your own token here and now. Read next guides, if you want to go deeper.",source:"@site/docs/build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3.md",sourceDirName:"build/development-guides/how-to-create-your-own-fungible-tip-3-token",slug:"/build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3",permalink:"/build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Quick start developing with TIP-3",description:"This page helps you to instantly start developing with TIP-3 and deploy your own token here and now. Read next guides, if you want to go deeper."},sidebar:"buildSidebar",previous:{title:"Fungible tokens in Venom network",permalink:"/build/development-guides/how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network"},next:{title:"Simple Tokensale",permalink:"/build/development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/simple-tokensale"}},s={},p=[{value:"Source code",id:"source-code",level:2},{value:"How to deploy your own token",id:"how-to-deploy-your-own-token",level:2},{value:"Initialize your token project",id:"initialize-your-token-project",level:3},{value:"Install dependencies",id:"install-dependencies",level:3},{value:"Deploy your token",id:"deploy-your-token",level:3}],c={toc:p};function d(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,o.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"quick-start-developing-with-tip-3"},"Quick start developing with TIP-3"),(0,i.kt)("h2",{id:"source-code"},"Source code"),(0,i.kt)("p",null,"You can inspect the source code of TIP-3 token implementation by ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/broxus/tip3"},"link"),"."),(0,i.kt)("h2",{id:"how-to-deploy-your-own-token"},"How to deploy your own token"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"You need to have an installed Smart Contract Development Environment. If you haven't already, follow ",(0,i.kt)("a",{parentName:"p",href:"../setting-up-the-venom-smart-contract-development-environment"},"this tutorial"),".")),(0,i.kt)("h3",{id:"initialize-your-token-project"},"Initialize your token project"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"npx locklift init --path my-first-token\n> [INFO]  New Locklift project initialized in .\n> [INFO]  Installing required dependencies...\n> [INFO]  \n> added 181 packages, and audited 182 packages in 13s\n\n> 23 packages are looking for funding\n>   run `npm fund` for details\n\n> found 0 vulnerabilities\n\n> [INFO]  LockLift initialized in my-first-token happy hacking!\n")),(0,i.kt)("h3",{id:"install-dependencies"},"Install dependencies"),(0,i.kt)("p",null,"Add TIP-3 implementation repository as a devDependency:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"npm i --save-dev @broxus/tip3\n")),(0,i.kt)("p",null,"Specify installed contracts to the ",(0,i.kt)("inlineCode",{parentName:"p"},"compiler.externalContracts")," section of ",(0,i.kt)("inlineCode",{parentName:"p"},"locklift.config.ts"),", by providing a path to contracts artifacts (",(0,i.kt)("inlineCode",{parentName:"p"},".abi.json"),", ",(0,i.kt)("inlineCode",{parentName:"p"},".tvc")," files, etc., most commonly placed in a ",(0,i.kt)("inlineCode",{parentName:"p"},"build")," folder of smart contracts projects) and contract names array."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="locklift.config.ts" showLineNumbers',title:'"locklift.config.ts"',showLineNumbers:!0},'compiler: {\n    ...\n    externalContracts: {\n      "node_modules/@broxus/tip3/build": ["TokenRoot", "TokenWallet"],\n    },\n  }\n')),(0,i.kt)("p",null,"Now we can compile our contracts and make sure that artifacts were created"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"npx locklift build\n\n> Found 1 sources\n>\n> factorySource generated\n> Built\n\nls ./build\n\n> ...\n> TokenRoot.abi.json\n> TokenRoot.code\n> TokenRoot.base64\n> TokenRoot.tvc\n> ...\n> TokenWallet.abi.json\n> TokenWallet.code\n> TokenWallet.base64\n> TokenWallet.tvc\n> ...\n")),(0,i.kt)("h3",{id:"deploy-your-token"},"Deploy your token"),(0,i.kt)("p",null,"Let's move to deploy. Firstly, we make a new deploy script in ",(0,i.kt)("inlineCode",{parentName:"p"},"scripts")," directory for the ",(0,i.kt)("inlineCode",{parentName:"p"},"TokenRoot")," contract."," "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="01-deploy-token-root.ts" showLineNumbers',title:'"01-deploy-token-root.ts"',showLineNumbers:!0},'import { Address, getRandomNonce, toNano, zeroAddress } from "locklift"\nimport BigNumber from "bignumber.js"\n\nasync function main() {\n  const signer = (await locklift.keystore.getSigner("0"))!\n  \n  // Address of initial token supply recipient (write your own)\n  const initialSupplyTo   = new Address("0:7542...")\n  // Address of token owner (write your own)\n  const rootOwner         = new Address("0:7542...")\n  // Name of the token     \n  const name              = "First Venom Token"\n  // Symbol of the token\n  const symbol            = "FVT"\n  // How many token will be issued instantly after deploy                \n  const initialSupply     = 0\n  // The number of decimals the token uses        \n  const decimals          = 18\n  // If `true`, disables token minting\n  const disableMint       = false\n  // If `true`, disables token burning by root                \n  const disableBurnByRoot = false\n  // If `true`, pauses token burning                \n  const pauseBurn         = false\n                  \n  \n  /* \n    Returns compilation artifacts based on the .tsol file name\n      or name from value config.externalContracts[pathToLib].\n  */\n  const TokenWallet = locklift.factory.getContractArtifacts("TokenWallet")\n  \n  /* \n    Deploy the TIP-3 Token Root contract.\n    @params deployWalletValue: Along with the deployment of the root token,\n      the wallet will be automatically deployed to the owner. \n      This is the amount of EVERs that will be sent to the wallet.\n  */\n  const { contract: tokenRoot } = await locklift.factory.deployContract({\n    contract: "TokenRoot",\n    publicKey: signer.publicKey,\n    initParams: {\n      deployer_: zeroAddress, // this field should be zero address if deploying with public key (see source code)\n      randomNonce_: getRandomNonce(),\n      rootOwner_: rootOwner,\n      name_: name,\n      symbol_: symbol,\n      decimals_: decimals,\n      walletCode_: TokenWallet.code,\n    },\n    constructorParams: {\n      initialSupplyTo: initialSupplyTo,\n      initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),\n      deployWalletValue: toNano(1),\n      mintDisabled: disableMint,\n      burnByRootDisabled: disableBurnByRoot,\n      burnPaused: pauseBurn,\n      remainingGasTo: zeroAddress,\n    },\n    value: toNano(5),\n  })\n\n  console.log(`${name}: ${tokenRoot.address}`)\n}\n\nmain()\n  .then(() => process.exit(0))\n  .catch(e => {\n    console.log(e)\n    process.exit(1)\n  })\n\n')),(0,i.kt)("p",null,"Finally, we can deploy a new token to ",(0,i.kt)("inlineCode",{parentName:"p"},"local")," network. For this, make sure the local node is running. If not, run the following command"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"docker run -d --name local-node -e USER_AGREEMENT=yes -p80:80 tonlabs/local-node\n")),(0,i.kt)("p",null,"and run the deploy script"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"npx locklift run -s ./scripts/01-deploy-token-root.ts -n local\n> Found 1 sources\n\n> factorySource generated\n> Built\n> First Venom Token: 0:69f2407386ca20390878565da97124be717f65496cb03e14aaa676709a6ccb2b\n")),(0,i.kt)("admonition",{title:"Deployment Error",type:"danger"},(0,i.kt)("p",{parentName:"admonition"},"When trying to deploy the script, you may encounter the following error:",(0,i.kt)("br",{parentName:"p"}),"\n",(0,i.kt)("inlineCode",{parentName:"p"},"Cannot use \"in\" operator to search for 'map' in undefined")),(0,i.kt)("p",{parentName:"admonition"},"This issue is still current. A solution can be found at this GitHub link:\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/venom-blockchain/locklift/pull/15/commits/9a4d3c87d4ed673288cbf7c9d52cff45d1a78e6b"},"Error Fix"),".")),(0,i.kt)("p",null,"Congratulations, your first token on the Venom network has been deployed!"))}d.isMDXComponent=!0}}]);