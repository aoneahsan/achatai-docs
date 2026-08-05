---
sidebar_position: 95
title: Changelog
description: Release history for AChat (Anonymous Chat AI) — major milestones from the first transient-chat release through Play Store finalization.
keywords: [AChat changelog, release notes, version history, anonymous chat updates]
last_update:
  date: 2026-08-05
  author: Ahsan Mahmood
---

# Changelog

Release history for AChat (Anonymous Chat AI). The app's in-product changelog at [achat.aoneahsan.com/feed](https://achat.aoneahsan.com/feed) is the live, authoritative source; this page summarizes the major milestones.

:::info
Current version: **0.4.0**. Dates reflect when work shipped to the repository.
:::

## Thread deletion fix (2026-08-05)

- **Delete is now available inside threads.** Delete one reply on its own, or delete the parent to move the parent and every reply to the per-chat Trash together — including replies older than the visible message window.

## 0.4.0 — First Google Play release (2026-07-24)

- **First release on Google Play** — the no-signup anonymous chat from the web, now an Android app. No ads, no in-app purchases.
- **Load-earlier messages:** long chats load the 200 newest messages instantly, with a **Load earlier** button for older ones; search reports how far back it has looked and can load more.
- **Privacy-respecting analytics + error reporting:** product analytics (Firebase Analytics / GA4, Amplitude, Microsoft Clarity) and Sentry error reporting were added — they never receive chat IDs, message contents, passwords, or files, and no advertising ID is collected. See [Data, privacy & deletion](/concepts/data-privacy-and-deletion).
- **Optional email + push:** transactional emails via FilesHub (welcome, account-deletion confirmation, reserved-chat expiry reminder), a contact page, and opt-in push notifications via OneSignal (off by default). See [Notifications & email](/features/notifications-and-email).
- iOS was removed from the project — AChat is Android + web only.

## 0.3.0 — Manage, search, and lock (2026-06)

- **Cross-chat search**, done entirely on your device over a local cache of the chats you have opened. See [Search & message history](/features/search-and-history).
- **Delete, archive & forward:** a per-chat 30-day **Trash** (restore / permanently delete), a login-gated **private archive** that locks a chat to your account, and message forwarding. See [Delete, archive & forward](/features/manage-messages).
- **Add a password to an open chat later** — from then on new messages and files are end-to-end encrypted in the browser; messages already sent while the chat was open are not retroactively encrypted. See [Passwords & encryption](/features/passwords-and-encryption).
- **Built-in administrator role** for safety and moderation, with an immutable audit log; passworded chats stay end-to-end encrypted (metadata only, no key escrow). See [Admin oversight](/concepts/admin-oversight).

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
