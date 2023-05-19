---
sidebar_position: 2
description: Sending transactions in Venom
---

# Sending transactions in Venom

The [previous guide](setting-up-wallet-account.md) went into detail on how to set up a wallet in Venom.

This guide follows up with details on how to send transactions from the wallet you set up.

Similarly, SDK and Everdev CLI tool approaches are detailed below. They implement the same process.

The specific function that is used to withdraw the funds depends on the contract chosen for the wallet account. Examples provided below are applicable for the [SetcodeMultisig](https://github.com/EverSurf/multisig2) contract.

## Using CLI tool

Command line `Everdev` tool may be used to automate withdrawals from wallet account in your scripts.

> **Note**: If this is a user wallet in your service and the user made a mistake in the destination address, and has no control over it, these funds will be lost forever. If the account does not exist, and the user makes mistakes deploying it after the funds are transferred, they may end up being lost as well. Below some ways of mitigating this risk are discussed.

To perform a simple transfer from a single-owner account to any specified account, we should make sure that it is already deployed, by setting `bounce` flag to true. If the account does not exist, funds will return back.

```shell
everdev contract run SetcodeMultisig.abi.json sendTransaction --address <wallet_account_address> --signer wallet_signer --input dest:recipient_address,value:50000000000,bounce:true,flags:3,payload:""
```

`<wallet_account_address>` - address of the user account. Example: 0:7bf2b2ec80371601f854bff9ed0a1171714d922c8bfc86d39e67a7e3a41b2176

`wallet_signer` - name of the user account owner signer

`recipient_address` - raw address of the recipient smart contract. Example: 255a3ad9dfa8aa4f3481856aafc7d79f47d50205190bd56147138740e9b177f3

`value`: - amount of tokens to transfer in nanotokens (Example: value:10000000000 sets up a transfer of 10 tokens).

`bounce` - use true to transfer funds only to deployed accounts, and false to transfer to accounts that aren't deployed yet.

`flags` - use 3 for a simple transfer.

`payload` - use "" for simple transfer.

> **Note**: To transfer all funds from the account use `sendTransaction` method with flag `130` and value `0.`

```shell
everdev contract run SetcodeMultisig.abi.json --address <wallet_account_address> sendTransaction --signer wallet_signer --input dest:recipient_address,value:0,bounce:true,flags:130,payload:""
```

Example of regular withdrawal transaction on a single-owner multisig:

```shell
everdev contract run SetcodeMultisig.abi.json sendTransaction --signer wallet_signer --input dest:665a62042aff317ba3f32e36b712b0f4a9d35277dd76dc38c9762cc6421681cf,value:500000000000,bounce:false,flags:3,payload:""

Configuration

  Network: venom (https://gql-testnet.venom.foundation/)
  Signer:  wallet_signer (public 3da1909b7a4bd11fd9a1d79ca9713a9a8645880e0a7a12f9691c68e95d56fe75)

Address:   0:95c35b94e98c1b5c7716a9129ed5bb0798c8c336465fd8d1eb0d385e3d969494

Parameters of sendTransaction:

  dest (address): "665a62042aff317ba3f32e36b712b0f4a9d35277dd76dc38c9762cc6421681cf"
  value (uint128): "500000000000"
  bounce (bool): "false"
  flags (uint8): "3"
  payload (cell): ""


Running...

Execution has finished with result:
{
    "transaction": {
        "json_version": 8,
        "id": "cbeb7f8b1aa7ac89439d9c6772b699a7c042215cef090f206ecc8b21bb230fc9",
        "boc": "te6ccgECDwEAArcAA7d5XDW5TpjBtcdxapEp7VuweYyMM2Rl/Y0esNOF49lpSUAAAOakEwMsEkhiumuyPgwNDWXdmNBHsr9g6Y6XgsntCG/AQxbMH/mAAADmo/0T8BZCW1XwAFSAICQ36AUEAQIPDE/GHimDxEADAgBvyY9CQExRYUAAAAAAAAQAAAAAAARz+2ts0g+y9Ais9VbZ65O+4BourUTTYoPq+tvoLxFJpECQJNQAnUZPYxOIAAAAAAAAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAgnI1Aq0GL7DtfZycdkRDzfxJtFk47dtGidJveUmyV1aRWS0JxA5UCIBaO/paLFUAjm0/YFLGbVz5bUyQ5fEsfxqwAgHgCwYCAd0JBwEBIAgAdeAErhrcp0xg2uO4tUiU9q3YPMZGGbIy/saPWGnC8ey0pKAAABzUgmBlhshLar5JjsFmgAAAAAAAAABAAQEgCgCzSAErhrcp0xg2uO4tUiU9q3YPMZGGbIy/saPWGnC8ey0pKQAZlpiBCr/MXuj8y42txKw9KnTUnfddtw4yXYsxkIWgc9XRqUogAAYUWGAAABzUgmBlhMhLar5AAUWIASuGtynTGDa47i1SJT2rdg8xkYZsjL+xo9YacLx7LSkoDAwB4fRRR+puAACR3O0hyRMPrwVnVPX+pw1OSY/hvAY+6jc/0ST0CDjZIS4ccsC4fPFe5CZoyAH4UOealyQ5K/a8zQXPaGQm3pL0R/ZodecqXE6moZFiA4KehL5aRxo6V1W/nUAAAGHM0x8YGQltYcTHYLNgDQFjgAzLTECFX+YvdH5lxtbiVh6VOmpO+67bhxkuxZjIQtA54AAAAAAAAAAAAAAOjUpRAAQOAAA=",
        "status": 3,
        "status_name": "finalized",
        "storage": {
            "storage_fees_collected": "0x3f",
            "status_change": 0,
            "status_change_name": "unchanged"
        },
        "compute": {
            "success": true,
            "msg_state_used": false,
            "account_activated": false,
            "gas_fees": "0xc53078",
            "gas_used": 12923,
            "gas_limit": 0,
            "gas_credit": 10000,
            "mode": 0,
            "exit_code": 0,
            "vm_steps": 352,
            "vm_init_state_hash": "0000000000000000000000000000000000000000000000000000000000000000",
            "vm_final_state_hash": "0000000000000000000000000000000000000000000000000000000000000000",
            "compute_type": 1,
            "compute_type_name": "vm"
        },
        "action": {
            "success": true,
            "valid": true,
            "no_funds": false,
            "status_change": 0,
            "total_fwd_fees": "0x1e8480",
            "total_action_fees": "0x145850",
            "result_code": 0,
            "tot_actions": 2,
            "spec_actions": 0,
            "skipped_actions": 0,
            "msgs_created": 2,
            "action_list_hash": "39fdb5b66907d97a04567aab6cf5c9df700d1756a269b141f57d6df41788a4d2",
            "tot_msg_size_cells": 2,
            "tot_msg_size_bits": 1178
        },
        "credit_first": true,
        "aborted": false,
        "destroyed": false,
        "tr_type": 0,
        "tr_type_name": "ordinary",
        "lt": "0xe6a413032c1",
        "prev_trans_hash": "24862ba6bb23e0c0d0d65dd98d047b2bf60e98e9782c9ed086fc04316cc1ff98",
        "prev_trans_lt": "0xe6a3fd13f01",
        "now": 1680192863,
        "outmsg_cnt": 2,
        "orig_status": 1,
        "orig_status_name": "Active",
        "end_status": 1,
        "end_status_name": "Active",
        "in_msg": "b10b0866cb7320f9abac1ba6c5a09f7a60bb87b399142aa0a7dda28b086d9a40",
        "ext_in_msg_fee": "0x2798b8",
        "out_msgs": [
            "ff491002eaeaf22e85055d5b055383d8aaaa030bcb5ae34a65b27f15de8e2e34",
            "8f2f48998b041adbae47a3e8ee7541ee918299d316e07c7dbd221501a31b15d8"
        ],
        "account_addr": "0:95c35b94e98c1b5c7716a9129ed5bb0798c8c336465fd8d1eb0d385e3d969494",
        "workchain_id": 0,
        "total_fees": "0x10121bf",
        "balance_delta": "-0x746b5dd5ef",
        "old_hash": "3502ad062fb0ed7d9c9c764443cdfc49b45938eddb4689d26f7949b257569159",
        "new_hash": "2d09c40e5408805a3bfa5a2c55008e6d3f6052c66d5cf96d4c90e5f12c7f1ab0"
    },
    "output": {
        "transId": "0"
    },
    "out_messages": [
        null
    ]
}

```

Basic checks of the address format will be performed by the Everdev utility automatically, only addresses of a valid Venom format will be accepted.

### (Optional) Multi-owner accounts and Confirm transaction

Note, that if the account has multiple custodians, the transaction has to be confirmed by the required number of signatures to be executed. This transaction ID should be communicated to other custodians, who should use it to confirm the transaction.

To withdraw tokens from a multi-owner account use the following command:

```bash
everdev contract run SetcodeMultisig.abi.json submitTransaction --address <wallet_account_address> --signer wallet_signer --input '{ "dest": "recipient_address", "value":10000000000, "bounce": false, "allBalance": false, "payload": "", "stateInit": null }'
```

`<wallet_account_address>` - address of the user account. Example: 0:7bf2b2ec80371601f854bff9ed0a1171714d922c8bfc86d39e67a7e3a41b2176

`wallet_signer` - name of the user account owner signer

`value`: - amount of tokens to transfer in nanotokens (Example: value:10000000000 sets up a transfer of 10 tokens).

`bounce` - use true to transfer funds only to deployed accounts, and false to transfer to accounts that aren't deployed yet.

`allBalance` - used to transfer all funds in the wallet. Use false for a simple transfer.

`payload` - use "" for simple transfer.

`stateInit` - use `null` for a simple transfer.

This will generate a transaction and display its `transId` that will have to be confirmed by other custodians.

To confirm a transaction, use the following command:

```shell
everdev contract run SetcodeMultisig.abi.json confirmTransaction --address <wallet_account_address> --signer wallet_signer2 --input transactionId:6954030467099431873
```

`<wallet_account_address>` - address of the user account. Example: 0:7bf2b2ec80371601f854bff9ed0a1171714d922c8bfc86d39e67a7e3a41b2176

`wallet_signer2` - signer of another multisig custodian (not the one who initiated the transaction).

`transactionId` – the ID of the transaction can be acquired from the custodian who created it.

### Mitigating risks of token loss due to user error

In this section we discuss a scenario where you are running a service with user accounts and your user where they can deposit tokens from and withdraw tokens to external (outside your service) wallets. This is a typical scenario for an exchange.

The are two main cases regarding transfers to external accounts: a user may already have an active account to which they want to withdraw funds (set bounce to true), or they may want to withdraw funds to a completely new account, that doesn't exist at the time withdraw is requested (set bounce to false).

The status of the account provided by the user may be checked with the following Everdev command:

```shell
everdev contract info --address external_address
```

Example of existing account:

```shell
everdev contract info --address 0:665a62042aff317ba3f32e36b712b0f4a9d35277dd76dc38c9762cc6421681cf

Configuration

  Network: venom (https://gql-testnet.venom.foundation/)
  Signer:  owner_keys (public 5ff6b5ba62b52b25ef347984912937bffaf2df88605e4e56cb64b9b617a28fea)

Address:   0:665a62042aff317ba3f32e36b712b0f4a9d35277dd76dc38c9762cc6421681cf
Account:   Active
Balance:   ≈ 51655 tokens (51655086754193 nano)
```

Example of account that doesn't exist yet:

```shell
everdev contract info --address 0:6238e23f6987883b3d1a86e1c39c63ae2baf7f93603d0ea5dc9b6e91ef54a1ab

Configuration

  Network: venom (https://gql-testnet.venom.foundation/)
  Signer:  owner_keys (public 5ff6b5ba62b52b25ef347984912937bffaf2df88605e4e56cb64b9b617a28fea)

Address:   0:6238e23f6987883b3d1a86e1c39c63ae2baf7f93603d0ea5dc9b6e91ef54a1ab (calculated from TVC and signer public)
Code Hash: 80d6c47c4a25543c9b397b71716f3fae1e2c5d247174c52e2c19bd896442b105 (from TVC file)
Account:   Doesn't exist

```

The possible results of this command are the following:

`Doesn't exist` - account does not exist. It needs to be sponsored, then deployed, and only then will it be active.

`Uninit` - account already has some funds on it but contract code has not been deployed yet. User needs to deploy it.

`Active` - account already exists, and its code is deployed.

In the first two cases, the service might first transfer a small portion of the requested amount (\~1 EVER) and request that the user deploys their contract. Upon the user's confirmation that the account is deployed, its status may be rechecked, and if it became active, the remaining amount of requested funds may be safely transferred.

If the account is already active, a small portion of the requested amount may be transferred to the user, and the user may be asked what amount they received (note: a small amount of the transfer, usually less than 0.05 EVER, will be spent on fees, so it's best to ask for the whole number of tokens transferred). If the amounts match, the rest of the requested funds may be transferred as well.

## Using SDK

You may integrate transaction sending into your backend using SDK as well. A sample is available in [this repository](https://github.com/tonlabs/sdk-samples/tree/master/demo/msig-wallet) and an overview of the relevant part is given below. 

In this sample JS SDK is used.  [Bindings](https://docs.everos.dev/ever-sdk/#community-bindings) for a large number of languages have been developed for SDK.

To run the sample, clone the repository, save the Venom endpoit as an environment variable and launch:

```sh
export ENDPOINT=https://gql-testnet.venom.foundation/graphql
npm i
npm run msig-wallet
```

This example shows how to generate a transaction from a Multisig wallet, using its `sendTransaction` method. Note, that if Multisig has multiple custodians, the transaction will have to be initiated by the `submitTransaction` method and confirmed with the `confirmTransaction` method.

In this example tokens are withdrawn from the user account to the account specified in `dest`. In a proper implementation, the desired destination address should be used instead.

```javascript
    // We send 0.5 tokens. Value is written in nanotokens
    const amount = 0.5e9
    const dest = "-1:7777777777777777777777777777777777777777777777777777777777777777"

    console.log('Sending 0.5 token to', dest)

    result = await client.processing.process_message({
        message_encode_params: {
            address: msigAddress,
            ...messageParams, // use the same params as for `encode_message`,
            call_set: {       // plus add `call_set`
                function_name: 'sendTransaction',
                input: {
                    dest: dest,
                    value: amount,
                    bounce: true,
                    flags: 64,
                    payload: ''
                }
            },
        },
        send_events: false, // do not send intermidate events
    })
    console.log('Transfer completed. Transaction hash', result.transaction?.id)
    assert.equal(result.transaction?.status, 3)
    assert.equal(result.transaction?.status_name, "finalized")

```

### Mitigating risks of token loss due to user error

Similarly to the everdev approach, you can add the account status check prior to sending tokens.

In this section we discuss a scenario where you are running a service with user accounts and your user where they can deposit tokens from and withdraw tokens to external (outside your service) wallets. This is a typical scenario for an exchange.

The are two main cases regarding transfers to external accounts: a user may already have an active account to which they want to withdraw funds, or they may want to withdraw funds to a completely new account, that doesn't exist at the time withdraw is requested.

Here is an example of checking account status in SDK:

```typescript
    let balance: number
    let accType: number
    for (; ;) {
        // The idiomatic way to send a request is to specify 
        // query and variables as separate properties.
        const getInfoQuery = `
                query getBalance($address: String!) {
                    blockchain {
                    account(address: $address) {
                            info {
                            balance
                            acc_type
                        }
                    }
                }
            }
            `
        const resultOfQuery: ResultOfQuery = await client.net.query({
            query: getInfoQuery,
            variables: { address: msigAddress }
        })
        

        const nanotokens = parseInt(resultOfQuery.result.data.blockchain.account.info?.balance, 16)
        accType = resultOfQuery.result.data.blockchain.account.info?.acc_type;
        if (nanotokens > MINIMAL_BALANCE * 1e9) {
            balance = nanotokens / 1e9
            break
        }
        // TODO: rate limiting
        await sleep(1000)
    }
    console.log(`Account balance is: ${balance.toString(10)} tokens. Account type is ${accType}`)
```

## What's next?

After setting up a wallet and implementing transaction sending mechanism, you may want to monitor transactions. Read the [next guide](monitoring-transactions.md) to learn how to do it.