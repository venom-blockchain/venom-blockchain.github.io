"use strict";(self.webpackChunkve_ps=self.webpackChunkve_ps||[]).push([[1073],{4137:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=p(a),m=r,y=h["".concat(l,".").concat(m)]||h[m]||d[m]||o;return a?n.createElement(y,i(i({ref:t},c),{},{components:a})):n.createElement(y,i({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},3158:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=a(7462),r=(a(7294),a(4137));const o={title:"VEP-2981: NFT Royalty"},i=void 0,s={unversionedId:"standards/VEP/vep-2981",id:"standards/VEP/vep-2981",title:"VEP-2981: NFT Royalty",description:"Abstract",source:"@site/docs/standards/VEP/vep-2981.md",sourceDirName:"standards/VEP",slug:"/standards/VEP/vep-2981",permalink:"/standards/VEP/vep-2981",draft:!1,tags:[],version:"current",frontMatter:{title:"VEP-2981: NFT Royalty"},sidebar:"standardSidebar",previous:{title:"VEP-1155: Multi-Token",permalink:"/standards/VEP/vep-1155"},next:{title:"VEP-33: Allowance Token Interface",permalink:"/standards/VEP/vep-33"}},l={},p=[{value:"Abstract",id:"abstract",level:2},{value:"Motivation",id:"motivation",level:2},{value:"Specification",id:"specification",level:2},{value:"Rationale",id:"rationale",level:2},{value:"Optional royalty payments",id:"optional-royalty-payments",level:2},{value:"Simple royalty payments to a single address",id:"simple-royalty-payments-to-a-single-address",level:2},{value:"Royalty payment percentage calculation",id:"royalty-payment-percentage-calculation",level:2},{value:"Unit-less royalty payment across all marketplaces, both on-chain and off-chain",id:"unit-less-royalty-payment-across-all-marketplaces-both-on-chain-and-off-chain",level:2},{value:"Universal Royalty Payments",id:"universal-royalty-payments",level:2},{value:"Backwards compatibility",id:"backwards-compatibility",level:2},{value:"Security considerations",id:"security-considerations",level:2},{value:"Copyright",id:"copyright",level:2},{value:"References",id:"references",level:2}],c={toc:p};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-preamble"},"VEP: 2981\nauthor: Evgeny Shatalov <evgeny.a.shatalov@gmail.com>, Aleksei Kolchanov <a.kolchanov@numi.net>\nstatus: Review\ntype: Contract\ncreated: 2023-03-08\nrequires: TIP-6\n")),(0,r.kt)("h2",{id:"abstract"},"Abstract"),(0,r.kt)("p",null,"This standard allows contracts, such as NFTs that support ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1"),", to signal a royalty amount to be paid to the NFT creator or rights holder every time the NFT is sold or re-sold. This is intended for NFT marketplaces that want to support the ongoing funding of artists and other NFT creators. The royalty payment must be voluntary, as transfer mechanisms do not always imply a sale occurred. Marketplaces and individuals implement this standard by retrieving the royalty payment information with royaltyInfo(), which specifies how much to pay to which address for a given sale price."),(0,r.kt)("h2",{id:"motivation"},"Motivation"),(0,r.kt)("p",null,"The suggested standard adapts the ",(0,r.kt)("a",{parentName:"p",href:"https://eips.ethereum.org/EIPS/eip-2981"},"Ethereum EIP-2981")," standard to the Venom blockchain. Venom blockchain has distributed nature and supports ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," standard for NFT and ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-6/1"},"TIP-6.1")," for interfaces. The standard must take into account this distributed nature and mentioned standards.\nThis standard allows NFTs that support ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," and other valuable contracts, to have a standardized way of signaling royalty information. More specifically, these contracts can now calculate a royalty amount to provide to the rightful recipient."),(0,r.kt)("p",null,"Royalty amounts are always a percentage of the sale price. If a marketplace chooses not to implement this VEP, then no funds will be paid for secondary sales. It is believed that the NFT marketplace ecosystem will voluntarily implement this royalty payment standard; in a bid to provide ongoing funding for artists/creators. NFT buyers will assess the royalty payment as a factor when making NFT purchasing decisions."),(0,r.kt)("p",null,"Without an agreed royalty payment standard, the NFT ecosystem will lack an effective means to collect royalties across all marketplaces and artists and other creators will not receive ongoing funding. This will hamper the growth and adoption of NFTs and demotivate NFT creators from minting new and innovative tokens."),(0,r.kt)("p",null,"Enabling all NFT marketplaces to unify on a single royalty payment standard will benefit the entire NFT ecosystem."),(0,r.kt)("p",null,"While this standard focuses on NFTs and compatibility with the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," standard, VEP-2981 does not require compatibility with ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," standard. Any other contract could integrate with VEP-2981 to return royalty payment information. VEP-2981 is, therefore, a universal royalty standard for many asset types."),(0,r.kt)("h2",{id:"specification"},"Specification"),(0,r.kt)("p",null,"The keywords \u201cMUST\u201d, \u201cMUST NOT\u201d, \u201cREQUIRED\u201d, \u201cSHALL\u201d, \u201cSHALL NOT\u201d, \u201cSHOULD\u201d, \u201cSHOULD NOT\u201d, \u201cRECOMMENDED\u201d, \u201cMAY\u201d, and \u201cOPTIONAL\u201d in this document are to be interpreted as described in ",(0,r.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc2119"},"RFC 2119"),"."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," compliant contracts MAY implement this standard for royalties to provide a standard method of specifying royalty payment information."),(0,r.kt)("p",null,"Marketplaces that support this standard SHOULD implement some method of transferring royalties to the royalty recipient. The example of such implementation can be found in ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," on visualization schemas (see transfers to the creator)."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," compliant contracts MAY implement this standard for collection contract and NFT contracts at the same time. Marketplaces that support this standard SHOULD prefer NFT contract royalty than collection contract royalty."),(0,r.kt)("p",null,"Marketplaces MUST pay the royalty in the same unit of exchange as that of the ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," passed to ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyInfo()"),". This is equivalent to saying that the ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," parameter and the ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount")," return value MUST be denominated in the same monetary unit. For example, if the sale price is in Venom, then the royalty payment must also be paid in Venom, and if the sale price is in USDC, then the royalty payment must also be paid in USDC."),(0,r.kt)("p",null,"Implementers of this standard MUST calculate a percentage of the ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," when calculating the royalty amount. Subsequent invocations of ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyInfo()")," MAY return a different ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount"),". Though there are some important considerations for implementers if they choose to perform different percentage calculations between ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyInfo()")," invocations."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyInfo()")," function is not aware of the unit of exchange for the sale and royalty payment. With that in mind, implementers MUST NOT return a fixed/constant ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount"),", wherein they\u2019re ignoring the ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice"),". For the same reason, implementers MUST NOT determine the ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount")," based on comparing the ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," with constant numbers. In both cases, the ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyInfo()")," function makes assumptions on the unit of exchange, which MUST be avoided."),(0,r.kt)("p",null,"The percentage value used must be independent of the sale price for reasons previously mentioned (i.e. if the percentage value 10%, then 10% MUST apply whether ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," is 10, 10000 or 1234567890). If the royalty fee calculation results in a remainder, implementers MAY round up or round down to the nearest integer. For example, if the royalty fee is 10% and ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," is 999, the implementer can return either 99 or 100 for ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount"),", both are valid."),(0,r.kt)("p",null,"The implementer MAY choose to change the percentage value based on other predictable variables that do not make assumptions about the unit of exchange. For example, the percentage value may drop linearly over time. An approach like this SHOULD NOT be based on variables that are unpredictable like 'block. timestamp', but instead on other more predictable state changes like ",(0,r.kt)("inlineCode",{parentName:"p"},"now")," instruction. One more reasonable approach MAY use the number of transfers of an NFT to decide which percentage value is used to calculate the royaltyAmount. The idea is that the percentage value could decrease after each transfer of the NFT."),(0,r.kt)("p",null,"Marketplaces that support this standard SHOULD NOT send a zero-value transaction if the ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount")," returned is 0. This would waste gas and serves no useful purpose in this VEP."),(0,r.kt)("p",null,"Marketplaces that support this standard MUST pay royalties no matter where the sale occurred or in what currency, including on-chain sales, over-the-counter (OTC) sales and off-chain sales such as at auction houses. As royalty payments are voluntary, entities that respect this VEP must pay no matter where the sale occurred - a sale conducted outside of the blockchain is still a sale. The exact mechanism for paying and notifying the recipient will be defined in future VEPs."),(0,r.kt)("p",null,"Each ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," compliant contracts that supports this standard MUST implement ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-6/1"},"TIP-6.1")," and the following interface:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    pragma ton-solidity >= 0.58.1;\n\n    interface IRoyaltyInfo {\n        /// @notice NFT royalty information\n        /// @param salePrice the sale price of the NFT\n        /// @return receiver address of who should be sent the royalty payment\n        /// @return royaltyAmount - the royalty payment amount for salePrice\n        function royaltyInfo(uint128 salePrice) external view responsible returns(address receiver, uint128 royaltyAmount);\n    }\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"NOTE")," The ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-6/1"},"TIP-6.1")," identifier for this interface is ",(0,r.kt)("inlineCode",{parentName:"p"},"0x60970214"),"."),(0,r.kt)("h2",{id:"rationale"},"Rationale"),(0,r.kt)("h2",{id:"optional-royalty-payments"},"Optional royalty payments"),(0,r.kt)("p",null,"It is impossible to know which NFT transfers are the result of sales, and which are merely wallets moving or consolidating their NFTs. Therefore, we cannot force every transfer function, such as ",(0,r.kt)("inlineCode",{parentName:"p"},"transfer()")," in ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1"),", to involve a royalty payment as not every transfer is a sale that would require such payment. We believe the NFT marketplace ecosystem will voluntarily implement this royalty payment standard to provide ongoing funding for artists/creators. NFT buyers will assess the royalty payment as a factor when making NFT purchasing decisions."),(0,r.kt)("h2",{id:"simple-royalty-payments-to-a-single-address"},"Simple royalty payments to a single address"),(0,r.kt)("p",null,"This VEP does not specify the manner of payment to the royalty recipient. Furthermore, it is impossible to fully know and efficiently implement all possible types of royalty payments logic. With that said, it is on the royalty payment receiver to implement all additional complexity and logic for fee splitting, multiple receivers, taxes, accounting, etc. in their own receiving contract or off-chain processes. Attempting to do this as part of this standard, it would dramatically increase the implementation complexity, increase gas costs, and could not possibly cover every potential use-case. This VEP should be considered a minimal, gas-efficient building block for further innovation in NFT and other assets royalty payments. Future VEPs can specify more details regarding payment transfer and notification."),(0,r.kt)("h2",{id:"royalty-payment-percentage-calculation"},"Royalty payment percentage calculation"),(0,r.kt)("p",null,"This VEP mandates a percentage-based royalty fee model. It is likely that the most common case of percentage calculation will be where the ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyAmount")," is always calculated from the ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," using a fixed percent i.e. if the royalty fee is 10%, then a 10% royalty fee must apply whether ",(0,r.kt)("inlineCode",{parentName:"p"},"salePrice")," is 10, 10000 or 1234567890."),(0,r.kt)("p",null,"Implementers can get creative with this percentage-based calculation but there are some important caveats to consider. Mainly, ensuring that the ",(0,r.kt)("inlineCode",{parentName:"p"},"royaltyInfo()")," function is not aware of the unit of exchange and that unpredictable variables are avoided in the percentage calculation."),(0,r.kt)("h2",{id:"unit-less-royalty-payment-across-all-marketplaces-both-on-chain-and-off-chain"},"Unit-less royalty payment across all marketplaces, both on-chain and off-chain"),(0,r.kt)("p",null,"This VEP does not specify a currency or token used for sales and royalty payments. The same percentage-based royalty fee must be paid regardless of what currency, or token was used in the sale, paid in the same currency or token. This applies to sales in any location including on-chain sales, over-the-counter (OTC) sales, and off-chain sales using fiat currency such as at auction houses. As royalty payments are voluntary, entities that respect this VEP must pay no matter where the sale occurred - a sale outside of the blockchain is still a sale."),(0,r.kt)("h2",{id:"universal-royalty-payments"},"Universal Royalty Payments"),(0,r.kt)("p",null,"Although designed specifically with NFTs in mind, this standard does not require that a contract implementing VEP-2981 is compatible with ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," standard. Any other contract could use this interface to return royalty payment information, provided that it is able to uniquely identify assets within the constraints of the interface. VEP-2981 is, therefore, a universal royalty standard for many other asset types."),(0,r.kt)("h2",{id:"backwards-compatibility"},"Backwards compatibility"),(0,r.kt)("p",null,"This standard is compatible with the current ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")," standard."),(0,r.kt)("h2",{id:"security-considerations"},"Security considerations"),(0,r.kt)("p",null,"There are no security considerations related directly to the implementation of this standard."),(0,r.kt)("h2",{id:"copyright"},"Copyright"),(0,r.kt)("p",null,"Copyright and related rights waived via ",(0,r.kt)("a",{parentName:"p",href:"https://docs.venom.foundation/standards/LICENSE/"},"CC0"),"."),(0,r.kt)("h2",{id:"references"},"References"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.venom.foundation/standards/TIP/TIP-4/1"},"TIP-4.1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.venom.foundation/standards/TIP/TIP-6/1"},"TIP-6.1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://eips.ethereum.org/EIPS/eip-2981"},"Ethereum EIP-2981"))))}d.isMDXComponent=!0}}]);