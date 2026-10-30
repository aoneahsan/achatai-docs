import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import type { FeedData } from '../plugins/changelog-feed';

/**
 * The readable /feed page: the changelog entries the RSS file /feed.xml carries (src/plugins/changelog-feed.ts),
 * each linking to its section of the changelog.
 */
export default function FeedPage(): ReactNode {
  const data = usePluginData('changelog-feed') as FeedData;
  return (
    <Layout title="Changelog feed" description={data.description}>
      <main className="container margin-vert--lg">
        <h1>Changelog feed</h1>
        <p>
          {data.description} To follow it in a feed reader, add <a href="/feed.xml">feed.xml</a> (RSS 2.0).
        </p>
        <ul>
          {data.items.map((item) => (
            <li key={item.anchor} className="margin-bottom--md">
              <h2 className="margin-bottom--xs">
                <Link to={`/changelog#${item.anchor}`}>{item.title}</Link>
              </h2>
              {item.date ? <time dateTime={item.date}>{item.date}</time> : null}
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
