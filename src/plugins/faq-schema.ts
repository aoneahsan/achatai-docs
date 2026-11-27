import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'cheerio';
import type { Plugin } from '@docusaurus/types';

/*
 * The FAQ page shows its questions as H2 headings, each followed by its answer. Search engines and answer engines
 * read FAQPage JSON-LD from the HTML they fetch, so after the build this step reads the questions and answers out
 * of each written FAQ page (every locale), exactly as a reader sees them, and puts one FAQPage block in its <head>.
 * Reading the built page keeps the markup and the visible text from drifting apart. The build fails when a FAQ page
 * is missing or yields no question.
 */

const PAGE = 'faq/index.html';

/** One visible question and its answer text. */
export interface FaqEntry {
  question: string;
  answer: string;
}

/** Reads every H2 question and the text up to the next H2 from a built doc page. */
export function readFaq(html: string): FaqEntry[] {
  const $ = load(html);
  const body = $('.theme-doc-markdown').first();
  const entries: FaqEntry[] = [];
  body.children('h2').each((_, heading) => {
    const h = $(heading).clone();
    h.find('.hash-link').remove();
    const question = h.text().replace(/\s+/g, ' ').trim();
    const parts: string[] = [];
    let next = $(heading).next();
    while (next.length && !next.is('h2')) {
      parts.push(next.text());
      next = next.next();
    }
    const answer = parts.join(' ').replace(/\s+/g, ' ').trim();
    if (question && answer) entries.push({ question, answer });
  });
  return entries;
}

/** The FAQPage JSON-LD script for a list of entries. */
export function faqScript(entries: FaqEntry[]): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  };
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json" data-faq-schema="">${json}</script>`;
}

export default function faqSchema(): Plugin {
  return {
    name: 'faq-schema',
    async postBuild({ outDir, siteConfig }) {
      const { defaultLocale, locales } = siteConfig.i18n;
      // A single-locale build writes to outDir itself; the default locale also sits at the root.
      const dirs = existsSync(join(outDir, PAGE)) ? [outDir] : [];
      for (const locale of locales) {
        if (locale === defaultLocale) continue;
        if (existsSync(join(outDir, locale, PAGE))) dirs.push(join(outDir, locale));
      }
      if (dirs.length === 0) throw new Error(`faq-schema: no ${PAGE} was built.`);
      for (const dir of dirs) {
        const file = join(dir, PAGE);
        const html = readFileSync(file, 'utf8');
        if (html.includes('data-faq-schema')) continue;
        const entries = readFaq(html);
        if (entries.length === 0) throw new Error(`faq-schema: ${file} has no question to mark up.`);
        writeFileSync(file, html.replace('</head>', `${faqScript(entries)}</head>`));
      }
    },
  };
}
