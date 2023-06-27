"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[9115],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),h=a,g=d["".concat(u,".").concat(h)]||d[h]||c[h]||i;return n?r.createElement(g,o(o({ref:t},p),{},{components:n})):r.createElement(g,o({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8203:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(4137));const i={sidebar_position:1,description:"GraphQL API Quick Start"},o="GraphQL API Quick Start",l={unversionedId:"build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-quick-start",id:"build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-quick-start",title:"GraphQL API Quick Start",description:"GraphQL API Quick Start",source:"@site/docs/build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-quick-start.md",sourceDirName:"build/development-guides/using-evercloud-graphql-api-to-work-with-venom",slug:"/build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-quick-start",permalink:"/build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-quick-start",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"GraphQL API Quick Start"},sidebar:"buildSidebar",previous:{title:"Welcome",permalink:"/build/development-guides/using-evercloud-graphql-api-to-work-with-venom/"},next:{title:"GraphQL API guides",permalink:"/build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-api-guides"}},u={},s=[{value:"Playground",id:"playground",level:2},{value:"Documentation",id:"documentation",level:2},{value:"Request with curl",id:"request-with-curl",level:2},{value:"Request with SDK (JavaScript)",id:"request-with-sdk-javascript",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}],p={toc:s};function c(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"graphql-api-quick-start"},"GraphQL API Quick Start"),(0,a.kt)("p",null,"This guide will help you familiarize yourself with Venom GraphQL API in four steps:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"observing API in sandbox playground"),(0,a.kt)("li",{parentName:"ul"},"reading API documentation"),(0,a.kt)("li",{parentName:"ul"},"making an API request with curl"),(0,a.kt)("li",{parentName:"ul"},"integrate API request with ",(0,a.kt)("a",{parentName:"li",href:"/build/development-guides/using-ever-sdk-and-devtools-to-work-with-venom/"},"Ever SDK"))),(0,a.kt)("h2",{id:"playground"},"Playground"),(0,a.kt)("p",null,"Go to ",(0,a.kt)("a",{parentName:"p",href:"https://gql-testnet.venom.foundation/graphql"},"https://gql-testnet.venom.foundation/graphql")),(0,a.kt)("p",null,"Insert this query in the left part. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'query{\nblockchain{\n    account(address:"-1:3333333333333333333333333333333333333333333333333333333333333333"){\n      info{\n        balance(format:DEC)\n        address\n      }\n    }\n  }\n}\n')),(0,a.kt)("p",null,"Now click play button and you will see the result:"),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(7745).Z,width:"1029",height:"462"})),(0,a.kt)("h2",{id:"documentation"},"Documentation"),(0,a.kt)("p",null,"Click on the button ",(0,a.kt)("strong",{parentName:"p"},"DOCS")," on the right. You will see the API documentation with all available fields:"),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(3533).Z,width:"1470",height:"682"})),(0,a.kt)("h2",{id:"request-with-curl"},"Request with curl"),(0,a.kt)("p",null,"Use this command in terminal to get the same data as in the playground sample above:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl --location --request POST \'https://gql-testnet.venom.foundation/graphql\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{"query":"query($address: String!){\\n  blockchain{\\n    account(address:$address){\\n      info{\\n        balance(format:DEC)\\n      }\\n    }\\n  }\\n}","variables":{"address":"-1:3333333333333333333333333333333333333333333333333333333333333333"}}\'\n')),(0,a.kt)("h2",{id:"request-with-sdk-javascript"},"Request with SDK (JavaScript)"),(0,a.kt)("p",null,"This is an example of how to integrate a similar query into JS SDK."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const {TonClient} = require("@eversdk/core");\nconst {libNode} = require("@eversdk/lib-node");\n\nTonClient.useBinaryLibrary(libNode)\n\nconst client = new TonClient({\n    network: {\n        endpoints: [\n            "https://devnet-sandbox.evercloud.dev/graphql"\n        ],\n    },\n});\n\n(async () => {\n    try {\n        // Get account balance. \n        const query = `\n            query {\n              blockchain {\n                account(\n                  address: "${address}"\n                ) {\n                   info {\n                    balance(format: DEC)\n                  }\n                }\n              }\n            }`\n        const {result}  = await client.net.query({query})\n        console.log(`The account balance is ${result.data.blockchain.account.info.balance}`);\n        client.close();\n    }\n    catch (error) {\n        console.error(error);\n    }\n}\n)()\n')),(0,a.kt)("h2",{id:"whats-next"},"What's next?"),(0,a.kt)("p",null,"For more specific guidance on implementing your use case with the help of the GraphQL API, consult the ",(0,a.kt)("a",{parentName:"p",href:"/build/development-guides/using-evercloud-graphql-api-to-work-with-venom/graphql-api-guides"},"Specialized Guides"),"."))}c.isMDXComponent=!0},7745:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/1-36b3b5c710500eea0b4a223d36a697f9.png"},3533:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/2-d665d5167963d2ede5332af878ad2db3.png"}}]);