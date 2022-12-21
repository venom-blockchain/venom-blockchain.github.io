---
sidebar_position: 0
sidebar_label: Fungible tokens in Venom network
---

# Fungible tokens in Venom network

## Fungible token&#x20;

First, let's make sure we've chosen the right type of token for our purposes. In this article, we will implement the fungible token type. This type of asset is divisible, non-unique, and interchangeable, i.e. one unit is equivalent to any other unit of this asset.&#x20;

:::info
If you need to implement a different one of the most popular token types is NFT (Non-fungible token), follow [this](../how-to-create-your-own-non-fungible-tip-4-token/non-fungible-tokens-in-venom-network) article
:::

Venom network uses the standard of fungible tokens [TIP-3](../../../standards/TIP-3/core-description.md)

### What is TIP-3?

Just as ERC-20 is the most popular standard in the Ethereum network, TIP-3 assumes the same role in the Venom network. TIP-3 was designed to match the distributed system design of the Venom network and is cost-effective for its fee-paying model.

TIP-3 provides the following functionalities

* transfer tokens from one account to another
* get the current token balance of an account
* get the total supply of the token available on the network
* mint and burn tokens

### Some words about differences with ERC20

![ERC20 concept simple scheme](<./assets/erc20.svg>)

As you may know, the ERC20 contract's main value is balance mapping. So users just have records about their balances and work only with this contract. TIP-3 working flow is different because of the asynchronous nature of TVM. Each user has his own wallet and operates with it. Wallet operates with another wallet for transfers (see scheme).

![TIP-3 concept simple scheme](<./assets/tip3.svg>)

Safety of `TokenWallet - TokenWallet` interaction is provided by address calculation mechanics. Each contract in Venom Blockchain can store some contract code and can calculate an address by using some state variables. Next, this address can be compared with `msg.sender` address. If it is the same - the call is safe and correct. We will look through this mechanic in detail [later](../developing-of-simple-voting-system/venom-in-action/voting-system-contracts.md).
