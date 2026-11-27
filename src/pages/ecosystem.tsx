import useLocale from '@site/src/components/Ecosystem/use-locale';
import React from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import roster from '../data/ecosystem.json';
import { relFor } from '../data/link-policy';
import { PRODUCTS, detailUrl, useW, type Words } from '../components/Ecosystem/data';
import styles from './ecosystem.module.css';

/*
 * /ecosystem on the docs site (approved dummy ecosystem.html, OD-31): every other Zaions product as a grid (default),
 * list or table, held in `?view=`. "Details" opens the product's page on the AChat app, written from AChat's angle;
 * the docs do not repeat those 22 pages.
 */

const VIEWS = ['grid', 'list', 'table'] as const;
type View = (typeof VIEWS)[number];

const PLACE: Record<string, string> = {
  playStore: 'eco.plat.playStore',
  chromeWebStore: 'eco.plat.chromeWebStore',
  npm: 'eco.plat.npm',
  desktop: 'eco.plat.desktop',
  github: 'eco.plat.github',
  web: 'eco.plat.web',
};

function where(id: string, url: string, w: Words): string {
  const row = roster.products.find((p) => p.id === id);
  const home = /npmjs\.com\//.test(url) ? 'npm' : /github\.com\//.test(url) ? 'github' : 'web';
  const rest = Object.entries((row?.platforms ?? {}) as Record<string, string | undefined>)
    .filter(([k, v]) => v && k !== home && k !== 'docs' && v !== url && PLACE[k])
    .map(([k]) => k);
  return [home, ...rest].map((k) => w(PLACE[k] ?? 'eco.plat.web')).join(' · ');
}

export default function Ecosystem(): React.ReactElement {
  const w = useW();
  const { locale } = useLocale();
  const { search, pathname } = useLocation();
  const history = useHistory();
  const asked = new URLSearchParams(search).get('view');
  const view: View = VIEWS.includes(asked as View) ? (asked as View) : 'grid';
  const setView = (next: View) => history.replace(next === 'grid' ? pathname : `${pathname}?view=${next}`);
  return (
    <Layout title={w('eco.meta.title')} description={w('eco.meta.description')}>
      <main className={styles.main}>
        <h1>{w('eco.h1')}</h1>
        <p className={styles.intro}>{w('eco.intro')}</p>
        <div role="radiogroup" aria-label={w('eco.view.label')} className={styles.views}>
          {VIEWS.map((v) => (
            <button key={v} type="button" role="radio" aria-checked={v === view} className={styles.view} onClick={() => setView(v)}>
              {w(`eco.view.${v}`)}
            </button>
          ))}
        </div>
        {view === 'table' ? (
          <div className={styles.tableWrap} role="region" aria-label={w('eco.h1')} tabIndex={0}>
            <table>
              <thead>
                <tr>
                  {(['product', 'what', 'where', 'links'] as const).map((k) => (
                    <th key={k} scope="col">
                      {w(`eco.th.${k}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">{p.name}</th>
                    <td>{w(`eco.p.${p.id}.card`)}</td>
                    <td>{where(p.id, p.url, w)}</td>
                    <td>
                      <a href={p.url} target="_blank" rel={relFor(p.url)}>
                        {w('eco.visit', { name: p.name })}
                      </a>{' '}
                      ·{' '}
                      <a href={detailUrl(p.id, locale)} target="_blank" rel={relFor(detailUrl(p.id, locale))}>
                        {w('eco.details')}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className={view === 'list' ? styles.list : styles.grid}>
            {PRODUCTS.map((p) => (
              <li key={p.id} className={styles.item}>
                <div className={styles.head}>
                  <img src={`/img/ecosystem/${p.id}.svg`} alt="" width={48} height={48} loading="lazy" />
                  <h2 className={styles.name}>{p.name}</h2>
                </div>
                <p className={styles.card}>{w(`eco.p.${p.id}.card`)}</p>
                <p className={styles.where}>{where(p.id, p.url, w)}</p>
                <div className={styles.actions}>
                  <a className="button button--primary" href={p.url} target="_blank" rel={relFor(p.url)}>
                    {w('eco.visit', { name: p.name })}
                  </a>
                  <a className="button button--secondary" href={detailUrl(p.id, locale)} target="_blank" rel={relFor(detailUrl(p.id, locale))}>
                    {w('eco.details')}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  );
}
