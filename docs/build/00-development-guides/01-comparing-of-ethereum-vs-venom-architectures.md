---
sidebar_position: 1
sidebar_label: Comparing of Ethereum vs Venom architectures
---

# Comparing of Ethereum vs Venom architectures

Most likely you are familiar with EVM-based blockchains like Ethereum, and you need to migrate your experience from EVM-based blockchain to Venom. This article touches most important things about the difference between two networks.

## EVM as the "Global Computer" vs Infinity Sharding Protocol

First, let's see why the world needed a different virtual machine than EVM.

A blockchain virtual machine is working like a distributed state machine. A state, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code. The specific rules of changing state from block to block are defined by the VM.

EVM is designed like a "global computer", but only one computer for everything in the world and the world is competing for its computing resource. Any EVM-based network inherits concurrency challenges. When validators need to reconstruct the current state, each validator must re-execute, in sequential, one-at-a-time order, every call to every account and smart contract. It follows that we have very expensive computing, even for simple tasks like a swap or a transfer token. Because a transaction of token transfer competes with a transaction to mint NFT and all other transactions that were sent to the network at the same time.

In the real world, we have many computers with modern multicore architectures for different tasks. You can send an email to your friend while your computer is compiling the code and doing many other things.

Venom works like a multicore system as opposed to an EVM-based network. TVM is designed as a distributed computing system with the scalability opportunity through infinity sharding. This means that Venom can share tasks between groups of validator nodes called "a validator task group" (similar to processor cores) depending on the load, and one part of the tasks don't need to wait for other tasks to be completed. For this reason, all interactions between system participants (accounts, smart contracts) are asynchronous, one participant doesn't need to wait for another.

More details about Infinity Sharding Protocol

## Synchronous vs Asynchronous Communication

Another important difference between Venom and EVM-based networks is the way of communication between accounts (smart contracts). An EVM-based network transaction is an atomic unit and all transactions are executed individually and serially (atomically) by the miner when constructing a block. When one contract calls another contract, it actually means one continuous process executing bytecode with the state of accounts. Therefore, each next transaction relies on the completion of the previous one, regardless they are accessing the same account state or not. This way of executing transactions is synchronous, all transactions are processed in "the main program flow".

Venom by design has an asynchronous model of communication between accounts (and smart contracts). This is because of the need to maintain calls between contracts located in different shards, processed by different validator task groups. In this way each account (and smart contracts) has the only way to affect the state of some other account is by sending a message, the result of the execution of it will be a transaction. When you call a smart contract from another, it doesn't happen immediately. Your call creates an outbound message to a called smart contract and you must be expected to it will be executed in a current block or one of the next blocks. The order of execution of the outbound messages queue is guaranteed. But you can't predict the inbound messages queue in the external called contract, and what follows from this, then what state will the contract have at the time your message is processed.
