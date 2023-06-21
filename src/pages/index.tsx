import React from 'react';
import clsx from 'clsx';

import Layout from '@theme/Layout';

import discord from './assets/discord.png';
import twitter from './assets/tw.png';
import medium from './assets/md.png';

import styles from './index.module.css';
import SocialLinks from '../components/SocialLinks';

function HomepageHeader() {
  return (
    <header className={clsx('main', styles.mainBanner)}>
      <div className={clsx('main__container', 'container')}>
        <h1 className={clsx(styles.main__title)}>
          Welcome to the Venom Knowledge Base
        </h1>
        <p>
          The Knowledge Base is the entry point into the Venom universe.<br/>
          Get to know the technology behind the incredible scalability of the Venom blockchain.
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title='Welcome to Venom'
      description="The Knowledge Base is the entry point into the Venom universe. Get to know the technology behind the incredible scalability of the Venom blockchain.">
      <HomepageHeader />
      <main>
        <div className={clsx('main__container', 'container')}>
          <h2 className={clsx(styles.main__title)}>Explore the Knowledge Base</h2>

          <div className={clsx(styles.main__container, styles.main__explore)}>
            <div className={clsx(styles.main__col, 'col col--3')}>
              <h3>
                Get started
              </h3>
              <ul>
                <li>
                  <a href="/general/whats-new">What's New</a>
                </li>
                <li>
                  <a href="/general/ecosystem">Ecosystem</a>
                </li>
                <li>
                  <a href="/general/wallet/create-a-new-wallet-account">Create a new Wallet Account</a>
                </li>
                <li>
                  <a href="/general/balance-transfers">Balance Transfers</a>
                </li>
                <li>
                  <a href="/general/community">Community</a>
                </li>
              </ul>
            </div>
            <div className={clsx(styles.main__col, 'col col--3')}>
              <h3>
                Learn
              </h3>
              <ul>
                <li>
                  <a href="/learn/glossary">Glossary</a>
                </li>
                <li>
                  <a href="/learn/tokens-and-assets">Tokens and Assets</a>
                </li>
                <li>
                  <a href="/learn/architecture">Architecture</a>
                </li>
                <li>
                  <a href="/learn/consensus">Consensus</a>
                </li>
                <li>
                  <a href="/learn/tvm">Threaded Virtual Machine</a>
                </li>
                <li>
                  <a href="/learn/accounts">Accounts</a>
                </li>
                <li>
                  <a href="/learn/messages-and-transactions">Messages and Transactions</a>
                </li>
                <li>
                  <a href="/learn/transaction-fees">Gas and Fees</a>
                </li>
              </ul>
            </div>
            <div className={clsx(styles.main__col, 'col col--3')}>
              <h3>
                Build
              </h3>
              <ul>
                <li>
                  <a href="/build/quick-start-on-testnet">Quick start developing on testnet</a>
                </li>
                <li>
                  <a href="/build/development-guides/setting-up-the-venom-smart-contract-development-environment">Setting Up Smart Contract Development Environment</a>
                </li>
                <li>
                  <a href="/build/development-guides/how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network">How to create your own fungible TIP-3 token</a>
                </li>
                <li>
                  <a href="/build/development-guides/developing-of-simple-voting-system/voting-system-basics">Developing of simple voting system</a>
                </li>
                <li>
                  <a href="/build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/non-fungible-tokens-in-venom-network">How to create your own non-fungible TIP-4 token</a>
                </li>
                <li>
                  <a href="/build/development-guides/using-ever-sdk-and-devtools-to-work-with-venom">Using Ever SDK and developer tools to work with Venom Blockchain</a>
                </li>
                <li>
                  <a href="/build/development-guides/using-evercloud-graphql-api-to-work-with-venom">Using Evercloud GraphQL API to work with Venom</a>
                </li>
                <li>
                  <a href="/build/tools-and-resources">Tools & Resources</a>
                </li>
              </ul>
            </div>
            <div className={clsx(styles.main__col, 'col col--3')}>
              <h3>
                Maintain
              </h3>
              <ul>
                <li>
                  <a href="/maintain/network-maintainers">Network Maintainers</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={clsx('main__container', 'container', 'community')}>
          <h2>Join our community</h2>
          
          <SocialLinks />
        </div>
      </main>
    </Layout>
  );
}
