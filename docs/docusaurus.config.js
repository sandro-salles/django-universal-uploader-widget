// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'django-universal-uploader-widget',
  tagline: 'A beautiful image uploader widget for django/django-admin',
  url: 'https://uuw.institutoinventare.com.br/',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'inventare', // Usually your GitHub org/user name.
  projectName: 'django-universal-uploader-widget', // Usually your repo name.
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-Q92QGDVY38',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/sandro-salles/django-universal-uploader-widget/blob/main/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/sandro-salles/django-universal-uploader-widget/blob/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'universal-uploader-widget',
        logo: {
          alt: 'universal-uploader-widget',
          src: 'img/logo.svg',
        },
        items: [
          { type: 'doc', docId: 'intro', position: 'left', label: 'Documentation', },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          { href: 'https://github.com/sandro-salles/django-universal-uploader-widget', label: 'GitHub', position: 'right', },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Developer',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/goticodocalypso',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/EduardoJM',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/sandro-salles/django-universal-uploader-widget',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Eduardo Oliveira, Instituto Inventare. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
