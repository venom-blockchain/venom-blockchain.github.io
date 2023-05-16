<!-- Output copied to clipboard! -->

<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.726 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Tue May 16 2023 03:23:01 GMT-0700 (PDT)
* Source doc: VEP-3.3: Allowance Token Interface (Draft)
* Tables are currently converted to HTML tables.
----->



```
VEP: 3.3
author: EverDues <contact@everdues.com>
status: Draft
type: Contract
created: 10.05.2023
requires: TIP-3, TIP-3.1, TIP-3.2, TIP-6
```



## **Abstract[​](https://docs.everscale.network/standard/TIP-3.2#abstract)**

The following standard extends TIP-3.2 with ‘allowance’ functionality which is commonly used in traditional token standards, such as ERC-20.


## **Motivation[​](https://docs.everscale.network/standard/TIP-3.2#motivation)**

The TIP-3.2 standard describes how to create a token wallet, how token wallets are owned, how to transfer, mint or burn tokens, how tokens recipients can handle the incoming transfer, etc. Otherwise it doesn’t describe an allowance interface by which token owners can allow a spender contract to spend a certain amount of tokens on their behalf to add support of pull payments (e.g. subscriptions, regular payouts, instalments, costs averaging etc).


## **Specification[​](https://docs.everscale.network/standard/TIP-3.2#specification)**

The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.


### **Token root contract**

No changes REQUIRED in existing standard TIP-3.2.


### **Token wallet[​](https://docs.everscale.network/standard/TIP-3.2#token-wallet)** **contract**


#### **Functions**


##### **increaseAllowance**

Allows the spender contract to withdraw from your wallet multiple times, up to the amount. If this function is called again for the same spender it increases the current allowance with the amount.


```
function increaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
		TvmCell payload
) external;
```


**Note: **Multi-allowance MUST be possible by executing increaseAllowance for each spender address.


##### **decreaseAllowance**

Decreases the current allowance with the amount. If the current spender allowance does not exist, do nothing. 


```
function decreaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
		TvmCell payload
) external;
```


**Note**: 



1. If the `amount is >= `that existing allowance then deletes the current allowance.


##### **allowance**

Returns the amount which spender is still allowed to withdraw from the wallet.


```
function allowance(address spender) external view returns (uint128 amount);
```



##### **transferFrom**

The transferFrom method is used for a withdrawal workflow, allowing spender contracts to transfer tokens on your behalf to a token wallet, owned by the spender. Token wallet address is derived automatically.

The function MUST throw an error unless the message sender has permission to withdraw such an amount of tokens granted via the approve function. The function MUST decrease the allowed number of tokens by the amount and call the acceptTransfer function of the recipientWallet with the amount as an argument and decrease the token wallet balance by amount. The function MUST throw an error, if the current balance of tokens is less than the amount. 

If deployWalletValue is greater than 0, token wallet MUST deploy token wallet for recipient.


```
function transferFrom(
		uint128 amount,
		uint128 deployWalletValue,
		address remainingGasTo,
		bool notify,
		TvmCell payload
) external;
```


 \
**Callbacks[​](https://docs.everscale.network/standard/TIP-3.2#callbacks-1)**


##### **Incoming approval callback[​](https://docs.everscale.network/standard/TIP-3.2#incoming-transfer-callback)**

Notifies spender contract that an allowance was changed.


```
function onAcceptTokensAllowance(
          address tokenRoot,
          uint128 amount,
          uint128 recoveryRate,
          address sender,
          address remainingGasTo,
          TvmCell payload
) external;
```



#### **Extended interface**


##### **disapprove**

Cancel current spender allowance. Can be used as an alternative to decreaseAllowance to cancel allowance without need to know the amount of the current allowance. 


```
function disapprove(address spender) external;
```



##### **increaseAllowanceRenewable**

An auto-renewable allowance enables many traditional financial concepts like credit and debit limits. A wallet owner can specify a spending limit, and limit the amount that can be charged from the wallet based on an allowance that recovers over time at a rate of recoveryRate up to a limit of amount. recoveryRate defines the amount of tokens per second that the allowance regains towards the initial maximum approval amount. If this function is called again for the same spender it increases the current allowance with the amount or current recovery rate according to the new recoveryRate.


```
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



1. Renewable allowances can be implemented with discrete resets per time cycle. However, a continuous recoveryRate allows for more flexible use cases not bound by reset cycles and can be implemented with simpler logic.
2. Initial approve sets to maximum approval amount


##### **decreaseAllowanceRenewable**

Decreases the current allowance with the amount and current recovery rate with recoveryRate. If the current spender allowance does not exist, do nothing. 


```
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



1. If the `amount is >= `that existing allowance then deletes the current allowance.


##### **allowanceRenewable**

Returns approved max amount and recovery rate of allowance granted to spender. The amount returned by allowance method MUST be as of block.timestamp, if a renewable allowance for spender is present.


```
function allowanceRenewable() external view returns (uint128 amount, uint128 recoveryRate);
```



##### **increaseAllowance, decreaseAllowance**

Base methods increaseAllowance and decreaseAllowance MUST set recoveryRate to 0.


#### **Interface detection**


##### **Allowance**


```
interface IAllowanceTokenWallet {
      function increaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
	 	TvmCell payload
      ) external;

     function decreaseAllowance(
		address spender,
		uint128 amount, 		
		address remaningGasTo,
		bool notify,
		TvmCell payload
     ) external;

	function allowance(address sender) external returns (uint128 amount);

	function transferFrom(
		uint128 amount,
		uint128 deployWalletValue,
		address remainingGasTo,
		bool notify,
		TvmCell payload
      ) external;
}
```


The token wallet interface ID is `_0x6AD37E62`_


##### **Renewable Allowance**


```
interface IAllowanceRenewableTokenWallet {

      function increaseAllowanceRenewable(
		address spender,
		uint128 amount,
		uint128 recoveryRate,
		address remaningGasTo,
		bool notify,
		TvmCell payload
      ) external;

      function decreaseAllowanceRenewable(
		address spender,
		uint128 amount,
		uint128 recoveryRate,
		address remaningGasTo,
		bool notify,
		TvmCell payload
      ) external;

	function allowanceRenewable(address sender) external returns (uint128 amount, uint128 recoveryRate);
}
```


The token wallet interface ID is `_0x44380A15`_


## References



* [https://eips.ethereum.org/EIPS/eip-20](https://eips.ethereum.org/EIPS/eip-20)
* [https://eips.ethereum.org/EIPS/eip-5827](https://eips.ethereum.org/EIPS/eip-5827)
* [https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20-increaseAllowance-address-uint256-](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20-increaseAllowance-address-uint256-)
