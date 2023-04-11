---
sidebar_position: 6
sidebar_label: Messages and Transactions
slug: /learn/messages-and-transactions
---

# Messages and Transactions

All interactions with the Venom network are carried out through messages.

### Prerequisites

To help you better understand this page, we recommend you first read [Accounts](accounts.md).

## Message

A message sent to an account triggers the creation of a transaction that modifies the account's state. The message includes instructions for executing a smart contract (an account).

### Message types

The Venom network has three different types of messages:

**Inbound external message:** a message sent from outside the blockchain into the blockchain. These messages don't have a 'from' address and can be sent by regular users, external services and any participants outside the blockchain, known as "messages from nowhere". Inbound external messages initiate changes to the state of the blockchain.

The external message can not be the value-bearing message from one participant to another, it only can declare intent to transfer value to another account.

**Internal message:** a message sent from one contract to another. Like an inbound external message, it updates the state of the Venom network.

Only an Internal message can be a value-bearing message.

**Outbound external message:** Known as a "_message to nowhere_" or "_event_". This is a message that can be emitted by a smart contract. Off-chain participants can subscribe to events within the Venom network and receive them.

![Messages](<../../../static/img/messages.png>)

### Message structure

A message consists of such parts as '_header'_ and '_body'._

The header contains the information about a sender, receiver, value, and the information necessary required by the validator to apply the message to the block.

The message body comprises the payload of virtual machine instructions that are necessary to execute the smart contract.

### Transaction

A transaction is a direct result of the processing of exactly one inbound message by a recipient account code. When an inbound message is received by an account, it leads to the computation of the account's new state and the possibility of generating one or more outbound messages with the account serving as the source. The inbound message and the previous state of the account serve as inputs for the transaction, while the generated outbound messages and the next state of the account serve as outputs. This relation can be represented as a Directed Acyclic Graph (DAG).

![Messages](<../../../static/img/transactions.png>)

### Transaction phases

A transaction is a multi-step process composed of several distinct phases, each with its specific purpose. Each phase is a logical step in the message execution and may either complete successfully or result in an error. If an error occurs, the next stage not be executed.

The purpose of the credit phase is to add the value of the received internal message to the account's balance.

**The storage phase** is responsible for collecting storage payments for the account state, which includes the smart contract code and data. The storage phase is absent if the transaction is sent to deploy a new smart contract, which did not exist before. During this phase, the smart contract may be frozen if its balance is insufficient to pay the storage fee.

**The computing phase** is where the smart contract code is invoked inside an instance of TVM with appropriate parameters, including the inbound message and the account's persistent data. This phase terminates with an exit code, new persistent data, and an action list, which includes outbound messages to be sent. The processing phase may lead to creating a new account (uninitialized or active) or activating a previously uninitialized or frozen account. The gas payment, equal to the product of the gas price and the gas consumed, is exacted from the account balance.

**The action phase** is where the actions from the action list are performed if the smart contract is terminated successfully (with exit code 0 or 1). Suppose it is impossible to perform all the actions, for example, because of insufficient funds to transfer with an outbound message. In that case, the transaction is aborted, and the account state is rolled back.

**The Bounce phase** is triggered when a transaction is aborted, and the inbound message has its bounce flag set. This phase involves automatically generating an outbound message, with the bounce flag clear, and sending it back to the original sender. The value of the original inbound message, minus any gas payments and forwarding fees, is transferred to this generated message, which has an empty body.

The execution of a transaction requires payment of various types of fees. Each kind of fee serves a purpose, such as incentivizing validators to maintain the correct operation of the network, perform transaction execution, and store contract data on their nodes. Also, it serves as a measure to restrict spamming and malicious attempts to slow down the network.

Note an external message is not a value-bearing message. Only an internal message can transfer value between accounts and increase its balance in the credit phase, and only after that are all fee payments due from the account balance.

