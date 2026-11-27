import roster from '../../data/ecosystem.json';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import copy from '../../data/ecosystem-copy.json';

/*
 * The Zaions roster for the docs site (standard aoneahsan-cccs-ecosystem-showcase): the vendored showcase rows (AChat
 * already left out), filtered again here, and the approved English words (OD-31) copied from the app's catalogues.
 */

export interface Product {
  id: string;
  name: string;
  url: string;
}

const CURRENT = 'achat';
const NAME_FIX: Readonly<Record<string, string>> = { rentparty: 'Rent Party' };

export const PRODUCTS: readonly Product[] = roster.products
  .filter((p) => p.id !== CURRENT)
  .map((p) => ({ id: p.id, name: NAME_FIX[p.id] ?? p.name, url: p.liveUrl }));

const words = copy.words as Record<string, Record<string, string>>;

export type Words = (key: string, vars?: Record<string, string | number>) => string;

/**
 * The approved lines in one language, with `{name}`-style slots filled.
 * @param locale the site language (each build renders one)
 */
export function wordsFor(locale: string): Words {
  const table = words[locale] ?? words.en!;
  return (key, vars = {}) => {
    const text = table[key] ?? words.en![key];
    if (text === undefined) throw new Error(`ecosystem copy: missing ${key}`);
    return text.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
  };
}

/** The approved lines in the page's language. */
export function useW(): Words {
  const { i18n } = useDocusaurusContext();
  return wordsFor(i18n.currentLocale);
}

/** The app's page about a product, written from AChat's angle. */
export const APP = 'https://achat.aoneahsan.com';
export const detailUrl = (id: string, locale = 'en') =>
  locale === 'en' ? `${APP}/ecosystem/${id}` : `${APP}/${locale}/ecosystem/${id}`;
