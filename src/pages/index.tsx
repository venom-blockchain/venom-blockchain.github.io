import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('hero__container', 'container')}>
        <div className={clsx('col col--8')}>
          <h1 className="hero__title">Welcome to the Venom Knowledge Base</h1>
          <p className="hero__subtitle">
            Venom is a multi-blockchain network being a basis for scalable Web3 applications in the DeFi and Global Payments markets.
          </p>
          <p className="hero__description">
            Venom blockchain provides the best transactional scalability solution by sharding protocol and economic scalability by enabling run community-built workchains in the future.
          </p>
          <p className="hero__description">
            Everyone can become part of the Venom ecosystem which is open and transparent.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title='Welcome to Venom'
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
