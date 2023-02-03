---
sidebar_position: 3
sidebar_label: Accounts
description: This article describes the wallet accounts and how they interact on-chain.
slug: /learn/accounts
---

# Accounts

:::info
If you want to create a wallet account without worrying about the technical details, you can refer to [This Article](../general/wallet/creating-new-wallet.md).
:::

In a blockchain, an account typically refers to a user's identity. It has an address, holds a balance, can send and receive funds, and interacts with smart contracts. In certain instances, an account is a smart contract that has state storage.

In Ethereum, accounts can be externally owned (controlled by anyone with private keys) or implemented as smart contracts. In Venom blockchain, an account and a smart contract are interchangeable. There are no externally-owned accounts in the traditional sense, all accounts are smart contracts.

#### **An account has the capability to:**

* Receive, store, and send VENOM and tokens
* Receive external messages from outside the blockchain
* Send and receive messages within the blockchain from other accounts
* Send external messages to no specific destination (similar to events in Ethereum)

#### **Venom accounts have two fields:**

`address` - The identifier by which an account is stored in the blockchain

`storage` - The storage contains balance, state, last transaction logical time and initial code hash

![Account Schema](../../../static/img/account-schema.jpeg)

## Address

The address serves as the point of entry for incoming messages and is the unique identifier for the contract storage which holds data such as balance, state, last transaction logical time and initial code hash.

The account address is composed of two parts: a workchain identifier, where the first part is the location of the account storage and the second part is the hash of the initial data.

Example: `0:0000000000000000000000000000000000000000000000000000000000000000`

`0` – _workchain\_id._ An unsigned _32-bit_ integer is an identifier of a workchain.

`0000...0000` _– account\_id._ A _256-bit_ address is determined by the hash of the contract code and initial data.

### **Workchain IDs**

Currently defined workchain IDs list:

| Workchain ID | Description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- |
| -1           | The masterchain contains the information about a network configuration                        |
| 0            | The basic workchain is used by regular users to work with smart contracts and transfer tokens |

## Storage

* `last_trans_lt` - the last transaction logical time
* `balance` - the number of VENOM tokens on the account balance
* `init_code_hash` - the hash of the initial contract code used when the contract was first deployed
* `state` - a current state of an account, can be one of the following values:
  * _uninit - the account only has a balance and its code and data have not been initialized yet.
  * _active - the account's code and data have been initialized.
  * _frozen - the account's code and data have been replaced with a hash, but the balance is still explicitly stored. The balance of a frozen account may be negative, indicating outstanding storage payments.
  * _nonexist_

## Types of the wallet accounts

### Wallet accounts

To interact with smart contracts, store, send, and receive Venom tokens within the network, users must have a wallet account. A wallet account is a smart contract designed for this purpose in the Venom network.

When a user wants to transfer funds from a controlled wallet account to another wallet account, they send a signed external message to the initial wallet account. The wallet account verifies the sender and permits them to pay for the transaction fee from their balance, then it transfers funds from the initial wallet account to the receiving wallet account.

To send tokens to another wallet account, one must have knowledge of the recipient's address. An important concept here is that it is possible to calculate an address even before the contract is deployed on the network and send funds to it. This means that anyone can send tokens to a recipient whose contract has not yet been deployed, and those tokens will be accepted and the contract can be deployed.

### Default wallet

A wallet account that performs simple fund transfers, suitable for most users.

### Multisig wallet

A multi-signature wallet is a type of wallet that is controlled by multiple users to increase security. Transactions must be signed by multiple parties before they can be executed.
