import roster from '../../data/ecosystem.json';
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

const words = copy.words as Record<string, string>;

/**
 * An approved English line, with `{name}`-style slots filled.
 * @param key the catalogue key
 * @param vars values for its slots
 */
export function w(key: string, vars: Record<string, string | number> = {}): string {
  const text = words[key];
  if (text === undefined) throw new Error(`ecosystem copy: missing ${key}`);
  return text.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
}

/** The app's page about a product, written from AChat's angle. */
export const APP = 'https://achat.aoneahsan.com';
export const detailUrl = (id: string) => `${APP}/ecosystem/${id}`;
