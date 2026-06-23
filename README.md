# achatai-docs

Public documentation site for **AChat (Anonymous Chat AI)** — the no-signup, transient, optionally end-to-end-encrypted, 10-day auto-deleting chat app at [achat.aoneahsan.com](https://achat.aoneahsan.com).

Built with [Docusaurus 3](https://docusaurus.io). Deployed to **Firebase Hosting** (primary) and **GitHub Pages** (free fallback) — see "Deploy".

## Links

- **App:** https://achat.aoneahsan.com
- **Docs (this site):** https://achatai-docs.aoneahsan.com
- **Google Play:** https://play.google.com/store/apps/details?id=com.aoneahsan.achatachat
- **App source (private):** https://github.com/aoneahsan/anonymous-chat-ai-achatai
- **Author:** [Ahsan Mahmood](https://aoneahsan.com)

## Local development

This repo is **yarn-only** (never `npm`/`pnpm`).

```bash
yarn install
yarn start      # dev server on http://localhost:5971
```

## Build & verify

```bash
yarn typecheck  # tsc --noEmit (must exit 0)
yarn build      # docusaurus build -> ./build (must exit 0)
yarn serve      # preview the built site on :5972
```

## Deploy

The site is dual-hosted. Point the custom domain's DNS at whichever host you activate — never both at once for the same domain.

**Firebase Hosting (primary):**

```bash
yarn build
npx -y firebase-tools@latest deploy --only hosting --project achatai-docs
```

**GitHub Pages (free fallback):** the `.github/workflows/deploy-pages.yml` workflow builds and publishes on every push to `main`. The custom domain comes from `static/CNAME`. To use the default `*.github.io` URL instead, delete `static/CNAME` and set `baseUrl: '/achatai-docs/'` in `docusaurus.config.ts`.

## Structure

```
docs/                     ← all documentation pages (intro, getting-started, features, concepts, faq, changelog, about)
docs/tracking/            ← content/build tracker JSON
src/css/custom.css        ← AChat violet brand palette
src/pages/index.tsx       ← homepage
static/                   ← robots.txt, llms.txt, humans.txt, CNAME, .well-known, img/ (favicon, logo, social-card)
docusaurus.config.ts      ← site config, JSON-LD, navbar/footer cross-links to the app + Play Store
sidebars.ts               ← sidebar layout
firebase.json / .firebaserc ← Firebase Hosting config (target achatai-docs)
```

## Honest framing

The docs deliberately state what AChat does **not** do: it has no AI/LLM chatbot (despite the brand name), open chats are not private, file bytes are not encrypted at rest, and deletion is "about 10 days" rather than instant. Keep that honesty on every edit.

---

Built and maintained by [Ahsan Mahmood](https://aoneahsan.com) · MIT-licensed docs.
