---
sidebar_position: 0
sidebar_label: Non-Fungible tokens in Venom network
---

# Non-Fungible tokens in Venom network

Non-fungible tokens aka NFT are unique cryptographic tokens that exist on a blockchain and cannot be replicated. Non-fungible is an economic term that you could use to describe things like your picture, a song file, or even your furniture. These things are not interchangeable with other items because they have unique properties.

:::info
Follow [this](../how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network) guide to explore another type of blockchain tokens - fungible tokens
:::

Venom network uses the standard of fungible tokens [TIP-4](../../../standards/TIP-4/core-description.md)

## What is TIP-4?

Same to Ethereum ERC-721 standard, TIP-4 provides similar functionality for Venom Blockchain. As well as TIP-3, TIP-4 was designed to match the distributed system design of the Venom network. It is cost-effective for its fee-paying model.

TIP-4 provides the following functionality:

* minting and burning NFTs
* transferring NFTs from one account to another
* selling your NFTs

## ERC721 differences

ERC721 generally is a monolith smart contract, which stores mapping, that shows token owners by token ids. Tokens metadata can be stored here too in another mapping or you can store only `tokenUri` (mapped the same way - by token ids), which can help you to reach token metadata.

![ERC721 concept simple scheme](<../../../../static/img/erc721.svg>)

TIP-4 consists of collection contract and personal contracts for each non-fungible token. As a result, users own the concrete amount of NFT contracts, that stores metadata.

![TIP-4 concept simple scheme](<../../../../static/img/tip4.svg>)
