---
sidebar_position: 1
sidebar_label: Integration
---

# Venom Blockchain FAQ: Integration with Venom Blockchain

<details>
<summary>
How to connect Venom Wallet to my dApp?
</summary>

The easiest way to connect your dApp to Venom Wallet is to use [Venom Connect](https://www.npmjs.com/package/venom-connect). It is a library that allows you to connect to Venom Wallet (both mobile and browser extension) and interact with it. This library provides you with a handy interface for building a connect popup for our Venom Wallet and then gives you an interface for working with the Venom network.

Check out [this](../build/development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/extend-our-tokensale-with-frontend.md#connecting-venom-wallet-to-your-app) paragraph of the frontend guide, which explains how to use Venom Connect in your project. Moreover, you can check the final source code of this guide [here](https://github.com/venom-blockchain/guides/tree/master/tokensale-frontend).

You can read about all configuration options in the venom-connect official [repository](https://github.com/web3sp/venom-connect). Also, it has an [example](https://github.com/web3sp/venom-connect/tree/main/examples/react).
</details>

<details>
<summary>
What if I need very specific logic for connecting the Wallet to my dApp?
</summary>

So, in this case, you can use the libraries that venom-connect has been built on: [inpage-provider](https://github.com/broxus/everscale-inpage-provider) and [standalone-client](https://github.com/broxus/everscale-standalone-client). These are basic libraries for interaction with the Venom network, allowing you to build your system for wallet connection. Check the documentation for these libraries in their respective repositories for more information.
</details>

<details>
<summary>
I need to call a smart contract method before the user connects the wallet. How can I do it?
</summary>

You should use [standalone-client](https://github.com/broxus/everscale-standalone-client) as a fallback for [inpage-provider](https://github.com/broxus/everscale-inpage-provider). It allows you to call smart contract's 'get' methods without sending any transactions. The venom-connect library also provides access to the standalone interface. You can use the ['getStandalone'](https://github.com/web3sp/venom-connect#getstandalone) method to achieve this. You can refer to [this](../build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/frontend-for-nft-auction.md) guide for an example of how to use the standalone-client with the `getStandalone` method to retrieve current auction information.

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

You can achieve this with two modules. Both of them, in fact, are light nodes of the Venom Blockchain, but they have some extra interfaces for you to process incoming blocks and transactions. One of them is [ton-indexer](https://github.com/broxus/ton-indexer), and the other one is [ton-kafka-producer](https://github.com/broxus/ton-kafka-producer). The first one uses rocksdb as storage for blockchain data, as you can see, and works with Apache Kafka.

The main idea is that ton-indexer was written in Rust, so you should use the Rust ecosystem for your project. Use ton-indexer as a module in your Rust project to operate with incoming blockchain data, analyze it, and store the required data elsewhere. When using ton-kafka-producer, you can use any method to read Kafka's topics, which will be constantly filled with blockchain data. However, you will need an Apache Kafka cluster.

</details>
