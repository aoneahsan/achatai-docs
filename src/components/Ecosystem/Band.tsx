import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { relFor } from '../../data/link-policy';
import { PRODUCTS, detailUrl, w } from './data';
import styles from './styles.module.css';

/*
 * "More from Zaions" on every docs page (above the footer): every other Zaions product with AChat's line about it,
 * Visit {Product} and Details. 10 s a card; hover, focus inside and the pause button stop it; still under reduced
 * motion and in a hidden tab. The same band as the app (approved dummy round 2026-11-26, OD-31), in these docs' colours.
 */

const SLIDE_MS = 10_000;
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function EcosystemBand(): React.ReactElement {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = PRODUCTS.length;

  const go = (next: number) => {
    const el = track.current;
    const target = (next + total) % total;
    const slide = el?.children[target] as HTMLElement | undefined;
    if (el && slide) {
      const rtl = getComputedStyle(el).direction === 'rtl';
      el.scrollTo({
        left: rtl ? slide.offsetLeft + slide.offsetWidth - el.clientWidth : slide.offsetLeft,
        behavior: reduced() ? 'auto' : 'smooth',
      });
    }
    setIndex(target);
  };

  useEffect(() => {
    if (held || paused || reduced()) return undefined;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') go(index + 1);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  });

  return (
    <section
      className={styles.band}
      aria-roledescription="carousel"
      aria-labelledby="zx-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <h2 id="zx-title" className={styles.title}>
              {w('eco.band.title')}
            </h2>
            <p className={styles.line}>{w('eco.band.line')}</p>
          </div>
          <div className={styles.controls}>
            <button type="button" className={styles.ctrl} aria-label={w('eco.band.prev')} onClick={() => go(index - 1)}>
              ←
            </button>
            <button
              type="button"
              className={styles.ctrl}
              aria-pressed={held}
              aria-label={w(held ? 'eco.band.play' : 'eco.band.pause')}
              onClick={() => setHeld((v) => !v)}
            >
              {held ? '▶' : '❚❚'}
            </button>
            <button type="button" className={styles.ctrl} aria-label={w('eco.band.next')} onClick={() => go(index + 1)}>
              →
            </button>
          </div>
        </div>
        <div className={styles.track} ref={track}>
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={w('eco.band.pos', { n: i + 1, total })}
            >
              <div className={styles.head}>
                <img className={styles.logo} src={`/img/ecosystem/${p.id}.svg`} alt="" width={48} height={48} loading={i === 0 ? 'eager' : 'lazy'} />
                <p className={styles.name}>{p.name}</p>
              </div>
              <p className={styles.card}>{w(`eco.p.${p.id}.card`)}</p>
              <div className={styles.actions}>
                <a className="button button--primary" href={p.url} target="_blank" rel={relFor(p.url)}>
                  {w('eco.visit', { name: p.name })}
                </a>
                <a className="button button--secondary" href={detailUrl(p.id)} target="_blank" rel={relFor(detailUrl(p.id))}>
                  {w('eco.details')}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.foot}>
          <p className={styles.pos} aria-live={held || paused ? 'polite' : 'off'}>
            {w('eco.band.pos', { n: index + 1, total })}
          </p>
          <Link className={`button button--outline ${styles.all}`} to="/ecosystem">
            {w('eco.band.all')}
          </Link>
        </div>
      </div>
    </section>
  );
}
