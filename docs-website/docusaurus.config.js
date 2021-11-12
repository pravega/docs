/** @type {import('@docusaurus/types').DocusaurusConfig} */
var path = require('path');

const baseUrl = process.env.BASE_URL || '/';

// Define the mapping from the docPath prefix to the Github edit URL.
// This must be consistent with sidebars.js, Git submodules, and soft links.
var editUrlMap = {
  'flink-connectors/': 'https://github.com/pravega/flink-connectors/edit/docusaurus/documentation/src/docs/',
  'spark-connectors/': 'https://github.com/pravega/spark-connectors/edit/docusaurus/documentation/src/docs/',
  'pravega/': 'https://github.com/pravega/pravega/edit/docusaurus/documentation/src/docs/',
};

module.exports = {
  title: 'Pravega Documentation',
  url: 'https://pravega.io/',
  baseUrl: baseUrl,
  onBrokenLinks: 'warn', // TODO: change to 'throw'
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'pravega', // GitHub org/user name.
  projectName: 'pravega', // GitHub repo name.
  plugins: [
    path.resolve('nautilus-plugin'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: ['/'],
            to: '/pravega/overview'
          }
        ]
      }
    ]
  ],
  customFields: {
    editUrlMap: editUrlMap,
    // Feature flags used by if_have_feature.js.
    features: [],
    versions: {
      pravega: '0.10',
      'pravega-operator': 'v0.5.5',
    }
  },
  themeConfig: {
    hideableSidebar: true,
    navbar: {
      logo: {
        alt: 'Pravega Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/pravega/overview',
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
