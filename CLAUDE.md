# AChat documentation

**Last Updated:** 2026-09-15

| Context | Value |
|---|---|
| Repository | Public `aoneahsan/achatai-docs` · branch `main` · remote `origin` |
| Product source | Private sibling app at `../achat` |
| Stack | Docusaurus 3 · TypeScript · Node 18+ · yarn only (`yarn.lock`) |
| Context Budget Last Verified | 2026-09-15 — CLAUDE.md 3,471 B / no PENDING-TASKS.md; re-check due 2026-10-15 |
| Context design | Compact root; page evidence loads on demand. |
| Mirror | `AGENTS.md` differs only in its H1 and mirror label. |
| Fleet record | [workspace context tracker](../../../docs/tracking/project-context-budget-tracker.json) |

## Purpose and hard boundaries

This is the public product documentation for **AChat: Anonymous Chat**. AChat is a no-signup, transient chat
application; it is not an AI or LLM chatbot.

- Every product claim must be verified against `../achat` source, its project context, or deployed behavior.
- State the limits with the features: open chats are public, passworded message bodies and file metadata are
  client-encrypted, file bytes are not encrypted at rest, and normal deletion is about 10 days.
- This repository is public. Never add an environment file, credential, private identifier, app secret,
  keystore, internal audit record, or unpublished private-app material.
- App behavior changes belong in `../achat`; current global workflow rules auto-load and are never copied here.

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
5. Context optimization is ineligible before 2026-10-15 unless the owner requests it, topology changes, a hard
   cap is breached, or a proven stale instruction risks incorrect work.

## Commands and release

```bash
yarn typecheck
yarn build
```

Do not run `yarn start` or another dev server. A push to `main` drives the GitHub Pages workflow; the custom
host is pinned by `static/CNAME`. There is no tracked Firebase deployment configuration in this repository.

## Links

- Docs: https://achat-docs.aoneahsan.com
- App: https://achat.aoneahsan.com
- Play Store: https://play.google.com/store/apps/details?id=com.aoneahsan.achat
