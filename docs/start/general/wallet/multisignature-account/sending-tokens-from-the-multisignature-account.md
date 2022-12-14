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
In order to send tokens from the Multisignature account, the majority of Custodians (i.e. 2 out of 3; but 2 out of 2) will have to sign the transaction.


**For the initiator of the transaction:**
1. From the main screen of the Venom Wallet extension, open the preferred Multisignature account or Tracking account.
2. Select a command to “Send”.

<Image img={img01} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

3. At the top of the Send your funds screen select the token which you are going to Send. $VENOM token is selected by default.
4. In the Receiver Address field paste (or manually enter) the wallet address of the recipient.
5. In the Amount field enter the amount of tokens to be sent. This field can contain decimals.

<Image img={img02} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>
 
:::info
After all the data has been entered, the extension will calculate the gas fee and will indicate it in the Blockchain fee field. This field is dynamic and the estimated fee will be changing over time.
:::

6. Enter the Wallet password and click Confirm transaction.
7. A link generated to follow the transaction on Venom scan will appear. The status and details on the transaction can be located by following the link.
    
### Instructions for the custodians, once the transaction has been initiated.

1. Make sure that you are logged into the seed which has been added as a Custodian of the Multisignature account. You find the instructions on how to become the Custodian [here](creating-tracking-account.md).
2. Scroll the Accounts to the connected Tracking account
3. From the main screen go to the Assets tab.

<Image img={img03} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

4. Locate the transaction with the “Waiting for confirmation” label that you are going to sign and click on it.

<Image img={img04} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

5. You can scroll down to see which address is the Initiator of the transaction, and how many Custodians are still pending. You can also find the essential data (such as date and time of transaction, expiration time, recipient address, transaction ID, amount and token being sent, number of signatures collected, and the status of the signature of each custodian).
6. If you are in agreement with the pending transaction to proceed, press “Confirm”.

<Image img={img05} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

7. Enter your Venom Wallet password to confirm.

<Image img={img06} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>
    
:::info
The user can set up the number of the Custodians while creating the Multisignature Account.
:::
