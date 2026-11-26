import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import changelogFeed, { FEED_TITLE, FEED_TITLE_WITH_POSTS } from './src/plugins/changelog-feed';
import docsDirectory from './src/plugins/docs-directory';
import notFoundHead from './src/plugins/not-found-head';
import linkLawGate from './src/plugins/link-law-gate';
import rehypeLinkLaw from './src/plugins/rehype-link-law';
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE } from './src/data/blog';
import { OTHER_PLATFORMS, platformHref } from './src/data/platforms';

// ---------------------------------------------------------------------------
// AChat — Documentation site config (the AChat team)
// App: https://achat.aoneahsan.com  ·  Play: id=com.aoneahsan.achat
// ---------------------------------------------------------------------------

const SITE_URL = 'https://achat-docs.aoneahsan.com';
const APP_URL = platformHref('web');
const PLAY_URL = platformHref('android');
const DOCS_REPO = 'https://github.com/aoneahsan/achatai-docs';

// Wording from the app's approved public copy (about/features meta).
const APP_DESCRIPTION =
  'AChat is a messaging app for personal chats, groups, communities and anonymous rooms, on the web and Android. Personal chats and private groups are end-to-end encrypted; anonymous rooms need no account.';
const DOCS_DESCRIPTION = `Documentation for AChat. ${APP_DESCRIPTION} What it does, with each limit beside it.`;

/**
 * Whether blog/ holds a post yet. Until it does, the blog stays off: an empty blog page would sit in sitemap.xml with
 * nothing on it, and a Blog link would point at it. The first post added to blog/ turns on the blog, its feeds, its
 * sitemap entries and the Blog links in the navbar and the footer.
 */
const BLOG_DIR = fileURLToPath(new URL('./blog', import.meta.url));
const HAS_POSTS = existsSync(BLOG_DIR) && readdirSync(BLOG_DIR).some((name) => /\.mdx?$/.test(name));

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
  // No canonical here: the theme emits one per route, and a global one gave every page two (SA-P01).
  headTags: [
    { tagName: 'meta', attributes: { name: 'yandex-verification', content: 'bfb02722189028cf' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: HAS_POSTS ? FEED_TITLE_WITH_POSTS : FEED_TITLE,
        href: `${SITE_URL}/feed.xml`,
      },
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
        publisher: { '@type': 'Organization', name: 'AChat', url: APP_URL },
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
        author: { '@type': 'Organization', name: 'AChat', url: APP_URL },
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
        name: 'AChat',
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
  plugins: [changelogFeed, docsDirectory, notFoundHead, linkLawGate],

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
          rehypePlugins: [rehypeLinkLaw],
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
        blog: HAS_POSTS && {
          path: 'blog',
          routeBasePath: BLOG_PATH.slice(1),
          blogTitle: BLOG_TITLE,
          blogDescription: BLOG_DESCRIPTION,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          postsPerPage: 10,
          showReadingTime: false,
          rehypePlugins: [rehypeLinkLaw],
          // A post's last update comes from git: shown under the post, and its sitemap lastmod. No name is shown.
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          // Every author and tag is defined once, in blog/authors.yml (and blog/tags.yml when a post uses one).
          onInlineAuthors: 'throw',
          onInlineTags: 'throw',
          onUntruncatedBlogPosts: 'throw',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: BLOG_TITLE,
            description: BLOG_DESCRIPTION,
            copyright: 'Made by the AChat team.',
            language: 'en-US',
          },
        },
        pages: { rehypePlugins: [rehypeLinkLaw] },
        theme: { customCss: './src/css/custom.css' },
        sitemap: {
          // lastmod only: search engines ignore changefreq and priority.
          changefreq: null,
          priority: null,
          lastmod: 'date',
          // The blog's tag, author, archive and later list pages only repeat its posts; each post is listed once.
          ignorePatterns: ['/blog/tags/**', '/blog/authors/**', '/blog/archive', '/blog/page/**'],
          // The blog's own page has no git date: it takes the newest date among the posts it lists.
          createSitemapItems: async ({ defaultCreateSitemapItems, ...params }) => {
            const items = await defaultCreateSitemapItems(params);
            const blogUrl = `${SITE_URL}${BLOG_PATH}`;
            const newest = items
              .filter((item) => item.url.startsWith(`${blogUrl}/`) && item.lastmod)
              .map((item) => item.lastmod as string)
              .sort()
              .at(-1);
            return items.map((item) =>
              item.url === blogUrl && !item.lastmod && newest ? { ...item, lastmod: newest } : item
            );
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // PNG (social scrapers do not render SVG), exported from its master static/img/social-card.svg.
    image: 'img/social-card.png',
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
      { property: 'og:image:type', content: 'image/png' },
      {
        property: 'og:image:alt',
        content: 'AChat Docs: a messaging app for personal chats, groups, communities and anonymous rooms, on the web and Android.',
      },
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
        ...(HAS_POSTS ? [{ to: BLOG_PATH, label: 'Blog', position: 'left' as const }] : []),
        { to: '/about-the-author', label: 'AChat team', position: 'right' },
        {
          type: 'dropdown',
          label: 'Get AChat',
          position: 'right',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({ label: platform.name, href: platform.href })),
            { label: 'All apps', to: '/apps' },
          ],
        },
        { href: DOCS_REPO, label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Get AChat',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({ label: platform.name, href: platform.href })),
            { label: 'All apps', to: '/apps' },
          ],
        },
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'Security & encryption', to: '/concepts/security-and-encryption' },
            { label: 'Developers', to: '/developers' },
            { label: 'FAQ', to: '/faq' },
            ...(HAS_POSTS ? [{ label: 'Blog', to: BLOG_PATH }] : []),
            { label: 'Sitemap', to: '/sitemap' },
            { label: 'Changelog feed', to: '/feed' },
            { label: 'RSS (feed.xml)', href: 'pathname:///feed.xml' },
          ],
        },
        {
          title: 'AChat',
          items: [
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
