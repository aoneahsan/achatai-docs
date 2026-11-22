/**
 * The blog's own words, in one place: the blog plugin's title and description (docusaurus.config.ts) and the Blog card
 * on /sitemap (src/pages/sitemap.tsx) read them from here. Posts live in blog/; until the first one is published the
 * blog has no pages and the navbar and footer show no Blog link.
 */

/** The blog's route, with its leading slash: the blog plugin's `routeBasePath`. */
export const BLOG_PATH = '/blog';

export const BLOG_TITLE = 'AChat posts';

export const BLOG_DESCRIPTION = 'One part of AChat per post, with its limit beside it.';
