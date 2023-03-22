---
sidebar_position: 1
sidebar_label: Comparing Ethereum vs. Venom architectures
---

# Comparing of Ethereum vs. Venom architectures

Most likely, you are familiar with EVM-based blockchains like Ethereum, and you need to migrate your experience from EVM-based blockchain to Venom. This article touches most important things about the difference between the two networks.

## EVM as the "Global Computer" vs. TVM with the Dynamic Sharding protocol

First, let's see why the world needed a different virtual machine than EVM.

A blockchain virtual machine works like a distributed state machine. A state, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code. The VM defines the specific rules of changing state from block to block.

EVM is designed like a "global computer," but only one computer for everything in the world, and the world is competing for its computing resource. Any EVM-based network inherits concurrency challenges. When validators need to reconstruct the current state, each validator must re-execute every call to every account and smart contract in sequential, one-at-a-time order. We have very expensive computing, even for simple tasks like a swap or a transfer token. Because a transaction of token transfer competes with a transaction to mint NFT and all other transactions that were sent to the network simultaneously.

In the real world, we have many computers with modern multicore architectures for different tasks. You can email your friend while your computer compiles the code and does many other things.

The Venom blockchain works like a multicore system instead of an EVM-based network. TVM is designed as a distributed computing system with the scalability opportunity through dynamic sharding. This means that The Venom blockchain can share tasks between groups of validator nodes called "a validator task group" (similar to processor cores) depending on the load. One part of the tasks don't need to wait for another tasks to be completed. For this reason, all interactions between system participants (accounts, aka smart contracts) are asynchronous, one participant doesn't need to wait for another.

To learn more about the architecture of the Venom blockchain, please follow [the link](./../../start/learn/architecture.md) provided.

## Synchronous vs. Asynchronous Communication

Therefore, an important difference between TVM-based and EVM-based networks is the communication between accounts (smart contracts). An EVM-based network transaction is an atomic unit, and all transactions are executed individually and serially (atomically) by the validator when constructing a block. When one contract calls another, it means one continuous process executing bytecode with the state of all accounts. Therefore, each next transaction relies on the completion of the previous one, and regardless they are accessing the same account state or not. This way of executing transactions is synchronous; all transactions are processed in "the main program flow."

TVM, by design, has an asynchronous communication model between accounts (aka smart contracts). This is because of the need to maintain calls between contracts in different shards processed by different validator task groups. In this way, each account has the only way to affect the state of some other account by sending a message. When an account receives an inbound message, it triggers the computation of the account's new state and the possibility of generating one or more outbound messages, with the account serving as the source. The inbound message and the previous state of the account serve as inputs for the transaction, while the generated outbound messages and the next state of the account serve as outputs.

This makes the transaction processing in TVM more efficient because it is not necessary to update the state of all accounts when executing each transaction. Instead, each account processes only the messages that are addressed to it, allowing for parallel processing of multiple transactions and increasing the transaction processing speed.

You can find additional information regarding messages and transactions by clicking on the following link [here](./../../start/learn/messages-and-transactions.md).

## Gas Model and Fees

In Ethereum, the gas model is used to limit the number of computational steps that a transaction can perform. Users pay gas fees for each transaction they send, and these fees are paid in the native currency of the network, Ether (ETH). The fees are determined by the amount of gas used by a transaction, and the gas price, which fluctuates according to network demand.

On the other hand, in Venom, the fee calculation is based on a combination of gas, data storage, and forward message fees. The user decides how much VENOM to attach as payment fees from their contract account for the call, and this value is the upper limit for the cost of executing the call chain for the user.

By including data storage fees in the fee calculation, Venom incentivizes efficient use of storage space on the network and encourages developers to design contracts that minimize storage usage. This helps to prevent network congestion in long term.

Additional information regarding gas and fees can be found [here](./../../start/learn/gas-and-fees.md).

## Smart Contract Languages

Ethereum primarily uses Solidity as its smart contract language. Solidity is a statically-typed, contract-oriented programming language designed specifically for writing smart contracts on the Ethereum platform. It has gained widespread adoption due to its ease of use and familiarity for developers coming from other programming languages.

T-Sol (Threaded-Solidity) is a high-level programming language designed explicitly for the TVM Actor Model utilized by the Venom blockchain. It provides built-in support for callbacks, fee management, managing actor states, message passing, and state isolation, all of which are critical features for the TVM platform's efficient and secure operation. As a language with the same syntax as Solidity, T-Sol is easy to use and understand for developers already familiar with Solidity.

TVM, however, does not rely on a single, smart contract language. The Threaded Virtual Machine (TVM) is designed to be language-agnostic, allowing developers to write smart contracts in multiple languages.

The Standards [section](./../../standards/VEP/readme.md) contains specifications of smart contract architectures that are specifically designed for the TVM asynchronous model.