/** @type {import('@docusaurus/types').DocusaurusConfig} */
var path = require('path');

// Define the mapping from the docPath prefix to the Github edit URL.
// This must be consistent with sidebars.js, Git submodules, and soft links.
// This is updated by docusaurus-internal.config.js.
var editUrlMap = {
  'flink-connectors/': 'https://github.com/claudiofahey/flink-connectors/edit/docusaurus/documentation/src/docs/',
  'pravega/': 'https://github.com/claudiofahey/pravega/edit/docusaurus/documentation/src/docs/',
};

module.exports = {
  title: 'Pravega Documentation', // Overridden by docusaurus-internal.config.js
  url: 'https://www.pravega.io/',
  baseUrl: '/',
  onBrokenLinks: 'warn', // TODO: change to 'throw'
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'pravega', // GitHub org/user name.
  projectName: 'pravega', // GitHub repo name.
  plugins: [path.resolve('nautilus-plugin')],
  customFields: {
    editUrlMap: editUrlMap,
    // Feature flags used by if_have_feature.js.
    features: [],
    versions: {
      pravega: '0.9',
    }
  },
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Pravega Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/pravega/pravega',
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
              label: 'Pravega Overview',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/pravega',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/pravega',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/pravega',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://blog.pravega.io/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/pravega/pravega',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pravega`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: function ({
            locale,
            version,
            versionDocsDirPath,
            docPath,
            permalink,
          }) {
            for (var k in editUrlMap) {
              if (docPath.startsWith(k)) {
                return editUrlMap[k] + docPath.substring(k.length);
              }
            }
            return null;
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
