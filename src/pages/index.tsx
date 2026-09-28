import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type Feature = {
  title: string;
  body: string;
};

/** Card copy follows the app's approved public wording, each limit beside its claim. */
const FEATURES: Feature[] = [
  {
    title: 'Chats with the people you know',
    body: 'Friends find you by username, invite link or QR code, never a phone number. Personal chats, private groups and their files are end-to-end encrypted, so each message can be read only on those people\'s devices.',
  },
  {
    title: 'Anonymous rooms',
    body: 'No account: pick a display name and share the room\'s link. Each message is kept for a set number of days, and someone with an account can keep the room longer. Anonymous doesn\'t mean untraceable.',
  },
  {
    title: 'Groups and communities',
    body: 'Groups are for people who already know each other. Communities have channels and threads, and each one says whether you need an account or can join anonymously. Communities aren\'t end-to-end encrypted.',
  },
  {
    title: 'Your history on every device',
    body: 'Link the devices you approve, and keep a recovery key. If you lose every device, the key brings your history back. Google sign-in alone can\'t, and AChat keeps no copy of your keys.',
  },
  {
    title: 'When the connection drops',
    body: 'Chats you\'ve opened stay readable, and new messages wait with "Waiting to send" until you\'re back. A message says "Sent" only once it has arrived.',
  },
  {
    title: 'Plans',
    body: 'Free has no end date and covers personal chats, groups, communities and anonymous rooms. Pro and Team / Family raise the file and kept-room allowances.',
  },
];

function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/getting-started/quick-start"
          >
            Quick Start
          </Link>
          <Link className="button button--secondary button--lg" to="/intro">
            What is AChat?
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://achat.aoneahsan.com"
          >
            Open the app
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresWrap}>
      <div className="container">
        <div className="row">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="col col--4 margin-bottom--lg">
              <div className={styles.featureCard}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}: personal chats, groups, communities and anonymous rooms`}
      description="Documentation for AChat, a messaging app for personal chats, groups, communities and anonymous rooms on the web and Android. What it does, with each limit beside it."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
