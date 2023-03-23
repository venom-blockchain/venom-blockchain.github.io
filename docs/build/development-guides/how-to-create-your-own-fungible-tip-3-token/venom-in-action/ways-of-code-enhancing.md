---
sidebar_position: 3
sidebar_label: Ways of code enhancing
---

# Venom In Action. Ways of code enhancing

:::warning
During the following of this guide's code-listings you can meet keywords like `pragma ever-solidity` or keyword `ever` as a unit of the transfer value. It will be changed to `venom` soon. Follow the news and updates.
:::

Let's go over some best practice points, that will helps us to enhance a code we have. As you remember we have some `tvm.rawReserve` calls, like

```solidity
tvm.rawReserve(1 ever, 0);
```

Moving these gas constants to a standalone library is a good form. Same for external calling:

```solidity
ITokenRoot(distributedTokenRoot).deployWallet {
    value: 0.2 ever,
    flag: 1,
    callback: Tokensale.onTokenWallet
}
(
    address(this),
    0.1 ever
);
```

Just create some library:

```solidity title="TokensaleGas.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;

library TokensaleGas {
    uint128 constant INITIAL_BALANCE                                  = 0.7  ever;
    uint128 constant DEPLOY_EMPTY_WALLET_VALUE                        = 0.2  ever;
}
```

So that allows you to easily change gas variables for your contract

```solidity title="Tokensale.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...
import "./gas/TokensaleGas.sol"

contract Tokensale {
...
        constructor(
                address distributedTokenRoot,
                uint256 supply,
                uint128 rate,
                address sendRemainingGasTo
            ) public {
                tvm.accept();
                tvm.rawReserve(TokesaleGas.INITIAL_BALANCE, 0);
...
                ITokenRoot(distributedTokenRoot).deployWallet {
                    value: TokesaleGas.DEPLOY_EMPTY_WALLET_VALUE,
                    flag: 1,
                    callback: Tokensale.onTokenWallet
                } (
                    address(this),
                    0.1 ever // create a constant for this variable too :)
                );
```

You can accept the same idea for error codes:

```solidity title="TokensaleErrors.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;

library TokensaleErrors {
    uint8 constant BAD_ROOT_CALL               = 101;
}
```

```solidity title="Tokensale.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...

import "./errors/TokensaleErrors.sol"

...

    function onTokenWallet(address value) external {
        require (
            msg.sender.value != 0 &&
            msg.sender == _distributedTokenRoot,
            TokensaleErrors.BAD_ROOT_CALL
        );

...
```
