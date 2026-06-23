---
sidebar_position: 2
title: Security & encryption model
description: AChat's honest threat model — what client-side PBKDF2 + AES-GCM encryption protects, what it does not, and what to assume about open chats, files, and infrastructure telemetry.
keywords: [chat threat model, end-to-end encryption limits, AES-GCM, PBKDF2, secure chat, encryption honest framing]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Security & encryption model

**AChat's security comes from optional, client-side end-to-end encryption: a password derives an AES-GCM key in your browser (via PBKDF2) that the server never sees. This page is the honest threat model — what is protected, and just as importantly, what is not.**

## What is protected (passworded chats)

- **Message bodies** are AES-GCM ciphertext; the server stores only `{ ciphertext, iv }`.
- **File metadata** (name, FilesHub URL) is encrypted client-side.
- **The key never leaves your device** — it is derived in-memory from your password + a per-chat salt and is never uploaded or persisted to a server.
- **Password correctness is checked offline** via a stored verifier, so the server is never asked to validate the password.

## What is *not* protected (read this carefully)

| Not protected | Why it matters |
|---|---|
| **File bytes at rest** | Files on FilesHub are not encrypted; only their URL/metadata is. A holder of the raw URL can fetch the file. |
| **Open (no-password) chats** | Everything is plaintext; anyone with the chat ID can read all messages and files. |
| **Grouping/metadata fields** | `kind`, `title`, `topic`, thread counts, and reservation fields stay plaintext even on passworded chats. |
| **Identity vs. infrastructure** | Standard Firebase telemetry (IP address, user agent) is processed. AChat hides you from other participants, not from a subpoena. |
| **Lost passwords** | No recovery, no backdoor. A lost password means the chat is permanently unreadable. |

## Threat model in plain terms

AChat is designed to protect a passworded chat's **message contents** from:

- Other people who do not have the password.
- A casual observer of the database (they see only ciphertext for passworded chats).

AChat is **not** designed to protect against:

- A determined adversary who has the **password** (they can read everything).
- Exposure of **file bytes** via a leaked FilesHub URL.
- **Legal/infrastructure-level** identification via IP/UA telemetry.
- Anything in an **open** chat (no encryption at all).

## App-level hardening

Beyond message encryption, the web app ships standard production hardening:

- A strict **Content-Security-Policy**, plus HSTS, `X-Content-Type-Options`, a restrictive `Referrer-Policy`, and a `Permissions-Policy` that denies unused device APIs.
- Optional **Firebase App Check** (reCAPTCHA v3) support — currently **off** by default, and documented as such rather than claimed as enforced.
- The Android app ships with **only INTERNET + VIBRATE** permissions — no camera, microphone, location, contacts, or storage.

## Practical guidance

- For anything sensitive: **generated chat ID + strong password**, shared out-of-band.
- Treat **files** as semi-public; do not upload secrets.
- Treat **communities** and **open chats** as fully public.

## Related

- [Passwords & encryption](/features/passwords-and-encryption)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
