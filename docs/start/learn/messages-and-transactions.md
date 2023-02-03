---
sidebar_position: 4
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

A transaction is the result of executing a message. It is always linked to the message that generated it. A transaction includes information such as the target account, status, set of outbound messages, and hash of the updated state of an account.

### Transaction phases

**Storage**: the target contract pays a storage fee from its own balance

**Credit:** the value attached to the message is transferred to the contract balance

**Compute:** the virtual machine executes the smart contract instructions and records the intentions to create messages in the action phase

**Action:** this step generates internal and outbound external messages

**Bounce:** if an error occurs during stages 3 or 4 of the transaction execution, the transaction will immediately move to the bounce phase and skip the remaining phases. Additionally, if a 'bounce' flag is specified, a message will be sent back to the sender through the onBounce callback function
