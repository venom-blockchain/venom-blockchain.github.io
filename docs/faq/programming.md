---
sidebar_position: 2
sidebar_label: Programming smart contracts
---

# Venom Blockchain FAQ: Programming smart contracts

<details>
<summary>
I know how to develop Ethereum smart contracts. What is the difference with Venom Blockchain?
</summary>

Your experience with EVM-based blockchains will be useful for developing smart contracts on Venom Blockchain. But there are some differences and the main one is the contracts communication model. You can check [this](../build/development-guides/comparing-of-ethereum-vs-venom-architectures.md) article to know the difference.

Moreover, Venom Blockchain uses Threaded Solidity language, which is a superset of Solidity. You can check its specification [here](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md)

</details>

<details>
<summary>
Which tools can help me for developing on Venom?
</summary>

Check out [this](../build/quick-start-on-testnet.md) article. We have an awesome [repository](https://github.com/venom-blockchain/awesome-venom) as well.

</details>

<details>
<summary>
Does Venom Blockchain have some improvement proposals or some standards for example of fungible/non-fungible tokens?
</summary>

Sure! You can check the [standards](../standards/VEP/readme.md) section, it's right here on the top menu bar :)

</details>

<details>
<summary>
How can I get a state of another contract from my contract?
</summary>

Contracts in Venom can't access any smart contract state directly, because of a special communication model. You can check [this](../build/development-guides/comparing-of-ethereum-vs-venom-architectures.md) article to know the difference. So the only way is to send a message to a contract asking it to return the state you need. The smart contract you are calling should implement a special `responsible` function for such calls. Example:

```solidity
contract RemoteContract {
    // Note this function is marked as responsible to call callback function
    function getCost(uint x) public pure responsible returns (uint) {
        uint cost = x == 0 ? 111 : 222;
        // return cost and set option for outbound internal message.
        return{value: 0, bounce: false, flag: 64} cost;
    }
}

contract Caller {
    function test(address addr, uint x) public pure {
        // `getCost` returns result to `onGetCost`
        RemoteContract(addr).getCost{value: 1 ton, callback: Caller.onGetCost}(x);
    }

    function onGetCost(uint cost) public {
        // Check if msg.sender is expected address
        // we get cost value, we can handle this value
    }
}
```

There are many examples of this mechanic within the articles in the [Development Guides](../build/development-guides/readme.md) section. Check this out.

</details>

<details>
<summary>
What is the 'flag' of the message and which exactly should I use?
</summary>

The parameter `flag` of the message determines how much funds will be carried with the message and how to operate with the forward fee.

Possible values of parameter flag:

- 0 - message carries funds equal to the value parameter. The forward fee is subtracted from the `value`.
- 128 - message carries all the remaining balance of the current smart contract. The parameter `value` is ignored. The contract's balance will be equal to zero after the message processing.
- 64 - carries funds equal to the value parameter plus all the remaining `value` of the inbound message (that initiated the contract execution).
The parameter `flag` can also be modified:

- flag + 1 - means that the sender wants to pay transfer fees separately from the contract's balance.
- flag + 2 - means that any errors arising while processing this message during the action phase should be ignored. But if the message has the wrong format, then the transaction fails and + 2 has no effect.
- flag + 32 - means that the current account must be destroyed if its resulting balance is zero. For example, flag: 128 + 32 is used to send the whole balance and destroy the contract.

You can check more information about flags in threaded solidity [specification](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#addresstransfer)

</details>

<details>
<summary>
I've received an error code while developing. What does it mean?
</summary>

You can meet the TVM exception code:

| Name | C++ code | Rust code  | Definition |
|------|:--------:|:----------:|------------|
| Stack underflow   | 2  | -3  | Not enough arguments in the stack for a primitive |
| Stack overflown   | 3  | -4  | More values have been stored on a stack than allowed by this version of TVM |
| Integer overflow  | 4  | -5  | Integer does not fit into expected range (by default −2<sup>256</sup> ≤ x < 2<sup>256</sup>), or a division by zero has occurred |
| Range check error | 5  | -6  | Integer out of expected range |
| Invalid opcode    | 6  | -7  | Instruction or its immediate arguments cannot be decoded |
| Type check error  | 7  | -8  | An argument to a primitive is of incorrect value type |
| Cell overflow     | 8  | -9  | Error in one of the serialization primitives |
| Cell underflow    | 9  | -10 | Deserialization error |
| Dictionary error  | 10 | -11 | Error while deserializing a dictionary object |
| Unknown error     | 11 | -12 | Unknown error, may be thrown by user programs |
| Fatal error       | 12 | -13 | Thrown by TVM in situations deemed impossible |
| Out of gas        | 13 | -14 | Thrown by TVM when the remaining gas (g r ) becomes negative. This exception usually cannot be caught and leads to an immediate termination of TVM |

Or Solidity runtime error:

| Code | Definition |
|------|:----------:|
| 40 | External inbound message has an invalid signature. See `tvm.pubkey()` and `msg.pubkey()`. |
| 50 | Array index or index of `mapping.at()` is out of range. |
| 51 | Contract's constructor has already been called. |
| 52 | Replay protection exception. See `timestamp` in pragma `AbiHeader`. |
| 53 | See `address.unpack()`. |
| 54 | `array.pop` call for an empty array. |
| 55 | See `tvm.insertPubkey()`. |
| 57 | External inbound message is expired. See expire in pragma AbiHeader. |
| 58 | External inbound message has no signature but has public key. See `pubkey` in pragma `AbiHeader`. |
| 60 | Inbound message has wrong function id. In the contract there are no functions with such function id and there is no fallback function that could handle the message. See fallback. |
| 61 | Deploying `StateInit` has no public key in data field. |
| 62 | Reserved for internal usage. |
| 63 | See `optional(Type).get()`. |
| 64 | `tvm.buildExtMSg()` call with wrong parameters. `See tvm.buildExtMsg()`. |
| 66 | Convert an integer to a string with width less than number length. See `format()`.
| 67 | See `gasToValue` and `valueToGas`. |
| 68 | There is no config parameter 20 or 21. |
| 69 | Zero to the power of zero calculation (0**0 in solidity style or 0^0). |
| 70 | string method substr was called with substr longer than the whole string. |
| 71 | Function marked by externalMsg was called by internal message. |
| 72 | Function marked by internalMsg was called by external message. |
| 73 | The value can't be converted to enum type. |
| 74 | Await answer message has wrong source address. |
| 75 | Await answer message has wrong function id. |
| 76 | Public function was called before constructor. |
| 77 | It's impossible to convert variant type to target type. See `variant.toUint()`. |
| 78 | There's no private function with the function id. |
| 79 | You are deploying contract that uses pragma upgrade func/oldsol. Use the contract only for updating another contracts. |

Any error with a code over 100 is a user-defined error. Check the code in the contract you call.

You can check more information about errors in threaded solidity [specification](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#tvm-exception-codes)

</details>

<details>
<summary>
My contract needs to receive fungible tokens. How can I do it?
</summary>

Your contract should have a TIP3 TokenWallet to perform this action. It is not necessary how exactly your contract will get its wallet (ex. you can call [deployWallet](../standards/TIP/TIP-3/2.md#deploy-token-wallet) of TokenRoot inside your contract constructor or deploy it by yourself). Next, your contract should implement an [onAcceptTokensTransfer](../standards/TIP/TIP-3/2.md#incoming-transfer-callback) callback. Pay attention, that a sender should set [notify](../standards/TIP/TIP-3/2.md#transfer-tokens-to-the-recipient) flag to true for this callback to be called.

Check out [this](../build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/venom-in-action/simple-nft-auction.md) guide, which shows how to implement a simple auction contract that accepts TIP-3 tokens.

Of course, you need to check [TIP-3 standards](../standards/TIP/TIP-3/core-description.md) too.

</details>

<details>
<summary>
There are amount of fees including storage fees. How should I manipulate gas to be sure that my contract will be able to pay for all of them?
</summary>

You need to think out the gas management. You need to manipulate with flags of the message your contract sends and use [`tvm.rawReserve()`](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#tvmrawreserve) function. 

Check out [this](../build/development-guides/how-to-create-your-own-fungible-tip-3-token/venom-in-action/simple-tokensale.md) guide, that raises the issue of gas management.

</details>
