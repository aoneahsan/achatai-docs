import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import owner from '../data/owner-profile.json';
import { relFor } from '../data/link-policy';
import { APP, useW } from '../components/Ecosystem/data';
import styles from './ecosystem.module.css';

/*
 * /about-developer on the docs site (approved dummy about-developer.html, OD-31): who builds AChat, the vision and its
 * gaps, the journey with real dates (git, the cutover, the Play listing, the AI and 1.15.1 releases), how it's built,
 * links out (all followed) and the contact route. Replaces /about-the-author, which redirects here.
 */

const JOURNEY = ['2026-05-12', '2026-09-26', '2026-10-03', '2026-10-07', '2026-10-25', '2026-11-21'];
const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const github = owner.person.sameAs.find((u) => u.includes('github.com')) ?? owner.organization.url;
const linkedin = owner.person.sameAs.find((u) => u.includes('linkedin.com')) ?? owner.person.url;
const OUT = [
  ['dev.more.projects', owner.person.projectsUrl],
  ['dev.zaions', owner.organization.url],
  ['dev.more.github', github],
  ['dev.more.linkedin', linkedin],
] as const;

function Out({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel={relFor(href)}>
      {children}
    </a>
  );
}

export default function AboutDeveloper(): React.ReactElement {
  const w = useW();
  return (
    <Layout title={w('dev.meta.title')} description={w('dev.meta.description')}>
      <main className={styles.main}>
        <h1>{w('dev.h1')}</h1>
        <p className={styles.intro}>{w('dev.lead')}</p>
        <div className={styles.actions}>
          <Out className="button button--primary" href={owner.person.url}>
            {w('dev.portfolio')}
          </Out>
          <Out className="button button--secondary" href={owner.organization.url}>
            {w('dev.zaions')}
          </Out>
        </div>
        <h2>{w('dev.for.h')}</h2>
        <p className={styles.intro}>{w('dev.for.body')}</p>
        <h2>{w('dev.gaps.h')}</h2>
        <p className={styles.intro}>{w('dev.gaps.body')}</p>
        <h2>{w('dev.journey.h')}</h2>
        <ol>
          {JOURNEY.map((iso, i) => (
            <li key={iso}>
              <time dateTime={iso}>{day.format(new Date(`${iso}T12:00:00Z`))}</time>: {w(`dev.j${i + 1}`)}
            </li>
          ))}
        </ol>
        <h2>{w('dev.built.h')}</h2>
        <p className={styles.intro}>{w('dev.built.body')}</p>
        <h2>{w('dev.more.h')}</h2>
        <ul>
          <li>
            <Link to="/ecosystem">{w('dev.more.ecosystem')}</Link>
          </li>
          {OUT.map(([key, href]) => (
            <li key={key}>
              <Out href={href}>{w(key)}</Out>
            </li>
          ))}
        </ul>
        <h2>{w('dev.contact.h')}</h2>
        <p>
          {w('dev.contact.body')} <Out href={`${APP}/contact`}>{w('dev.contact.link')}</Out>
        </p>
      </main>
    </Layout>
  );
}
