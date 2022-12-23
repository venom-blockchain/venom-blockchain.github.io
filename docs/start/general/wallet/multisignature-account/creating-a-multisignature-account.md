---
sidebar_position: 1
sidebar_label: Creating a Multisignature Account
slug: /general/wallet/creating-a-multisignature-account
---

import Image from '@theme/IdealImage';
import img01 from '../../assets/wallet/15.png';
import img02 from '../../assets/wallet/16.png';
import img03 from '../../assets/wallet/17.png';
import img04 from '../../assets/wallet/18.png';
import img05 from '../../assets/wallet/19.png';
import img06 from '../../assets/wallet/20.png';
import img07 from '../../assets/wallet/21.png';
import img08 from '../../assets/wallet/22.png';

# Creating a Multisignature Account and setting up the Custodians

  

There are some circumstances, when there is a need to enable the transaction from a wallet only after the approval by a certain number of individuals. Specifically for such instances a Multisignature Account feature is being applied. 

Below you will find a step-by-step guide for creation of a Multisignature account.
1. Launch the Venom Wallet extension/application.
2. On the Main screen, scroll your existing accounts to the right until you reach the “Add Account” option.

<Image img={img01} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

3. Upon choosing the Add Account option, you will be prompted to choose between the following 2 options: “Add Account” and “Add a tracking account”. Click on the “Add Account” option and then click Next.

<Image img={img02} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

4. To proceed you should enter the name of the Account you are going to create.

<Image img={img03} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

5. In the next screen, you are prompted to select a wallet type. You may choose Default (similar to the one you already have as the first Account on your Venom Wallet) and Multisignature. Click on “Multisignature” and click on Create wallet address to proceed.

<Image img={img04} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

6. After a new address has been successfully created, you are going to be brought to the main screen focused at the newly created Address.

<Image img={img05} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

7. In order to start utilizing the Multisignature account, you will have to add Custodians.  
      
:::info info
Setting up Custodians requires having $VENOM tokens on the
wallet.
:::

8. Further we are going to set up our default account as one of the Custodians.  
 - (Custodians are the addresses which are going to be required to approve the transactions on our Multisignature account.)
9. Click on the Copy button to copy the address of the newly created Multisignature account.
10. Send at least 0.1 $VENOM to the Multisignature account. You can follow this instruction on how to [send $VENOM](../the-main/send.md)
11. Go back to your new Multisignature account after it has been topped up with the $VENOM and the Setup button has become available. Click on the Setup button.

<Image img={img06} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

12. You will be prompted to Setup your Multisignature Account. Here you should indicate the quantity of Custodians and their Public keys.
   
:::info info
Not every Custodian should sign the transaction – the confirmation settings could be managed. For example, the transaction will be processed if 2 out of 3 Custodians have signed the transaction.
:::

13. Each owner of the addresses which are going to be Custodians Multisignature account, after sending at least 0.1 $VENOM to the Multisignature account, should copy their public key from the Preferences window and send it to the manager of the Multisignature account to be entered in this window.
14. The manager of the Multisignature account has entered the quantity and the public keys of the Custodians and public address of each Custodian.

<Image img={img07} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

15. On the next screen carefully verify the entered data and if you approve click the Setup button to complete the setup of the Custodians of the Multisignature account.

<Image img={img08} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

16. You will be prompted to enter the password, upon entering which and confirming, you will be notified that the Setup has been completed successfully. Click OK to close the window.
17. To see a list of added Custodians, click on a cog button and choose Custodians option.

<Image img={img08} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>
