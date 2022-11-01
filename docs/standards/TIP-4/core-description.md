---
title: Core description
sidebar_position: 0
slug: /standard/TIP-4
---

# Non-Fungible Token

## Abstract

The following standard describes the basic idea of distributed non-fungible token architecture.

## Motivation

The suggested standard differs considerably from Ethereum ERC721 and other smart contract token standards with single registry because of its distributed nature related to Everscale blockchain particularities.
Given that Everscale has a storage fee, TIP4  is fully distributed and implies separate storage of each NFT.

## Architecture

General information about NFT collection is stored in the NFT collection contract. Each NFT deployed in separate smart contracts and links to NFT collection contract Smart contract architecture based on:

- Consider asynchronous type of Everscale blockchain. Use callbacks and asynchronous getters;
- Standardizes one NFT - one smart contract. 
- Gas fee management practicals. 
- Use [TIP-6.1](./../TIP-6/1.md)

## (Status:Review) [Non-Fungible Token (TIP-4.1)](./../TIP-4/1.md)
General information about NFT collection and NFT tokens. All NFT must implement [TIP-4.1](./../TIP-4/1.md)

##  (Status:Review) [Non-Fungible Token JSON Metadata (TIP-4.2)](./../TIP-4/2.md)
General information about NFT metadata. [TIP-4.2](./../TIP-4/2.md) is optional, but can be used for displaying NFT on marketplaces, wallets and web.

##  (Status:Review) [On-chain indexes (TIP-4.3)](./../TIP-4/3.md)
On-chain Indexes solves easy and fast searching any data in blockchain. [TIP-4.3](./../TIP-4/3.md) is optional, but can be use for find all your NFT with one [dApp](https://main.ton.dev/graphql) query.

##  (Status:Draft) [On-chain storage (TIP-4.4)](./../TIP-4/4.md)
Using the Storage contract, you can store NFT-related bytes in blockchain. [TIP-4.4](./../TIP-4/4.md) is optional, but can be used for fault tolerance. If off-chain services are unavailable, the user will view NFT-related bytes, because it is stored on-chain.

##  (Status:Draft) [Don't Be Evil NFT licensing (TIP-4.5)](./../TIP-4/5.md)
The standard adds the support of [Can't Be Evil NFT licenses](https://github.com/a16z/a16z-contracts) [introduced](https://a16zcrypto.com/introducing-nft-licenses/) by [Andreessen.Horowitz](https://a16z.com). [TIP-4.5](./../TIP-4/5.md) is optional, but can be used for clarifying the legal basis of NFT usage by the owner.


## Authors
| Author                                          | Command                                  |
|-------------------------------------------------|------------------------------------------|
| [Aleksand Aleksev](mailto:rualekseev@gmail.com) | [grandbazar.io](https://grandbazar.io)   |
| Aleksandr Khramtsov                             | [broxus](https://broxus.com/)            |
| Vladislav Ponomarev                             | [broxus](https://broxus.com/)            |
| [Andrey Nedobylskiy](https://t.me/nedobylskiy)  | [svoi.dev](https://svoi.dev)             |
| [Anton Platonov](https://t.me/SuperArmor)       | community member                         |
| [Nikita](https://t.me/kokkekpek)                | [numiz.org](https://numiz.org/)          |
| [Oleg Varnov](https://t.me/id_xz)               | [numiz.org](https://numiz.org/)          |
| Slava Semenchuk                                 | [scalepunks.com](https://scalepunks.com) |


## Implementation

[itgold](https://github.com/itgoldio/everscale-tip) implementation

- MIT licensed.
- A library of modular, reusable  smart contracts.
- Samples and tests [here](https://github.com/itgoldio/everscale-tip-samples)

## References

- [Ethereum EIP-721](https://eips.ethereum.org/EIPS/eip-721)
- [Solana v1.2.0](https://docs.metaplex.com/token-metadata/specification)
- [TON NFT](https://github.com/ton-blockchain/TIPs/issues/62), [TON DATA](https://github.com/ton-blockchain/TIPs/issues/64)
- [Tezos TZIP12](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md)
