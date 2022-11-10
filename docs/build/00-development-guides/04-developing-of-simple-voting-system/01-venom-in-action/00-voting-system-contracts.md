---
sidebar_position: 0
sidebar_label: Voting system contracts
description: >-
  This section will show you how to create your own SMV simple system. The real
  purpose of this guide - to explore some common mechanics like address
  calculation, external callings and bounce handling.
---

# Venom In Action. Voting system contracts

No further ado. Let's start with familiar command

```shell
npx locklift init --path my-smv
```

As you previously read, we need to implement two smart contracts. There are no external dependencies for this guide. Start with `Vote` contract. We have a pretty clean state and constructor without something unusual

```solidity title="Vote.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./Ballot.sol";

contract Vote {
    uint16  static _nonce;
    TvmCell static _ballotCode;

    uint256 _managerPublicKey;
    uint32  _acceptedCount;
    uint32  _rejectedCount;

    constructor(
        uint256 managerPublicKey,
        address sendRemainingGasTo
    ) public {
        tvm.accept();
        tvm.rawReserve(0.1 ever, 0);
        _managerPublicKey = managerPublicKey;
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }
}
```

Next function we need - `deployBallot`. It realizes the popular "deploy contract from contract" mechanic well-described [here](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#deploy-contract-from-contract). We should just use `tvm.buildStateInit` function, fill `varInit` section with future values of our `Ballot` contract static variables and use the keyword `new` for deploying.

```solidity title="Vote.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...

contract Vote {
   ...
    function deployBallot(address owner, address sendRemainingGasTo) external view {
        tvm.rawReserve(0.1 ever, 0);
        TvmCell ballotStateInit = tvm.buildStateInit({
            contr: Ballot,
            // varInit section has an affect for target contract address calculation
            varInit: {
                _vote: address(this),
                _managerPublicKey: _managerPublicKey,
                _owner: owner
            },
            code: _ballotCode // we store it in state
        });
        new Ballot{
            stateInit: ballotStateInit,
            value: 0,
            flag: 128
        }(
            sendRemainingGasTo
        ); 
    }
    ...
}
```

Well, the votes will be stored in our Vote contract. That's why we need a special function, that can be called only by Ballot contract. Ballot contract will call this function and pass a vote (accept or reject). But how we can define a function, that can be called only by contracts with concrete code (by contracts, that were deployed by Vote contract)?&#x20;

It can't be any easier. The address of any contract can be definitely calculated if you know state init variables, a public key and contract code:

```solidity title="Vote.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...

contract Vote {
    ...
    // this function will be called by ballots, but how we can know - is calling ballot a fake or not?
    function onBallotUsed(address owner, address sendRemainingGasTo, bool accept) external {
        tvm.rawReserve(0.1 ever, 0);
        // if you know init params of contract you can pretty simple calculate it's address
        TvmCell ballotStateInit = tvm.buildStateInit({
            contr: Ballot,
            varInit: {
                _vote: address(this),
                _managerPublicKey: _managerPublicKey,
                _owner: owner
            },
            code: _ballotCode
        });
        // so address is a hash from state init
        address expectedAddress = address(tvm.hash(ballotStateInit));
        // and now we can just compare msg.sender address with calculated expected address
        // if its equals - calling ballot has the same code, that Vote stores and deploys
        if (msg.sender == expectedAddress) {
            if (accept) {
                _acceptedCount++;
            } else {
                _rejectedCount++;
            }
            sendRemainingGasTo.transfer({value: 0, flag: 128, bounce: false});
        } else {
            msg.sender.transfer({ value: 0, flag: 128, bounce: false });
        }
    }
    ...
}
```

That is the way out! `TokenWallets` of `TIP-3` implementation work the same way to transfer tokens (one wallet calls another wallet's `acceptTransfer` function).

The last thing we need is a `getDetails` view function to return the results of our vote

```solidity
function getDetails() external view returns (uint32 accepted, uint32 rejected) {
    return (_acceptedCount, _rejectedCount);
}
```

Bring it all together

```solidity title="Vote.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./Ballot.sol";

contract Vote {
    uint16  static _nonce;
    TvmCell static _ballotCode;

    uint256 _managerPublicKey;
    uint32  _acceptedCount;
    uint32  _rejectedCount;

    constructor(
        uint256 managerPublicKey,
        address sendRemainingGasTo
    ) public {
        tvm.accept();
        tvm.rawReserve(0.1 ever, 0);
        _managerPublicKey = managerPublicKey;
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function deployBallot(address owner, address sendRemainingGasTo) external view {
        tvm.rawReserve(0.1 ever, 0);
        TvmCell ballotStateInit = tvm.buildStateInit({
            contr: Ballot,
            varInit: {
                _vote: address(this),
                _managerPublicKey: _managerPublicKey,
                _owner: owner
            },
            code: _ballotCode
        });
        new Ballot{
            stateInit: ballotStateInit,
            value: 0,
            flag: 128
        }(
            sendRemainingGasTo
        ); 
    }

    // this function will be called by ballots, but how we can know - is calling ballot a fake or not?
    function onBallotUsed(address owner, address sendRemainingGasTo, bool accept) external {
        tvm.rawReserve(0.1 ever, 0);
        // if you know init params of contract you can pretty simple calculate it's address
        TvmCell ballotStateInit = tvm.buildStateInit({
            contr: Ballot,
            varInit: {
                _vote: address(this),
                _managerPublicKey: _managerPublicKey,
                _owner: owner
            },
            code: _ballotCode
        });
        // so address is a hash from state init
        address expectedAddress = address(tvm.hash(ballotStateInit));
        // and now we can just compare msg.sender address with calculated expected address
        // if its equals - calling ballot has the same code, that Vote stores and deploys
        if (msg.sender == expectedAddress) {
            if (accept) {
                _acceptedCount++;
            } else {
                _rejectedCount++;
            }
            sendRemainingGasTo.transfer({value: 0, flag: 128, bounce: false});
        } else {
            msg.sender.transfer({ value: 0, flag: 128, bounce: false });
        }
    }

    function getDetails() external view returns (uint32 accepted, uint32 rejected) {
        return (_acceptedCount, _rejectedCount);
    }
}
```

Now let's deal with `Ballot` contract. There is no something special in state and constructor:

```solidity title="Ballot.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/IVote.sol";

contract Ballot {
    address static _vote;
    uint256 static _managerPublicKey;
    // we have a static for owner...so our logic would be like "allow this address to vote"
    // we can store a static here for ballot number, and our logic would been "allow that ballot to vote"
    address static _owner;

    bool _activated; // have ballot already been activated
    bool _used;      // have ballot already been used (vote)

    constructor(address sendRemainingGasTo) public {
        // we are reserving another 0.1 here for paying for future external call
        // all another reserves will be on 0.1 only
        tvm.rawReserve(0.1 ever + 0.1 ever, 0);
        if (msg.sender != _vote) {
            selfdestruct(msg.sender);
        }
        _activated = false;
        _used = false;
    }
}    
```

Let's talk about the activation mechanic. In constructor, we already reserved little more venoms. We made it with the purpose, that fee for the external call will be paid from the contract balance. That way of gas management allows us to transfer external calls fee-paying to user responsibility. But activate method shouldn't be called by somebody unauthorized, so we just use `require` keyword by comparing `msg.pubkey` and  `_managerPublicKey` stored in state init. Of course, you need to call `tvm.accept()` function. Simply put, this call allows the contract to use its own balance for executive pay.

```solidity title="Ballot.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...

import "./interfaces/IVote.sol";

contract Ballot {
    ...
    // this function will be called by external message, so contract will pay for this call
    // this mechanic exists for moving commision paying to user responsibility
    // in consctructor we reserver a little more venoms, so here we just will use them (with returning remains)
    // useful mechaninc for your dapp
    function activate() external {
        require(msg.pubkey() == _managerPublicKey, 200);
        tvm.accept(); // allow to use contract balance for paying this function execution
        _activated = true;
        tvm.rawReserve(0.1 ever, 0);
        _owner.transfer({ value: 0, flag: 128, bounce: false });
    }
    ...
}
```

Let's implement the main function of our `Ballot` - `vote`.

Pay attention to imports. We have `import "./interfaces/IVote.sol"`. It's just an interface for calling our `Vote` contract (just like for EVM if you know what I mean).&#x20;

```solidity title="interfaces/IVote.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;

interface IVote {
    function onBallotUsed(address owner, address sendRemainingGasTo, bool accept) external;
}
```

Let us now return to `vote` function

```solidity title="Ballot.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...

import "./interfaces/IVote.sol";

contract Ballot {
    ...
    function vote(address sendRemainingGasTo, bool accept) external {
        require(msg.sender == _owner, 201); // remember the library for error codes :)
        require(_activated && !_used, 202);
        tvm.rawReserve(0.1 ever, 0);
        // just call our vote contract
        IVote(_vote).onBallotUsed{
            value: 0,
            flag: 128,
            bounce: true
        }(_owner, sendRemainingGasTo, accept);
        _used = true;
    }
    ...
}
```

That's all. `Vote` contract will check our Ballot address by calculating it, as you remember, and the vote will be accepted. But what if Vote calls will fail because of some reason (low gas attached or yet network problem!)? Our `Ballot` will be marked as used (`_used` state variable will be set as true, and we can't call vote once again). To solve this problems, TVM has [bounce](../../../../start/learn/03-messages-and-transactions.md) messages and [`onBounce`](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#onbounce) function for handling them. Let's deal with it by example

```solidity title="Ballot.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
...

import "./interfaces/IVote.sol";

contract Ballot {
    ...
    // onBounce function!
    // if our vote contract will reject message, it sends a bounce message to this callback. We should return _used flag to false!
    onBounce(TvmSlice bounce) external {
        uint32 functionId = bounce.decode(uint32);
        // IVote.onBallotUsed send us a bounce message
        if (functionId == tvm.functionId(IVote.onBallotUsed) && msg.sender == _vote) {
            tvm.rawReserve(0.1 ever, 0);
            _used = false; // reset _used flag to false
        }
    }
    ...
}
```

That's it. Now let's bring it all together.&#x20;

```solidity title="Ballot.sol" lineNumbers="true"
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/IVote.sol";

contract Ballot {
    address static _vote;
    uint256 static _managerPublicKey;
    // we have a static for owner...so our logic would be like "allow this address to vote"
    // we can store a static here for ballot number, and our logic would been "allow that ballot to vote"
    address static _owner;

    bool _activated; // have ballot already been activated
    bool _used;      // have ballot already been used (vote)

    constructor(address sendRemainingGasTo) public {
        // we are reserving another 0.1 here for paying for future external call
        // all another reserves will be on 0.1 only
        tvm.rawReserve(0.1 ever + 0.1 ever, 0);
        if (msg.sender != _vote) {
            selfdestruct(msg.sender);
        }
        _activated = false;
        _used = false;
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    // this function will be called by external message, so contract will pay for this call
    // this mechanic exists for moving commision paying to user responsibility
    // in consctructor we reserver a little more venoms, so here we just will use them (with returning remains)
    // useful mechaninc for your dapp
    function activate() external {
        require(msg.pubkey() == _managerPublicKey, 200);
        tvm.accept(); // allow to use contract balance for paying this function execution
        _activated = true;
        tvm.rawReserve(0.1 ever, 0);
        _owner.transfer({ value: 0, flag: 128, bounce: false });
    }

    function vote(address sendRemainingGasTo, bool accept) external {
        require(msg.sender == _owner, 201);
        require(_activated && !_used, 202);
        tvm.rawReserve(0.1 ever, 0);
        // just call our vote contract
        IVote(_vote).onBallotUsed{
            value: 0,
            flag: 128,
            bounce: true
        }(_owner, sendRemainingGasTo, accept);
        _used = true;
    }

    // onBounce function!
    // if our vote contract will reject message, it sends a bounce message to this callback. We should return _used flag to false!
    onBounce(TvmSlice bounce) external {
        uint32 functionId = bounce.decode(uint32);
        // IVote.onBallotUsed send us a bounce message
        if (functionId == tvm.functionId(IVote.onBallotUsed) && msg.sender == _vote) {
            tvm.rawReserve(0.1 ever, 0);
            _used = false;
        }
    }

}
```

Do not forget about tests and scripts. We won't show any scripts in this guideline just because there is no something special in them. All source code with deploy script and simple test suites are available in [repo](https://github.com/venom-blockchain/guides/tree/master/vote-contracts). The next section will show you some enhancements for this code.
