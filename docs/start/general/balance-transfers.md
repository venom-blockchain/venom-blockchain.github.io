---
sidebar_position: 4
sidebar_label: Balance Transfers
slug: /general/balance-transfers
---

import Image from '@theme/IdealImage';
import img01 from './assets/balance-transfers/1.png';
import img02 from './assets/balance-transfers/2.png';
import img03 from './assets/balance-transfers/3.png';
import img04 from './assets/balance-transfers/4.png';
import img05 from './assets/balance-transfers/5.png';

# Balance Transfers

A common application of blockchains is the transfer of funds from one account to another.

:::caution
This guide assumes that you've already [Created A Wallet Account](wallet/creating-new-wallet.md) and you [Have Some Tokens](ecosystem/#venomget)
:::

To initiate transfers we will use the [Venom Wallet Browser Extension](ecosystem/#venom-wallet).

**Step 1.** Open the extension and select the "Send" button.

<Image img={img01} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

**Step 2.** A pop-up window will appear, prompting you to provide the following information:

* "VENOM": The token that will be sent, other options are also available
* "Amount": The quantity of tokens you wish to transfer to the receiver
* "Receiver Address": The address of the recipient who will receive the tokens
* "Comment": An optional text message for the receiver

<Image img={img02} alt="Sending window"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

Upon correctly filling in the input fields, select the "Next" button to proceed.

**Step 3.** You will be directed to a confirmation message screen.**.**&#x20;

Verify that all fields have been filled in correctly, enter your password, and select the "Confirm transaction" button to complete the process.

<Image img={img03} alt="Sending confirmation"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

Upon confirming the transaction, the window will close.

**Step 4.** Open the Venom Wallet again and select the "Transactions" tab. You will see a transaction with the status "Transaction in progress". It will be processed by the network, and the status will change after some time.

<Image img={img04} alt="In progress status"
    style={{ width: "48%", minWidth: "320px", marginRight: "4%", display: "inline-block" }}
    className="balance-transfers inline-img"
/>
<Image img={img05} alt="Applied transaction"
    style={{ width: "48%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

You can now view your transactions in [The Explorers](ecosystem.md/#explorer).
