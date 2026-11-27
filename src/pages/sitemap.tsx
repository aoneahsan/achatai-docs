import { useMemo, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import type { FeedData } from '../plugins/changelog-feed';
import type { DirectoryGroup, DirectoryPage } from '../plugins/docs-directory';
import styles from './sitemap.module.css';
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE } from '@site/src/data/blog';
import { platformHref } from '@site/src/data/platforms';

/**
 * The readable /sitemap page: every docs page as a card, grouped as the sidebar groups them (src/plugins/docs-directory.ts),
 * with a typo-tolerant filter whose text lives in the URL (?q=). The prerendered HTML lists every card as a real link.
 */

const APP_URL = platformHref('web');

const normal = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Edit distance, stopping early once it passes `max`. */
function within(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    for (let j = 1; j <= b.length; j += 1) {
      row[j] = Math.min(prev[j]! + 1, row[j - 1]! + 1, prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    if (Math.min(...row) > max) return false;
    prev = row;
  }
  return prev[b.length]! <= max;
}

/** Every query word must appear in the card's words: as a prefix, or within one typo (two for long words). */
function matches(query: string, haystack: string): boolean {
  const words = normal(haystack).split(' ');
  return normal(query)
    .split(' ')
    .filter(Boolean)
    .every((q) =>
      words.some(
        (w) => w.startsWith(q) || (q.length >= 4 && within(q, w.slice(0, q.length + 1), q.length >= 8 ? 2 : 1))
      )
    );
}

function Card({ page }: { page: DirectoryPage }): ReactNode {
  return (
    <li>
      <Link className={styles.card} to={page.path}>
        <span className={styles.cardTitle}>{page.title}</span>
        <p className={styles.cardText}>{page.description}</p>
      </Link>
    </li>
  );
}

export default function SitemapPage(): ReactNode {
  const docGroups = usePluginData('docs-directory') as DirectoryGroup[];
  const feed = usePluginData('changelog-feed') as FeedData;
  const withPosts = feed.posts.length > 0;
  // Once the blog has posts, they follow the docs as their own group, led by the blog's own page.
  const groups = useMemo<DirectoryGroup[]>(
    () =>
      withPosts
        ? [
            ...docGroups,
            {
              label: translate({ id: 'sitemap.group.blog', message: 'Blog' }),
              pages: [
                { title: BLOG_TITLE, description: BLOG_DESCRIPTION, path: BLOG_PATH },
                ...feed.posts.map((post) => ({ title: post.title, description: post.summary, path: post.path })),
              ],
            },
          ]
        : docGroups,
    [docGroups, feed.posts, withPosts]
  );
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search).get('q') ?? '';
  const shown = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          pages: g.pages.filter((p) => matches(query, `${p.title} ${p.description} ${g.label}`)),
        }))
        .filter((g) => g.pages.length),
    [groups, query]
  );
  const setQuery = (q: string) => {
    const params = new URLSearchParams(location.search);
    if (q) params.set('q', q);
    else params.delete('q');
    const search = params.toString();
    history.replace({ ...location, search: search ? `?${search}` : '' });
  };
  return (
    <Layout
      title={translate({ id: 'sitemap.title', message: 'Sitemap' })}
      description={translate({
        id: 'sitemap.description',
        message: 'Every page of the AChat documentation, grouped by section, with a search.',
      })}
    >
      <main className="container margin-vert--lg">
        <h1>{translate({ id: 'sitemap.title', message: 'Sitemap' })}</h1>
        <p>
          <Translate
            id={withPosts ? 'sitemap.lead.withPosts' : 'sitemap.lead'}
            values={{
              sitemap: <a href="/sitemap.xml">sitemap.xml</a>,
              feedXml: <a href="/feed.xml">feed.xml</a>,
              feedPage: (
                <Link to="/feed">
                  {withPosts
                    ? translate({ id: 'sitemap.lead.feedLink', message: 'feed' })
                    : translate({ id: 'sitemap.lead.changelogLink', message: 'changelog feed' })}
                </Link>
              ),
            }}
          >
            {withPosts
              ? 'Every page of the AChat documentation, grouped as the sidebar groups them. For search engines, feed readers and AI assistants, {sitemap} lists every page and {feedXml} carries the blog posts and the changelog as RSS; the {feedPage} page shows the same entries.'
              : 'Every page of the AChat documentation, grouped as the sidebar groups them. For search engines, feed readers and AI assistants, {sitemap} lists every page and {feedXml} carries the changelog as RSS; the {feedPage} page shows the same entries.'}
          </Translate>
        </p>
        <p>
          <label htmlFor="sitemap-q" className="margin-right--sm">
            {translate({ id: 'sitemap.search.label', message: 'Search the docs pages' })}
          </label>
          <input
            id="sitemap-q"
            className={styles.search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={translate({ id: 'sitemap.search.placeholder', message: 'encryption, anonymous rooms, plans' })}
          />
        </p>
        {shown.length === 0 ? (
          <p role="status">
            {translate(
              { id: 'sitemap.search.none', message: 'No page matches "{query}". Try fewer or shorter words.' },
              { query }
            )}
          </p>
        ) : (
          shown.map((group) => (
            <section key={group.label} className="margin-bottom--lg">
              <h2>{group.label}</h2>
              <ul className={styles.grid}>
                {group.pages.map((page) => (
                  <Card key={page.path} page={page} />
                ))}
              </ul>
            </section>
          ))
        )}
        <section className="margin-bottom--lg">
          <h2>{translate({ id: 'sitemap.app.heading', message: 'The AChat app' })}</h2>
          <ul className={styles.grid}>
            <Card
              page={{
                title: translate({ id: 'sitemap.app.open.title', message: 'Open AChat' }),
                description: translate({ id: 'sitemap.app.open.description', message: 'The app itself, in your browser.' }),
                path: APP_URL,
              }}
            />
            <Card
              page={{
                title: translate({ id: 'sitemap.app.sitemap.title', message: 'App sitemap' }),
                description: translate({
                  id: 'sitemap.app.sitemap.description',
                  message: 'Every public page of the AChat app: features, plans, privacy and more.',
                }),
                path: `${APP_URL}/sitemap`,
              }}
            />
          </ul>
        </section>
      </main>
    </Layout>
  );
}
