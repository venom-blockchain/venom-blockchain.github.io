---
sidebar_position: 3
sidebar_label: Sending tokens from the Multisignature Account
slug: /general/wallet/sending-tokens-from-the-multisignature-account
---

import Image from '@theme/IdealImage';
import img01 from '../../assets/wallet/34.png';
import img02 from '../../assets/wallet/35.png';
import img03 from '../../assets/wallet/36.png';
import img04 from '../../assets/wallet/37.png';
import img05 from '../../assets/wallet/38.png';
import img06 from '../../assets/wallet/39.png';

# Sending tokens from the Multisignature Account and Approving by Tracking Accounts  
To send tokens from a multisignature account, a majority of the custodians (e.g. 2 out of 3; or 2 out of 2) must sign off on the transaction.


**For the person initiating the transaction:**
1. From the main screen of the Venom Wallet extension, access the desired multisignature or tracking account.
2. Select the "Send" command.

<Image img={img01} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

3. At the top of the "Send your funds" screen, select the token you wish to send. The VENOM token is selected by default.
4. In the "Receiver Address" field, enter the wallet address of the recipient (by manually typing it or pasting it).
5. In the "Amount" field, enter the number of tokens to be sent. This field can accept decimal values.

<Image img={img02} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>


:::info
Once all the data has been entered, the extension will calculate the gas fee and display it in the "Blockchain fee" field. This field is dynamic and the estimated fee can change over time.
:::


6. Enter your wallet password and click on the "Confirm transaction" button.
7. A link to track the transaction on Venom scan will be generated. You can follow this link to view the status and details of the transaction.
    
### Steps for the custodians to take after a transaction has been initiated:

1. Ensure that you are logged into the seed which has been added as a Custodian of the Multisignature account. You find the instructions on how to become the Custodian [By Clicking Here](creating-tracking-account.md).
2. Navigate to the connected tracking account by scrolling through the list of accounts.
3. From the main screen, navigate to the "Assets" tab.

<Image img={img03} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

4. Locate the transaction with the "Waiting for confirmation" label that you will be signing and click on it.

<Image img={img04} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

5. You can scroll down to view the address of the person who initiated the transaction, and the number of custodians who have yet to sign off. Additionally, you will also be able to see relevant information such as the date and time of the transaction, expiration time, recipient address, transaction ID, amount and token being sent, number of signatures collected, and the status of the signature for each custodian.
6. If you agree to proceed with the pending transaction, press "Confirm".

<Image img={img05} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

7. To confirm, enter your Venom Wallet password.

<Image img={img06} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

    
:::info
When creating a multisignature account, the user can set the number of custodians required for a transaction to be executed.
:::
