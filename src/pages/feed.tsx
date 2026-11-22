import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import type { FeedData } from '../plugins/changelog-feed';

/**
 * The readable /feed page: the entries the RSS file /feed.xml carries (src/plugins/changelog-feed.ts), each linking to
 * its section of the changelog or, once the blog has posts, to its post.
 */
export default function FeedPage(): ReactNode {
  const data = usePluginData('changelog-feed') as FeedData;
  const withPosts = data.posts.length > 0;
  const heading = withPosts ? 'Posts and changelog' : 'Changelog feed';
  return (
    <Layout title={heading} description={data.description}>
      <main className="container margin-vert--lg">
        <h1>{heading}</h1>
        <p>
          {data.description} To follow it in a feed reader, add <a href="/feed.xml">feed.xml</a> (RSS 2.0).
        </p>
        <ul>
          {data.items.map((item) => (
            <li key={`${item.kind}:${item.key}`} className="margin-bottom--md">
              <h2 className="margin-bottom--xs">
                <Link to={item.path}>{item.title}</Link>
              </h2>
              {item.date ? <time dateTime={item.date}>{item.date}</time> : null}
              {withPosts ? <span> · {item.kind === 'post' ? 'Blog post' : 'Changelog'}</span> : null}
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
