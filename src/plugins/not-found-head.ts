import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from '@docusaurus/types';

/*
 * build/404.html is the page GitHub Pages serves, with status 404, for every unknown path. It carries noindex, follow
 * (src/theme/NotFound/Content) and, per the sitemap standard, no canonical and no og:url: the theme's SiteMetadata
 * names the rendered path (/404.html) as both on every page, and a wrapper cannot remove a tag the theme adds, so this
 * step takes the two tags out of the written file. It fails the build when either is still there, or noindex is not.
 */

const CANONICAL = /<link\b[^>]*\brel="canonical"[^>]*>/g;
const OG_URL = /<meta\b[^>]*\bproperty="og:url"[^>]*>/g;

export function stripNotFoundHead(html: string): string {
  return html.replace(CANONICAL, '').replace(OG_URL, '');
}

export default function notFoundHead(): Plugin {
  return {
    name: 'not-found-head',
    async postBuild({ outDir }) {
      const file = join(outDir, '404.html');
      const html = stripNotFoundHead(readFileSync(file, 'utf8'));
      if (
        html.match(CANONICAL) ||
        html.match(OG_URL) ||
        !/name="robots" content="noindex, follow"/.test(html)
      ) {
        throw new Error('not-found-head: build/404.html must carry noindex, follow and no canonical or og:url.');
      }
      writeFileSync(file, html);
    },
  };
}
