// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Taller Máster Full Stack',
  tagline: 'Documentación del Taller',
  url: 'https://taller-threepoints-docs.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: true
      },
      navbar: {
        title: 'Home',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'tutorial-docusaurus/intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/lucferbux/Taller-Docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              {
                label: 'Docusaurus',
                to: '/docs/tutorial-docusaurus/intro',
              },
              {
                label: 'Front-End',
                to: '/docs/frontend/intro',
              },
              {
                label: 'Back-End',
                to: '/docs/backend/intro',
              },
              {
                label: 'BBDD',
                to: '/docs/bbdd/intro',
              },
              {
                label: 'Firebase',
                to: '/docs/firebase/intro',
              },
              {
                label: 'Despliegue',
                to: '/docs/deployment/frontend',
              },
            ],
          },
          {
            title: 'Proyectos',
            items: [
              {
                label: 'Frontend',
                href: 'https://github.com/lucferbux/Taller-FrontEnd',
              },
              {
                label: 'Backend',
                href: 'https://github.com/lucferbux/Taller-Backend',
              },
              {
                label: 'BBDD',
                href: 'https://github.com/lucferbux/Taller-BBDD',
              },
              {
                label: 'Firebase',
                href: 'https://github.com/lucferbux/Taller-Firebase',
              },
              {
                label: 'Testing & Security',
                href: 'https://github.com/lucferbux/Taller-Testing-Security',
              },
            ],
          },
          {
            title: 'Extra',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/lucferbux/Taller-Docusaurus',
              },
              {
                label: 'Máster Full Stack - ThreePoints',
                href: 'https://www.threepoints.com/es/master-en-full-stack-web-development',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Taller Full Stack, Inc. Desarrollado con Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
