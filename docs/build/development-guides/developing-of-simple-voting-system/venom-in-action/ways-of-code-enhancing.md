---
sidebar_position: 1
sidebar_label: Ways of code enhancing
---

# Venom In Action. Ways of code enhancing

Let's dive into some best practices and good tone coding.&#x20;

First of all, if your contract deploys some other contracts, it's advisable to have a view method for returning the new contract address:

```solidity lineNumbers="true"
function getBallotAddress(address owner) 
    external
    view
    responsible
    returns (address)
{
    TvmCell ballotStateInit = tvm.buildStateInit({
        contr: Ballot,
        varInit: {
            _vote: address(this),
            _managerPublicKey: _managerPublicKey,
            _owner: owner
        },
        code: _ballotCode
    });
    return{value: 0, bounce: false, flag: 64} address(tvm.hash(ballotStateInit));
}
```

As you can see we used some keywords and syntax, that hasn't been discussed before. If the function is marked with `responsible` keyword, this function will generate an outbound message for the caller with the value, bounce and flag you set. It's preferable to use exactly `{value: 0, bounce: false, flag: 64}` for this function. Do you remember TIP-3 wallet deploying from our TIP-3 [guide](../../how-to-create-your-own-fungible-tip-3-token/venom-in-action/simple-tokensale.md)? Function deployEmptyWallet is responsible too. That's why we can set a callback parameter there.

The next important point is success/unsuccess callbacks or events. Enhancing your contract with event emitting wouldn't be amiss. Especially when you deploy something or end some case. For example, we can add `NewBallot` event (when the new ballot is deployed) and `VoteAccepted` event (after `onBallotUsed` callback)

```solidity title="Vote.sol" lineNumbers="true"
...
contract Vote {
    event NewBallot(address owner);
    event VoteAccepted(address ballot, bool accept);
    ...
    function deployBallot(address owner, address sendRemainingGasTo) external view {
        ...
        emit NewBallot(owner);
        sendRemainingGasTo.transfer({value: 0, flag: 128, bounce: false});
        ...
    }
    ...
    function onBallotUsed(address owner, address sendRemainingGasTo, bool accept) external {
        ...
        emit VoteAccepted(expectedAddress, accept);
        sendRemainingGasTo.transfer({value: 0, flag: 128, bounce: false});
        ...
    }
...
}
```

There is another small hack for helping frontend developers. You can transfer a small number of nanotons (1,2,3.., etc) to the owner's address. For example:

`owner.transfer({value: 1, flag: 1, bounce: false))`&#x20;

Frontend developers can subscribe to incoming transactions to the user's wallet and use these small values to detect contract behavior. For example, we can send 1 nanovenom, if the vote has been accepted

```solidity title="Vote.sol" lineNumbers="true"
...
contract Vote {

    ...
    function onBallotUsed(address owner, address sendRemainingGasTo, bool accept) external {
        ...
        owner.transfer({value: 1, flag: 1, bounce: false})
        emit VoteAccepted(expectedAddress, accept);
        sendRemainingGasTo.transfer({value: 0, flag: 128, bounce: false});
    }
...
}l
```

Pay attention, that events and small value callbacks should be instantiated before any transfers with 128 flag.
