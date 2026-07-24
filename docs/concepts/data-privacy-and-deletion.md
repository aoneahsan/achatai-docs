---
sidebar_position: 3
title: Data, privacy & deletion
description: What AChat stores, which third-party processors are involved, and how the 10-day auto-delete and account deletion actually work — with honest framing throughout.
keywords: [chat data retention, message deletion, privacy policy, third-party processors, account deletion, ephemeral data]
last_update:
  date: 2026-07-24
  author: Ahsan Mahmood
---

# Data, privacy & deletion

**AChat stores the minimum needed to run an ephemeral chat, deletes message data automatically after about 10 days, and gives signed-in users a one-click account deletion.** This page summarizes the data flows; the authoritative legal documents are the app's [Privacy Policy](https://achat.aoneahsan.com/privacy) and [Terms](https://achat.aoneahsan.com/terms).

## What AChat stores

| Data | Where | Lifetime |
|---|---|---|
| Messages (plaintext or ciphertext) | Firestore | ~10 days (TTL) |
| File metadata + file bytes | Firestore + FilesHub | ~10 days (TTL + lazy cleanup) |
| Reactions, presence, pins, polls | Firestore | ~10 days (TTL) |
| Chat metadata (id, salt, verifier, title/topic) | Firestore | with the chat (~10 days, or longer if reserved) |
| Account (uid, email, name, photo) — **optional** | Firestore + Firebase Auth | until you delete it |
| Community discovery records | Firestore | persistent (messages inside still TTL) |
| Theme/recents preferences | On your device (Capacitor Preferences) | until you clear them |
| Search cache (recent chats you opened) | On your device (IndexedDB) | until sign-out / a wipe / you clear it |

## Third-party processors

AChat uses a small set of processors to function:

- **Firebase (Google)** — Firestore database, Hosting, optional Auth and App Check. Processes standard telemetry (IP, user agent).
- **FilesHub** — stores uploaded file bytes (public visibility so previews load) and sends AChat's transactional emails (welcome, account-deletion confirmation, reserved-chat reminder, contact form).
- **Google Sign-In** — only if you *optionally* sign in; provides your uid/email/name/photo.
- **Firebase Analytics (GA4) & Amplitude** — product analytics: page views (route pattern only, e.g. `/c/:chatId`) and feature actions, plus standard web telemetry.
- **Microsoft Clarity** — anonymised session replays and heatmaps of interface usage. Clarity is an independent controller, so this data counts as **shared**.
- **Sentry** — crash and error reports (stack traces, browser), with no session replay.
- **OneSignal** — only if you opt in to push; receives a push token and delivery metadata to route notifications.

**None of the analytics, error, or push services ever receive chat IDs, message contents, passwords, or file contents** — the chat ID is stripped from the URL to its route pattern before anything is sent, and no message text is transmitted. **No advertising ID is collected** and none of this is used for ad targeting. These are documented in the app's privacy policy, which is kept consistent with the Google Play Data Safety declaration.

## Admin oversight

A built-in administrator role can enumerate all chats and accounts and read **open** chats for safety and moderation; **passworded chats stay end-to-end encrypted with no key escrow**, and every admin action is logged to an immutable audit trail. Full boundary: [Admin oversight](/concepts/admin-oversight).

## How deletion works

- **Automatic:** every message/file/reaction/presence/poll document carries `expiresAt = created + ~10 days`. Firestore **TTL policies** delete expired documents, typically within ~24 hours of expiry. File bytes on FilesHub are cleaned up **lazily** when the chat is next loaded.
- **Reserved chats:** if a signed-in user reserves a chat, its `expiresAt` is extended (about 3 months base, up to ~1 year via achievements), so it lives longer — then expires normally.
- **Account deletion:** **Account → Delete account** (or the public [/delete-account](https://achat.aoneahsan.com/delete-account) page) releases your reservations, deletes your profile, and removes your Firebase Auth record.

## Honest framing

- **"~10 days," not to-the-second.** TTL is asynchronous; expired data can linger briefly past the window, and an un-revisited chat's files may persist until someone loads the chat.
- **Open chats and communities are public.** Anyone with the ID (open chats) or anyone at all (communities) can read them before they expire.
- **Analytics are on, but scoped.** Product analytics run by default so the app can be improved, and Clarity records anonymised session replays of interface usage — but the chat ID is stripped before anything is sent, and no message content ever is. Nothing here identifies you or reads your conversations.
- **Not anonymous against legal process.** Infrastructure telemetry exists; AChat protects you from other participants, not from lawful demands to the providers.

## Related

- [How AChat works](/concepts/how-it-works)
- [Security & encryption model](/concepts/security-and-encryption)
- App [Privacy Policy](https://achat.aoneahsan.com/privacy) · [Terms](https://achat.aoneahsan.com/terms)
