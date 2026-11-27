import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { LoadContext, Plugin } from '@docusaurus/types';
import sidebars from '../../sidebars';

/*
 * The data behind the readable /sitemap page (house rule: every frontend ships /sitemap and /sitemap.xml). One source:
 * the sidebar (sidebars.ts), in its order and with its category labels, each page with the title and description of its
 * own front matter. Docusaurus keeps writing sitemap.xml from the routes; this only feeds the page.
 */

export interface DirectoryPage {
  title: string;
  description: string;
  path: string;
}

export interface DirectoryGroup {
  label: string;
  pages: DirectoryPage[];
}

type SidebarItem =
  | string
  | { type: string; label?: string; items?: SidebarItem[]; link?: { type: string; id?: string } };

/** The `title:` and `description:` lines of a doc's front matter (single-line values, as every page here writes them). */
function frontMatter(siteDir: string, id: string, locale = 'en'): DirectoryPage {
  // A translated page (i18n/<locale>/docusaurus-plugin-content-docs/current/) wins over the English source.
  const translated = join(siteDir, 'i18n', locale, 'docusaurus-plugin-content-docs', 'current', `${id}.md`);
  const file = locale !== 'en' && existsSync(translated) ? translated : join(siteDir, 'docs', `${id}.md`);
  // Line endings normalised: a Windows checkout (core.autocrlf) writes CRLF, which the `\n` patterns below never match.
  const source = readFileSync(file, 'utf8').replace(/\r\n?/g, '\n');
  const head = /^---\n([\s\S]*?)\n---/.exec(source)?.[1] ?? '';
  const field = (name: string) =>
    (new RegExp(`^${name}:\\s*(.+)$`, 'm').exec(head)?.[1]?.trim() ?? '').replace(/^(['"])(.*)\1$/, '$2');
  const title = field('title');
  const description = field('description');
  if (!title || !description) throw new Error(`docs-directory: docs/${id}.md needs a title and a description.`);
  // An `index` doc is served at its folder's URL (`developers/index` → `/developers`).
  return { title, description, path: `/${id.replace(/\/?index$/, '')}` };
}

/** Top-level docs form the first group (labelled `firstLabel`); each category is its own group. */
export function directoryOf(
  siteDir: string,
  items: readonly SidebarItem[],
  firstLabel: string,
  locale = 'en',
  labels: Readonly<Record<string, string>> = {}
): DirectoryGroup[] {
  const first: DirectoryGroup = { label: firstLabel, pages: [] };
  const groups: DirectoryGroup[] = [first];
  const ids = (list: readonly SidebarItem[]): string[] =>
    list.flatMap((item) => (typeof item === 'string' ? [item] : ids(item.items ?? [])));
  for (const item of items) {
    if (typeof item === 'string') first.pages.push(frontMatter(siteDir, item, locale));
    else if (item.type === 'category') {
      // A category's own page (`link: { type: 'doc' }`) leads its group.
      const linked = item.link?.type === 'doc' && item.link.id ? [item.link.id] : [];
      groups.push({
        label: labels[item.label ?? ''] ?? item.label ?? '',
        pages: [...linked, ...ids(item.items ?? [])].map((id) => frontMatter(siteDir, id, locale)),
      });
    }
  }
  return groups.filter((g) => g.pages.length);
}

export default function docsDirectory(context: LoadContext): Plugin {
  return {
    name: 'docs-directory',
    getPathsToWatch: () => [
      join(context.siteDir, 'sidebars.ts'),
      join(context.siteDir, 'docs/**/*.md'),
      join(context.siteDir, 'i18n/**/*.{md,json}'),
    ],
    async loadContent(): Promise<DirectoryGroup[]> {
      const locale = context.i18n.currentLocale;
      const read = (file: string): Record<string, { message: string }> => {
        const path = join(context.siteDir, 'i18n', locale, file);
        return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as Record<string, { message: string }>) : {};
      };
      // Category labels as the translated sidebar shows them; the first group's label from the site's own strings.
      const sidebar = read('docusaurus-plugin-content-docs/current.json');
      const labels = Object.fromEntries(
        Object.entries(sidebar)
          .filter(([key]) => key.startsWith('sidebar.mainSidebar.category.'))
          .map(([key, value]) => [key.slice('sidebar.mainSidebar.category.'.length), value.message])
      );
      const overview = read('code.json')['sitemap.group.overview']?.message ?? 'Overview';
      return directoryOf(context.siteDir, sidebars.mainSidebar as SidebarItem[], overview, locale, labels);
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
