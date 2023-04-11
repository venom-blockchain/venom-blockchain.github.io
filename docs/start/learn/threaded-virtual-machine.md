---
sidebar_position: 4
sidebar_label: Threaded Virtual Machine
slug: /learn/tvm
---

# Threaded Virtual Machine

The Venom blockchain provides a way for smart contracts to be executed on TVM (Threaded Virtual Machine), a Turing complete machine on the basis of its ability to execution of machine-level instructions.

Note Threaded Virtual Machine is used to execute smart-contract code in [the masterchain and basechain](architecture.md). Other workchains on the Venom blockchain may use other virtual machines instead of the TVM (e.g., EVM).

By design, TVM has an asynchronous model of communication between accounts. Each account can only affect the state of another account only by sending a message. It enables concurrent processing of multiple smart contracts, which can result in significant performance improvements compared to traditional virtual machines.

## The Actor Model in TVM

The Actor model is a mathematical model of concurrent computation that is often used in distributed systems and in programming languages such as Erlang. It is a way of organizing and structuring the behavior of concurrent processes or actors in a distributed system.

In this model, account of the Venom blockchain can be thought of as an actor. Like the actor, the account has a unique address, can send and receive messages, change its state, change its behavior (upgradability), and even spawn other accounts (initialization).

This model emphasizes the concept of message-passing concurrency, which allows for the isolation and parallelism of actors. As a result, it provides a way to handle the complexity of concurrent and distributed systems by breaking them down into simpler components that can be composed to form more complex systems.

TVM utilizes the actor model to handle interactions between accounts, which is different from how EVM-based networks operate. In EVM, transactions are executed one by one, and each must be completed before the next one can start. From the actor model's perspective, the way transactions are processed in EVM-based networks could be more efficient. This is because all smart contracts on the network are united into one state and can be considered as a single actor within the system, while only external actors (user, web service, any off-chain actor) are considered separate actors. High demand from external actors leads to delays and increases the cost of maintaining a network.

In contrast, the Venom blockchain uses an asynchronous communication model, where a message is a way for a sender to initiate an action on an account (smart contract) and potentially change its state. Messages are sent to accounts and contain instructions for the execution of a smart contract. Theoretically, each account can operate independently and interact with external actors separately from other accounts. However, to improve efficiency, accounts are grouped into shards as part of [the dynamic sharding protocol](architecture.md).

This approach allows contracts to execute in an asynchronous mode, where threads of execution can run in parallel and participants don't know about the current state of each other. TVM does not need to wait for calls between contracts located in different shards to be processed so long as no dependencies link those contracts.