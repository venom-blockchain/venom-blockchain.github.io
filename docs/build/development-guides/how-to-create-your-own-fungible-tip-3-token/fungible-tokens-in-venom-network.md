# Fungible tokens in Venom network

## Fungible token&#x20;

First, let's make sure we've chosen the right type of token for our purposes. In this article, we will implement the fungible token type. This type of asset is divisible, non-unique, and interchangeable, i.e. one unit is equivalent to any other unit of this asset.&#x20;

:::info
If you need to implement a different one of the most popular token types is NFT (Non-fungible token), follow [this](../how-to-create-your-own-non-fungible-tip-4-token/non-fungible-tokens-in-venom-network) article
:::

Venom network uses the standard of fungible tokens TIP-3

### What is TIP-3?

Just as ERC-20 is the most popular standard in the Ethereum network, TIP-3 assumes the same role in the Venom network. TIP-3 was designed to match the distributed system design of the Venom network and is cost-effective for its fee-paying model.

TIP-3 provides the following functionalities

* transfer tokens from one account to another
* get the current token balance of an account
* get the total supply of the token available on the network
* mint and burn tokens

### Some words about differences with ERC20

![ERC20 concept simple scheme](<../../../../static/img/erc20.svg>)

As you may know, ERC20 contract main value is a balances mapping. So users just have a records about their balances and works only with this contract. TIP-3 working flow is a different because of async nature of TVM.

![TIP-3 concept simple scheme](<../../../../static/img/tip3.svg>)

Safety of `TokenWallet - TokenWallet` interaction is provided by address calculation mechanics. Each contract in Venom Blockchain can store some contract code and has a possibility to calculate an address by using some state variables. Next, this address can be compared with msg.sender address. And if it same - the call is safety and correct. We will look through this mechanic in details [later](../developing-of-simple-voting-system/voting-system-contracts.md).

<todo: standard link>
