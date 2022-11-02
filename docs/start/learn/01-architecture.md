---
sidebar_position: 1
sidebar_label: Architecture
slug: /learn/architecture
---

# Architecture

Venom architecture is designed as a heterogeneous multi-blockchain platform with dynamic sharding.

## Components

### Masterchain

The masterchain is a layer-0 blockchain, which is responsible for coordinating all the protocol entities such as workchains and shardchains. The masterchain state stores the network configuration, information about a set of validators, their stakes, and election rounds. Blocks of the masterchain contain the shards configuration and the latest block hashes of the corresponding shardchains. Blocks of the masterchain are produced by the global validators set.

![](../../../static/img/architecture.jpeg)

### Workchains

A workchain is a specialized layer-1 blockchain that is secured by the global validators set.

:::info
Venom supports up to 2^32 workchains
:::

Based on masterchain security, a workchain may have its own state transition function, virtual machine, cryptographic primitives, transaction or block structures, and native cryptocurrencies.

In this respect, the Venom Blockchain is heterogeneous. For example one of the workchains can implement ZK rollups and another can be created as a DeFi hub based on EVM, each one runs in the Venom environment and is secure by its consensus of masterchain validators.

### Shardchain

Shardchains can be thought of as processor cores, each one of these cores can execute computations with its own private memory space.

:::info
Each workchain can be turn subdivided into up to 2^60 shardchains
:::

Memory space in this case means a range of addresses to smart contracts stored in the blockchain. Each shardchain is responsible for a defined range of contract addresses and executes transactions only for these smart contracts.

This has a positive impact on network performance by parallelizing computations between groups of validators.

## Dynamic sharding

Initially, the Venom network has only one shardchain, which covers all smart contract addresses of the workchain. Validators from the global validators set produce blocks for this shardchain.

### Split event

When the transaction load increases (if for 64 consecutive blocks the shardchain blocks are at least 90% full), then validators produce the block with a "want split" flag. This flag tells the global set of validators to select a subset of validators that will be responsible for executing transactions for a specific range of addresses belonging to shardchain. These subsets are rotated and they are known in advance so that every validator knows which shards it will need to validate.

A shardchain is always divided into two shardchains, each gets a binary prefix in its address.

Validator groups produce blocks for a shardchain approximately simultaneously, after which it takes about a second for the masterchain block to be released, which includes the hashes of the blocks of shardchains. The shardchain block included in the masterchain block is considered finalized and the system relies on its immutability. A masterchain block containing refs to blocks of all shardchains represents the system's overall state and can be used as an indicator of updating the state of the blockchain.

### Merge event

When the transaction load decreases (if for 64 consecutive blocks the sum of the sizes of the two blocks of sibling shardchains does not exceed 60 % of the maximal block size), then validators produce the block with a "want merge" flag. This flag tells the subset of validators to become validators for the merged shardchain. They commit a “merge commit” flag in the headers of blocks of their shardchain and stop creating new blocks in separate shardchains.
