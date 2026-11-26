import ecosystem from './ecosystem.json';

/**
 * The link law (aoneahsan-cccs-seo-aeo-standard): a link to one of our own hosts is followed (`noopener` only), every
 * other absolute link is `nofollow noopener noreferrer`. This module is the only place that decides it; the rehype
 * plugin (src/plugins/rehype-link-law.ts) applies it to every Markdown and MDX link, and the build gate re-checks the
 * written HTML.
 */

/** Hosts we own outright, with every subdomain (projects-finalization-record/ecosystem/owner-profile.json). */
const OWNED_DOMAINS = ['aoneahsan.com', 'zaions.com', 'trizlink.com'] as const;

/** Shared hosts where only our own paths are ours: our profiles, store listings and packages. */
const OWNED_PATHS: readonly { host: string; prefix: string }[] = [
  { host: 'github.com', prefix: '/aoneahsan' },
  { host: 'www.linkedin.com', prefix: '/in/aoneahsan' },
  { host: 'linkedin.com', prefix: '/in/aoneahsan' },
  { host: 'play.google.com', prefix: '/store/apps/details?id=com.aoneahsan.' },
];

/** AChat's own API host: the OpenAPI document the developer pages link to is ours. */
const OWNED_HOSTS = new Set<string>(['vhkerwyxmhaxfyjbvsha.supabase.co']);

/** Every URL the roster lists for a product (live site, docs, store listing, npm page) is ours as well. */
const ROSTER_URLS: readonly URL[] = ecosystem.products.flatMap((product) =>
  [product.liveUrl, product.docsUrl, ...Object.values(product.platforms ?? {})]
    .filter((value): value is string => typeof value === 'string' && /^https?:\/\//.test(value))
    .map((value) => new URL(value)),
);

/**
 * Whether an absolute URL points at something we own.
 * @param href An absolute http(s) URL.
 */
export function isOwnedUrl(href: string): boolean {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return false;
  }
  const host = url.hostname.toLowerCase();
  if (OWNED_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`))) return true;
  if (OWNED_HOSTS.has(host)) return true;
  const pathAndQuery = `${url.pathname}${url.search}`;
  if (OWNED_PATHS.some((owned) => owned.host === host && pathAndQuery.startsWith(owned.prefix))) return true;
  return ROSTER_URLS.some(
    (owned) => owned.hostname === host && (owned.pathname === '/' || url.pathname.startsWith(owned.pathname)),
  );
}

/**
 * The `rel` an absolute link must carry under the link law.
 * @param href An absolute http(s) URL.
 */
export function relFor(href: string): string {
  return isOwnedUrl(href) ? 'noopener' : 'nofollow noopener noreferrer';
}
