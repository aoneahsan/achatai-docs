import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// AChat (Anonymous Chat AI) — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// App: https://achat.aoneahsan.com  ·  Play: id=com.aoneahsan.achatachat
// ---------------------------------------------------------------------------

const SITE_URL = 'https://achatai-docs.aoneahsan.com';
const APP_URL = 'https://achat.aoneahsan.com';
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.aoneahsan.achatachat';
const DOCS_REPO = 'https://github.com/aoneahsan/achatai-docs';

const config: Config = {
  title: 'AChat Docs',
  tagline:
    'No-signup anonymous chat: optional in-browser end-to-end encryption, file sharing, and 10-day auto-delete.',
  favicon: 'img/favicon.svg',

  // Production URL — served from Firebase Hosting site `achatai-docs` and/or
  // GitHub Pages (static/CNAME). baseUrl stays '/' because of the custom domain.
  url: SITE_URL,
  baseUrl: '/',

  // GitHub metadata (drives OG tags + edit-this-page links).
  organizationName: 'aoneahsan',
  projectName: 'achatai-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags. The JSON-LD payloads (WebSite, Organization,
  // SoftwareApplication) help Google Rich Results, Perplexity, ChatGPT, and
  // Claude extract structured entity data when citing this documentation.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: `${SITE_URL}/` },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/xml',
        title: 'AChat Docs sitemap',
        href: `${SITE_URL}/sitemap.xml`,
      },
    },
    {
      tagName: 'meta',
      attributes: { name: 'application-name', content: 'AChat Docs' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'apple-mobile-web-app-title', content: 'AChat Docs' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#7c3aed' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AChat Documentation',
        alternateName: 'Anonymous Chat AI Docs',
        url: SITE_URL,
        description:
          'Documentation for AChat (Anonymous Chat AI): a no-signup, transient chat app with optional client-side end-to-end encryption (PBKDF2 + AES-GCM), file sharing, message threads, group chats, public communities, an embeddable widget, and 10-day auto-delete. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Anonymous Chat AI',
        alternateName: 'AChat',
        applicationCategory: 'CommunicationApplication',
        operatingSystem: 'Android, iOS, Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_URL,
        sameAs: [APP_URL, PLAY_URL],
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
        description:
          'No-signup anonymous chat. Pick or generate a chat ID, share the link, talk. An optional password enables true in-browser end-to-end encryption. Files up to 10 MB each (100 MB per chat). Every message and file auto-deletes about 10 days after it is sent.',
        featureList: [
          'No sign-up required',
          'Optional client-side end-to-end encryption (PBKDF2 + AES-GCM)',
          'File sharing up to 10 MB per file (100 MB per chat)',
          'Message threads, group chats, and public communities',
          'Embeddable chat widget',
          '10-day automatic deletion (Firestore TTL)',
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
        founder: { '@type': 'Person', name: 'Ahsan Mahmood' },
      }),
    },
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  trailingSlash: false,

  markdown: {
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: `${DOCS_REPO}/edit/main/`,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.7, lastmod: 'date' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for AChat (Anonymous Chat AI) — no-signup transient chat with optional in-browser end-to-end encryption, file sharing, communities, an embeddable widget, and 10-day auto-delete. By Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'anonymous chat, no signup chat, end-to-end encrypted chat, ephemeral chat, disappearing messages, temporary chat room, private chat link, self-destructing chat, encrypted file sharing, anonymous group chat, public chat community, embeddable chat widget, capacitor chat app, firebase chat',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'AChat Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'Ahsan Mahmood' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: { hideable: true, autoCollapseCategories: true },
    },
    navbar: {
      title: 'AChat',
      logo: {
        alt: 'AChat logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/getting-started/quick-start', label: 'Quick Start', position: 'left' },
        { to: '/about-the-author', label: 'Author', position: 'right' },
        { href: APP_URL, label: 'Open AChat', position: 'right' },
        { href: PLAY_URL, label: 'Play Store', position: 'right' },
        { href: DOCS_REPO, label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'Security & encryption', to: '/concepts/security-and-encryption' },
            { label: 'FAQ', to: '/faq' },
          ],
        },
        {
          title: 'AChat',
          items: [
            { label: 'Open the app', href: APP_URL },
            { label: 'Get it on Google Play', href: PLAY_URL },
            { label: 'Privacy policy', href: `${APP_URL}/privacy` },
            { label: 'Terms', href: `${APP_URL}/terms` },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. AChat is a free product by Zaions.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'tsx', 'yaml', 'diff'],
    },
    announcementBar: {
      id: 'achat-live',
      content:
        'AChat is live on the web and Google Play — no sign-up, optional end-to-end encryption, 10-day auto-delete. <a href="https://achat.aoneahsan.com">Start a chat →</a>',
      backgroundColor: '#7c3aed',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
