# Manual / User-Only Tasks — AChat Docs

> The ONE place for everything only you (the human) can do. Fixed path: `docs/MANUAL-TASKS.md`.
> Global spec: `~/.claude/rules/manual-tasks.md`. Excluded from the published site (see
> `docusaurus.config.ts` → `docs.exclude`) because this repo is public.
> Last updated: 2026-07-25

## ⏳ Pending manual tasks

| # | Task | Why only you | Status |
|---|------|--------------|--------|
| 1 | **Add DNS for the new docs domain.** In Hostinger, add a `CNAME` record `achat-docs` → `aoneahsan.github.io` on `aoneahsan.com`. | Only you control the `aoneahsan.com` DNS zone. | ☐ Not started |
| 2 | **Delete the orphaned old record.** The docs domain was renamed from `achatai-docs.aoneahsan.com` → `achat-docs.aoneahsan.com` (it must derive from the app's deployed subdomain `achat.aoneahsan.com`, not the repo folder name). Remove the stale `achatai-docs` record. | Same DNS zone. | ☐ Not started |
| 3 | **Configure GitHub Pages.** Repo **Settings → Pages**: source = **GitHub Actions**, custom domain = `achat-docs.aoneahsan.com`, then **Enforce HTTPS** once the certificate provisions. | Repo settings are owner-only. | ☐ Not started |

`static/CNAME` already ships the domain inside `build/`, and `.github/workflows/deploy-pages.yml` builds and
publishes on every push to `main` — these three steps are all that remain.

## ✅ Completed manual tasks

| # | Task | Resolution | Date |
|---|------|-----------|------|
| — | — | — | — |
