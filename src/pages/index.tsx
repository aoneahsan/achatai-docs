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

const FEATURES: Feature[] = [
  {
    title: 'No sign-up',
    body: 'Pick or generate a chat ID, share the link, talk. There is no registration, email, or phone number — you are in a room the moment you open the URL.',
  },
  {
    title: 'Optional end-to-end encryption',
    body: 'Set a password and AChat derives an AES-GCM key in your browser with PBKDF2. Message bodies and file metadata are encrypted client-side; the server never sees the key. Lose the password, lose the chat.',
  },
  {
    title: 'File sharing',
    body: 'Send files up to 10 MB each, 100 MB total per chat, stored on FilesHub. Image previews, a lightbox, and a multi-file upload queue are built in.',
  },
  {
    title: 'Threads, groups & communities',
    body: 'Reply in threads, spin up named private group chats, or open public, discoverable communities with best-effort client-side moderation.',
  },
  {
    title: 'Embeddable widget',
    body: 'Drop AChat into any site as an inline iframe or a floating launcher. The host page cannot read the messages inside the sandboxed widget.',
  },
  {
    title: '10-day auto-delete',
    body: 'Every message and file carries a time-to-live. Firestore TTL removes them about 10 days after they are sent, with lazy FilesHub cleanup. Nothing is meant to last.',
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
            Quick Start — 60 sec
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
      title={`${siteConfig.title} — Anonymous Chat AI documentation`}
      description="Documentation for AChat (Anonymous Chat AI): no-signup transient chat with optional in-browser end-to-end encryption, file sharing, threads, communities, an embeddable widget, and 10-day auto-delete."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
