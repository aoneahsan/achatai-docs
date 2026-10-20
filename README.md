# AChat documentation

Public documentation for [AChat](https://achat.aoneahsan.com), a messaging app for personal chats, groups,
communities, status updates, and anonymous rooms on the web and Android.

The site uses Docusaurus 3 and deploys to GitHub Pages.

## Links

- **App:** <https://achat.aoneahsan.com>
- **Documentation:** <https://achat-docs.aoneahsan.com>
- **Google Play:** <https://play.google.com/store/apps/details?id=com.aoneahsan.achat>
- **App source (private):** <https://github.com/aoneahsan/anonymous-chat-ai-achatai>
- **Author:** [Ahsan Mahmood](https://aoneahsan.com)

## Local development

This repository uses Yarn.

```bash
yarn install --immutable
yarn start
```

The development server uses <http://localhost:5971>.

## Build and verify

```bash
yarn typecheck
yarn build
yarn serve
```

`yarn serve` previews the built site on <http://localhost:5972>.

## Deploy

Pushing `main` runs [the GitHub Pages workflow](.github/workflows/deploy-pages.yml). The workflow builds the
site and publishes its `build/` output. `static/CNAME` assigns the custom documentation domain.

## Structure

```text
.github/workflows/deploy-pages.yml  GitHub Pages build and deployment
docs/                               Documentation pages and tracking records
src/css/custom.css                  AChat theme styles
src/pages/index.tsx                 Documentation homepage
static/                             CNAME, metadata, and image assets
docusaurus.config.ts                Site configuration and navigation
sidebars.ts                         Documentation sidebar
```

## Content accuracy

Keep product, privacy, security, retention, and availability claims aligned with the current application.
Record uncertain claims for review instead of publishing assumptions.

---

Built and maintained by [Ahsan Mahmood](https://aoneahsan.com). Documentation source is MIT licensed.
