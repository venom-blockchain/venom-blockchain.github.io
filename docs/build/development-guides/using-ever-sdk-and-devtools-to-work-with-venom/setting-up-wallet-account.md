---
sidebar_position: 1
description: Setting up Wallet Account
---

# Setting up Wallet Account

## Introduction

This guide will help you learn to set up wallet accounts in Venom Blockchain with EVER SDK and Everdev CLI tools. It is applicable both for contract development and testing tasks, and for the purposes of Venom integration to the backend of your applications.

SDK and Everdev CLI tool approaches are detailed below. They implement a similar process of wallet deployment.

Currently we can recommend the [**SetcodeMultisig**](https://github.com/EverSurf/multisig2) contract to be used for wallets. It is well tested and secure, supports multiple custodians, and can be set up to require several independent signatures for any transfers.

Alternatively, you may use the **Ever Wallet** contract. It has some different features and capabilities. You can read about them and find the contract files in this [repository](https://github.com/broxus/ever-wallet-contract).

**Note**: Ever Wallet however is not currently supported by Everdev CLI tool, so only the SDK approach will work for it. If you choose it, skip straight to the [SDK section with Ever Wallet sample](#ever-wallet). 

## Using CLI tool

[Everdev](https://docs.everos.dev/everdev/), the command line tool for development on the TVM blockchains, allows to write scripts to deploy any smart contracts to the blockchain, call all contract methods, sign transactions, and generally manage an account.

> **Note**: This section is only applicable for Multisig Wallet. Refer to the [SDK section](#ever-wallet) for Ever Wallet guidelines.

### 1. Install Everdev

```sh
$ npm install -g everdev
```

It requires [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to be installed.

If you experience any problems with installation, check out our [troubleshooting](https://docs.everos.dev/everdev/troubleshooting) section.

### 2. Configure network connection

Everdev has a built-in [network](https://docs.everos.dev/everdev/command-line-interface/network-tool) tool to manage your networks and access credentials.

Add Venom endpoint to everdev and make it default:

```
everdev network add venom https://gql-testnet.venom.foundation/
everdev network default venom
```

### 3. Set a giver contract on your network

On Venom, you need to sponsor a contract address in advance to be able to deploy the contract.

Everdev provides a way to set an account of your choice as a giver for deployment operations, so you will not have to do a separate step of sending tokens to a new contract address every time you deploy something. This contract can be some multisig wallet, for example your [Venom Wallet](https://venomwallet.com/).

**Note**: To work automatically, the giver contract should have only one custodian.

To set it up, first save the custodian keys of your giver account into a signer that will be used to sign giver transactions (Learn more about the signer tool [here](https://docs.everos.dev/everdev/command-line-interface/signer-tool)):

```sh
everdev signer add giver_sign signer_secret_key_or_seed_phrase_in_quotes
```

Then add the giver address specifying the signer to be used with it.

```sh
everdev network giver venom giver_address --signer giver_sign --type MsigV2
```

Where

`giver_type` is the type of the giver contract you selected (GiverV1 | GiverV2 | GiverV3 | SafeMultisigWallet | MsigV2| SetcodeMultisigWallet). MsigV2 is supported in the Venom wallet.

### 4. Get wallet account contract files

We recommend using[ Multisig 2.0](https://github.com/EverSurf/multisig2) contracts as a wallet. They can be found [here](https://github.com/EverSurf/multisig2). In this guide SetcodeMultisig specifically is used.

Download the contract files and place them in the working folder. Direct links to its files are as follows:

**.tvc** - Compiled contract code

SetcodeMultisig.tvc direct link:

https://github.com/EverSurf/multisig2/raw/main/build/SetcodeMultisig.tvc

**.abi.json** - application binary interface, describing the functions of the contract

SetcodeMultisig.abi.json direct link:

https://raw.githubusercontent.com/EverSurf/multisig2/main/build/SetcodeMultisig.abi.json

Execute the commands of the following steps from the directory with the contract files.

### 5. Create wallet account signer

To generate your wallet account signer enter the following command:

```shell
everdev signer generate wallet_signer
```

Or, if you already have a seed phrase, add it like this:

```shell
everdev signer add wallet_signer "your-seed-phrase-here"
```

To deploy multisig wallet account you will need to specify the public key of the signer. To view it, use the following command:

```sh
everdev signer info wallet_signer
```

The keys will be displayed in terminal (if you imported the seed phrase, it will be displayed here as well):

```sh
{
    "name": "wallet_signer",
    "description": "",
    "keys": {
        "public": "8f8779e7c1944b133a423df96d06ae770c996f19d63438dbf2f569a29529b248",
        "secret": "ce57d2666d0d2c737a03ca4e6cfa38c5ca088dbcef43eb0353896feca8aea2a5"
    }
}

```

Usually a single owner (with a single signer) per wallet account is optimal for any tasks that require automation. However, it is possible to set up accounts with multiple owners. In this case, each of the owners has to generate their own signer and provide their public keys to the deployer. Also, the signer used to deploy the account doesn't have to be among its owners.

### 6. Deploy the wallet account contract to blockchain

Use the following command for a simple one-owner account:

```shell
everdev contract deploy SetcodeMultisig.abi.json constructor --signer wallet_signer --input owners:[<owner_public_key>],reqConfirms:1,lifetime:3600 --value 1000000000
```

Where

`value` parameter is the amount of nanotokens to be spent on deployment (can be omitted, in which case 10 tokens from giver will be spent)

`owner_public_key` is usually the public key of `wallet_signer` in the form `0x...`.

`lifetime` - time in seconds that a transaction in multi-owner accounts will persist and be available for signing by other owners. For a simple multi owner account may be set to any value, as it will be executed immediately anyway.

Example:

```sh
everdev contract deploy SetcodeMultisig.abi.json constructor --signer wallet_signer --input owners:[0x8f8779e7c1944b133a423df96d06ae770c996f19d63438dbf2f569a29529b248],reqConfirms:1,lifetime:3600 --value 1000000000
```

For more complex cases (multiple owners etc.) view Everdev contract tool [docs](https://docs.everos.dev/everdev/command-line-interface/contract-management).

Once the contract is deployed, its address will be displayed in terminal.

```sh
everdev contract deploy SetcodeMultisig.abi.json constructor --signer wallet_signer --input owners:[0x3da1909b7a4bd11fd9a1d79ca9713a9a8645880e0a7a12f9691c68e95d56fe75],reqConfirms:1,lifetime:3600 --value 10000000000

Configuration

  Network: venom (https://gql-testnet.venom.foundation/)
  Signer:  wallet_signer (public 8f8779e7c1944b133a423df96d06ae770c996f19d63438dbf2f569a29529b248)

Address:   0:95c35b94e98c1b5c7716a9129ed5bb0798c8c336465fd8d1eb0d385e3d969494 (calculated from TVC and signer public)

Parameters of constructor:

  owners (uint256[]): ["0x3da1909b7a4bd11fd9a1d79ca9713a9a8645880e0a7a12f9691c68e95d56fe75"]
  reqConfirms (uint8): "1"
  lifetime (uint32): "3600"

Deploying...
Contract is deployed at address: 0:95c35b94e98c1b5c7716a9129ed5bb0798c8c336465fd8d1eb0d385e3d969494

```

## Using SDK

You may integrate above described process of wallet account deployment into your backend code. The functionality is supported in SDK.

> [Bindings](https://docs.everos.dev/ever-sdk/#community-bindings) for a large number of languages have been developed for SDK.

### Multisig Wallet

A sample is available in [this repository](https://github.com/tonlabs/sdk-samples/tree/master/demo/msig-wallet) and an overview is given below.

To run the sample, clone the repository, save the Venom endpoit as an environment variable and launch:

```sh
export ENDPOINT=https://gql-testnet.venom.foundation/graphql
npm i
npm run msig-wallet
```

Note, that similar to the Everdev approach described above, you have to sponsor a user account before deploying contract code. The sample assumes you send test tokens to the contract address generated by the sample. In a production environment you may set up a giver to sponsor your contract deployment operations. An example of such a set up can be found in this [sample](https://github.com/tonlabs/sdk-samples/tree/master/demo/hello-wallet).

The recommended [SetcodeMultisig](https://github.com/tonlabs/sdk-samples/blob/master/demo/msig-wallet/contract/SetcodeMultisig.sol) contract is used.

```typescript

 async function main(client: TonClient) {
    // 
    // 1. ------------------ Deploy multisig wallet --------------------------------
    // 
    // Generate a key pair for the wallet to be deployed
    const keypair = await client.crypto.generate_random_sign_keys();

    // TODO: Save generated keypair!
    console.log('Generated wallet keys:', JSON.stringify(keypair))
    console.log('Do not forget to save the keys!')

    // To deploy a wallet we need its TVC and ABI files
    const msigTVC: string =
        readFileSync(path.resolve(__dirname, "../contract/SetcodeMultisig.tvc")).toString("base64")
    const msigABI: string =
        readFileSync(path.resolve(__dirname, "../contract/SetcodeMultisig.abi.json")).toString("utf8")

    // We need to know the future address of the wallet account,
    // because its balance must be positive for the contract to be deployed
    // Future address can be calculated by encoding the deploy message.
    // https://docs.everos.dev/ever-sdk/reference/types-and-methods/mod_abi#encode_message

    const messageParams: ParamsOfEncodeMessage = {
        abi: { type: 'Json', value: msigABI },
        deploy_set: { tvc: msigTVC, initial_data: {} },
        signer: { type: 'Keys', keys: keypair },
        processing_try_index: 1
    }

    const encoded: ResultOfEncodeMessage = await client.abi.encode_message(messageParams)

    const msigAddress = encoded.address

    console.log(`Please send >= ${MINIMAL_BALANCE} tokens to ${msigAddress}`)
    console.log(`awaiting...`)

    // Blocking here, waiting for account balance changes.
    // It is assumed that at this time you replenish this account.
    let balance: number
    for (; ;) {
        // The idiomatic way to send a request is to specify 
        // query and variables as separate properties.
        const getBalanceQuery = `
                query getBalance($address: String!) {
                    blockchain {
                    account(address: $address) {
                            info {
                            balance
                        }
                    }
                }
            }
            `
        const resultOfQuery: ResultOfQuery = await client.net.query({
            query: getBalanceQuery,
            variables: { address: msigAddress }
        })

        const nanotokens = parseInt(resultOfQuery.result.data.blockchain.account.info?.balance, 16)
        if (nanotokens > MINIMAL_BALANCE * 1e9) {
            balance = nanotokens / 1e9
            break
        }
        // TODO: rate limiting
        await sleep(1000)
    }
    console.log(`Account balance is: ${balance.toString(10)} tokens`)

    console.log(`Deploying wallet contract to address: ${msigAddress} and waiting for transaction...`)

    // This function returns type `ResultOfProcessMessage`, see: 
    // https://docs.everos.dev/ever-sdk/reference/types-and-methods/mod_processing#process_message
    let result: ResultOfProcessMessage = await client.processing.process_message({
        message_encode_params: {
            ...messageParams,  // use the same params as for `encode_message`,
            call_set: {        // plus add `call_set`
                function_name: 'constructor',
                input: {
                    owners: [`0x${keypair.public}`],
                    reqConfirms: 1,
                    lifetime: 3600
                }
            },
        },
        send_events: false,
    })
    console.log('Contract deployed. Transaction hash', result.transaction?.id)
    assert.equal(result.transaction?.status, 3)
    assert.equal(result.transaction?.status_name, "finalized")

    //
```

### Ever Wallet

A sample is available in [this repository](https://github.com/tonlabs/sdk-samples/tree/master/demo/ever-wallet) and an overview is given below.

To run the sample, clone the repository, save the Venom endpoit as an environment variable and launch:

```sh
export ENDPOINT=https://gql-testnet.venom.foundation/graphql
npm i
npm run ever-wallet
```

Note, that similar to the Everdev approach described above, you have to sponsor a user account before deploying contract code. The sample assumes you send test tokens to the contract address generated by the sample. In a production environment you may set up a giver to sponsor your contract deployment operations. An example of such a set up can be found in this [sample](https://github.com/tonlabs/sdk-samples/tree/master/demo/hello-wallet).

The [Ever Wallet](https://github.com/broxus/ever-wallet-contract) contract is used.

```typescript
    // 1. ------------------ Deploy ever-wallet --------------------------------
    // 
    // Generate a key pair for the wallet to be deployed
    const keypair = await client.crypto.generate_random_sign_keys();

    // TODO: Save generated keypair!
    console.log('Generated wallet keys:', JSON.stringify(keypair))
    console.log('Do not forget to save the keys!')

    // To deploy a wallet we need its code and ABI files
    const everWalletCode: string =
        readFileSync(path.resolve(__dirname, "../contract/Wallet.code.boc")).toString("base64")
    const everWalletABI: string =
        readFileSync(path.resolve(__dirname, "../contract/everWallet.abi.json")).toString("utf8")

        const initData = (await client.abi.encode_boc({
            params: [
                { name: "publicKey", type: "uint256" },
                { name: "timestamp", type: "uint64" }
            ],
            data: {
                "publicKey": `0x`+keypair.public,
                "timestamp": 0
            }
        })).boc;

        console.log('Init data', initData);
    

    const stateInit = (await client.boc.encode_state_init({
        code:everWalletCode,
        data:initData
    })).state_init;

    const everWalletAddress = `0:`+(await client.boc.get_boc_hash({boc: stateInit})).hash;
    console.log('Address: ', everWalletAddress);



    console.log(`You can topup your wallet from dashboard at https://dashboard.evercloud.dev`)
    console.log(`Please send >= ${MINIMAL_BALANCE} tokens to ${everWalletAddress}`)
    console.log(`awaiting...`)

    // Blocking here, waiting for account balance changes.
    // It is assumed that at this time you go to dashboard.evercloud.dev
    // and replenish this account.
    let balance: number
    for (; ;) {
        // The idiomatic way to send a request is to specify 
        // query and variables as separate properties.
        const getBalanceQuery = `
                query getBalance($address: String!) {
                    blockchain {
                    account(address: $address) {
                            info {
                            balance
                        }
                    }
                }
            }
            `
        const resultOfQuery: ResultOfQuery = await client.net.query({
            query: getBalanceQuery,
            variables: { address: everWalletAddress }
        })

        const nanotokens = parseInt(resultOfQuery.result.data.blockchain.account.info?.balance, 16)
        if (nanotokens > MINIMAL_BALANCE * 1e9) {
            balance = nanotokens / 1e9
            break
        }
        // TODO: rate limiting
        await sleep(1000)
    }
    console.log(`Account balance is: ${balance.toString(10)} tokens`)



    console.log(`Making first transfer+deploy from ever-wallet contract to address: -1:7777777777777777777777777777777777777777777777777777777777777777 and waiting for transaction...`)
// Here we construct body by ABI
// and then add state init to the message for deploy
  
    let body = (await client.abi.encode_message_body({
        address: everWalletAddress,
        abi: { type: 'Json', value: everWalletABI },
        call_set: {      
            function_name: 'sendTransaction',
            input: {
                dest: '-1:7777777777777777777777777777777777777777777777777777777777777777',
                value: '1000000000', // amount in nano EVER
                bounce: false,
                flags: 3,
                payload: ''
            }
        },
        is_internal:false,
        signer:{type: 'Keys', keys: keypair}
    })).body;

    let deployAndTransferMsg =  await client.boc.encode_external_in_message({
        dst: everWalletAddress,
        init: stateInit,
        body: body
    });

    let sendRequestResult = await client.processing.send_message({
        message: deployAndTransferMsg.message,
        send_events: false
    });

    let transaction = (await client.processing.wait_for_transaction({
        abi: { type: 'Json', value: everWalletABI },
        message: deployAndTransferMsg.message,
        shard_block_id: sendRequestResult.shard_block_id,
        send_events: false
    })).transaction;


    console.log('Contract deployed. Transaction hash', transaction.id)
    assert.equal(transaction.status, 3)
    assert.equal(transaction.status_name, "finalized")

```

## What's next?

Learn how to [send transactions](sending-transactions.md) from  wallet and to [monitor](monitoring-transactions.md) them.
