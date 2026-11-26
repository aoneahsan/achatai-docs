import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from '@docusaurus/types';
import { isOwnedUrl } from '../data/link-policy';

/*
 * The build gate for the link law: after the site is written, every absolute link in every page is read back. A link to
 * one of our hosts may not carry nofollow, ugc or sponsored; any other link must carry nofollow. The build fails and
 * names each offending page and link. Script bodies are skipped: they hold no links a crawler follows.
 */

const ANCHOR = /<a\b[^>]*\bhref="(https?:\/\/[^"]+)"[^>]*>/gi;
const SCRIPT = /<script\b[\s\S]*?<\/script>/gi;

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

/**
 * Lists every link-law violation in one page's HTML.
 * @param html The written page.
 */
export function linkLawViolations(html: string): string[] {
  const found: string[] = [];
  for (const match of html.replace(SCRIPT, '').matchAll(ANCHOR)) {
    const [tag, href] = match;
    const rel = /\brel="([^"]*)"/i.exec(tag)?.[1] ?? '';
    if (isOwnedUrl(href)) {
      if (/\b(nofollow|ugc|sponsored)\b/i.test(rel)) found.push(`ours marked ${rel}: ${href}`);
    } else if (!/\bnofollow\b/i.test(rel)) {
      found.push(`third-party followed: ${href}`);
    }
  }
  return found;
}

export default function linkLawGate(): Plugin {
  return {
    name: 'link-law-gate',
    async postBuild({ outDir }) {
      const failures = htmlFiles(outDir).flatMap((file) =>
        linkLawViolations(readFileSync(file, 'utf8')).map((problem) => `${file.slice(outDir.length)}: ${problem}`),
      );
      if (failures.length) {
        throw new Error(`link-law-gate: ${failures.length} link(s) break the link law:\n${failures.join('\n')}`);
      }
    },
  };
}
