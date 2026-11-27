import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import type { FeedData } from '../plugins/changelog-feed';

/**
 * The readable /feed page: the entries the RSS file /feed.xml carries (src/plugins/changelog-feed.ts), each linking to
 * its section of the changelog or, once the blog has posts, to its post.
 */
export default function FeedPage(): ReactNode {
  const data = usePluginData('changelog-feed') as FeedData;
  const withPosts = data.posts.length > 0;
  const heading = withPosts
    ? translate({ id: 'feed.heading.withPosts', message: 'Posts and changelog' })
    : translate({ id: 'feed.heading', message: 'Changelog feed' });
  return (
    <Layout title={heading} description={data.description}>
      <main className="container margin-vert--lg">
        <h1>{heading}</h1>
        <p>
          {data.description}{' '}
          <Translate id="feed.follow" values={{ file: <a href="/feed.xml">feed.xml</a> }}>
            {'To follow it in a feed reader, add {file} (RSS 2.0).'}
          </Translate>
        </p>
        <ul>
          {data.items.map((item) => (
            <li key={`${item.kind}:${item.key}`} className="margin-bottom--md">
              <h2 className="margin-bottom--xs">
                <Link to={item.path}>{item.title}</Link>
              </h2>
              {item.date ? <time dateTime={item.date}>{item.date}</time> : null}
              {withPosts ? <span> · {item.kind === 'post'
                    ? translate({ id: 'feed.kind.post', message: 'Blog post' })
                    : translate({ id: 'feed.kind.changelog', message: 'Changelog' })}</span> : null}
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
