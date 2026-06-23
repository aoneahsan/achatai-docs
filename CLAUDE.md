# CLAUDE.md — achatai-docs

Public Docusaurus documentation site for **AChat (Anonymous Chat AI)** — the no-signup, transient, optionally end-to-end-encrypted, 10-day auto-deleting chat at [achat.aoneahsan.com](https://achat.aoneahsan.com).

> Mirror of `AGENTS.md`. Per the global sync rule, every important rule lives in BOTH files — update one → update both.

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort) — never let recording outpace the fix. HARD STOP when doc work outpaces the change → ship, then ONE line if anything. No new summary/status/completion files unless asked; edit/delete over add; delete stale docs. Full rule: `~/.claude/CLAUDE.md`. (Est. 2026-06-19)

## Identity

| Key | Value |
|---|---|
| Repo | `achatai-docs` — **PUBLIC** (free GitHub Pages; docs-repo exception to always-private) |
| App repo | `anonymous-chat-ai-achatai` — **PRIVATE** (sibling, the app itself) |
| Type | Docusaurus 3 documentation site (classic preset + Mermaid) |
| Package manager | yarn only (NEVER npm/pnpm) |
| Node | >=18 |
| Author | Ahsan Mahmood ([aoneahsan@gmail.com](mailto:aoneahsan@gmail.com)) |
| Docs URL | https://achatai-docs.aoneahsan.com (Firebase Hosting target `achatai-docs` + GitHub Pages) |
| App URL | https://achat.aoneahsan.com |
| Play Store | https://play.google.com/store/apps/details?id=com.aoneahsan.achatachat |
| Sibling app | `/home/ahsan/Documents/01-code/projects/achatai/` |
| Content tracker | `docs/tracking/achatai-docs-content-tracker.json` |
| Build gates (2026-06-23) | `yarn build` exit 0 (docusaurus → `./build`); `yarn typecheck` exit 0 |

## Critical rules

| Rule | Detail |
|---|---|
| Yarn only | Never `npm install` / `pnpm add`. Only `yarn.lock`. |
| No dev server in agent runs | Per global rule, the agent does NOT run `yarn start`. Verify with `yarn build` + `yarn typecheck` only. |
| Single source of truth | Every documented fact MUST come from the sibling AChat app (`../achatai` source + README + CLAUDE.md). No invented features, no hallucinated limits. |
| Honest framing | AChat has **NO AI/LLM chatbot** despite its brand name; open chats are not private; file bytes are not encrypted at rest; deletion is "~10 days" not instant. State limits as clearly as features. No fabricated stats. |
| No secrets | This repo is PUBLIC — never commit any `.env`, key, or Firebase secret. App secrets live in the private app repo. |
| One commit per task | ONE descriptive commit per session; push to the `o` remote (PUBLIC repo). |

## Deploy (dual hosting)

```bash
# Firebase Hosting (primary)
yarn build
npx -y firebase-tools@latest deploy --only hosting --project achatai-docs

# GitHub Pages (free fallback) — auto on push to main via .github/workflows/deploy-pages.yml
# Custom domain in static/CNAME. Point DNS at ONE host at a time.
```

## SEO + AEO

robots.txt allowlists every major search + AI bot; `static/llms.txt` indexes the site; Docusaurus emits `sitemap.xml`; `docusaurus.config.ts` injects WebSite + Organization + SoftwareApplication JSON-LD; `static/img/social-card.svg` is the 1200×630 OG card. Keep all of these in sync on content changes.

## Package Manager Hierarchy: nvm → npm (global) → yarn (local) (IRON-SOLID)

- **`nvm`** → install/update Node + npm (`nvm install --lts`).
- **`npm`** → ALL global installs (incl. yarn itself).
- **`yarn`** → ALL local project work.
❌ Never `npm`/`pnpm` for local installs. ✅ Only `yarn.lock`.

## Package Upgrades: Use `npm-check-updates`

`npx -y npm-check-updates -u && yarn install` (latest STABLE only), then `yarn build`. Not `yarn upgrade --latest`.

## Last Updated

2026-06-23
