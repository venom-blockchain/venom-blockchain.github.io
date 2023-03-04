---
sidebar_position: 0
sidebar_label: Basic
---

# Fungible Token

## Abstract

The following standard describes the basic idea about distributed fungible token architecture.

## Motivation

The suggested standard differs considerably from Ethereum ERC20 and other smart contract token standards with single registry due to its distributed nature related to Venom blockchain particularities. Given that Venom has a storage fee, using an existing ERC20 standard design would cause excessive maintenance costs. Also, ERC20 is somewhat incompatible with the sharding architecture. Therefore, a Distributed Token standard is preferable.

The ERC20 sharding implementation (with an idea to simply shard its registry) has drawbacks mainly related to complicated and expansive management. TIP-3 is fully distributed and implies separate storage of each user’s balance.

## Architecture

General information about token is stored in the [token root](#token-root) contract. Each token holder has its own instance of [token wallet](#token-wallet) contract. Token transfers SHOULD be implemented in P2P fashion, between sender and receiver token wallets.

### Token root

Token root contract stores the general information about the token, e.g. name, symbol, decimals, token wallet code and so on.

### Token wallet

Each token holder has its own instance of token wallet contract. Transfer happens in a decentralized fashion - sender token wallet SHOULD send the specific message to the receiver token wallet. Since token wallets have the same code, it's easy for receiver token wallet to check the correctness of sender token wallet.

## References

:::info
The original [TIP-3](https://docs.everscale.network/standard/TIP-3) standard was developed and maintained by the Everscale network community.
:::

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [TIP3](https://forum.everscale.network/t/tip-3-distributed-token-or-ton-cash/64)
- [Reference implementation by Broxus](https://github.com/broxus/ton-eth-bridge-token-contracts)
