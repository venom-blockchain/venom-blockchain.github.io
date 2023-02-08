---
sidebar_position: 1
sidebar_label: The Ledger
slug: /general/wallet/the-ledger
---

import Image from '@theme/IdealImage';
import img01 from '../../assets/wallet/1.png';
import img02 from '../../assets/wallet/24.png';
import img03 from '../../assets/wallet/25.png';
import img04 from '../../assets/wallet/26.png';
import img05 from '../../assets/wallet/27.png';
import img06 from '../../assets/wallet/28.png';

# The Ledger
## Setting up Venom Wallet accounts with a Ledger device.

:::info
In order to start using the Venom Wallet with a Ledger device, you should have the Venom app installed. You can refer to these instructions on how to install Venom.
:::


**Here is a step-by-step guide to setting up a Venom Wallet account using a Ledger device:**
 - Before proceeding, ensure that your Ledger device has the Venom app installed. You can find the instructions on Installing Venom via Ledger Live [Here](../the-ledger/installing-everscale-on-ledger-live.md).
 -  **Do not forget to** have Ledger Live software **closed** at all times while performing the following steps.

**If you have recently installed Venom Wallet and it does not have any connected seed phrases:**
1. Launch Venom Wallet.
2. Choose Sign in with Ledger.

<Image img={img01} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

3. Follow the instructions starting with **Step 6** in the following guide.

**If you have launched Venom Wallet before and have connected seed phrases:**

1.  Open Venom Wallet extension.
2.  Access the Profile Icon.
3.  Press Manage Seed button.

<Image img={img02} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

4.  In the Manage Seed Phrases window click “Add New”.
5.  In the Add Seed Phrase window, from the dropdown list, select "Connect Ledger" and press Next.

<Image img={img03} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

6. Connect your Ledger device to your computer.
7. Enter the pin code to unlock it.
8. Navigate to the Venom section on your Ledger dashboard to access the wallet.
9. Click Connect.

<Image img={img04} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

10.  You will be prompted to approve the connection to a Ledger device in a pop-out window.
11.  Select as many keys as you need. By default only the first key is selected, but you may add more.

<Image img={img05} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

12.  You will receive a message “Congratulations! Your account is activated!”
13.  Click OK to close the window.

<Image img={img06} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

:::info
All accounts which were selected in the Ledger will be named Ledger 1, Ledger 2 and so on by default.
:::

The Ledger device has been connected.
