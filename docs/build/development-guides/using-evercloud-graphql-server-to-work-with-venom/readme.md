---
displayed_sidebar: buildSidebar
sidebar_position: 0
sidebar_label: Welcome
---

# Using Evercloud GraphQL server to work with Venom

This section contains guides on the various ways to access the Venom blockchain using the capabilities of Evercloud GraphQL API.

## What is Evercloud

Evercloud is a highhly available cloud solution that provides TVM-compatible networks, including Venom, with GraphQl API endpoints. 

With Evercloud GraphQL server, you don't need to run your own node to access the blockchain. It shares the API with supernode and [local node for testing](https://github.com/tonlabs/evernode-se), providing all the necessary capabilities. As a result, projects can be easily migrated between the local node, Evercloud, and supernode.

Evercloud has been designed with both community-driven development and high-load enterprise DApps in mind.

## What you can do with GraphQL API

You can use the GraphQL API to query various kinds of blockchain data and send messages to the blockchain.

To get a general idea of how the API works in different environments, start with the [Quick Start on Venom Blockchain](graphql-quick-start.md) guide.

For more specific guidance on implementing your use case with the help of the GraphQL API, consult the [Specialized Guides](graphql-api-guides.md).

Full Evercloud and GraphQL API documentation is available at https://docs.evercloud.dev/reference/graphql-api.

## Venom Network access

:::caution
The Venom network is running in testnet and cannot be used to run your own node now. Please note that any results obtained using these tutorials might be more accurate or reliable in future. You can use only our public testnet graphql API. Please wait for official announcements.
:::

To access the Venom Blockchain while trying out the guides in this section, use the official GraphQL Venom endpoint available at:

https://gql-testnet.venom.foundation/graphql



