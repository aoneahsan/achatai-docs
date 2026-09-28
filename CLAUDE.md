# AChat documentation

**Last Updated:** 2026-09-28

| Context | Value |
|---|---|
| Repository | Public `aoneahsan/achatai-docs` · `main` (live legacy app) · `rebuild-release` (the rebuild; merges to `main` at the W9 cutover) · remote `origin` |
| Product source | Private rebuild at `../achat-next` (`../achat` is read-only legacy) |
| Stack | Docusaurus 3 · TypeScript · Node 18+ · yarn only (`yarn.lock`) |
| Last optimized | 2026-09-22 |
| Next routine optimization eligible | 2026-10-22 |
| Guide bytes | 4,217 B |
| Context design | Compact root; page evidence loads on demand. |
| Mirror | `CLAUDE.md` and `AGENTS.md` are byte-identical. |
| Fleet record | [workspace context tracker](../../../docs/tracking/project-context-budget-tracker.json) |

## Purpose and hard boundaries

This is the public product documentation for **AChat** (full name `AChat: Anonymous Chat`): a messaging app for
personal chats, groups, communities, status and anonymous rooms, on the web and Android.

- Every product claim must trace to `../achat-next` evidence: its approved `src/locales/en/*.json` wording,
  `docs/PROJECT-CONTEXT.md`, or the root kit's schema/security contracts. Admin-set values (prices, allowances,
  retention days) appear only as defaults or "a set number", never as fixed literals.
- State the limits with the features: personal chats, private groups and passworded rooms are end-to-end
  encrypted; communities, open rooms and status are not; anonymous is not untraceable; no calls.
- Voice: "the AChat team", never one person. Plans exist (Free, Pro, Team / Family); never imply free-only.
  Never name AI, internal tooling, FilesHub or private identifiers.
- This repository is public. Never add an environment file, credential, private identifier, app secret,
  keystore, internal audit record, or unpublished private-app material.
- App behavior changes belong in `../achat-next`; current global workflow rules auto-load and are never copied here.

## Project map

| Path | Role |
|---|---|
| `docs/` | Published Markdown content; read or edit only the requested page and direct links |
| `sidebars.ts` | Navigation |
| `docusaurus.config.ts` | URL, metadata, structured data, theme, and plugins |
| `src/` | Documentation-site React/CSS customization |
| `static/` | `CNAME`, `static/llms.txt`, `static/img/social-card.svg`, robots, and other published files |
| `.github/workflows/deploy-pages.yml` | GitHub Pages build and deployment |
| `docs/tracking/achatai-docs-content-tracker.json` | Content state; read only the relevant entry |
| `docs/MANUAL-TASKS.md` | Owner-only setup |

The canonical host is defined by `static/CNAME` and `docusaurus.config.ts`; Docusaurus emits `sitemap.xml`.
The sibling app proves the Android/Play identifier is `com.aoneahsan.achat`.

## Read and edit efficiently

1. Read this guide, the requested page, its sidebar entry, and only directly linked source evidence.
2. Do not load all docs, the full sibling app, generated `build/`, `.docusaurus/`, `node_modules/`, assets, or
   the whole content tracker for orientation.
3. Preserve established front matter. Never fabricate features, statistics, testimonials, security
   guarantees, legal compliance, or deletion precision.
4. Update `CLAUDE.md` and `AGENTS.md` together. Move future operational depth to an on-demand document and
   leave a pointer.
5. `.claude/settings.json` keeps app/backend/mobile skills name-only; the skills remain manually callable.
6. Context optimization is ineligible before 2026-10-22 unless the owner requests it, topology changes, a hard
   cap is breached, or a proven stale instruction risks incorrect work.

## Commands and release

```bash
yarn typecheck
yarn build
```

Do not run `yarn start` or another dev server. Until the W9 cutover, `main` keeps describing the live legacy app and `rebuild-release` is never merged early. A push to `main` drives the GitHub Pages workflow; the custom
host is pinned by `static/CNAME`. There is no tracked Firebase deployment configuration in this repository.

## Links

- Docs: https://achat-docs.aoneahsan.com
- App: https://achat.aoneahsan.com
- Play Store: https://play.google.com/store/apps/details?id=com.aoneahsan.achat
