### How to run a Validator node



1. Prepare server for node setup
1.1. Create a user and group for running the Validator node, create all nessessaty folders structure
```bash 
VALIDATOR_USER="validator"
VALIDATOR_GROUP="validator"
sudo groupadd $VALIDATOR_GROUP
sudo useradd $VALIDATOR_USER -m -s /bin/bash -g $VALIDATOR_GROUP -G sudo
# Mount 
sudo mkdir -p /var/ever/rnode/
sudo chown $VALIDATOR_USER:$VALIDATOR_GROUP /var/ever/rnode/
```

1.3. Check if the NTP service is UP and running
```bash
systemctl status systemd-timesyncd
```

Should show that service is up and running. If not - please refer documentation 
```bash
● systemd-timesyncd.service - Network Time Synchronization
     Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; preset: enabled)
     Active: active (running) 
```



2. Create firewall rules to allow ADNL communications
```bash
sudo ufw allow 30000/udp
```
3. Install dependencies
```bash
sudo apt update 
sudo apt install -y git libssl-dev pkg-config build-essential libzstd-dev libclang-dev libgoogle-perftools-dev
```
4. Switch to validator user
```
sudo su validator
```

Install rust
```bash

curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"
```
5. Build node
```bash

cargo install --locked --git https://github.com/broxus/stever-node-tools
```

```bash
# Enable validator services
sudo $PWD/.cargo/bin/stever init systemd
```

Here choose user for validator. DON'T RUN Validator service as root
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
```
[0/2] Preparing configs
✔ Create root directory? (/home/validator/.stever) · yes
? Select network ›
  Everscale mainnet
  Everscale testnet
❯ other
```

Provide global config URL (Contact Venom core team)

```
✔ Select network · other
? Config URL ›
```

```
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

Node would be compiled 
Select mode of your node: 
```
? Select validator type ›
❯ Single
  DePool
```

Create new seed phrase or import existing
```
[0/2] Creating validator wallet
❯ Generate new keys
  Import seed
```


5.1 Define desired stake per round. Notice you will need amonut of tokens 2*(stake per round)+10
Leave "stake factor (ratio between maximum available stake on  network anbd your stake) to 3 as it is standard in Venom network
```
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

**NOTE:**
> Make sure you back up your keys after initial configuration!
> All keys are stored at $HOME/.stever/keys/


Init validator services
```bash
sudo ~/.cargo/bin/stever init systemd
```

Service MUST NOT run as root user
```
[0/2] Preparing services
? Select the user from which the service will work ›
❯ validator
  root
```

It will create two services:

- ever-validator-manager - control service that takes part in elections, recovers stake and so on
- ever-validator - node itself, managing validation process

you can check status of both services

```
service ever-validator status
service ever-validator-manager status
```
7. Transfer tokens to the Validator contract
Transfer required amount of tokens to address generated in previous step

8. Wait until elections start
When elections start node-control will automatically stake amount of tokens. You can check current state of elections in https://venomscan.com/validators
if everything fine - you should see your address in validators for the next round
