---
sidebar_position: 2
sidebar_label: Setting Up The Venom Smart Contract Development Environment
description: The first thing to do before starting the smart contracts development
---

# Setting Up The Venom Smart Contract Development Environment

To improve your development experience, you may need some tools and utils to compile, deploy and test your Venom contracts. [Locklift](https://github.com/broxus/locklift/) is a development environment like Hardhat or Truffle.

## Let's install it

```shell-session
npm install -g locklift
locklift --version
> 2.5.3
```

## Initialize your first project

```shell-session
locklift init --path sample-project
> New Locklift project initialized in sample-project
> Installing required dependencies...
> ...
> LockLift initialized in setup-env happy hacking!
```

This command initializes a new Locklift project, filled with samples:

```txt
├── contracts
│   └── Sample.tsol
├── locklift.config.ts
├── package.json
├── package-lock.json
├── scripts
│   └── 1-deploy-sample.ts
├── test
│   └── sample-test.ts
└── tsconfig.json
```

## Configuration

The configuration file is called `locklift.config.ts`. Here's the basic layout for Venom blockchain networks:

```typescript
import { LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";
const DEV_NET_NETWORK_ENDPOINT = process.env.DEV_NET_NETWORK_ENDPOINT || "https://devnet-sandbox.evercloud.dev/graphql";

const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-testnet.venom.foundation/rpc";
const VENOM_TESTNET_TRACE_ENDPOINT =
  process.env.VENOM_TESTNET_TRACE_ENDPOINT || "https://gql-testnet.venom.foundation/graphql";

// Create your own link on https://dashboard.evercloud.dev/
const MAIN_NET_NETWORK_ENDPOINT = process.env.MAIN_NET_NETWORK_ENDPOINT || "https://mainnet.evercloud.dev/XXX/graphql";

const config: LockliftConfig = {
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

    // Or specify version of compiler
    version: "0.62.0",

    // Specify config for extarnal contracts as in exapmple
    // externalContracts: {
    //   "node_modules/broxus-ton-tokens-contracts/build": ['TokenRoot', 'TokenWallet']
    // }
  },
  linker: {
    // Specify path to your stdlib
    // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
    // // Specify path to your Linker
    // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

    // Or specify version of linker
    version: "0.15.48",
  },
  networks: {
    local: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        group: "localnet",
        type: "graphql",
        data: {
          endpoints: [LOCAL_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      // This giver is default local-node giverV2
      giver: {
        // Check if you need provide custom giver
        address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
        key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
      },
      tracing: {
        endpoint: LOCAL_NETWORK_ENDPOINT,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    test: {
      connection: {
        id: 1,
        type: "graphql",
        group: "dev",
        data: {
          endpoints: [DEV_NET_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: false,
        },
      },
      giver: {
        address: "0:0000000000000000000000000000000000000000000000000000000000000000",
        key: "secret key",
      },
      tracing: {
        endpoint: DEV_NET_NETWORK_ENDPOINT,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    venom_testnet: {
      connection: {
        id: 1000,
        type: "jrpc",
        group: "dev",
        data: {
          endpoint: VENOM_TESTNET_ENDPOINT,
        },
      },
      giver: {
        address: "0:0000000000000000000000000000000000000000000000000000000000000000",
        phrase: "phrase",
        accountId: 0,
      },
      tracing: {
        endpoint: VENOM_TESTNET_TRACE_ENDPOINT,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    main: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        type: "graphql",
        group: "main",
        data: {
          endpoints: [MAIN_NET_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: false,
        },
      },
      // This giver is default Wallet
      giver: {
        address: "0:0000000000000000000000000000000000000000000000000000000000000000",
        key: "secret key",
      },
      tracing: {
        endpoint: MAIN_NET_NETWORK_ENDPOINT,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
```

Let's go through each parameter

`compiler.version` The version of the [solidity compiler](https://github.com/tonlabs/TON-Solidity-Compiler) binary
`linker.version` The version of the [TVM-linker](https://github.com/tonlabs/TVM-linker) binary

`networks`  Specifies which networks are available for deployment and testing
`networks.[NETWORK_NAME].keys.phrase` If you leave this field value empty - a new random seed will be generated each time you're running locklift. Or specify it explicitly - fill the `phrase` field with a mnemonic phrase.

## Run The Local Node

:::info
You need to have a [docker](https://www.docker.com) runtime to continue with this guide
:::

If Locklift is like a Hardhat development environment tool, then local-node is Ganache-like a local blockchain that is designed for dapp debugging and testing.

To run local-node you need to follow a command

```shell
 docker run -d -e USER_AGREEMENT=yes --rm --name local-node -p80:80 tonlabs/local-node:0.38.0
```

The container exposes the specified 80 port with Nginx which proxies requests to /graphql to GraphQL API.

Check out GraphQL playground at [http://localhost/graphql](http://localhost/graphql)

That's all! You can run tests and start to develop your amazing projects

```shell
locklift test --network local --config ./locklift.config.ts
```

The next step in your learning is [here](how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network.md)

## Troubleshooting

<details>

<summary>If you are using macOS on Apple M1, follow these commands before starting tutorial</summary>

```shell-session
// Install Rosseta2
softwareupdate --install-rosetta

// Start a shell under Rosetta2
arch -x86_64 zsh

// If you already have installed nodejs,
// reinstall the x64 version of Node.js
nvm use system
nvm cache clear
nvm uninstall 16 # or the version you need, but not less than 14
nvm install 16   # or the version you need, but not less than 14
nvm use 16       # or the version you need, but not less than 14
```

All  `locklift` commands must be performed from under the Rosetta2 shell

</details>
