import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { LoadContext, Plugin } from '@docusaurus/types';

/*
 * The docs feed pair (house rule: every frontend ships /feed and /feed.xml; search audit SA-P05, 2026-10-30).
 * The site has no blog, so the items are the sections of docs/changelog.md ("## Title (YYYY-MM-DD)"): one source, read
 * at build time, never re-typed. postBuild writes build/feed.xml (valid RSS 2.0); the readable /feed page
 * (src/pages/feed.tsx) reads the same items through usePluginData('changelog-feed').
 * A section dated to the month only, or not dated, carries no pubDate rather than an invented day.
 */

export interface FeedItem {
  title: string;
  /** YYYY-MM-DD, or null when the heading has no full date. */
  date: string | null;
  /** The heading's anchor on /changelog (Docusaurus heading ids). */
  anchor: string;
  /** The section's text with Markdown removed. */
  summary: string;
}

export interface FeedData {
  title: string;
  description: string;
  items: FeedItem[];
}

const FEED_TITLE = 'AChat Docs changelog';
const FEED_DESCRIPTION =
  "AChat's release history, from the changelog in these docs. The in-app release notes at achat.aoneahsan.com/feed are the authority, with the date each change shipped.";

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
  const body = source.replace(/^---[\s\S]*?\n---\n/, '');
  return body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const [heading = '', ...rest] = section.split('\n');
      const full = /\((\d{4}-\d{2}-\d{2})\)\s*$/.exec(heading);
      return {
        title: heading.replace(/\s*\(\d{4}-\d{2}-\d{2}\)\s*$/, '').trim(),
        date: full?.[1] ?? null,
        anchor: anchorOf(heading),
        summary: plain(rest.join('\n')),
      };
    });
}

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const rfc822 = (day: string) => new Date(`${day}T12:00:00Z`).toUTCString();

export function feedXml(site: string, data: FeedData): string {
  const page = `${site}/changelog`;
  const newest = data.items
    .map((i) => i.date)
    .filter((d): d is string => d !== null)
    .sort()
    .at(-1);
  const items = data.items.map((item) =>
    [
      '    <item>',
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(`${page}#${item.anchor}`)}</link>`,
      `      <guid isPermaLink="false">achat-docs-changelog-${escapeXml(item.anchor)}</guid>`,
      ...(item.date ? [`      <pubDate>${rfc822(item.date)}</pubDate>`] : []),
      '      <category>Changelog</category>',
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

/** Typed as Plugin<unknown> (what the config's plugin list accepts); the content is this plugin's own FeedData. */
export default function changelogFeed(context: LoadContext): Plugin {
  const site = context.siteConfig.url.replace(/\/$/, '');
  const file = join(context.siteDir, 'docs/changelog.md');
  return {
    name: 'changelog-feed',
    getPathsToWatch: () => [file],
    async loadContent(): Promise<FeedData> {
      const items = parseChangelog(readFileSync(file, 'utf8'));
      if (!items.length) throw new Error('changelog-feed: docs/changelog.md has no "## " sections.');
      return { title: FEED_TITLE, description: FEED_DESCRIPTION, items };
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
    async postBuild({ content, outDir }) {
      writeFileSync(join(outDir, 'feed.xml'), feedXml(site, content as FeedData));
    },
  };
}
