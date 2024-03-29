---
sidebar_position: 6
sidebar_label: How to Create a Backup File
slug: /general/wallet/hot-to-create-a-backup-file
---

import Image from '@theme/IdealImage';
import img01 from '../assets/wallet/40.png';
import img02 from '../assets/wallet/41.png';

# How to Create a Backup File to Enable Restoring Seed Phrases from it?

The most common method of storing seed phrases for non-custodial wallets is to record them on a piece of paper. However, some users may also be willing to use a more convenient method, storing the seed phrases where they can be quickly restored. 

Luckily, Venom Wallet allows the user to create a .json backup file. This file can be generated by the wallet extension to be stored and read to restore the seed phrase from it. 

**Follow this short guide to create a backup file which will store all your seed phrases in one file:**
1. Launch the Venom Wallet extension and in the main screen click on the profile icon.
2. You will be brought to the “Seeds” window showing the list of all connected Seed phrases, with two options: “Log out” and “Manage seeds”.
3. Click on the “Manage seeds” option.

<Image img={img01} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>

4.  You will be brought to the “Manage seed phrases” window. Click on the “Backup all” button.

<Image img={img02} alt="Click send button"
    style={{ width: "50%", minWidth: "320px", marginBottom: "20px", display: "inline-block" }}
    className="balance-transfers inline-img"
/>


 
5.  You will be prompted to select the path for your .json file.
    
    
6.  The .json file will be saved on your device.



:::info
If you are using a Chrome Browser extension and it has a single path for downloads (i.e. Downloads folder), the file will be saved to that folder without requesting to indicate the path.
:::


Once created, the backup file can be used for restoring access to the account. The file will restore all the seeds which are backed up with the wallet extension from your account. See, how to sign in into the account using an existing backup file.
