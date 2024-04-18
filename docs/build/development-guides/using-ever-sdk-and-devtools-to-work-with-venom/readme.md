---
displayed_sidebar: buildSidebar
sidebar_position: 0
sidebar_label: Welcome
---

# Using Ever SDK and developer tools to work with Venom

This section contains guides on the various ways to accomplish the most important tasks of building on Venom Blockchain using Ever SDK and the Everdev CLI tool.

## Ever SDK

[Repository](https://github.com/tonlabs/ever-sdk) | [Documentation](https://docs.everos.dev/ever-sdk/) 

EVER SDK is Rust Client Library (core) for DApp development in TVM blockchains. It is fully compatible with Venom Blockchain. 

For developer convenience bindings for a large number of languages have been developed for Ever SDK:

- Official [Javascript SDK](https://github.com/tonlabs/ever-sdk-js), which is used in samples in this section.
- [Community-developed bindings](https://docs.everos.dev/ever-sdk/#community-bindings) for over a dozen other languages such as Java, PHP, Python, etc.

## Everdev CLI tool

[Repository](https://github.com/tonlabs/everdev) | [Documentation](https://docs.everos.dev/everdev/) 

Everdev is a Node.js package with CLI interface that allows to set up developer environment and develop on TVM compatible blockchains, including Venom. It is designed to easily manage network connections and work with smart contracts - from initial development and testing to on-chain calls, on local test node or on the live blockchain.

Everdev is built with Ever SDK.


## Venom Network access

To access the Venom Blockchain while trying out the guides in this section, use the official GraphQL Venom endpoint provided by [Evercloud](../using-evercloud-graphql-api-to-work-with-venom/readme.md).

Everdev tool and SDK used in the examples below can connect to it, as if it were a regular node. It has the same API as the supernode and [local node for testing](https://github.com/tonlabs/evernode-se), and provides all needed capabilities.

The Venom blockchain endpoint is available at:

**For Mainnet**: https://gql.venom.foundation/graphql       
**For Testnet**: https://gql-testnet.venom.foundation/graphql 