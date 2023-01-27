---
sidebar_position: 2
sidebar_label: Architecture
slug: /learn/architecture
---

# Architecture

The Venom platform's architecture is built as a heterogeneous multi-blockchain system with dynamic sharding capabilities.

## Components

### Masterchain

The masterchain is a layer-0 blockchain, which is responsible for coordinating all the protocol entities such as the workchains and shardchains. The masterchain state stores the network configuration, information about a set of validators, their stakes, and election rounds. Blocks of the masterchain contain the shards configuration and the latest block hashes of the corresponding shardchains. Blocks of the masterchain are produced by the global validators set.

![Architecrture](../../../static/img/architecture.jpeg)

### Workchains

A workchain is a specialized layer-1 blockchain that is secured by the global validators set.

:::info
Venom supports up to 2^32 workchains
:::

Based on masterchain security, a workchain may have its own state transition function, virtual machine, cryptographic primitives, transaction or block structures and native cryptocurrencies.

In this respect, the Venom Blockchain is heterogeneous. For example, one of the workchains can implement the NFT gaming network while another could be created as a DeFi hub based on EVM. Each workchain runs within the Venom environment and is secured by its consensus of masterchain validators.

### Shardchain

Shardchains can be thought of as separate processing units, each with its own private memory space for executing computations.

:::info
Each workchain can be further divided into up to 2^60 shardchains
:::

In this context, "memory space" refers to the range of addresses where smart contracts are stored on the blockchain. Each shardchain is assigned a specific range of contract addresses and is responsible for executing transactions only for those contracts within that range.

This improves network performance by allowing computations to be done simultaneously among groups of validators.

## Dynamic sharding

Initially, the Venom network has only one shardchain, which covers all smart contract addresses of the workchain. Validators from the global validators set produce blocks for this shardchain.

### Split event

When the volume of transactions increases (if the shardchain blocks have been at least 90% full for 64 consecutive blocks), validators will produce a block with a "want split" flag. This flag alerts the global set of validators to select subsets of validators to handle a specific range of addresses within the shardchain. These subsets are rotated and are predetermined, so that each validator knows which shards they will be responsible for validating.

A shardchain is always divided into two shardchains, each gets a binary prefix in its address.

Validator groups produce blocks for a shardchain approximately simultaneously, after which it takes about a second for the masterchain block to be released, which includes the hashes of the shardchain blocks. The shardchain block included in the masterchain block is considered to be finalized and the system relies on its immutability. A masterchain block containing references to blocks of all shardchains represents the system's overall state and can be used as an indicator of updating the state of the blockchain.

### Merge event

When the volume of transactions decreases (if for 64 consecutive blocks, the combined size of the two blocks of sibling shardchains does not exceed 60% of the maximum block size), validators will produce a block with a "want merge" flag. This flag instructs the subset of validators to become validators for the merged shardchain. They include a "merge commit" flag in the headers of their shardchain blocks and stop creating new blocks in separate shardchains.
