# How to run a Venom validator node

## Precautions

:::info
The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in RFC 2119.
:::

## Caution

Running a Validator node makes you responsible for all your stake. If something
goes wrong, the node could be slashed, and you can lose your stake.

You SHOULD  have enough Linux engineering skills to manage, secure, and
maintain nodes. Running a Validator node is considerably more than executing a
validator binary.

## Pre-requisites

### Stake

You will need enough amount of Venom tokens to run a Validator node.  You can
deploy the node either in validator or in DePool mode.

### Node hardware minimums

**CPU**: 12x cores Intel Skylake or newer CPU. The higher base CPU frequency is
preferred over the cores count;

**RAM**: 64GB;
Network: 300Mbps reliable internet connection. Connection issues can
potentially cause slashing of your Validator;

**Storage**:

50GB SSD storage for the operating system;
500GB of NVMe for Validator internal database, with the ability to add
additional space because of the growth of blockchain;

**Operating system**: Ubuntu 22.04

These specs are not a hard requirement, but a best practice. Because running a
validator node is a responsible task you should consider using enterprise-grade
hardware, to ensure the stability of your node.

### Cloud providers

:::caution
Beware of the Terms and conditions of the cloud provider of your choice.
DigitalOcean Acceptable User Policy requires implicit permission to do "mining
of cryptocurrencies" and may be extended to other cryptocurrency activities.
:::

Tested Cloud Providers

- Google Cloud
- Amazon AWS
- Microsoft Azure
- OVH

To make your node work properly, configure the cloud firewall to accept
incoming traffic on UDP/30000 port

:::info
Node consumes about 6TB of incoming traffic per month. Keep it in mind when you
are estimating the costs of your setup.
:::

### Node setup

:::caution
Always check any scripts you are running
:::

1. Prepare server for node setup
1.1. Create a user and group for running the Validator node, and create all
necessary folders structure

```bash
VALIDATOR_USER="validator"
VALIDATOR_GROUP="validator"
sudo groupadd $VALIDATOR_GROUP
sudo useradd $VALIDATOR_USER -m -s /bin/bash -g $VALIDATOR_GROUP -G sudo
# Mount 
sudo mkdir -p /var/ever/rnode/
sudo chown $VALIDATOR_USER:$VALIDATOR_GROUP /var/ever/rnode/
```

1.2. Check if the NTP service is UP and running

```bash
systemctl status systemd-timesyncd
```

Should show that the service is up and running. If not - please refer to the documentation

```bash
● systemd-timesyncd.service - Network Time Synchronization
     Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; 
     preset: enabled)
     Active: active (running) 
```

:::caution
If the clock is out of sync (even by a small amount), the blocks the
Validator produces,  may not get accepted by the network.
:::

2. Create firewall rules to allow ADNL communications

```bash
sudo ufw allow 30000/UDP
```

3. Install dependencies

```bash
sudo apt update 
sudo apt install -y git libssl-dev pkg-config build-essential libzstd-dev 
libclang-dev libgoogle-perftools-dev
```

4. Switch to the validator user

```bash
sudo su validator
```

Install rust

```bash

curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"
```

5. Build a Validator node

```bash

cargo install --locked --git https://github.com/broxus/stever-node-tools
```

```bash
# Enable validator services
sudo $PWD/.cargo/bin/stever init systemd
```

Here choose the user for the validator. DON'T RUN Validator service as a root user!

```bash
[0/2] Preparing services
? Select the user from which the service will work ›
❯ validator
  root
```

6. Setup Validator and create wallets
Compile and init node

```bash
stever init
```

Choose "other" network

```bash
[0/2] Preparing configs
✔ Create root directory? (/home/validator/.stever) · yes
? Select network ›
  Everscale mainnet
  Everscale testnet
❯ other
```

Provide global config URL (Contact Venom core team)

```bash
✔ Select network · other
? Config URL ›
```

```bash
[0/2] Preparing configs
✔ Create root directory? (/home/validator/.stever) · yes
✔ Select network · other
✔ Config URL ·<hidden>
✔ Node config doesn't have control server entry. Create? · yes
✔ Control server listen address · localhost
✔ Specify control port · 31000
✔ Enter public ip · 164.92.106.127
✔ Specify server ADNL port · 30000
✔ Specify node DB path · /var/ever/rnode
[1/2] Preparing binary
```

The node would be compiled
Select the mode of your node:

```bash
? Select validator type ›
❯ Single
  DePool
```

Create a new seed phrase or import existing

```bash
[0/2] Creating validator wallet
❯ Generate new keys
  Import seed
```

6.1 Define the desired stake per round. Notice you will need an amount of
tokens 2*(stake per round)+10

Leave "stake factor (ratio between maximum available stake on the network and
your stake) to 3 as it is standard in the Venom network

```bash
✔ Stake per round (EVER) · 10000
✔ Stake factor · 3
[2/2] Validator configured successfully. Great!

Validator wallet address:


Required validator wallet balance: 20010 EVER
  • 10 EVER, maintenance balance
  • 2 x 20010 EVER, stakes for each round

Make sure you back up your keys:
/home/validator/.stever/keys/vld.keys.json
```

:::info
Make sure you back up your keys after the initial configuration!
All keys are stored at $HOME/.stever/keys/
:::

Init validator services

```bash
sudo ~/.cargo/bin/stever init systemd
```

:::caution
Service MUST NOT run as the root user
:::

```bash
[0/2] Preparing services
? Select the user from which the service will work ›
❯ validator
  root
```

It will create two services:

- ever-validator-manager - control service that takes part in elections,
recovers stake and performs other tasks with the Elector contract
- ever-validator - node itself, managing validation process

you can check the status of both services with the following commands:

```bash
service ever-validator status
service ever-validator-manager status
```

7. Transfer tokens to the Validator contract

Transfer the required amount of tokens to the address generated in the previous
step. The Wallet will become active after the first stake

8. Wait until the elections start

When elections start the ever-validator-manager process will automatically
stake the desired amount of tokens. You can check the current state of
elections in [Venomscan.com](https://venomscan.com/validators).

:::info
ever-validator-manager adds 1 venom for the stake to pay for the transaction
fees, and you will require to add 1 venom to the "stake and bonuses recovery"
transaction. So always keep some additional amount of tokens in the Validator
:::

If everything is fine - you should see your address in the validators list for
the next round.
