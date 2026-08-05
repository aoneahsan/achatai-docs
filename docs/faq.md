---
sidebar_position: 90
title: FAQ
description: Frequently asked questions about AChat (Anonymous Chat AI) — sign-up, encryption, AI, file sharing, deletion, communities, and the embeddable widget.
keywords: [AChat FAQ, anonymous chat questions, is achat private, does achat use ai, ephemeral chat faq]
last_update:
  date: 2026-07-24
  author: Ahsan Mahmood
---

# Frequently asked questions

Direct answers to the most common questions about AChat (Anonymous Chat AI).

## Do I need an account to use AChat?

No. AChat needs no sign-up, email, or phone number. Open the app, pick or generate a chat ID, share the link, and talk. An optional Google sign-in only exists so you can *keep* a chat past the 10-day auto-delete — it is never required to chat.

## Is AChat private?

It can be. A chat with a **password** is end-to-end encrypted in your browser (PBKDF2 + AES-GCM), so message bodies and file metadata are ciphertext on the server. A chat **without** a password is plaintext and readable by anyone who has the chat ID. Privacy comes from the password, not from the link being secret. See [Security & encryption](/concepts/security-and-encryption).

## Does AChat use AI?

No. Despite the brand name "Anonymous Chat AI", AChat has **no AI or LLM chat feature** — conversations are between real people, not a chatbot. The "AI" in the name is historical branding. The accurate description is "anonymous, ephemeral, optionally end-to-end-encrypted chat."

## How long do messages last?

About 10 days. Every message and file is stamped with an `expiresAt` ~10 days in the future, and Firestore TTL deletes expired documents (typically within ~24 hours of expiry). File bytes on FilesHub are cleaned up lazily when a chat is next loaded. To keep a room longer, sign in and [reserve](/features/keep-chats-and-accounts) it.

## Can I share files?

Yes — up to 10 MB per file and 100 MB total per chat, stored on FilesHub, with image previews and a lightbox. Note that **file bytes are not encrypted at rest**; on passworded chats only the file URL/metadata is encrypted. See [File sharing](/features/file-sharing).

## What happens if I lose my chat password?

The chat becomes permanently unreadable. There is no password reset and no backdoor — that is the point of client-side encryption. Share the password over a separate trusted channel and keep it safe.

## Are communities private?

No. Communities are **public** and discoverable, with best-effort, **bypassable** client-side moderation (a profanity filter, soft anonymous-ID bans, and report counters). Treat them as public spaces. Their messages still auto-delete on the 10-day schedule. See [Groups & communities](/features/groups-and-communities).

## Can I embed AChat on my website?

Yes. Embed it as an inline iframe or a floating launcher. The widget is sandboxed, so the host page cannot read the messages inside. See [Embeddable widget](/features/embeddable-widget).

## Is AChat free?

Yes. AChat is free with no paid tier. It runs on free-tier infrastructure (Firestore TTL + FilesHub) with no server-side functions.

## Is it anonymous against everyone, including law enforcement?

No. AChat hides your identity from **other participants** — there is no account requirement and accounts are never linked to message authorship. But standard infrastructure telemetry (IP address, user agent) is processed by Firebase, so AChat is **not** anonymous against legal process.

## How do I delete my account?

If you signed in: **Account → Delete account** in the app (or the public [/delete-account](https://achat.aoneahsan.com/delete-account) page). It releases your reservations, deletes your profile, and removes your Firebase Auth record. After that, reserved chats return to the normal 10-day expiry.

## Can I search my chats?

Yes — you can search across the chats you have opened, and the search runs **entirely on your device**. AChat keeps a small local cache of your recent chats (5 when anonymous, 10 when signed in) in this browser and searches that; your search terms never leave the browser. A passworded chat is searchable only when its password is saved on this device. See [Search & message history](/features/search-and-history).

## Can I delete a message, or keep a chat just for myself?

Yes. Deleting a message sends it to a per-chat **Trash** you can restore from (kept up to 30 days, never past the chat's own expiry). You can delete one thread reply by itself, while deleting its parent moves every reply in that thread to Trash too. If you sign in, you can also **privately archive** a chat so only you — signed in — can read it; a password alone will not unlock an archived chat. You can also forward a message into another chat. See [Delete, archive & forward](/features/manage-messages).

## Who can read my chats — can an admin see them?

A built-in administrator role exists for safety and moderation. It can find and read **open** (unpassworded) chats, which were already readable by anyone with the ID. It **cannot** read passworded chats — those stay end-to-end encrypted and there is no key escrow — and every admin action is logged to an immutable audit trail. See [Admin oversight](/concepts/admin-oversight).

## Does AChat track me with analytics?

AChat uses product analytics (Firebase Analytics / GA4, Amplitude, Microsoft Clarity) and Sentry error reporting to improve the app and fix problems. They **never receive chat IDs, message contents, passwords, or files** — the chat ID is stripped from the URL first — and **no advertising ID is collected**. Clarity records anonymised session replays of interface usage. See [Data, privacy & deletion](/concepts/data-privacy-and-deletion).

## Will AChat email me or send notifications?

Only if you choose. Push notifications (via OneSignal) are **off by default** and opt-in. A few transactional emails (welcome on first sign-in, account-deletion confirmation, a reserved-chat expiry reminder) go out via FilesHub if they apply to you. Anonymous use sends no email. See [Notifications & email](/features/notifications-and-email).

## How do I contact the developer?

Use the [contact page](https://achat.aoneahsan.com/contact), or email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Which platforms does AChat run on?

The web app runs in any modern browser (and installs as a PWA). There is an Android app on [Google Play](https://play.google.com/store/apps/details?id=com.aoneahsan.achat). There is no iOS app — on iPhone and iPad, use the web app and add it to your home screen; it works in mobile Safari.
