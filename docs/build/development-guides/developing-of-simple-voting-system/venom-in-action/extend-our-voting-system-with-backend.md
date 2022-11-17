---
sidebar_position: 2
sidebar_label: Extend our voting system with backend
description: >-
  This section will show you how you can interact with contracts
  from a backend.
---

# Venom In Action. Extend our voting system with backend

We already can interact with our smart contracts via the web interface. But what about backend development? Let's implement a simple server, that will work with our smart contracts.

First of all, we need to target the purposes of our backend app. As you know, every deployed ballot should be activated by the voting owner. So, it will be good to store ballot addresses somewhere in a database for handy activation of them. Since we have a `NewBallot` event in our smart contract, we can listen to these events and store information from them in the database. It would be nice to have an activation method too, as well as some methods for showing stored data. And we will implement a 'lottery' method as a bonus. This method will activate random ten ballots. So, we are ready to start!

For building our backend, we will use NodeJS Express stack with Typescript on a board. To store data we take SQLite, just because there is no needs to have something smarter...it is just a guide, right?

We are starting with the `npm init` command and installing dependencies.

:::info
This guide will not include backend development basements, typescript and nodejs essentials. We focus our attention only on venom smart contracts integration.
:::

```shell
npm install --save express body-parser sqlite sqlite3
```

Do not forget about typescript (with `tsconfig.json` file) and some types for our express lib.

```shell
npm install --save-dev typescript @types/express
```

Now it's time to see who will help us with smart contract interaction. You will be surprised, but backend libraries will be the same as frontend! Yes, these libraries are suitable for the backend too.

```shell
npm install --save venom-connect everscale-inpage-provider everscale-standalone-client
```

## Interaction with smart contracts

Let's implement a module for smart contract interaction. We need to initialize a client here

```typescript title="src/modules/blockchain.ts" lineNumbers="true"
import { ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient, SimpleKeystore } from "everscale-standalone-client/nodejs";

// Key pair for interact with Ballot contract. You can explore the logic of activation in first guide of this series.
const ballotActivationSignerKeys = {
  // suppose we have this variables in system environment...you can use dotenv for example
  public: process.env.ACTIVATE_SIGNER_PUBLIC_KEY as string,
  secret: process.env.ACTIVATE_SIGNER_SECRET_KEY as string,
};

// function for creating a standalone client
// (of course you have to create some singleton for that)
async function getClient(): Promise<ProviderRpcClient> {
  const client = new ProviderRpcClient({
    fallback: () =>
    EverscaleStandaloneClient.create({
      connection: {
        id: 1010,
        group: 'testnet',
        type: 'jrpc',
        data: {
          endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
        },
      },
      // Manually creating a keystore for our client, because we haven't wallet extension here...we are not in browser
      keystore: new SimpleKeystore({
        [ballotActivationSignerKeys.public]: {
          publicKey: ballotActivationSignerKeys.public,
          secretKey: ballotActivationSignerKeys.secret,
        }
      }),
    }),
  });
  await client.ensureInitialized();
  await client.requestPermissions({ permissions: ['basic'] });
  return client;
}
```

Pay attention to the keystore section. This is the difference with the usage standalone-client in frontend development. You don't need to control a keystore when using inpage-provider with web, because you have a wallet extension there, that will provide a keystore for you. But backend developers should create a keystore by themselves.

Now we can implement an `activateBallot` function here.

```typescript title="src/modules/blockchain.ts" lineNumbers="true"
import { Address, Contract, ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient, SimpleKeystore } from "everscale-standalone-client/nodejs";
import { readFileSync } from 'fs';
import { resolve } from 'path';

// importing an ABI here
import { abi as ballotContractAbi } from '../abi/Ballot.abi';

...

// Just a little helper. Returns a Ballot contract instance.
function getBallotContract(
  client: ProviderRpcClient,
  address: string,
): Contract<typeof ballotContractAbi> {
  const contractAbi = JSON.parse(
    readFileSync(
      resolve(process.cwd(), 'src/abi/Ballot.abi.json'), // yes, just place it somewhere
      'utf-8'
    )
  );
  return new client.Contract(contractAbi, new Address(address));
}

// Sends an external message to Ballot, signed by Vote owner. (Ballot activation logic)
export async function activateBallot(ballotAddress: string): Promise<string | undefined> {
  try {
    const client = await getClient();
    const ballotContract = getBallotContract(client, ballotAddress);
    const response = await ballotContract.methods.activate({}).sendExternal({
      publicKey: ballotActivationSignerKeys.public, // It must be in our client's keystore!!! With private!!!
    });
    if (response.transaction.aborted) {
      throw new Error ('Transaction aborted');
    }
    return ballotAddress;
  } catch (error) {
    return undefined;
  }
}
```

Same as frontend, isn't it? That is all interaction we need, except for events listening. Let's deal with this task.

<details>
<summary>
But what if I need to send an internal message from my wallet?
</summary>

Then you should perform some improvements. First thing - `accountsStorage` parameter for client initialization. Suppose you have a `WalletV3` and this is a wallet for your internal interaction. Provide wallet address and key pair somehow (this example provides it by environment variables). So your `getClient` function will be like

```typescript title="src/modules/blockchain.ts" lineNumbers="true"
async function getClient(): Promise<ProviderRpcClient> {
  // initializing accounts storage
  // SimpleAccountsStorage is a class from everscale-standalone-client
  const accountsStorage = new SimpleAccountsStorage(); 
  // import WalletV3Account from everscale-standalone-client and provide an public key from somewhere
  const account = await WalletV3Account.fromPubkey({
    publicKey: process.env.MY_WALLET_ADDRESS_PUBLIC_KEY
  })
  // put our walletv3 to storage
  accountsStorage.addAccount(account);
  accountsStorage.defaultAccount = account.address;

  const client = new ProviderRpcClient({
    fallback: () =>
      EverscaleStandaloneClient.create({
        connection: {
          id: 1010,
          group: 'testnet',
          type: 'jrpc',
          data: {
            endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
          },
        },
        accountsStorage, // provide our accounts storage here!
        // Of course we need a keystore here! And keys exactly from our wallet!
        keystore: new SimpleKeystore({
          [process.env.MY_WALLET_ADDRESS]: {
            publicKey: process.env.MY_WALLET_ADDRESS_PUBLIC_KEY,
            secretKey: process.env.MY_WALLET_ADDRESS_SECRET_KEY,
          },
        }),
      }),
  });
  await client.ensureInitialized();
  await client.requestPermissions({ permissions: ['basic'] });
  return client;
}
```

And then you can implement a `deployBallot` function, for example.

```typescript title="src/modules/blockchain.ts" lineNumbers="true"
// Same simple helper to get a Vote contract instance
// Import an ABI files from somewhere...same as for Ballot.
function getVoteContract(
  client: ProviderRpcClient
): Contract<typeof voteContractAbi> {
  const contractAbi = JSON.parse(
    readFileSync(
      resolve(process.cwd(), 'src/abi/Vote.abi.json'),
      'utf-8'
    )
  );
  return new client.Contract(contractAbi, new Address(process.env.VOTE_CONTRACT_ADDRESS!));
}

export async function deployBallot(futureOwner: string): Promise<string | undefined> {
  try {
    const client = await getClient();
    const voteContract = getVoteContract(client);
    // Here will be the main call
    const response = await voteContract.methods
      .deployBallot({ // our method and params
        owner: new Address(futureOwner),
        sendRemainingGasTo: new Address(deployBallotSignerAddress),
      })
      .sendWithResult({
        amount: '500000000', // how much value will be attached
        from: new Address(process.env.MY_WALLET_ADDRESS), // just like that! It will be an internal message from your wallet!
        bounce: true,
      });
    const voteContractAbi = JSON.parse(
      readFileSync(
        resolve(process.cwd(), 'src/abi/Vote.abi.json'),
        'utf-8'
      )
    );
    const decodedResult = await client.rawApi.decodeTransactionEvents({
      abi: JSON.stringify(voteContractAbi),
      transaction: response.childTransaction as any,
    });
    if (!decodedResult.events.length) {
      console.log('Events was not found in child transaction');
      return undefined;
    }
    const eventData = decodedResult.events.find(event => event.event === 'NewBallot')?.data as NewBallotData;
    return eventData.ballotAddress;
  } catch (error) {
    console.log(`Deploy ballot error`, (error as any).stack);
    return undefined;
  }
}
```

That is the way to deal with sending internal messages from your wallet to another contract. From backend service!
</details>

## Listening to events of smart contract

Let's implement a smart contract event handler. We can do it with everscale-inpage-provider. It will be just a function, that will be instantiated in the express `listen` method a little bit later.

```typescript title="src/modules/blockchain.ts" lineNumbers="true"
import { Address, Contract, ProviderRpcClient, Subscriber } from "everscale-inpage-provider";
import { EverscaleStandaloneClient, SimpleKeystore } from "everscale-standalone-client/nodejs";
import { readFileSync } from 'fs';
import { resolve } from 'path';

// importing an ABI here
import { abi as ballotContractAbi } from '../abi/Ballot.abi';
import { abi as voteContractAbi } from '../abi/Vote.abi';

...

// Just a little helper. Returns a Vote contract instance.
function getVoteContract(
  client: ProviderRpcClient
): Contract<typeof voteContractAbi> {
  const contractAbi = JSON.parse(
    readFileSync(
      resolve(process.cwd(), 'src/abi/Vote.abi.json'),
      'utf-8'
    )
  );
  return new client.Contract(contractAbi, new Address(process.env.VOTE_CONTRACT_ADDRESS!));
}

// NewBallot event listener (Vote contract)
export async function listenNewBallotEvent() {
  const client = await getClient();
  const voteContract = getVoteContract(client);
  
  const subscriber = new Subscriber(client);
  voteContract
    .events(subscriber)
    .filter((event) => event.event === 'NewBallot')
    .on(async (event) => {
      // here is our event
      const eventData = {
        ballotAddress: event.data.ballotAddress.toString(),
        owner: event.data.owner.toString(),
      };
      // here we will implement a saving to database
    })
  console.log(`Subscribed to NewBallot`);
}
```

:::info
You can accept the same ideas for your frontend app, just because we are using the same libraries.
:::

## Database and server stuff

We are not going to analyze some NodeJS Express features and SQLite here in details. Just move on straight to code snippets. Start with database stuff.

```typescript title="src/modules/database.ts" lineNumbers="true"
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// helper for returning a connection to our sqlite
export async function getConnection() {
  return open({
    filename: `/tmp/${process.env.DB_DATABASE}.db`,
    driver: sqlite3.cached.Database
  })
};

// Here we will initialize or ballot table. Just store ballot address and it's owner there
// We will call this right after express initialization.
export async function initDB() {
  const db = await getConnection();
  db.on('trace', (data: any) => {
    console.log('SQL trace:', data);
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS ballots(
      id INTEGER PRIMARY KEY NOT NULL,
      address varchar(66) NOT NULL UNIQUE,
      owner varchar(66) NOT NULL UNIQUE
    )
  `);
  console.log('DB initialized!');
}
```

OK. Now move to express router stuff:

```typescript title="src/modules/api.ts" lineNumbers="true"
import { Router } from "express";
import { getConnection } from "./database";
import { activateBallot } from "./blockchain";

// initialize express router, we will use it later
export const ballotsRouter = Router();

// returns a list with all stored ballots
ballotsRouter.get("/", async function (req, res) {
  const connection = await getConnection();
  const ballots = await connection.all<any[]>('SELECT * FROM ballots');
  res.json(ballots);
});

// ballot activation by owner's address
// body = {owner: <address>}
ballotsRouter.post("/ballot/activate", async function (req, res) {
  const connection = await getConnection();
  const ballot = await connection.get<any>(`SELECT * FROM ballots WHERE owner = '${req.body.owner}'`);
  if (!ballot) {
    return res.status(404).json({ success: false, message: 'Ballot not found' });
  }
  // this is a function we implemented in blockchain module
  const result = await activateBallot(ballot.address);
  if (!result) {
    return res.status(400).json({ success: false, message: 'Can not activate ballot' });
  }
  res.json(ballot);
});

// bonus method! Activation of random ten ballots!
ballotsRouter.post("/lottery", async function (req, res) {
  const connection = await getConnection();
  const ballots = await connection.all<any[]>('SELECT * FROM ballots ORDER BY RANDOM() LIMIT 10');
  const promises = [];
  for (const ballot of ballots) {
    promises.push(activateBallot(ballot.address));
  }
  const results = await Promise.allSettled(promises);
  const response = { 
    results: results
      .filter(res => res.status === 'fulfilled')
      .map(x => (x as PromiseFulfilledResult<any>).value)
    ,
    activatedSuccessfully: results.filter(
      res => res.status === 'fulfilled' && (res as PromiseFulfilledResult<any>)?.value
    ).length,
  };
  res.json(response);
});
```

## Putting it all together

The finishing touch - main script with our express server initialization.

```typescript title="src/index.ts" lineNumbers="true"
import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import { initDB } from './modules/database';
import * as api from './modules/api';
import { listenNewBallotEvent } from './modules/blockchain';

console.log('Running app..');

// express initializing
const app: Express = express();
app.use(bodyParser.json())
// our api controller
app.use('/ballots', api.ballotsRouter);

app.listen(process.env.PORT, async () => {
  // db initialization by our script
  await initDB();
  // NewBallot event handler
  await listenNewBallotEvent();
  console.log(`Example app listening on port ${process.env.PORT}`)
})
```

That's all. Just host it and congratulations! Now you can interact with your smart contract from the backend application!

Remember, that it's just an example and not production code. We didn't keep in mind some best practices and features. You can check out the implementation of this example with some styles and features in the [repository](https://github.com/venom-blockchain/guides/tree/master/vote-backend).
