---
sidebar_position: 1
sidebar_label: Tokens and Assets
slug: /learn/tokens-and-assets
---

# Tokens and Assets

## VENOM

Venom is the native currency of the Venom network, similar to how ETH is the native currency of the Ethereum blockchain.

The smallest transferable VENOM unit is Nano VENOM.

| Unit       | Decimal Places | Conversion to NANO VENOM | Conversion to VENOM |
| ---------- | -------------- | ------------------------ | ------------------- |
| NanoVENOM  | 0              | 1                        | 0.000000001         |
| MicroVENOM | 3              | 10^3                     | 0.000001            |
| MilliVENOM | 6              | 10^6                     | 0.001               |
| VENOM      | 9              | 10^9                     | 1                   |

## VENOM utility

The Venom currency has practical uses such as paying for transaction fees to maintain the network by validators, securing the network through POS mechanisms, and supporting validators by network participants through DePools staking.

## Token standards

### TIP-3. Fungible token <a href="#fungible-assets" id="fungible-assets"></a>

:::info
If you need to create your own fungible token in the Venom network follow this [Guide](../../build/development-guides/how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network.md)
:::

Just as ERC-20 is the most widely-used standard in the Ethereum network, TIP-3 serves the same purpose in the Venom network. TIP-3 is designed to align with the distributed system architecture of the Venom network, and is cost-efficient for its fee-paying model.

TIP-3 provides the following functionalities:

* Transfer tokens from one account to another
* Obtain the current token balance of an account
* Retrieve the total supply of the token available on the network
* Mint and burn tokens

### TIP-4. Non-Fungible <a href="#non-fungible-assets" id="non-fungible-assets"></a>

The TIP-4 standard describes the second most widely used type of token as NFT. Specifically designed for the architecture of the Venom network, the TIP-4 standard provides an optimal way to create, exchange, and trade non-fungible tokens.

## Wrapped Venom (WVenom)

Testnet Address: `0:2c3a2ff6443af741ce653ae4ef2c85c2d52a9df84944bbe14d702c3131da3f14`

#### Why do we need WVenom token?

If you are a regular user of DeFi protocols, you will likely not experience direct ownership of the VENOM token. As protocols typically handle the process of wrapping the VENOM token behind the scenes, you don't have to concern yourself with it.

#### Why do they do it?

Venom is the native token of the Venom blockchain, and WVENOM is a TIP-3 standard token implemented in smart contract code. DeFi protocols only support TIP-3 for ease of implementation and general compatibility, in this aspect, the Venom network follows the prevalent practice in most blockchains.

For example, a swap on a DEX in the VENOM -> USDT pair will appear as a process in which VENOM first wraps into WVENOM, and then WVENOM changes to USDT.

#### Is this not the actual VENOM?

WVENOM is a fungible TIP-3 token, issued 1 to 1 with the VENOM token. You always have the option to convert your WVENOM back to VENOM.
