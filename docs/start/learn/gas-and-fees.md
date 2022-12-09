---
sidebar_position: 5
sidebar_label: Gas and fees
slug: /learn/transaction-fees
---

# Gas and Fees

To send a message to the network, you must attach a certain amount of VENOM.
This is used to pay the validators for their work, cover the cost of storing
the message on the network, and any remaining amount is returned as a change.

This mechanism serves several purposes:

1. **To incentive** validators to maintain the correct operation of the network,
perform transaction calculations, and store contract data on their nodes

2. **To restrict** the ability to send spam to the network and restrict attempts
to slow it down by malicious parties

There are several important characteristics of commissions:

The cost of a gas unit in the network is fixed and is specified in the global configuration,
which can only be changed by the general consensus of validators
:::info Gas cost in the network
Currently, one gas unit in the network costs 100 nanoVENOM
:::

The network also charges a commission for data storage for the entire
time of their existence in the network

The commission is always paid from the contract balance, as external messages
cannot be value-bearing messages.

The user determines how much VENOM to attach as payment fees
from their contract account to the call. The attached value is the maximum
amount that will be spent on executing the call chain.
Usually, the DApp automatically proposes the recommended value for the user.

## Fee Calculation

As we know from the article [Messages and Transactions](messages-and-transactions.md#transaction-phases)
, there are several phases of transaction execution. Each phase is associated
with its own type of fee.

**Inbound external message fee**: the only type of fee not related to the
described phases of transaction execution. It is charged in the case of
transaction initialization by an external message, as a fee for sending the
message (*forward message fee*).

Consider types of fees in the context of execution phases:

**Storage**: related to the namesake fee (*Storage fee*) and charged for storing
the contract and associated data.

**Credit**: the only phase not associated with the charging of any fee.

**Compute**: charges (*Gas fee*) a fee for calculations performed in the called account (contract).

**Action**: each outgoing message from the contract, both external and
internal, must be paid a fee (*Action fee*) as a fee for sending the message.

**Bounce**: in case of an error, an exception will be created and an internal
outgoing message will be taken for which a fee will be charged as a fee for
sending the message.

As a result, the formula for forming a transaction fee is as follows:

```rust
transaction_fee = inbound_external_message_fee
                + storage_fees                    // Storage
                + gas_fees                        // Compute
                + total_action_fees               // Action
                + outbound_internal_messages_fee  // Action + Bounce
```

## Inbound external message fee

When an inbound external message is imported for transaction execution, a fee
is calculated and paid to the current validators using the standard forwarding
fee formula. This fee is referred to as the action fee.

### Forward message fee

This formula represents the total fee for forwarding a message, which is
calculated by adding the `lump_price` to the price of forwarding the message's
`bits` and `cells`. The price of forwarding the message's `bits` and `cells` is
calculated by multiplying the price per bit and the number of bits in the
message, and the price per cell and the number of cells in the message, and
then dividing the result by 2^16. The final result is then
rounded up to the nearest integer number.

$$
msg\_fwd\_fee = lump\_price + \left\lceil\frac{bit\_price \cdot bits + cell\_price \cdot cells}{2^{16}} \right\rceil
$$

The `bits` and `cells` values are derived from the tree of cells
representation of the message, with the root cell not being counted.

The `lump_price`, `bit_price`, and `cell_price` values are found in the global
configuration parameters `p24` and `p25`, and can only be changed by a vote of
validators.

## Storage fees

As mentioned earlier, in Venom, every transaction has a storage phase that
incurs a storage fee charged to the account balance. This fee is calculated
using the following formula and is charged for the time between transactions:

The storage fees are calculated by first multiplying the number of `bits` by the
global bit price and the number of `cells` by the global cell price. This result
is then multiplied by the period value and divided by 2^16.

Finally, the result is rounded up to the nearest integer.

$$
storage\_fees = \left\lceil \frac{(bits * global\_bit\_price + cells *
global\_cell\_price) * period}{2^{16}} \right\rceil
$$

Where:

`bits` and `cells`: represent the number of bits and cells in
the Account structure, which is represented as a tree of cells (including code
and data).

`global_bit_price`: a global configuration parameter (`p18` for both the
masterchain and workchains), which is the price for storing one bit.

`global_cell_price`: another global configuration parameter (`p18` for both
the masterchain and workchains), which is the price for storing one cell.

`period`: the number of seconds since the previous storage fee payment.

## Gas fees

For most primitives gas is calculated according to the following formula:

$$
Pb := 10 + b
$$

Where `b` is the instruction length in bits

Gas fees are only applicable if the TVM compute phase is initialized for a
transaction. If the compute phase is not initialized, these fees may be skipped.

## Action fees

Action fees are used to cover the cost of performing `send message` actions.
These fees are comprised of all fees for external outbound messages, as well as
the first fraction of internal outbound message fees. The calculation of Action
fees is as follows:

$$
total\_action\_fees = total\_out\_ext\_msg\_fwd\_fee + total\_int\_msg\_mine\_fee
$$

- `total_out_ext_msg_fwd_fee`: the sum of implicit forward fees for all
generated outbound external messages.
- `total_int_msg_mine_fee`: the sum of 'mine' parts of message forward fees for
outbound internal messages.

The action fee might be absent if no actions are performed during the transaction.

## Outbound messages

The `outbound_internal_messages_fee` is determined by summing the fees for each
outbound internal message generated as a result of transaction execution.

$$outbound\_internal\_messages\_fee = \sum_{i=1}^{n} (out\_int\_msg\_i.fwd\_fee + out\_int\_msg\_i.ihr\_fee)$$

where `n` is the number of outbound internal messages.
