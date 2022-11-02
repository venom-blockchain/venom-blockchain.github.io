---
sidebar_position: 3
sidebar_label: Messages and Transactions
slug: /learn/messages-and-transactions
---

# Messages and Transactions

All interactions with the Venom network are carried out through messages. The message is instructions from the account, which it will send to update the state of the Venom network.

### Prerequisites

To help you better understand this page, we recommend you first read [Accounts](accounts.md).

### Message types

The Venom network has three different types of messages:

**Inbound external message:** a message sent from outside the blockchain into the blockchain. Such messages without a 'from' address, can be sent by regular users, external services, and any participants outside the chain, and are called "_messages from nowhere_". An inbound external message initializes updates on the state of the blockchain.

**Internal message:** a message from one contract to another. Also as an inbound external message that type of message updates the state of the Venom network.

**Outbound external message:** Known as a "_message to nowhere_" or "_event_". An event may be produced by a smart contract. Any off-chain participant can subscribe to events inside of the Venom network and receive them.

![](<../../../static/img/messages.png>)

### Message structure

A message consists of such parts as '_header'_ and '_body'._

The header contains the information about a sender, receiver, value, and the information necessary required by the validator to apply the message to the block.

The message body includes payload to virtual machine instructions, that are required to execute the smart contract.

### Transaction

A transaction is a result of executing a message. It is always associated with a message that generated it. A transaction contains the information: a target account, status, set of outbound messages, and hash of the updated state of an account.

### Transaction phases

**Storage**: a target contract pays a storage fee from its own balance.

**Credit:** a message attached value is transferred to a contract balance.

**Compute:** the virtual machine executes the smart contract instructions and stores the intentions to create messages for their creation in the action phase.

**Action:** this step creates internal and outbound external messages.

**Bounce:** in case of an error was thrown at stages (3, 4) of the transaction execution, the transaction will immediately go into the bounce phase, skipping the rest of the phases. Also, if a '_bounce_' flag was specified, a message will be sent back to the sender on the onBounce callback function.
