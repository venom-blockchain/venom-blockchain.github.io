---
sidebar_position: 0
sidebar_label: Network Maintainers
slug: /maintain/network-maintainers
---

# Network Maintainers

Welcome to the Venom Maintainers section. Maintainers are very important
participants in the Venom Network, maintaining the security, performance, and
availability of the network for other participants.

## Validator

The validator plays an essential role in maintaining the security of the network through staking Venom tokens and actively participating in consensus with other validators. Using the Catchain algorithm, the validator proposes candidate blocks and votes on blocks proposed by other validators. Once the voting threshold is reached, the proposed block is added to the chain. This process is facilitated by an overlay network created by the ADNL protocol, which connects the validators.

Validators are incentivized to participate in the block production process because each included block provides a reward.

Masterchain validators also play an essential role in maintaining the security of the masterchain network. Through the creation of master-blocks, they enable shardchains to share messages, the state of contracts, and the network sharding configuration with other shardchains.

:::info
If you want to know how to become a Validator, [Click Here](../maintain/how-to-become-a-validator.md)
:::

## Delegator

Delegators play an important part in the decentralization of the network. By staking to validators, they enhance network security and offer direction to the Elector's algorithm on which validators should move forward to the next round. This enables low stake validators who are well-regarded by the community to accumulate funds in their pools and become validators.

![Pools](../../../static/img/pools.png)

Since Venom is not an nPoS-based blockchain, any participant with enough tokens can become a validator, even if they haven't been nominated by other participants.

Validators share rewards in Venom tokens with delegators based on their shares, but they also share risks. If a validator node is offline during validation, the algorithm may penalize them by slashing their stake. In this case, the delegator's stake may also be reduced.
