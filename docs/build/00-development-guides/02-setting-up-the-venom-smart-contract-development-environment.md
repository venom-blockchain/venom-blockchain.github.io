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
> 2.1.10
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
├── locklift.config.js
├── tsconfig.json
├── package.json
├── package-lock.json
│
├── contracts
│   └── Sample.sol
├── scripts 
│   └── 1-deploy-sample.js
└── giverSettings
│    └── index.ts
└── test
    └── sample-test.js
```

## Configuration

The configuration file is called `locklift.config.js`. Here's the basic layout for Venom blockchain networks:

```typescript
import { LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import { SimpleGiver, GiverWallet } from "./giverSettings";

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = "http://localhost/graphql";

const config: LockliftConfig = {
  compiler: {
    version: "0.61.2",
  },
  linker: {
    version: "0.15.48",
  },
  networks: {
    // Configuration of 'local' network can be left unchanged
    local: {
      connection: {
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
        giverFactory: (ever, keyPair, address) => new SimpleGiver(ever, keyPair, address),
        address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
        key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
      },
      tracing: {
        endpoint: LOCAL_NETWORK_ENDPOINT,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
  },
  mocha: {
    timeout: 2000000
  }
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
 docker run -d -e USER_AGREEMENT=yes --rm --name local-node -p80:80 tonlabs/local-node:0.29.1
```

The container exposes the specified 80 port with Nginx which proxies requests to /graphql to GraphQL API.

Check out GraphQL playground at [http://localhost/graphql](http://localhost/graphql)

That's all! You can run tests and start to develop your amazing projects

```shell
locklift test --network local --config ./locklift.config.js
```

The next step in your learning is [here](03-how-to-create-your-own-fungible-tip-3-token/00-fungible-tokens-in-venom-network.md)

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
