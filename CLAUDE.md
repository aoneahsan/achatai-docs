# AChat documentation

**Last Updated:** 2026-10-31

| Context | Value |
|---|---|
| Repository | Public `aoneahsan/achatai-docs` · `main` (live rebuild docs) · `rebuild-release` (retained branch at the same commit) · remote `origin` |
| Product source | The app at `../achat` (the rebuild, live since the W9 cutover) |
| Stack | Docusaurus 3.10.2 · TypeScript 6 · Node 20+ · Yarn 4.18.1 (`yarn.lock`) |
| Last optimized | 2026-10-31 |
| Next routine optimization eligible | 2026-11-30 |
| Guide bytes | 4,929 B |
| Context design | Compact root; page evidence loads on demand. |
| Mirror | `CLAUDE.md` and `AGENTS.md` are byte-identical. |
| Fleet record | [workspace context tracker](../../../docs/tracking/project-context-budget-tracker.json) |

## Purpose and hard boundaries

This is the public product documentation for **AChat** (full name `AChat: Anonymous Chat`): a messaging app for
personal chats, groups, communities, status and anonymous rooms, on the web and Android.

- Every product claim must trace to `../achat` evidence: its approved `src/locales/en/*.json` wording,
  `docs/PROJECT-CONTEXT.md`, or the root kit's schema/security contracts. Admin-set values (prices, allowances,
  retention days) appear only as defaults or "a set number", never as fixed literals.
- State the limits with the features: personal chats, private groups and passworded rooms are end-to-end
  encrypted; communities, open rooms and status are not; anonymous is not untraceable; no calls.
- Voice: "the AChat team", never one person. Plans exist (Free, Pro, Team / Family); never imply free-only.
  Never name AI, internal tooling, FilesHub or private identifiers — except the product's own AI features (Speak,
  Draft help, Catch me up), which `docs/features/ai-help.md` names (owner, 2026-10-25: "Allow for AI features").
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
| `blog/` | Posts by the AChat team, one `.md` each (front matter: `slug`, `title`, `description`, `authors: [team]`, `image`, `date`; `{/* truncate */}` after the opening line), each image in `static/img/social/`. Empty, the blog stays off; the first post turns on the blog, its RSS/Atom feeds, its sitemap entries, its place in `/feed`, `/feed.xml` and `/sitemap`, and the Blog links (`src/data/blog.ts`) |
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

Do not run `yarn start` or another dev server. The W9 web cutover is complete, and `main` describes the rebuild.
There is no GitHub Actions workflow (owner rule): build locally with `yarn build`, then publish `build/` to the
`gh-pages` branch by hand; the custom host is pinned by `static/CNAME`. There is no tracked Firebase deployment configuration in this repository.

## Links

- Docs: https://achat-docs.aoneahsan.com
- App: https://achat.aoneahsan.com
- Play Store: https://play.google.com/store/apps/details?id=com.aoneahsan.achat

## Stop-work Git gate

<!-- RULE:stop-work-git-gate v2026-10-20 -->

Before stopping, commit every legitimate change and work-progress checkpoint in this repository and each independent nested repository, fetch and merge the designated upstream, push the documented working branch, then verify an empty worktree and `0 0` ahead/behind. Never stash, discard, reset, rebase, or force-push. If synchronization is blocked, report the exact repository, branch, blocker, and next action instead of calling the work complete. The full workflow remains authoritative in `~/.claude/rules/git-workflow.md`.

## 🔴 Main context only: no sub-agents without the owner's approval (owner, 2026-11-26)

Claude Code and Codex alike: never start a custom `aoneahsan-ccca-*` sub-agent unless the owner approved it in THIS
session, in his own typed words. One approval covers that session only, and every new session needs a new one. Without
it, every step runs in the main context window, including the lanes a command or skill names. Never run a default
sub-agent (Explore, Plan, general-purpose and the like), approved or not, because they cannot reach the custom skills.
Global law: `~/.claude/rules/subagent-orchestration.md`.
