import { readFileSync } from 'node:fs';
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

type SidebarItem = string | { type: string; label?: string; items?: SidebarItem[] };

/** The `title:` and `description:` lines of a doc's front matter (single-line values, as every page here writes them). */
function frontMatter(siteDir: string, id: string): DirectoryPage {
  const source = readFileSync(join(siteDir, 'docs', `${id}.md`), 'utf8');
  const head = /^---\n([\s\S]*?)\n---/.exec(source)?.[1] ?? '';
  const field = (name: string) => new RegExp(`^${name}:\\s*(.+)$`, 'm').exec(head)?.[1]?.trim() ?? '';
  const title = field('title');
  const description = field('description');
  if (!title || !description) throw new Error(`docs-directory: docs/${id}.md needs a title and a description.`);
  return { title, description, path: `/${id}` };
}

/** Top-level docs form the first group (labelled `firstLabel`); each category is its own group. */
export function directoryOf(siteDir: string, items: readonly SidebarItem[], firstLabel: string): DirectoryGroup[] {
  const first: DirectoryGroup = { label: firstLabel, pages: [] };
  const groups: DirectoryGroup[] = [first];
  const ids = (list: readonly SidebarItem[]): string[] =>
    list.flatMap((item) => (typeof item === 'string' ? [item] : ids(item.items ?? [])));
  for (const item of items) {
    if (typeof item === 'string') first.pages.push(frontMatter(siteDir, item));
    else if (item.type === 'category') {
      groups.push({ label: item.label ?? '', pages: ids(item.items ?? []).map((id) => frontMatter(siteDir, id)) });
    }
  }
  return groups.filter((g) => g.pages.length);
}

export default function docsDirectory(context: LoadContext): Plugin {
  return {
    name: 'docs-directory',
    getPathsToWatch: () => [join(context.siteDir, 'sidebars.ts'), join(context.siteDir, 'docs/**/*.md')],
    async loadContent(): Promise<DirectoryGroup[]> {
      return directoryOf(context.siteDir, sidebars.mainSidebar as SidebarItem[], 'Overview');
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
