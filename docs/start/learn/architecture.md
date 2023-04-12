---
sidebar_position: 2
sidebar_label: Architecture
slug: /learn/architecture
---

import ImageSwitcher from './../../../src/components/ImageSwitcher'
import masterchain_dark from './assets/architecture/masterchain_dark.png';
import masterchain_light from './assets/architecture/masterchain_light.png';
import shardchains_dark from './assets/architecture/shardchains_dark.png';
import shardchains_light from './assets/architecture/shardchains_light.png';
import split_merge_dark from './assets/architecture/split_merge_dark.png';
import split_merge_light from './assets/architecture/split_merge_light.png';

# Architecture

The Venom blockchain is a heterogeneous multi-blockchain system with dynamic sharding capabilities.

## Masterchain

The masterchain is a layer-0 chain, facilitating coordination and communication among workchains, shardchains, and accounts. It is responsible for the message routing, maintaining the network configuration, and information about validators, their stakes, and election rounds. The masterchain stores and distributes the current shard configuration and the latest block hashes of each corresponding shardchain. It serves as the backbone of the Venom blockchain, providing a high level of security for all components connected to it.

The masterchain validators are incentivized to act honestly and secure the network by staking their tokens. Only a limited number of validators with the largest stakes are responsible for generating new masterchain blocks, even if a larger number of validators are running on the network. The rest of the validators will create new shardchain blocks, with each shardchain block being generated and validated by its group of validators.

Shardchains generate new blocks almost simultaneously, while a new block of the masterchain is generated roughly one second later as the masterchain block must include the hashes of the most recent blocks of all shardchains, which ensures that the blocks are finalized.

<ImageSwitcher
    lightImageSrc={masterchain_light}
    darkImageSrc={masterchain_dark}
    alt="Masterchain"
/>

## Workchains

A workchain is a specialized layer-1 blockchain secured by the global validators set. By being connected to the masterchain, workchains also benefit from its security, as the masterchain validators' efforts protect them.

Based on masterchain security, a workchain may have its own state transition function, virtual machine, cryptographic primitives, transaction or block structures, and native cryptocurrencies.

Each workchain can be customized to fit the specific needs and requirements of the application it hosts, providing greater flexibility for developers. Powered with the capability to customize their own commissions and set emission schemes, they will have complete control over their own economies. In this respect, the Venom Blockchain is heterogeneous.

This approach allows for horizontal scalability, as the workload is distributed across multiple independent domain-specific blockchains with their specific validator set. Workchains can lead to better performance, faster transaction processing, and improved overall network efficiency.

The Venom blockchain is designed as an open platform for developers to create and deploy their workchains to the Venom ecosystem.

### Basechain

At launch, The Venom blockchain consists of two networks: the Masterchain and the Basechain. The Basechain is the first layer-1 workchain for end-users, supporting dApps and serving as the platform for executing smart contracts. Both networks employ the Threaded Virtual Machine (TVM) for smart contract execution, with the Basechain offering lower storage and execution fees than the Masterchain.

### Workchain's Interoperability

Native cross-chain communication protocol enables workchains to interact with each other in a trustless manner without relying on third-party bridges or intermediaries. This allows for seamless workchains interoperability, enabling the transfer of data, assets, and value.

By using a cross-chain communication protocol for heterogeneous chains, the Venom blockchain can maintain interoperability between public and private networks, which opens up the possibility of creating powerful user cases:

**Public-to-Public** workchains are open for communication with each other and can maintain shared liquidity in, which means they can easily share value between networks. It is useful for DeFi applications, such as decentralized exchanges, cross-chain lending, and more.

**Private-to-Private** workchains are suitable for CBDC and crypto payments where privacy and compliance are essential. These workchains are generally closed to public exploration and can be operated by a single organization or consortium. Private-to-Private can securely and privately serve sensitive data and transactions, such as financial and personal information.

**Public-to-Private** workchains enable the creation of a system where two types of assets are strongly connected. The first, protected by regulation and compliant, is within private networks, while the second, transparent and participating in open DeFi markets, exist on public networks.

Blockchain interoperability provides numerous benefits, including the ability to create customizable Web3 services by mixing and matching different protocols and applications. This allows for the creation of entirely new instruments and platforms that were previously impossible with legacy industries and business models of the Web2 era.



## Shardchain

Shardchains can be thought of as separate processing units, each with its own private memory space for executing computations.

In this context, "memory space" refers to the range of addresses where smart contracts are stored on the blockchain. Each shardchain is assigned a specific range of contract addresses and is responsible for executing transactions only for those contracts within that range.

A shardchain is a smaller slice of a blockchain state responsible only for a subset of accounts defined by a binary prefix. Each range is validated by a group of validators responsible for processing a specific subset of transactions only for that range.

Initially, all transactions are processed by one group of validators belonging to a shardchain Ø. However, as the number of transactions increases and the shardchain becomes overloaded, the network triggers a split event in which the shardchain is divided into two shardchains. Then if the load on some shardchain is high, these shardchain may be further divided until the load is appropriately distributed. If the load on the network decreases, the network can trigger a "merge event" in which the shardchains are merged back into one shardchain.

<ImageSwitcher
    lightImageSrc={shardchains_light}
    darkImageSrc={shardchains_dark}
    alt="Shardchains"
/>

## Dynamic sharding

Splitting and distributing a large database into smaller chunks, known as "shards," is a common practice used in database management. This approach, called database sharding, improves efficiency and scalability by distributing the database across multiple machines in parallel.

Similarly, in The Venom blockchain, sharding is used to split the execution of smart contracts into smaller threads, or "shards," which are then processed by different validator groups in parallel. Unlike database sharding, where the data is split and distributed across multiple machines, in computation sharding, the dataset remains common to all "shard validators," but they are responsible for executing different threads of the computation.

The Dynamic Sharding Protocol is a key feature of the Venom blockchain that is a solution that enables the network to dynamically adjust the number and size of shards to meet the needs of the current load.

### Split event

Split event is announced several blocks in advance, first in the headers of the corresponding shardchain block and then in the masterchain block that refers to this shardchain block. If for 100 seconds (~50 blocks currently), the shardchain blocks are at least 90% full. Note that these values are configurable and may be tuned in Masterchain.

This way, all parties concerned can prepare for the planned change and make necessary adjustments. A subset of validators from a global set of validators is selected to be responsible for executing transactions for a specific range of addresses belonging to the shardchain. This subset is rotated, and they are known in advance so that every validator knows which shards it will need to validate. Finally, the split is committed into the shardchain block and is propagated to the masterchain block, updating the shard configuration of the network. A limited number of validators are selected to validate a single shard. When a shard is split into two shards, an additional group of validators is chosen from the overall validator set to ensure that performance and security are not compromised. This allows for more efficient use of resources and concurrent and parallel transaction processing, staying secure.

A shardchain is always divided into two shardchains, each gets a binary prefix in its address.

<ImageSwitcher
    lightImageSrc={split_merge_light}
    darkImageSrc={split_merge_dark}
    alt="Split and Merge events"
/>

Validator groups produce blocks for a shardchain approximately simultaneously, after which it takes about a second for the masterchain block to be released, which includes the hashes of the shardchain blocks. The shardchain block included in the masterchain block is considered to be finalized and the system relies on its immutability. A masterchain block containing references to blocks of all shardchains represents the system's overall state and can be used as an indicator of updating the state of the blockchain.

### Merge event

Merge event is determined by monitoring the sum of the sizes of the two blocks of sibling shardchains, and if, for 100 seconds (~50 blocks currently), this sum does not exceed 60% of the maximal block size, the validators will produce a block with a "want merge" flag. Note that these values are configurable and may be tuned in Masterchain. This flag tells the subset of validators responsible for the two shardchains to merge together into one shardchain. The validators will commit a "merge commit" flag in the headers of the blocks for their respective shardchains and then stop creating new blocks in the separate shardchains. The combined blocks and transactions from each of the two sibling shardchains are then used to create a new state for the merged shardchain. This allows the system to reduce the number of shardchains to match the current load, improve the efficiency and reduce costs associated with maintaining multiple shardchains.
