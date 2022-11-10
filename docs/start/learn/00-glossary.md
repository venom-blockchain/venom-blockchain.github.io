---
sidebar_position: 0
sidebar_label: Glossary
slug: /learn/glossary
---

# Glossary

### Wallet account

A wallet account is your identity in the Venom ecosystem, a special case of a [smart contract](00-glossary.md#smart-contract) designed to interact with your Venom balance and [smart contracts](00-glossary.md#smart-contract).

Any users who need to send Venom tokens to participants in the network must have is deployed the wallet account.

:::info
How to create a wallet account [read here](../general/03-create-a-new-wallet-account.md)
:::

All supported crypto wallets can calculate the address of your wallet account depending on its type ([default](00-glossary.md#default-wallet), [multisig](00-glossary.md#multisig-wallet)) and your [public key](00-glossary.md#keys) even before it is deployed. You will be able to receive token transfers to this address immediately as it was calculated.

### Address

The unique public identifier of the smart contract in the network stores code and state of the contract, and is the entry point for messages addressed to it.

The address consists of two parts - the identifier of the [workchain](00-glossary.md#workchain) and the computed part.

Example: `0:4de50f6789111213a3141516b7fed892fc123ca22158c0d6d0d34daf4c6a7a0a`

`0` – _workchain\_id,_ `3de...7a0a` _– computed\_part_

A workchain\_id is an integer identifier defining a [workchain](00-glossary.md#workchain).

A computed part of the address is a 256-bit internal address determined by the [hash of the code](00-glossary.md#hash-of-the-code) and of the data contained in the [constructor message](00-glossary.md#constructor-message). We can calculate it even before the contract is deployed on the network. And It is possible to send messages, including value-bearing messages, to previously undeployed contracts.

### Block

A collection of data such as [transactions](00-glossary.md#transaction), outbound messages, and an update of the state.

### Block Explorer <a href="#block-explorer" id="block-explorer"></a>

​A web application where a user can explore the blocks, messages, transactions, and accounts in the network.

### Bridge <a href="#bridge" id="bridge"></a>

A network of relayers that connect two or more blockchains makes it to able to transfer assets from one chain to another. Venom network supports bridges with Ethereum, Binance Smart Chain, and Fantom Opera.

### Consensus

Is a fault-tolerant mechanism that is used in blockchain networks to reach an agreement on a particular data value between a group of participants. The algorithm of the Venom network is a Proof-of-stake consensus algorithm from a family of Byzantine Fault Tolerant (BFT) algorithms.

### Constructor message

[An account](00-glossary.md#wallet-account), or [smart contract](00-glossary.md#smart-contract), is created by sending a special constructor message to its address**.** The body of such a message contains the initial code of the smart contract and the initial data of the smart contract.

### Commission

Reward validators for participating in network security by processing transactions and participating in the consensus.

### Crypto wallet

A hardware or software wallet that stores [public/private key](00-glossary.md#keys), and [seed phrase](00-glossary.md#seed-phrase) for signing cryptocurrency transactions. [Crypto wallets](00-glossary.md#crypto-wallet) in the Venom ecosystem are able to work with [wallet accounts](00-glossary.md#wallet-account), calculate their address by the [public key](00-glossary.md#keys), deploy them, and perform token transfers.

### Dapp <a href="#dapps" id="dapps"></a>

A decentralized application is usually presented as a web UI that interacts with smart contracts deployed on the blockchain network, instead of the centralized API. A common user interacts with Dapp through the crypto wallet or crypto browser.

### External message

Any message that was not produced by a [smart contract](00-glossary.md#smart-contract) within the Venom network, but was received from off-chain. The most typical example arises when a user wants to transfer some funds from an [account](00-glossary.md#wallet-account) controlled by his to some other account. In this case, the user sends a signed external message to [the wallet account](00-glossary.md#wallet-account), then the [wallet account](00-glossary.md#wallet-account) authorizes the sender and allows them to pay for the transaction fee from their balance. There is a difference between external messages and [internal messages](00-glossary.md#internal-message) because the External message cannot bear value, so they cannot pay for their “gas” (i.e., their processing) themselves.

### Hash of the code

Sha256 hash of the contract code and the initial state

### Default Wallet

Wallet account with simple logic for transferring funds. Suitable for most users

### Transaction

A result of message execution that contains information about the sender, the transaction logical time, incoming and outgoing messages, and how a transaction affects the state.

<details>

<summary>Components of a transaction</summary>

* The account to which the transaction belongs.
* The logical time of the transaction.
* One or zero inbound messages m processed by the transaction.
* The number of generated outbound messages n≥0.
* The outbound messages m1, …, mn.
* The initial state of account (including its balance).
* The final state of account (including its balance).
* The total fees collected by the validators.

</details>

### Homogeneous

In a [multi-blockchain](00-glossary.md#multi-blockchain) system, all blockchains may be essential of the same type and have the same rules (i.e., use the same format of transactions, the same virtual machine for executing [smart-contract](00-glossary.md#smart-contract) code, share the same cryptocurrency, and so on), and this similarity is explicitly exploited, but with different data in each blockchain. In this case, we say that the system is homogeneous.

### Heterogeneous

When, in a [multi-blockchain](00-glossary.md#multi-blockchain) system, different blockchains (which will usually be called [workchains](00-glossary.md#workchain) in this case) can have different “rules”. Then we say that the system is heterogeneous.

### Hypercube routing

The way of delivering messages from one [shardchain](00-glossary.md#shardchain) to another

### Keys

The private and public keys: Very large numbers that are used in a lengthy math process to encrypt, decrypt, sign, and verify messages.

### Interoperability

The ability of blockchain to transfer information and exchange data with other blockchains.

### Internal message

The type of message that one contract sends to another contract.

### Mainnet

Short for "main network" is the primary public network of blockchain.

### Masterchain

The master blockchain contains the information necessary to reach a [consensus](00-glossary.md#consensus) between validators.

### Multisig wallet

A multi-signature wallet is a wallet that is used by two or more users to enhance security by requiring signatures from multiple parties to sign transactions before execution.

### Multi-blockchain

Blockchain in which many chains can exist at once.

### Workchain

A blockchain type in Venom network under the Masterchain with its own state transition functions, cryptographic primitives, transaction or block structures, and native cryptocurrencies using the security of the Masterchain.

### Validator

Specially designated nodes, produce and sign new blocks in the blockchain.

### Delegator

A delegator provides its tokens to the validator to participate in maintaining the network security. Delegators share revenue with their validators, and they also share risks.

### Nominator

A participant in network decentralization by bonding their tokens nominates a validator to participate in consensus protocol and produce blocks.

### Seed phrase

A seed phrase is a series of words generated by [the cryptocurrency wallet](00-glossary.md#crypto-wallet) that gives you access to the cryptocurrency associated with that wallet.

### Smart contract

Code that performs arbitrary state changes within the blockchain, executable on [TVM](00-glossary.md#tvm) is the Turing complete [virtual machine](00-glossary.md#virtual-machine).

### Staking pool

Any network member can deploy a smart contract that allows other network members to nominate its owner for the role of a validator and participate in the distribution of the validator reward

### Shardchain

It is having the same rules and block format as the workchain itself, but is responsible only for a subset of accounts, depending on several first (most significant) bits of the account address. Because all these shardchains share a common block format and rules, the Venom Blockchain is homogeneous in this respect, similar to what has been discussed in one of the Ethereum scaling proposals

### Virtual machine

Venom supports the Turing complete virtual machine used to execute smart contract code

### Wallet types

Types of [wallet account](00-glossary.md#wallet-account) smart contracts. At the current moment supports two types of wallets [Default](00-glossary.md#default-wallet) and [Multisig](00-glossary.md#multisig-wallet)
