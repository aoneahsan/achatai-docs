# AGENTS.md — achatai-docs

Mirror of `CLAUDE.md` for non-Claude AI agents. See `CLAUDE.md` for the canonical version. Both files MUST be kept in sync.

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort) — never let recording outpace the fix. HARD STOP when doc work outpaces the change → ship, then ONE line if anything. No new summary/status/completion files unless asked; edit/delete over add; delete stale docs. Full rule: `~/.claude/CLAUDE.md`. (Est. 2026-06-19)

## TL;DR

- Docusaurus 3 docs site for **AChat (Anonymous Chat AI)** — https://achat.aoneahsan.com.
- This docs repo `achatai-docs` is **PUBLIC** (free GitHub Pages); the sibling app repo `anonymous-chat-ai-achatai` is **PRIVATE**.
- yarn only. Node >=18.
- Docs URL: https://achatai-docs.aoneahsan.com (Firebase Hosting target `achatai-docs` + GitHub Pages fallback via `.github/workflows/deploy-pages.yml`, custom domain `static/CNAME`).
- Content tracker: `docs/tracking/achatai-docs-content-tracker.json`.
- Honest framing: AChat has NO AI/LLM chatbot despite its name; open chats are not private; file bytes are not encrypted at rest; deletion is ~10 days. No fabricated stats.
- Every documented fact comes from the sibling app `../achatai` (source + README + CLAUDE.md). No invented features.
- No secrets in this PUBLIC repo. ONE commit per task; push to the `o` remote.
- Build gates (2026-06-23): `yarn build` exit 0 · `yarn typecheck` exit 0.

## Hard checks before editing

1. Is the claim you are about to document actually true of the real AChat app? Read `../achatai` (README / CLAUDE.md / src) first.
2. Did you keep the honest limits visible (no AI, open chats public, files not encrypted at rest, ~10-day deletion)?
3. Are you about to commit a secret to this PUBLIC repo? Do not. App secrets live in the private app repo only.
4. Did you run `yarn build` (never `yarn start`) to verify?

## Package Manager Hierarchy: nvm → npm (global) → yarn (local) (IRON-SOLID)

- **`nvm`** → install/update Node + npm. **`npm`** → ALL global installs (incl. yarn). **`yarn`** → ALL local work.
- ❌ Never `npm`/`pnpm` for local installs. ✅ Only `yarn.lock`.

## Package Upgrades

`npx -y npm-check-updates -u && yarn install` (latest STABLE), then `yarn build`. Not `yarn upgrade --latest`.

## Gitignore Hygiene (IRON-SOLID)
`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build/`dist`/`www`/`node_modules`/logs/caches/IDE), never lose source. Custom rules always present: `*.ignore.*`, `project-record-ignore/`. This is a **PUBLIC** repo -> secrets/`.env`/keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
Gitignore Last Verified: 2026-06-24

## Last Updated

2026-06-23


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) for ANY work in
   this project — they cannot invoke /skills, which RULE #0 makes mandatory. Do ALL work (planning, implementation,
   review, exploration) in the MAIN context. A sub-agent is allowed ONLY when a CUSTOM agent exists in
   `.claude/agents/` for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a needed
   skill is missing, download/enable/install it (or use the nearest installed equivalent and say so) — never
   proceed skill-less.
3. **Model workflow:** PLAN and REVIEW on **Fable 5**; EXECUTE the approved plan on **Opus 4.8**. Plans in
   `~/.claude/plans/`; multi-phase features keep a resumable tracker (`docs/features/<slug>/00-tracker.json`),
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
