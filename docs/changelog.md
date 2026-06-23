---
sidebar_position: 95
title: Changelog
description: Release history for AChat (Anonymous Chat AI) — major milestones from the first transient-chat release through Play Store finalization.
keywords: [AChat changelog, release notes, version history, anonymous chat updates]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Changelog

Release history for AChat (Anonymous Chat AI). The app's in-product changelog at [achat.aoneahsan.com/feed](https://achat.aoneahsan.com/feed) is the live, authoritative source; this page summarizes the major milestones.

:::info
Current version: **0.2.0**. Dates reflect when work shipped to the repository.
:::

## 0.2.0 — Play-Store-ready release (2026-06)

- Finalized the Android Play Store submission: account deletion shipped end-to-end (with the owner-delete security rule), accurate privacy/terms/data-safety, and all App-content declarations.
- **Zero sensitive permissions** — the Android app ships with only `INTERNET` + `VIBRATE`. Voice memos were deferred to a future release to keep the permission surface minimal (no microphone permission).
- Visual elevation of the chat surface: a unified panel/modal system, rebuilt threads with file uploads inside replies, and discrete snap widths for the thread rail.
- Mobile responsiveness pass (44 px tap targets, viewport-safe dialogs, 320 px-safe header/footer).

## v4 — Spaces (2026-05)

- **Message threads**, named private **group chats**, public discoverable **communities** with client-side moderation, and an **embeddable widget** (inline iframe + floating launcher).

## v3 — Free-tier feature expansion (2026-05)

- A large batch of free-tier features: reactions, presence, pins, polls, command palette, link previews, and more.
- Optional Google sign-in with **keep-chat reservations** (reserve up to 100 chats, extendable retention) — anonymous use unchanged.

## v2 — Power & polish (2026-05)

- Onboarding and chat-ID hygiene, lock-chat and fullscreen composer, share + embed flows, accessibility (dyslexia and colorblind options), per-chat theme overrides with presets and import/export, and a PWA service worker.

## v1.5 — Composer power (2026-05)

- Emoji, slash commands, message editing, mentions, export, code blocks, and search; reactions and quote-reply; multi-file upload queue, lightbox, sharing, presence, notifications, and haptics; the full theme customizer.

## v1 — First release (2026-05)

- Core anonymous transient chat: chat IDs, optional password with client-side end-to-end encryption (PBKDF2 + AES-GCM), file uploads via FilesHub, 10-day auto-delete, and Capacitor native builds.

---

For the per-version "What's New" used on the Play Store, see the app repository's `docs/play-store/RELEASE-NOTES.md`. For the live in-app feed, visit [achat.aoneahsan.com/feed](https://achat.aoneahsan.com/feed).
