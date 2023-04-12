---
sidebar_position: 5
sidebar_label: Accounts
description: This article describes the wallet accounts and how they interact on-chain.
slug: /learn/accounts
---

import ImageSwitcher from './../../../src/components/ImageSwitcher'
import account_dark from './assets/accounts/account_dark.png';
import account_light from './assets/accounts/account_light.png';

# Accounts

:::info
If you want to create a wallet account without worrying about the technical details, you can refer to [This Article](../general/wallet/creating-new-wallet.md).
:::

An account on a blockchain serves as a unique identifier for a user, with a corresponding address, balance, and the ability to transfer funds and call smart contracts. It can also refer to a smart contract with behavior (code) for changing data storage.

In Ethereum, accounts can be externally owned (controlled by anyone with private keys) or implemented as smart contracts. There is no distinction between accounts and smart contracts in the Venom blockchain. Every account is a smart contract with code, and there is no concept of an externally-owned account (owned by key pair) in the traditional sense. All accounts can hold a balance, perform code, and call each other. This approach is called Account abstraction and allows for authentication through other means beyond external ownership. Since every account in the Venom blockchain is a smart contract, the contract's code can include any authentication logic necessary to verify a user's identity. The flexibility of smart contract code allows for a wide range of authentication options beyond traditional private key ownership.

#### **An account has the capability to:**

* Receive, store, and send VENOM and tokens
* Receive external messages from outside the blockchain
* Send and receive messages within the blockchain from other accounts
* Send external messages to no specific destination (similar to events in Ethereum)

#### **The Venom account have next fields:**

`address` - The identifier by which an account is stored in the blockchain

`storage` - The storage contains balance, state, last transaction logical time, and initial code hash

`storage state` - The state of storage contains last paid, used, due payment fields. These fields serve the purpose of storage fee calculation.

<ImageSwitcher
    lightImageSrc={account_light}
    darkImageSrc={account_dark}
    alt="Account Schema"
/>

## Address

The address is the entry point for incoming messages and is the unique identifier for the contract storage.

The account address comprises two parts: a workchain identifier, where the first part is the location of the account storage, and the second part is the hash of the initial data.

Example: `0:0000000000000000000000000000000000000000000000000000000000000000`

`0` – _workchain\_id._ An unsigned _32-bit_ integer is an identifier of a workchain.

`0000...0000` _– account\_id._ A _256-bit_ address is determined by the hash of the contract code and initial data.

$$
hash(init\_code, init\_data)
$$

### **Workchain IDs**

Currently defined workchain IDs list:

| Workchain ID | Description                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| -1           | The masterchain is a layer-0 chain, facilitating coordination and communication among workchains, shardchains, and accounts.            |
| 0            | The Basechain is the first layer-1 workchain for end-users, supporting dApps and serving as the platform for executing smart contracts. |

## Storage

* `last_trans_lt` - the last transaction logical time
* `balance` - the number of VENOM tokens on the account balance
* `init_code_hash` - the hash of the initial contract code used when the contract was first deployed
* `state` - a current state of an account, can be one of the following values:
  * uninit - the account only has a balance and its code and data have not been initialized yet.
  * active - the account's code and data have been initialized.
  * frozen - the account's code and data have been replaced with a hash, but the balance is still explicitly stored. The balance of a frozen account may be negative, indicating outstanding storage payments.
  * _nonexist_

## Storage state

* `last_paid` - the timestamp of the latest storage payment
* `used` - the structure contains information about how many cells and bits stores account
* `due_payment` - the amount of the storage debt

## Types of the wallet accounts

### Wallet accounts

To interact with smart contracts, store, send, and receive Venom tokens within the network, users must have a wallet account. A wallet account is a smart contract designed for this purpose in the Venom network.

When a user wants to transfer funds from a controlled wallet account to another wallet account, they send a signed external message to the initial wallet account. The wallet account verifies the sender and permits them to pay for the transaction fee from their balance. Then it transfers funds from the initial wallet account to the receiving wallet account.

To send tokens to another wallet account, one must have knowledge of the recipient's address. An important concept here is that it is possible to calculate an address even before the contract is deployed on the network and send funds to it. This means that anyone can send tokens to a recipient whose contract has not yet been deployed, and those tokens will be accepted, and the contract can be deployed.

### Default wallet

This is the simplest type of wallet account, and it is created by default when a user creates a new address in the network. The default wallet account contract allows users to store, send, receive Venom tokens, and call other contracts.

### Multisig wallet

A multi-signature wallet is a type of wallet that is controlled by multiple users to increase security. Transactions must be signed by multiple parties before they can be executed. This is useful for organizations or groups of individuals who want to have multiple people involved in approving transactions to ensure accountability and security.
