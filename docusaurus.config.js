// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const redirects = require('./redirects');
const math = require('remark-math');
const katex = require('rehype-katex');
const unified = require('unified');
const remarkParse = require('remark-parse');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Venom Docs',
  tagline: 'Venom is a blockchain network focused on the Middle East and North Africa region as well as emerging economies worldwide to provide robust infrastructure for CBDC products and Web 3.0 applications',
  url: 'https://venom.foundation/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        ...redirects
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      (_, options) => {
        return {
          name: 'my-gtm-docusaurus-plugin',
          injectHtmlTags() {
            if (!(process.env.NODE_ENV === 'production')) {
              return {}
            }
            return {
              headTags: [
                {
                  tagName: 'link',
                  attributes: {
                    rel: 'preconnect',
                    href: 'https://www.googletagmanager.com',
                  },
                },
                {
                  tagName: 'script',
                  innerHTML: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${options.id}');
                  `,
                },
              ],
              preBodyTags: [
                `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${options.id}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
              ],
            }
          },
        }
      },
      {
        id: 'GTM-MQRC9JG', // GTM Container ID
      }
    ],
    [
      (ctx, _) => {
        return {
          name: 'veps-data-generator',
          async contentLoaded({ actions }) {
            const veps = [];
            const vepFilePaths = require('glob').globSync(
              require('path').resolve(ctx.siteDir, 'docs/standards/VEP/vep-*.md')
            );
            for (const vepFilePath of vepFilePaths) {
              const vep = require('fs').readFileSync(vepFilePath).toString();
              const frontmatter = require('front-matter')(vep);
              const file = unified()
                .use(remarkParse)
                .parse(vep);
              const vepPreambleNode = file.children.find(
                (child) => child.type == 'code' && child.lang == 'preamble'
              );
              const preamble = require('yaml').parse(vepPreambleNode.value);
              preamble.title = frontmatter.attributes.title;
              veps.push(preamble);
            }
            const {setGlobalData} = actions;
            setGlobalData({veps: veps.sort((a, b) => a.VEP - b.VEP)});
          },
        };
      }, {}
    ],
    [
      (ctx, options) => {
        return {
          name: 'awesome-list-parser',
          async contentLoaded({ actions }) {
            const content = (await require('axios')(options.awesomeListUrl)).data
            const parsed = unified()
              .use(remarkParse)
              .parse(content);
            const filtered = [];
            for (let i = 0; i < parsed.children.length; i++) {
              const child = parsed.children[i];
              if (child.type == 'heading' && options.exclude.indexOf(child.children[0].value) != -1) {
                // Skip excluded topics
                while (i < parsed.children.length && parsed.children[i+1]?.type != 'heading') {
                  i++;
                }
                continue;
              } else if (child.type == 'heading' && child.depth == 1) {
                // Skip level 1 headings
                continue
              } else if (child.type == 'html') {
                // Skip HTML markup for awesome list
                continue
              } else {
                filtered.push(child);
              }
            }
            parsed.children = filtered;
            const remarkHtml = (await import('remark-html')).default;
            let modifiedContent = unified()
              .use(remarkHtml, {})
              .stringify(parsed);
            // way to save classes
            /*
            const classProcessorResult = (await import('rehype')).rehype()
              .data('settings', { fragment: true })
              .use(require('rehype-add-classes'), {
                h2: 'anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module'
              })
              .processSync(modifiedContent);
            modifiedContent = classProcessorResult.toString();
            */
            const {setGlobalData} = actions;
            setGlobalData({parsedList: modifiedContent});
          }
        }
      }, {
        awesomeListUrl: 'https://raw.githubusercontent.com/venom-blockchain/awesome-venom/main/readme.md',
        exclude: ['Contents', 'Tutorials', 'Documentation', 'Official']
      }
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-89NZVH357M',
          anonymizeIP: true,
        },
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themes: ['docusaurus-theme-search-typesense'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
      },
      navbar: {
        title: 'Venom',
        items: [
          {
            type: 'doc',
            docId: 'start/general/welcome-to-venom',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'build/quick-start-on-testnet',
            position: 'left',
            label: 'Build',
          },
          {
            type: 'doc',
            docId: 'faq/readme',
            position: 'left',
            label: 'FAQ'
          },
          {
            type: 'doc',
            docId: 'standards/VEP/readme',
            position: 'left',
            label: 'Standards',
          },
          {
            href: 'https://forum.venom.foundation',
            label: 'Forum',
            position: 'right',
          },
          {
            href: 'https://github.com/venom-blockchain/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'General',
                to: 'general/readme',
              },
              {
                label: 'Learn',
                to: 'learn/glossary',
              },
              {
                label: 'Build',
                to: 'build/quick-start-on-testnet',
              },
              {
                label: 'FAQ',
                to: 'faq',
              },
              {
                label: 'Maintain',
                to: 'maintain/network-maintainers',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Forum',
                href: 'https://forum.venom.foundation',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/venomblockchain',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/QsVypuKbZj',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/venomfoundation',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/@venom.foundation',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/venom-blockchain',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Venom Foundation`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity'],
      },
      typesense: {
        typesenseCollectionName: 'venom-docusaurus-2',
        typesenseServerConfig: {
          nodes: [
            {
              host: 'search.venom.foundation',
              port: 443,
              protocol: 'https',
            }
          ],
          // search only key
          apiKey: 'BhpHqhTN0peSwQ9ifye9nZ76nhxtIjww',
        },
        // Optional: Typesense search parameters: https://typesense.org/docs/0.21.0/api/search.md#search-parameters
        typesenseSearchParameters: {},
        // Optional
        contextualSearch: true,
      },
    }),
};

module.exports = config;
