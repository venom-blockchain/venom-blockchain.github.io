---
sidebar_position: 1
sidebar_label: Integration
---

# Venom Blockchain FAQ: Integration with Venom Blockchain

<details>
<summary>
How to connect Venom Wallet to my dApp?
</summary>

The easiest way to connect your dApp to Venom Wallet is to use [Venom Connect](https://www.npmjs.com/package/venom-connect). It is a library that allows you to connect to Venom Wallet (both mobile and browser extension) and interact with it. This library provides you with a handy interface for building connect popup for our venom wallet and then gives us an interface for working with the venom network.

Check out [this](../build/development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend.md#connecting-venom-wallet-to-your-app) paragraph of the frontend guide, that explains how to use venom-connect in your project. Moreover, you can check the final source code of this guide [here](https://github.com/venom-blockchain/guides/tree/master/tokensale-frontend).

You can read about all configuration options in venom-connect official [repository](https://github.com/web3sp/venom-connect). Also, it has an [example](https://github.com/web3sp/venom-connect/tree/main/examples/react).
</details>

<details>
<summary>
What if I need very specific logic for connecting the Wallet to my dApp?
</summary>

So, in this case, you can use the library that venom-connect has been built on [inpage-provider](https://github.com/broxus/everscale-inpage-provider) and [standalone-client](https://github.com/broxus/everscale-standalone-client) - basic libraries for interaction with the venom network, so you can build your system for wallet connection. Check the documentation for these libraries in its repositories for more information.

</details>

<details>
<summary>
I need to call a smart contract method before the user connects the wallet. How can I do it?
</summary>

You should use [standalone-client](https://github.com/broxus/everscale-standalone-client) as a fallback for [inpage-provider](https://github.com/broxus/everscale-inpage-provider). It allows you to call smart contract's get methods without sending any transactions. Library venom-connect also gives you access to the standalone interface. You can use [getStandalone](https://github.com/web3sp/venom-connect#getstandalone) method to achieve this. You can check [this](../build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-auction.md) guide when we use the standalone-client from `getStandalone` method to get the current auction information.

</details>

<details>
<summary>
I'm developing a payment processing system. Which instrument of your ecosystem can help me?
</summary>

You can check [this](https://github.com/broxus/ever-wallet-api) project. It will help you with transaction indexing and payment processing. It is a REST API that allows you to get information about transactions and payments. It also allows you to create payment requests and get payment notifications. You can check the documentation for this project in its repository.

</details>

<details>
<summary>
I need to have personal access to Venom's transaction history. How can I achieve this?
</summary>

You can achieve this with two modules. Both of them, in fact, is a light node of Venom Blockchain, but it has some extra interfaces for you to process incoming blocks and transaction. One of them is [ton-indexer](https://github.com/broxus/ton-indexer) and the other one is [ton-kafka-producer](https://github.com/broxus/ton-kafka-producer). The first one uses rocksdb as storage for blockchain data storage, as you can see, works with Apache Kafka.

The main idea is ton-indexer was written with Rust so you should use the Rust ecosystem for your project - use ton-indexer as a module of your Rust project to operate with incoming blockchain data, analyze it and store parts of data you need somewhere. When you are using ton-kafka-producer, you can use whatever you want to read Kafka's topics, which will be filled with blockchain data constantly, but of course, you need to have the Apache Kafka cluster.

</details>
