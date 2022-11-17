---
sidebar_position: 2
sidebar_label: Tokens and Assets
slug: /learn/tokens-and-assets
---

# Tokens and Assets

## VENOM

Venom is the native currency of the Venom network, much like ETH is the native currency of the Ethereum blockchain.

The smallest transferable VENOM unit is Nano VENOM.

| Unit       | Decimal Places | Conversion to NANO VENOM | Conversion to VENOM |
| ---------- | -------------- | ------------------------ | ------------------- |
| NanoVENOM  | 0              | 1                        | 0.000000001         |
| MicroVENOM | 4              | 10^4                     | 0.00001             |
| MilliVENOM | 7              | 10^7                     | 0.01                |
| VENOM      | 9              | 10^9                     | 1                   |

## VENOM utility

The venom currency has utility purposes for paying the transaction fees of maintaining the network by validators, securing the network through POS mechanisms, and supporting validators by network participants through DePools staking.

## Token standards

### TIP-3. Fungible token <a href="#fungible-assets" id="fungible-assets"></a>

:::info
If you need to create your own fungible token in the Venom network follow this [guide](../../build/development-guides/how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network.md)
:::

Just as ERC-20 is the most popular standard in the Ethereum network, TIP-3 assumes the same role in the Venom network. TIP-3 was designed to match the distributed system design of the Venom network and is cost-effective for its fee-paying model.

TIP-3 provides the following functionalities

* transfer tokens from one account to another
* get the current token balance of an account
* get the total supply of the token available on the network
* mint and burn tokens

### TIP-4. Non-Fungible <a href="#non-fungible-assets" id="non-fungible-assets"></a>

The TIP-4 standard describes the second most popular type of token as NFT. Designed specifically for the architecture of the Venom network is built, the TIP-4 standard provides an optimal way to create, exchange, and trade non-fungible tokens.

## Wrapped Venom (WVenom)

Address: `0:28237a5d5abb32413a79b5f98573074d3b39b72121305d9c9c97912fc06d843c`

#### Why do we need WVenom token?

If you are a common user of DeFi protocols, you probably will not encounter direct ownership of the WVenom token. Since protocols usually do all the work of wrapping the Venom token behind the scenes, you don't have to worry about it.

#### Why do they do it?

Venom is the native token of the venom blockchain, and WVenom is a TIP-3 standard token implemented in the smart contract code. DeFi protocols only support TIP-3 for ease of implementation and general compatibility, in this aspect, the Venom network follows the practice prevailing in most blockchains.

For example, a swap on dex in the Venom -> USDT pair will look like a process in which Venom first wraps into WVenom, and then WVenom changes to USDT.

#### Isn't this the real Venom?

WVenom is a fungible TIP-3 token, issued 1 to 1 of the Venom token. You absolutely always have the possibility to unwrap your WVenom to Venom.
