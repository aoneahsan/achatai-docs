import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';
import {APPS_PAGE, CURRENT_SURFACE, PLATFORMS, type Platform} from '@site/src/data/platforms';
import styles from './apps.module.css';

/** One JSON-LD entry per released surface (platform-links verification row 6). */
function surfaceLd(platform: Platform): object {
  const name = platform.id === 'android' ? 'AChat for Android' : platform.name;
  if (platform.id === 'web') return {'@type': 'WebApplication', name, url: platform.href, applicationCategory: 'CommunicationApplication', operatingSystem: 'Web'};
  if (platform.id === 'android') return {'@type': 'MobileApplication', name, url: platform.href, installUrl: platform.href, applicationCategory: 'CommunicationApplication', operatingSystem: 'Android'};
  return {'@type': 'WebSite', name: 'AChat documentation', url: platform.href};
}
const APPS_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: APPS_PAGE.title,
  itemListElement: PLATFORMS.map((platform, i) => ({'@type': 'ListItem', position: i + 1, item: surfaceLd(platform)})),
}).replace(/</g, '\\u003c');

/** `/apps` — "Get {Product}": every released surface, from `src/data/platforms.ts`. */
export default function Apps(): ReactNode {
  return (
    <Layout title={APPS_PAGE.title} description={APPS_PAGE.description}>
      <Head>
        <script type="application/ld+json">{APPS_LD}</script>
      </Head>
      <main className="container margin-vert--xl">
        <Heading as="h1">{APPS_PAGE.title}</Heading>
        <p className={styles.lead}>{APPS_PAGE.lead}</p>
        <div className={styles.grid}>
          {PLATFORMS.map((platform) => {
            const current = platform.id === CURRENT_SURFACE;
            return (
              <article key={platform.id} className={styles.card}>
                <span className={styles.kicker}>{platform.name}</span>
                <Heading as="h2" className={styles.title}>{platform.title}</Heading>
                <p>{platform.text}</p>
                {current
                  ? <span className={styles.here}>You're reading it</span>
                  : <Link className={platform.primary ? 'button button--primary' : 'button button--secondary'} href={platform.href}>{platform.cta}</Link>}
              </article>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
