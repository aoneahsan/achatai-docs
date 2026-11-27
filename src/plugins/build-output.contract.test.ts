import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/*
 * The search contract of the built docs (search-issue remediation, 2026-11-27; achatai-docs#1). It reads build/ as
 * GitHub Pages serves it, so `yarn gates` (build, then test) checks what ships: every sitemap URL carries the trailing
 * slash and has a built page that is indexable, with one title, one description and one canonical naming that same
 * URL, and only JSON-LD that parses. Every locale's FAQ page carries its FAQPage block, and no tag pages are built.
 */

const ROOT = process.cwd();
const BUILD = join(ROOT, 'build');
const SITE = 'https://achat-docs.aoneahsan.com';
const LOCALES = ['zh-Hans', 'hi', 'es', 'ar', 'fr', 'pt-BR', 'ru', 'ja', 'ur', 'de'];

/** The file GitHub Pages serves for a slashed path. */
export const fileFor = (path: string): string => join(decodeURIComponent(path), 'index.html');

/** Every <loc> in a sitemap. */
export const sitemapUrls = (xml: string): string[] =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? '');

/** The problems one built page has against the contract (empty when it passes). */
export function pageProblems(url: string, html: string): string[] {
  const out: string[] = [];
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) out.push('noindex');
  if ((html.match(/<title[ >]/g) ?? []).length !== 1) out.push('title count');
  if ((html.match(/<meta[^>]+name="description"/g) ?? []).length !== 1) out.push('description count');
  const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length !== 1 || canonicals[0] !== url) out.push(`canonical ${canonicals.join(',') || 'missing'}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1] ?? '');
    } catch {
      out.push('ld+json does not parse');
    }
  }
  return out;
}

describe('docs config', () => {
  const config = readFileSync(join(ROOT, 'docusaurus.config.ts'), 'utf8');
  it('uses the slashed URL form and fails on broken links', () => {
    expect(config).toMatch(/^\s*trailingSlash: true,/m);
    expect(config).toMatch(/^\s*onBrokenLinks: 'throw',/m);
  });
});

describe('built docs search contract', () => {
  it('has a build to check', () => {
    expect(existsSync(join(BUILD, 'sitemap.xml'))).toBe(true);
  });

  // Docusaurus writes one sitemap per locale: build/sitemap.xml and build/<locale>/sitemap.xml.
  const sitemaps = ['', ...LOCALES].map((l) => join(BUILD, l, 'sitemap.xml')).filter((f) => existsSync(f));
  const urls = sitemaps.flatMap((f) => sitemapUrls(readFileSync(f, 'utf8')));

  it('lists only slashed URLs on this host', () => {
    expect(sitemaps.length).toBe(LOCALES.length + 1);
    expect(urls.length).toBeGreaterThan(500);
    expect(urls.filter((u) => !u.startsWith(`${SITE}/`) || !u.endsWith('/'))).toEqual([]);
  });

  it('gives every sitemap URL an indexable page with one self-canonical', () => {
    const problems: string[] = [];
    for (const url of urls) {
      const file = join(BUILD, fileFor(url.slice(SITE.length)));
      if (!existsSync(file)) {
        problems.push(`${url}: not built`);
        continue;
      }
      for (const p of pageProblems(url, readFileSync(file, 'utf8'))) problems.push(`${url}: ${p}`);
    }
    expect(problems).toEqual([]);
  });

  it('marks up every FAQ page and builds no tag pages', () => {
    const faqs = urls.filter((u) => /\/faq\/$/.test(u) && !u.includes('/white-label/'));
    expect(faqs.length).toBeGreaterThanOrEqual(11);
    for (const url of faqs) {
      const html = readFileSync(join(BUILD, fileFor(url.slice(SITE.length))), 'utf8');
      expect(html, url).toContain('"@type":"FAQPage"');
    }
    expect(existsSync(join(BUILD, 'tags'))).toBe(false);
  });
});

describe('pageProblems', () => {
  const ok = `<title>A</title><meta name="description" content="d"><link rel="canonical" href="${SITE}/a/">`;
  it('passes a clean page and names each defect', () => {
    expect(pageProblems(`${SITE}/a/`, ok)).toEqual([]);
    expect(pageProblems(`${SITE}/a/`, `${ok}<meta name="robots" content="noindex">`)).toEqual(['noindex']);
    expect(pageProblems(`${SITE}/a`, ok)).toEqual([`canonical ${SITE}/a/`]);
  });
});
