# Search-console fix log

Newest first. One section per filed SEO/AEO issue: what was wrong, the root fix, the test that guards it, the live
proof, what is still pending and the commands that retest it. This folder is excluded from the published site
(`docusaurus.config.ts`, docs `exclude`). The app keeps its own log in `achat/docs/search-consoles/fix-log.md`.

## achatai-docs#1 — URL-level indexing + AEO fix list · 2026-11-27 · commit 9616c9d (gh-pages 09ce74a)

Status: live-verified, google-pending (boxes 2–5 and the owner decisions); box 1 needs no code change beyond these and waits on Google

| Box | SA | What was wrong (evidence) | Root fix (file:line) | Contract test | Live proof (command → result) |
|---|---|---|---|---|---|
| Owner decision: slash form | SA-P26/P27 | `trailingSlash: false`: every docs URL slashless while GitHub Pages serves `folder/index.html` | `docusaurus.config.ts` `trailingSlash: true`; `static/llms.txt` links slashed | "uses the slashed URL form", "lists only slashed URLs" | `/faq` → 301 `/faq/`; 11 sitemaps × 79 URLs, 0 without slash; canonicals slashed |
| 5 · FAQ without FAQPage JSON-LD | AI-07 | `/faq` (11 locales) showed 18 questions with no FAQPage block | `src/plugins/faq-schema.ts`: postBuild reads each built FAQ page's H2 questions and answers as rendered and writes one FAQPage block into its head | "marks up every FAQ page" | `/faq/`, `/ja/faq/`, `/ar/faq/` carry `"@type":"FAQPage"` in the initial HTML |
| Owner decision: no tag pages | SA-P32 | No docs page uses tags, so no tag page was ever built (nothing to 301) | `docusaurus.config.ts` docs `onInlineTags: 'throw'`: a tag in front matter fails the build | "builds no tag pages" | `curl -sI https://achat-docs.aoneahsan.com/tags/` → 404 |
| 3 · 5 white-label pages | SA-P32 | Pages read as a shared offer | Kept indexable and in the sitemap (owner law, link law). `docs/white-label/index.md` + 10 translations: new section "What the people using your copy get", built from AChat's own features and limits | every white-label URL passes the page contract | `/white-label/` and `/white-label/setup/` → 200, `index, follow`, self-canonical, in sitemap |
| 2 · 29 /compare pages | SA-P32 | Discovered, not crawled | None needed: each page already names the competitor's strength first, lists sourced rows with the competitor's own page linked, prices with source, "Checked 2026-11-22", and steps specific to that move. All 30 now read the same in all 11 languages | page contract on every compare URL | `/compare/signal/`, `/ur/compare/wormhole/` → 200, `index, follow`, self-canonical |
| 1 · home not indexed | — | Crawled, not indexed: a quality and authority call, not a fetch error | Home copy is product-specific already (six AChat features, each with its limit); links in from the app (Get AChat menu, /apps) and every docs page | page contract | `curl -s https://achat-docs.aoneahsan.com/` → 200, self-canonical |
| 4 · 25 other pages | SA-P32 | Discovered/crawled, not indexed | Each is in the sidebar and linked from intro, llms.txt and /sitemap; lastmod comes from git | page contract | sitemap lists each, all 200 |

Overruled by owner law: box 3 asked for `noindex,follow` and dropping the white-label pages from the sitemap. Did instead: kept them indexable and in the sitemap, and added this product's own facts (owner decision 2026-11-27; link law: our public pages are never noindex).

### Pending
| Box | Why not done | Who | Next action |
|---|---|---|---|
| 1, 2, 4 indexing itself | Indexing is Google's call; the pages are fetchable, canonical and unique | Owner (console) | Request indexing / Validate fix in Search Console after the daily audit |

IndexNow: 869 URLs (all 11 locales) submitted 2026-11-27 → 200.

### Retest
```
curl -sI https://achat-docs.aoneahsan.com/faq | grep -i '^location'            # → /faq/
curl -s https://achat-docs.aoneahsan.com/faq/ | grep -c '"@type":"FAQPage"'     # 1
curl -s https://achat-docs.aoneahsan.com/ja/faq/ | grep -c '"@type":"FAQPage"'  # 1
curl -s https://achat-docs.aoneahsan.com/white-label/ | grep -o 'rel="canonical" href="[^"]*"'
curl -s https://achat-docs.aoneahsan.com/sitemap.xml | grep -o '<loc>[^<]*</loc>' | grep -vc '/</loc>'   # 0
yarn build && yarn test                                                          # contract over build/
```
