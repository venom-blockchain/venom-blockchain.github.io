---
sidebar_position: 3
description: Monitoring Venom transactions
---

# Monitoring Venom transactions

Previous guides went into detail about [wallet setup](setting-up-wallet-account.md) and [sending transactions](sending-transactions.md) on Venom. 

Now let's assume we need to reliably know when funds are sent from or received to a wallet. Samples of transaction [pagination](https://github.com/tonlabs/sdk-samples/tree/master/demo/paginate-transactions) and [subscription](https://github.com/tonlabs/sdk-samples/tree/master/demo/subscribe-transactions) are available in the samples repository. An overview of the relevant parts is given below.

In these samples JS SDK is used. [Bindings](https://docs.everos.dev/ever-sdk/#community-bindings) for a large number of languages have been developed for SDK.

## Pagination

The [pagination](https://github.com/tonlabs/sdk-samples/tree/master/demo/paginate-transactions) sample queries and displays transactions in workchain 0 (workchain where simple transfers happen, -1 workchain is masterchain where you can find service transactions and validator transactions) from the beginning. We can get all the transaction and filter by account addresses on the backend side.

To run the sample, clone the repository, save the Venom endpoit as an environment variable and launch:

```sh
export ENDPOINT=https://gql-testnet.venom.foundation/graphql
npm i
npm run list-tr
```

```typescript
   async function main(client: TonClient) {
    // In this example, we want the query to return 2 items per page.
    const itemsPerPage = 25

    // Pagination connection pattern requires a cursor, which will be set latter
    let cursor: string = undefined

    // The idiomatic way to send a request is to specify 
    // query and variables as separate properties.
    const transactionsQuery = `
        query listTransactions($cursor: String, $count: Int) {
            blockchain {
                transactions(
                    workchain: 0
                    first: $count
                    after: $cursor
                 ) {
                    edges {
                        node { 
                            id
                            balance_delta
                            account_addr
                            # other transaction fields
                     }
                    }
                    pageInfo { hasNextPage endCursor }
                }
            }
        }`

    for (; ;) {
        const queryResult: ResultOfQuery = await client.net.query({
            query: transactionsQuery,
            variables: {
                count: itemsPerPage,
                cursor
            }
        });
        const transactions = queryResult.result.data.blockchain.transactions;

        for (const edge of transactions.edges) {
            console.log("Transaction id:", edge.node.id);
        }
        if (transactions.pageInfo.hasNextPage === false) {
            break;
        }
        // To read next page we initialize the cursor:
        cursor = transactions.pageInfo.endCursor;
        // TODO: rate limiting
        await sleep(1000);
    }

}
console.log("Getting all transactions in workchain 0 from the beginning/")
console.log("Most likely this process will never end, so press CTRL+C to interrupt it")
main(client)
    .then(() => {
        process.exit(0)
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    })



// This helper function is used for limiting request rate
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }
```

**Note**: 
With the next update coming in August 2023, Blockchain API used in this sample for pagination will provide only data from the past 7 days by default. To retrieve earlier data, the `archive: true` flag must be specified in the query.

The flag is already supported by the API, but does not yet affect the query results. To avoid any interruptions when the update happens, you can already include it in your queries where needed.

The following query sample shows how to use the `archive` flag.

```
query {
    blockchain {
        transactions(
            workchain: 0
            archive: true
            ) {
            edges {
                node { 
                    id
                    balance_delta
                    account_addr
                }
            }
            pageInfo { hasNextPage endCursor }
        }
    }
}
```

## Subscription

[Subscription](https://github.com/tonlabs/sdk-samples/tree/master/demo/subscribe-transactions) sample subscribes to new transactions of the listed accounts and lists them as they appear.

To run the sample, clone the repository, save the Venom endpoit as an environment variable and launch:

```sh
export ENDPOINT=https://gql-testnet.venom.foundation/graphql
npm i
npm run subscribe-tr
```

```typescript
async function main() {
    try {
        const client = new TonClient({ network: { endpoints: [endpoint] } })

        const queryText = `
            subscription my($list: [String!]!){
                transactions(
                    filter: {account_addr: { in: $list }}
                ) {
                    id
                    account_addr
                    balance_delta
                }
            }`

        // use `client.net.unsubscribe({ handle })` to close subscription
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { handle } = await client.net.subscribe(
            {
                subscription: queryText,
                variables: { list: addressList }
            },
            responseHandler,
        );
        console.log("Subscribed to transactions of accounts:", JSON.stringify(addressList))
        console.log("Press CTRL+C to interrupt it")

    } catch (error) {
        if (error.code === 504) {
            console.error('Network is inaccessible.');
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function responseHandler(params: any, responseType: number) {
    // Tip: Always wrap the logic inside responseHandler in a try-catch block
    // or you will be surprised by non-informative errors due to the context
    // in which the handler is executed
    try {
        if (responseType === 100 /* GraphQL data received */) {
            if (params?.result) {
                console.log(params.result);
            }

        } else {
            // See full list of error codes here:
            // https://docs.everos.dev/ever-sdk/reference/types-and-methods/mod_net#neterrorcode
            console.error(params, responseType);
        }
    } catch (err) {
        console.log(err);
    }
}
```

## How to determine a successful transaction?

Not all transactions that are successful are valid transfers and not all transactions that are aborted actually failed. 

It depends on the account state before and after the transaction (fields `orig_status` and `end_status`):

- If the account was already deployed, i.e. if `(tx.orig_status == tx.end_status == active)` then you can use `tx.aborted` field. If it is `true`, then the transaction is not successful.

- If the account was not yet deployed then

  -  if `(orig_status == nonExist && end_status == uninit && aborted == true)` then transaction is successful.

        All the transactions executed on non-deployed accounts are aborted by definition but if we see the state has changed to `uninit`, it means that the transfer was successfully received.

  - if `(orig_status == uninit && end_status == uninit && aborted == true && in_message.bounce==false)`then transaction is successful.

       Non-bounced messages are successfully received by non-deployed accounts, though the transaction status is aborted.

       Instead of checking `tx.in_message.bounce==false` you can check if `tx.bounce.bounce_type<2` (tx.bounce.bounce_type==2(Ok) is equal to in_message.bounce==true)