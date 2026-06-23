---
sidebar_position: 90
title: FAQ
description: Frequently asked questions about AChat (Anonymous Chat AI) — sign-up, encryption, AI, file sharing, deletion, communities, and the embeddable widget.
keywords: [AChat FAQ, anonymous chat questions, is achat private, does achat use ai, ephemeral chat faq]
last_update:
  date: 2026-06-23
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

## Which platforms does AChat run on?

The web app runs in any modern browser (and installs as a PWA). There is an Android app on [Google Play](https://play.google.com/store/apps/details?id=com.aoneahsan.achatachat). An iOS build exists in the codebase but is not yet published — on iPhone/iPad, use the web app and add it to your home screen.
