import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { BlogContent } from '@docusaurus/plugin-content-blog';
import type { AllContent, LoadContext, Plugin } from '@docusaurus/types';

/*
 * The docs feed pair (house rule: every frontend ships /feed and /feed.xml; search audit SA-P05, 2026-10-30).
 * Two sources, each read at build time and never re-typed: the sections of docs/changelog.md ("## Title (YYYY-MM-DD)")
 * and the posts in blog/, as the blog plugin loaded them (so a draft or unlisted post never reaches the feed).
 * postBuild writes build/feed.xml (valid RSS 2.0), newest first; the readable /feed page (src/pages/feed.tsx) and the
 * blog group on /sitemap (src/pages/sitemap.tsx) read the same data through usePluginData('changelog-feed').
 * A changelog section dated to the month only, or not dated, carries no pubDate rather than an invented day.
 */

export interface FeedItem {
  title: string;
  /** YYYY-MM-DD, or null when a changelog heading has no full date. */
  date: string | null;
  /** Where the item lives on this site: a changelog section (`/changelog#anchor`) or a blog post. */
  path: string;
  /** The stable part of the RSS guid: the changelog section's anchor, or the post's permalink. */
  key: string;
  kind: 'changelog' | 'post';
  /** The section's text with Markdown removed, or the post's description. */
  summary: string;
}

export interface FeedData {
  title: string;
  description: string;
  /** Changelog sections and blog posts together, newest first. */
  items: FeedItem[];
  /** The blog posts alone, newest first: empty until the first post is published. */
  posts: FeedItem[];
}

export const FEED_TITLE = 'AChat Docs changelog';
const FEED_DESCRIPTION =
  "AChat's release history, from the changelog in these docs. The in-app release notes at achat.aoneahsan.com/feed are the authority, with the date each change shipped.";
export const FEED_TITLE_WITH_POSTS = 'AChat Docs: posts and changelog';
const FEED_DESCRIPTION_WITH_POSTS =
  "The AChat team's posts from the blog, and AChat's release history from the changelog in these docs. The in-app release notes at achat.aoneahsan.com/feed are the authority, with the date each change shipped.";

/** Docusaurus heading id (github-slugger rules for plain ASCII headings). */
export function anchorOf(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-');
}

const plain = (md: string) =>
  md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

/** The changelog's "## " sections, in file order (newest first, as the page is written). */
export function parseChangelog(source: string): FeedItem[] {
  // Line endings normalised first: a Windows checkout (core.autocrlf) writes CRLF.
  const body = source.replace(/\r\n?/g, '\n').replace(/^---[\s\S]*?\n---\n/, '');
  return body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const [heading = '', ...rest] = section.split('\n');
      const full = /\((\d{4}-\d{2}-\d{2})\)\s*$/.exec(heading);
      const anchor = anchorOf(heading);
      return {
        title: heading.replace(/\s*\(\d{4}-\d{2}-\d{2}\)\s*$/, '').trim(),
        date: full?.[1] ?? null,
        path: `/changelog#${anchor}`,
        key: anchor,
        kind: 'changelog' as const,
        summary: plain(rest.join('\n')),
      };
    });
}

/**
 * The blog posts the blog plugin loaded, newest first. Drafts are already gone from a production build; an unlisted
 * post stays out here too, as it does from the blog's own lists.
 *
 * @param allContent - every plugin's loaded content
 * @returns one feed item per listed post
 */
export function postsOf(allContent: AllContent): FeedItem[] {
  const instances = (allContent['docusaurus-plugin-content-blog'] ?? {}) as Record<string, BlogContent | undefined>;
  return Object.values(instances)
    .flatMap((content) => content?.blogPosts ?? [])
    .filter((post) => !post.metadata.unlisted)
    .map(({ metadata }) => ({
      title: metadata.title,
      date: new Date(metadata.date).toISOString().slice(0, 10),
      path: metadata.permalink,
      key: metadata.permalink,
      kind: 'post' as const,
      summary: metadata.description,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Newest first by day. A changelog section with no full date keeps its place after every dated item. */
function newestFirst(changelog: FeedItem[], posts: FeedItem[]): FeedItem[] {
  return [...posts, ...changelog].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const rfc822 = (day: string) => new Date(`${day}T12:00:00Z`).toUTCString();

/** A changelog guid keeps the form it had before the blog existed, so feed readers see no item twice. */
function guidOf(site: string, item: FeedItem): string {
  return item.kind === 'post'
    ? `<guid isPermaLink="true">${escapeXml(`${site}${item.path}`)}</guid>`
    : `<guid isPermaLink="false">achat-docs-changelog-${escapeXml(item.key)}</guid>`;
}

export function feedXml(site: string, data: FeedData): string {
  const newest = data.items
    .map((i) => i.date)
    .filter((d): d is string => d !== null)
    .sort()
    .at(-1);
  const items = data.items.map((item) =>
    [
      '    <item>',
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(`${site}${item.path}`)}</link>`,
      `      ${guidOf(site, item)}`,
      ...(item.date ? [`      <pubDate>${rfc822(item.date)}</pubDate>`] : []),
      `      <category>${item.kind === 'post' ? 'Blog' : 'Changelog'}</category>`,
      `      <description>${escapeXml(item.summary)}</description>`,
      '    </item>',
    ].join('\n')
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(data.title)}</title>`,
    `    <link>${escapeXml(`${site}/feed`)}</link>`,
    `    <description>${escapeXml(data.description)}</description>`,
    '    <language>en</language>',
    // The newest dated entry's day, never the build time.
    ...(newest ? [`    <lastBuildDate>${rfc822(newest)}</lastBuildDate>`] : []),
    `    <atom:link href="${escapeXml(`${site}/feed.xml`)}" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

/** Typed as Plugin<unknown> (what the config's plugin list accepts). */
export default function changelogFeed(context: LoadContext): Plugin {
  // Each language builds its own feed: its addresses carry the language prefix (baseUrl `/es/`), its changelog and
  // description come from the translation when there is one (a blog post's permalink already carries the prefix).
  const locale = context.i18n.currentLocale;
  const prefix = context.baseUrl.replace(/\/$/, '');
  const site = context.siteConfig.url.replace(/\/$/, '');
  const translated = join(context.siteDir, 'i18n', locale, 'docusaurus-plugin-content-docs/current/changelog.md');
  const file = locale !== 'en' && existsSync(translated) ? translated : join(context.siteDir, 'docs/changelog.md');
  const codePath = join(context.siteDir, 'i18n', locale, 'code.json');
  const code = (existsSync(codePath) ? JSON.parse(readFileSync(codePath, 'utf8')) : {}) as Record<
    string,
    { message: string }
  >;
  const say = (id: string, english: string) => code[id]?.message ?? english;
  let changelog: FeedItem[] = [];
  let data: FeedData | null = null;
  return {
    name: 'changelog-feed',
    getPathsToWatch: () => [file],
    async loadContent() {
      changelog = parseChangelog(readFileSync(file, 'utf8')).map((item) => ({ ...item, path: `${prefix}${item.path}` }));
      if (!changelog.length) throw new Error('changelog-feed: docs/changelog.md has no "## " sections.');
    },
    // After every plugin has loaded, so the blog's posts are known.
    async allContentLoaded({ allContent, actions }) {
      const posts = postsOf(allContent);
      data = posts.length
        ? {
            title: say('feed.title.withPosts', FEED_TITLE_WITH_POSTS),
            description: say('feed.description.withPosts', FEED_DESCRIPTION_WITH_POSTS),
            items: newestFirst(changelog, posts),
            posts,
          }
        : {
            title: say('feed.title', FEED_TITLE),
            description: say('feed.description', FEED_DESCRIPTION),
            items: changelog,
            posts,
          };
      actions.setGlobalData(data);
    },
    async postBuild({ outDir }) {
      if (!data) throw new Error('changelog-feed: the feed data was never loaded.');
      writeFileSync(join(outDir, 'feed.xml'), feedXml(site, data));
    },
  };
}
