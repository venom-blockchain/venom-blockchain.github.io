---
title: "VEP-33: Allowance Token Interface"
---

```preamble
VEP: 33
author: EverDues <contact@everdues.com>
status: Review
type: Contract
created: 16.05.2023
requires: TIP-3, TIP-3.1, TIP-3.2, TIP-6
```

## Abstract
The following standard extends TIP-3.2 with ‘allowance’ functionality which is commonly used in traditional token standards, such as ERC-20.

## Motivation

The TIP-3.2 standard describes how to create a token wallet, how token wallets are owned, how to transfer, mint or burn tokens, how tokens recipients can handle the incoming transfer, etc. Otherwise it doesn’t describe an allowance interface by which token owners can allow a spender contract to spend a certain amount of tokens on their behalf to add support of pull payments (e.g. subscriptions, regular payouts, instalments, costs averaging etc).

## Specification
The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

### [Token root contract](https://docs.venom.foundation/standards/TIP/TIP-3/1#token-root) 

No changes REQUIRED in existing standard TIP-3.2.

### [Token wallet contract](https://docs.venom.foundation/standards/TIP/TIP-3/1#token-wallet)

#### increaseAllowance

Allows the spender contract to withdraw from your wallet multiple times, up to the `amount`. If this function is called again for the same `spender` it increases the current allowance with the `amount`.

```
/// @notice This function increasing user allowance
/// @param spender spender address
/// @param amount allowance amount
/// @param remaningGasTo remaining gas address
/// @param notify notify user
/// @param payload transaction payload

function increaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
		TvmCell payload
) external;
```

**Note:** Multi-allowance MUST be possible by executing increaseAllowance for each spender address.

#### decreaseAllowance

Decreases the current allowance with the `amount`. If the current `spender` allowance does not exist, do nothing. 

```
/// @notice This function is decreasing user allowance
/// @param spender spender address
/// @param amount allowance amount
/// @param remaningGasTo remaining gas address
/// @param notify notify user
/// @param payload transaction payload

function decreaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
		TvmCell payload
) external;
```

**Note**: 
1. If the `amount` is `>=` that existing allowance then deletes the current allowance.

#### allowance

Returns the amount which spender is still allowed to withdraw from the wallet.

```
function allowance(address spender) external view returns (uint128 amount);
``` 

#### transferFrom

The `transferFrom` method is used for a withdrawal workflow, allowing `spender` contracts to transfer tokens on your behalf to a token wallet, owned by the `spender`. Token wallet address is derived automatically.

The function MUST throw an error unless the message sender has permission to withdraw such an amount of tokens granted via the `approve` function. The function MUST decrease the allowed number of tokens by the `amount` and call the `acceptTransfer` function of the `recipientWallet` with the `amount` as an argument and decrease the token wallet balance by `amount`. The function MUST throw an error, if the current `balance` of tokens is less than the `amount`. 

If `deployWalletValue` is greater than `0`, token wallet MUST deploy token wallet for recipient.

```

/// @notice This function is transfered tokens to a spender wallet
/// @param amount tokens amount
/// @param deployWalletValue value to deploy the recipient's wallet if needed
/// @param notify notify user
/// @param payload transaction payload

function transferFrom(
		uint128 amount,
		uint128 deployWalletValue,
		address remainingGasTo,
		bool notify,
		TvmCell payload
) external;
```

### Callbacks

#### Incoming approval callback

Notifies spender contract that an allowance was changed.

```
/// @notice This function notify spender contract about allowance changes
/// @param tokenRoot token root address
/// @param recoveryRate recovery rate
/// @param sender sender address
/// @param remaningGasTo remaining gas address
/// @param payload transaction payload

function onAcceptTokensAllowance(
          address tokenRoot,
          uint128 amount,
          uint128 recoveryRate,
          address sender,
          address remainingGasTo,
          TvmCell payload
) external;
```

### Extended interface

#### disapprove

Cancel current spender allowance. Can be used as an alternative to `decreaseAllowance` to cancel allowance without need to know the amount of the current allowance. 

```
function disapprove(address spender) external;
```

#### increaseAllowanceRenewable

An auto-renewable allowance enables many traditional financial concepts like credit and debit limits. A wallet owner can specify a spending limit, and limit the amount that can be charged from the wallet based on an allowance that recovers over time at a rate of recoveryRate up to a limit of amount. recoveryRate defines the amount of tokens per second that the allowance regains towards the initial maximum approval amount. If this function is called again for the same spender it increases the current allowance with the amount or current recovery rate according to the new recoveryRate.

```

/// @notice This function increasing user allowance
/// @param spender spender address
/// @param amount tokens amount
/// @param recoveryRate recovery rate
/// @param remaningGasTo remaining gas address
/// @param payload transaction payload

function increaseAllowanceRenewable(
		address spender,
		uint128 amount,
		uint128 recoveryRate,
		address remaningGasTo,
		bool notify,
		TvmCell payload
) external;
```

**Note**: 
1. Renewable allowances can be implemented with discrete resets per time cycle. However, a continuous `recoveryRate` allows for more flexible use cases not bound by reset cycles and can be implemented with simpler logic.
2. Current recovered allowance (from the last execution of `tranferFrom` function) MUST be recalculated according new `amount` and/or `recoveryRate`.

#### decreaseAllowanceRenewable

Decreases the current allowance with the `amount` and/or current recovery rate with `recoveryRate`. If the current `spender` allowance does not exist, do nothing. 

```
/// @notice This function is decreasing user allowance
/// @param spender spender address
/// @param amount allowance amount
/// @param recoveryRate recovery rate
/// @param remaningGasTo remaining gas address
/// @param notify notify user
/// @param payload transaction payload

function decreaseAllowanceRenewable(
		address spender,
		uint128 amount,
		uint128 recoveryRate,
		address remaningGasTo,
		bool notify,
		TvmCell payload
) external;
```

**Note**: 
1. If the `amount` is `>=`that existing allowance then deletes the current allowance.
2. Current recovered allowance (from the last execution of `tranferFrom` function) MUST be recalculated according new `amount` and/or `recoveryRate`.

#### allowanceRenewable

Returns approved max amount and recovery rate of allowance granted to spender. The amount returned by allowance method MUST be as of `block.timestamp`, if a renewable allowance for `spender` is present.

```
function allowanceRenewable() external view returns (uint128 amount, uint128 recoveryRate);
```

#### increaseAllowance, decreaseAllowance

Base methods `increaseAllowance` and `decreaseAllowance` MUST set recoveryRate to `0`.

### Interface detection

#### Allowance

```
interface IAllowanceTokenWallet {

      /// @notice This function increasing user allowance
	  /// @param spender spender address
      /// @param amount tokens amount
      /// @param remaningGasTo remaining gas address
      /// @param payload transaction payload
	  
	  function increaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
	 	TvmCell payload
      ) external;

	  /// @notice This function is decreasing user allowance
	  /// @param spender spender address
	  /// @param amount allowance amount
	  /// @param recoveryRate recovery rate
	  /// @param remaningGasTo remaining gas address
	  /// @param notify notify user
	  /// @param payload transaction payload
      
	  function decreaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
		TvmCell payload
      ) external;

      function allowance(address sender) external returns (uint128 amount);

      /// @notice This function is transfered tokens to a spender wallet
      /// @param amount tokens amount
      /// @param deployWalletValue value to deploy the recipient's wallet if needed
      /// @param notify notify user
      /// @param payload transaction payload

      function transferFrom(
		uint128 amount,
		uint128 deployWalletValue,
		address remainingGasTo,
		bool notify,
		TvmCell payload
      ) external;
}
```

The token wallet interface ID is `0x2FC61B07`

#### Renewable Allowance

```
interface IAllowanceRenewableTokenWallet {
    
      /// @notice This function increasing user allowance
	  /// @param spender spender address
      /// @param amount tokens amount
      /// @param remaningGasTo remaining gas address
      /// @param payload transaction payload

      function increaseAllowanceRenewable(
		address spender,
		uint128 amount,
		uint128 recoveryRate,
		address remaningGasTo,
		bool notify,
		TvmCell payload
      ) external;

	  /// @notice This function is decreasing user allowance
	  /// @param spender spender address
	  /// @param amount allowance amount
	  /// @param recoveryRate recovery rate
	  /// @param remaningGasTo remaining gas address
	  /// @param notify notify user
	  /// @param payload transaction payload

      function decreaseAllowanceRenewable(
		address spender,
		uint128 amount,
		uint128 recoveryRate,
		address remaningGasTo,
		bool notify,
		TvmCell payload
      ) external;

      function allowanceRenewable(address sender) external returns (uint128 amount, uint128 recoveryRate);

      /// @notice This function is transfered tokens to a spender wallet
      /// @param amount tokens amount
      /// @param deployWalletValue value to deploy the recipient's wallet if needed
      /// @param notify notify user
      /// @param payload transaction payload

      function transferFrom(
		uint128 amount,
		uint128 deployWalletValue,
		address remainingGasTo,
		bool notify,
		TvmCell payload
      ) external;
}
```

The token wallet interface ID is `0x7EB81C0D`

## Rationale

### Auto-renewable allowance
In the most EVM networks ERC-20 tokens support allowances, with which token owners can allow a spender to spend a certain amount of tokens on their behalf. However, this is not ideal in circumstances involving recurring payments (e.g. subscriptions, regular payouts, instalments, costs averaging etc).
Many existing DApps in EVM networks circumvent this limitation by requesting that users grant a large or unlimited allowance. This presents a security risk as malicious DApps can drain users’ accounts up to the allowance granted, and users may not be aware of the implications of granting allowances.
An auto-renewable allowance is used to mitigate such risks by providing possibility to limit the amount charged from the token wallet based on an allowance that recovers over time.

### increaseAllowance/decreaseAllowance
In ERC-20 token standard allowance is implemented with help of `approve` method but changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. To mitigate such risks we excluded this function from standard and proposed to use `increaseAllowance` and `decreaseAllowance` instead. 

## Backwards compatibility

This standard is compatible with [TIP-3.1], [TIP-3.2] standards.

## Security considerations

There are no security considerations related directly to the implementation of this standard.

## Copyright

Copyright and related rights waived via [CC0](https://docs.venom.foundation/standards/LICENSE/).

## References

* [https://eips.ethereum.org/EIPS/eip-20](https://eips.ethereum.org/EIPS/eip-20)
* [https://eips.ethereum.org/EIPS/eip-5827](https://eips.ethereum.org/EIPS/eip-5827)
* [https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20-increaseAllowance-address-uint256-](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20-increaseAllowance-address-uint256-)
