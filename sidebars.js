/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'General',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'general/readme',
          label: 'Welcome to Venom',
        },
        {
          type: 'doc',
          id: 'general/whats-new',
          label: "What's New",
        },
        {
          type: 'doc',
          id: 'general/ecosystem/readme',
          label: 'Ecosystem',
        },
        {
          type: 'doc',
          id: 'general/create-a-new-wallet-account',
          label: 'Create a new Wallet Account',
        },
        {
          type: 'doc',
          id: 'general/balance-transfers',
          label: 'Balance Transfers',
        },
        {
          type: 'doc',
          id: 'general/community',
          label: 'Community',
        },
        {
          type: 'doc',
          id: 'general/presskit',
          label: 'Presskit',
        },
      ],
    },
    {
      type: 'category',
      label: 'Learn',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'learn/glossary',
          label: 'Glossary',
        },
        {
          type: 'doc',
          id: 'learn/architecture',
          label: "Architecture",
        },
        {
          type: 'doc',
          id: 'learn/tokens-and-assets',
          label: 'Tokens and Assets',
        },
        {
          type: 'doc',
          id: 'learn/messages-and-transactions',
          label: 'Messages and Transactions',
        },
        {
          type: 'doc',
          id: 'learn/accounts',
          label: 'Accounts',
        },
      ],
    },
    {
      type: 'category',
      label: 'Maintain',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'maintain/network-maintainers',
          label: 'Network Maintainers',
        },
      ],
    }
  ],
  buildSidebar: [
    {
      type: 'category',
      label: 'Development Guides',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'build/development-guides/readme',
          label: 'Welcome',
        },
        {
          type: 'doc',
          id: 'build/development-guides/comparing-of-ethereum-vs-venom-architectures',
          label: 'Comparing of Ethereum vs Venom architectures',
        },
        {
          type: 'doc',
          id: 'build/development-guides/setting-up-the-venom-smart-contract-development-environment',
          label: 'Setting Up The Venom Smart Contract Development Environment',
        },
        {
          type: 'category',
          label: 'How to create your own fungible TIP-3 token',
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'build/development-guides/how-to-create-your-own-fungible-tip-3-token/fungible-tokens-in-venom-network',
              label: 'Fungible tokens in Venom network',
            },
            {
              type: 'doc',
              id: 'build/development-guides/how-to-create-your-own-fungible-tip-3-token/quick-start-developing-with-tip-3',
              label: 'Quick start developing with TIP-3',
            },
            {
              type: 'category',
              label: '🚀 Venom In Action',
              collapsed: false,
              collapsible: false,
              items: [
                {
                  type: 'doc',
                  id: 'build/development-guides/how-to-create-your-own-fungible-tip-3-token/simple-tokensale',
                  label: ' Simple Tokensale',
                },
                {
                  type: 'doc',
                  id: 'build/development-guides/how-to-create-your-own-fungible-tip-3-token/extend-our-tokensale-with-frontend',
                  label: 'Extend our Tokensale with frontend',
                },
                {
                  type: 'doc',
                  id: 'build/development-guides/how-to-create-your-own-fungible-tip-3-token/going-global',
                  label: 'Going Global',
                },
                {
                  type: 'doc',
                  id: 'build/development-guides/how-to-create-your-own-fungible-tip-3-token/ways-of-code-enhancing',
                  label: 'Ways of code enhancing',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Developing of simple voting system',
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'build/development-guides/developing-of-simple-voting-system/voting-system-basics',
              label: 'Voting system basics',
            },
            {
              type: 'category',
              label: '🚀 Venom In Action',
              collapsed: false,
              collapsible: false,
              items: [
                {
                  type: 'doc',
                  id: 'build/development-guides/developing-of-simple-voting-system/voting-system-contracts',
                  label: 'Voting system contracts',
                },
                {
                  type: 'doc',
                  id: 'build/development-guides/developing-of-simple-voting-system/ways-of-code-enhancing',
                  label: 'Ways of code enhancing',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'How to create your own non-fungible TIP-4 token',
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/non-fungible-tokens-in-venom-network',
              label: 'Non-Fungible tokens in Venom network',
            },
            {
              type: 'doc',
              id: 'build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/quick-start-developing-with-tip-4',
              label: 'Quick start developing with TIP-4',
            },
            {
              type: 'category',
              label: '🚀 Venom In Action',
              collapsed: false,
              collapsible: false,
              items: [
                {
                  type: 'doc',
                  id: 'build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/simple-nft-auction',
                  label: 'Simple NFT auction',
                },
                {
                  type: 'doc',
                  id: 'build/development-guides/how-to-create-your-own-non-fungible-tip-4-token/extend-our-auction-with-frontend',
                  label: 'Extend our auction with frontend',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integration Guides',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'build/integration-guides/how-to-connect-dapp-ui-to-venom',
          label: 'How to connect Dapp UI to Venom',
        },
      ],
    },
    {
      type: 'doc',
      id: 'build/tools-and-resources',
      label: 'Tools & Resources',
    },
  ],
  standardSidebar: [
    {
      type: 'category',
      label: 'Standards',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'standards/readme',
          label: 'Welcome',
        },
        {
          type: 'category',
          label: 'Fungible Token',
          items: [
            {
              type: 'doc',
              id: 'standards/TIP-3/core-description',
              label: 'Basic',
            },
            {
              type: 'doc',
              id: 'standards/TIP-3/1',
              label: 'TIP-3.1',
            },
            {
              type: 'doc',
              id: 'standards/TIP-3/2',
              label: 'TIP-3.2',
            },
          ],
        },
        {
          type: 'doc',
          id: 'standards/TIP-3/core-description',
          label: 'Non-Fungible Token',
        },
      ]
    },
  ],
};

module.exports = sidebars;
