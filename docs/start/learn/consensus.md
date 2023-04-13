---
sidebar_position: 3
sidebar_label: Consensus
slug: /learn/consensus
---

import ImageSwitcher from './../../../src/components/ImageSwitcher'
import validator_session_dark from './assets/consensus/validator_session_dark.png';
import validator_session_light from './assets/consensus/validator_session_light.png';
import validator_round_dark from './assets/consensus/validator_round_dark.png';
import validator_round_light from './assets/consensus/validator_round_light.png';

# Consensus

The primary goal of the consensus protocol is to provide a mechanism for all the parties involved in the network to reach an agreement on the current state of the blockchain and to ensure that all the transactions included in a block are valid and that the blockchain state is updated consistently and securely on all levels (shardchains, workchains, and masterchain).

## Overview

The Venom blockchain utilizes a Proof of Stake (PoS) consensus mechanism with The Byzantine fault-tolerant (BFT) algorithm to reach a consensus agreement between validators. This approach ensures network security and provides Sybil resistance.

The validator maintains the network's security by staking its VENOM tokens and committing to participate in consensus rounds with other validators. By staking their tokens, validators demonstrate a vested interest in the network's wellbeing and help to achieve Sybil resistance. The more tokens staked on the network, the more difficult it becomes for an attacker to create multiple identities and gain control over the network.

The validator proposes candidate blocks and votes on blocks proposed by other validators, utilizing the Byzantine fault-tolerant (BFT) algorithm to ensure a reliable consensus process. The protocol proceeds through a series of rounds, each with a set of validator nodes responsible for proposing, validating, and committing blocks. If a proposed block receives approval from 2/3 of the validator nodes, it commits to the blockchain. If the proposed block does not receive approval in a specific time, it is skipped, and the next round begins.

Consensus algorithms can be broadly divided into two classes: those that allow for the creation of multiple chains at the same time (forks) and those that do not allow for forks. In other words, a consensus may have probabilistic or deterministic finality.

Deterministic finality refers to the idea that once a transaction has been committed in a block and added to the blockchain, it is considered final and cannot be reversed. This is important for the security and integrity of the network, as it ensures that transactions cannot be altered once they have been recorded on the blockchain. For example, in the context of Bitcoin, a transaction is considered to be final only in probabilistic nature. The transaction's reverse probability decreases as more blocks are added to the chain after it.

The Venom Consensus Protocol belongs to the deterministic finality class of algorithms. It ensures the finality of transactions at the commitment stage. Using a BFT makes it almost improbable for forks to occur, as they can only happen in the event of incorrect behavior by a majority of validators.

### Delegated staking pools

Participants with minimum VENOM can participate in the validation process through delegated staking pools. This mechanism allows network participants to delegate their stake to other participants or organizations who will serve as validators. Token holders can stake their tokens in specific validators — the more tokens staked in a validator, the more weight it carries in the consensus voting process. It gives token holders a say in who becomes a validator by choosing which validator candidates to delegate their stake. This helps to ensure that the validator set is representative of the interests and goals of the broader community.

### Validator sets

There are three main types of validator sets:

**Overall validator set**. The weight-sorted validator list of all validators chosen to participate in the validation process.

**Masterchain validator set**. The list of validators with the largest stake is chosen from the overall validator set.

**Shardchain validator set**. The group of validators chosen from the overall validator set maintains block processing for a specific shardchain.

The protocol uses a round-robin role transfer system where validators take turns generating blocks to prevent a single group from monopolizing consensus. The consensus algorithm is executed by each shard using its group of validators.

## Components

The consensus protocol can be decomposed into several distinct components, each responsible for a specific protocol aspect:

1) **Election**: A selection of the overall validator set;  
2) **Block** **Generation**: A creation and verification of blocks;  
3) **Consensus**: A reaching consensus;  
4) **Message** **Passing** **Protocol**: A passaging messages between validators.

### Election

First, the consensus protocol must determine which participants are eligible to serve as validators through the election process. The smart contract implements a proof of stake-based election algorithm for selecting a weight-sorted validator list, where the stake determines the weight.

The election contract uses various factors to select validators, including the validator's stake size, the min/max number of validators allowed, the min/max stake size, and the maximum difference between the largest and smallest validator stakes. This accounting for these factors helps to ensure network security by maximizing the stake amount and the number of active validators.

The election process gives the overall validator set to start the validator session. The selected validator set generates blocs by following the consensus algorithm during the validator session.

#### The Validator Session

The Validator Session goes through several rounds of block generation. During block generation rounds, the validator executes the consensus algorithm, resulting in committing the elected block to the blockchain.

Validators will have several attempts to commit a valid block to the network before it is considered a failure, and the process must start over with new lead validators. During each attempt, a limited number of validators can propose a block for consideration by the rest of the network.

If a validator misses their turn or produces an invalid block, they may be punished by having their stake slashed.

<ImageSwitcher
    lightImageSrc={validator_session_light}
    darkImageSrc={validator_session_dark}
    alt="Validator session"
/>

### Block Generation

Before a validator proposes a block to the network, it must first collect and ensure that the block is well-formed and valid according to the block generation rules. These rules include the size of the block, the volume of transactions that can be included in a block, the time between blocks, the block header and transaction format, etc. The block generation component is ensured for creating and validating new blocks in a blockchain network.

### Consensus algorithm

Byzantine Fault Tolerant (BFT) algorithm is part of the block generation round and is responsible for reaching an agreement on block production.

The consensus process includes several stages of reaching an agreement:

1) **Candidate block generation**: Validators, which have block generation priority for the round, generate a new candidate block. The candidate is sent to the *Approve* phase to other validator nodes as soon as the candidate is generated.

2) **Candidate block approval**: The candidate block is collected and checked for corruption by each validator node. If a block is approved, it is signed for approval by each validator and broadcast to the network. A block is considered approved by a node when it receives more than 2/3 of the approval messages and goes to the *Vote* phase.

3) **Voting attempts**: Several voting attempts are carried out, each with a time limit. The lead validator for the attempt selects a candidate block for voting, and other nodes are notified. Each validator node then sets a block to vote for according to the leader validator's a proposed block. A validator is not required to vote for the proposed block and can choose a different one, but a priority block is preferred due to speed performance. If any approved block receives more than 2/3 of the total validator weights during the voting process, it becomes the candidate for signing (*pre-commit* block). If two attempts propose different pre-commit blocks, the latest one prevails.

4) **Block committing**: The signing begins as soon as a round attempt yields a pre-committed block. The validator that gets the pre-committed block in the current round signs it and broadcasts it to other validators. When a particular validator receives more than 2/3 signatures from other validators, it switches to the next round, and *commits* the signed block to the blockchain. If no block is committed in the current round, the round is considered failed, and the process moves to the next round.

<ImageSwitcher
    lightImageSrc={validator_round_light}
    darkImageSrc={validator_round_dark}
    alt="Validator round"
/>

### Message Passing Protocol

The message-passing protocol is the network-layer protocol used for communication and coordination among the validator nodes in the network. Validators use it to broadcast messages containing candidate blocks, approvals, votes, and signed blocks to other nodes in the network. It is also used to synchronize the validator session state among the nodes in the network. The message-passing protocol does not implement the consensus algorithm itself. However, it serves as a means of communication and coordination for the validator session higher-level component responsible for making decisions related to the consensus process.

*Note messages discussed in this section are not the same messages which accounts send to each other. Messages of this protocol are network-layer messages and don't have on-chain representation.*

The Message Passing Protocol gives a way to synchronize the chain's state and communicate to reach a consensus agreement.
