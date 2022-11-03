---
sidebar_position: 0
sidebar_label: Voting system basics
---

# Voting system basics

Decentralized voting systems is a popular thing on lots of blockchain networks. They are even used to control the DAOs. There is no big deal to develop this system for EVM network. But we should have it in distributed way. Look at scheme:

![Voteing ystem scheme](<../../../../static/img/vote.svg>)
<!-- <p>Simple vote system</p> -->

Let's use similar to TIP-3 mechanic: having a root contract (Vote) and personal Wallets (Ballots). Every participant deploys a ballot for itself, that have a `vote` function, which will call callback of `Vote` contract and pass vote result into. But what if we want to allow vote only for concrete users? Just add an activate function in our Ballot contract, that will be called externally and only by our vote creator (external calls may be signed). Move onto developing.
