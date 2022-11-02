---
sidebar_position: 0
sidebar_label: Network Maintainers
slug: /maintain/network-maintainers
---

# Network Maintainers

Welcome to the Venom Maintainers section. Maintainers are very important participants in the Venom Network, maintaining the security, performance, and availability of the network for other participants.

### Validator

The validator maintains the security of the network by staking its VENOM and commits to participate in consensus with other validators. The Validator follows the Catchain consensus algorithm, proposes a candidate block, and has voting for a candidate block proposed by other validators. When the voting threshold is reached, the proposed block is included in the chain. For this purpose, there is an overlay network between validators, which is created by rules described by the ADNL protocol.

A validator is incentivized to participate in block producing since each included block gives a reward.

There is a special role played by masterchain validators, which maintains the security of the masterchain network. By producing master-blocks, they allow a shardchain to share messages, the state of contracts, and the network sharding config with other shardchains.

:::info
If you want to know how to become a Validator then follow the next article broken-reference
:::

### Delegator

Delegators are important participants in the decentralization of the network. By staking to the validators they increase the network security and tell the Elector's algorithm which validators should advance to the next round. In this way, low stake validators who are trusted by the community are able to raise funds in their pools to become validators.

![](../../../static/img/pools.png)

Since Venom is not a nPoS-based blockchain, any participant with enough can become a validator, even if not nominated by other participants.

The validator shares the rewards, in VENOM token, with delegators, depending on their shares, but also shares the risks. If the validator node was offline, at the moment when it was participating in the validation, the algorithm can punish it by slashing it. In this case, the delegator's stake also can be slashed.

### Links

* How to become a validator \[soon]
* Discord validators chat \[soon]
