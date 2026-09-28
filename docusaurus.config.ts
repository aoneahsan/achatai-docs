import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// AChat — Documentation site config (the AChat team)
// App: https://achat.aoneahsan.com  ·  Play: id=com.aoneahsan.achat
// ---------------------------------------------------------------------------

const SITE_URL = 'https://achat-docs.aoneahsan.com';
const APP_URL = 'https://achat.aoneahsan.com';
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.aoneahsan.achat';
const DOCS_REPO = 'https://github.com/aoneahsan/achatai-docs';

// Wording from the app's approved public copy (about/features meta).
const APP_DESCRIPTION =
  'AChat is a messaging app for personal chats, groups, communities and anonymous rooms, on the web and Android. Personal chats and private groups are end-to-end encrypted; anonymous rooms need no account.';
const DOCS_DESCRIPTION = `Documentation for AChat. ${APP_DESCRIPTION} What it does, with each limit beside it.`;

const config: Config = {
  title: 'AChat Docs',
  tagline:
    'Personal chats, groups, communities, and anonymous rooms when you\'d rather not use an account.',
  favicon: 'img/favicon.svg',

  // Production URL — GitHub Pages, custom domain pinned by static/CNAME.
  // Derived from the app's deployed subdomain achat.aoneahsan.com (NOT the repo
  // folder name) per ~/.claude/rules/docs-sites.md. baseUrl stays '/'.
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
        url: SITE_URL,
        description: DOCS_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@type': 'Organization', name: 'AChat team', url: APP_URL },
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AChat',
        alternateName: 'AChat: Anonymous Chat',
        applicationCategory: 'CommunicationApplication',
        operatingSystem: 'Android, Web',
        url: APP_URL,
        sameAs: [APP_URL, PLAY_URL],
        author: { '@type': 'Organization', name: 'AChat team', url: APP_URL },
        description: APP_DESCRIPTION,
        featureList: [
          'Personal chats and private groups, end-to-end encrypted',
          'Anonymous rooms without an account',
          'Communities with channels, threads and moderation',
          'Status that disappears after 24 hours',
          'Linked devices and a recovery key',
          'Chat widget for other websites',
          'Free, Pro and Team / Family plans',
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AChat team',
        url: APP_URL,
        sameAs: [APP_URL, PLAY_URL],
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
          // `docs/` is BOTH the published content dir and the home of the
          // fixed-path internal file docs/MANUAL-TASKS.md. Keep the path (the
          // global rule fixes it) but never publish it — this repo is public.
          // NOTE: `exclude` REPLACES the plugin defaults, so they are restated.
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'MANUAL-TASKS.md',
          ],
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
        content: DOCS_DESCRIPTION,
      },
      {
        name: 'keywords',
        content:
          'AChat, messaging app, end-to-end encrypted chat, anonymous chat room, group chat, online communities, status updates, disappearing messages, chat widget, no phone number chat',
      },
      { name: 'author', content: 'AChat team' },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'AChat Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'AChat team' },
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
        { to: '/about-the-author', label: 'AChat team', position: 'right' },
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
            { label: 'Contact', href: `${APP_URL}/contact` },
            { label: 'Plans and pricing', href: `${APP_URL}/pricing` },
            { label: 'Privacy policy', href: `${APP_URL}/privacy` },
            { label: 'Terms', href: `${APP_URL}/terms` },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} the AChat team. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'tsx', 'yaml', 'diff'],
    },
    announcementBar: {
      id: 'achat-rebuild',
      content:
        'AChat now has personal chats with people you know, groups, communities and status, alongside anonymous rooms. <a href="https://achat.aoneahsan.com">Open AChat</a>',
      backgroundColor: '#7c3aed',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
