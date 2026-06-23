---
sidebar_position: 2
title: Quick Start
description: Start your first anonymous AChat conversation in about 60 seconds — pick a chat ID, optionally set a password for end-to-end encryption, share the link, and talk.
keywords: [start anonymous chat, create chat room, end-to-end encrypted chat quick start, share chat link, AChat quick start]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Quick Start

**You can start a private AChat conversation in about 60 seconds: open the app, choose a chat ID, optionally set a password, share the URL, and talk.** This page walks the happy path end to end.

## 1. Open AChat

Go to [achat.aoneahsan.com](https://achat.aoneahsan.com). You land on the home screen with no sign-up wall.

## 2. Choose a chat ID

A chat ID is the address of your room. You can:

- **Generate one** — AChat creates a random ID (12–15 characters) for you.
- **Type your own** — 8–20 characters, lowercase letters, numbers, and hyphens (`a–z`, `0–9`, `-`). Pick something hard to guess if you do not set a password, because anyone who knows the ID of an open chat can read it.

The chat lives at `achat.aoneahsan.com/c/<your-chat-id>`.

## 3. (Optional) Set a password for end-to-end encryption

If you set a password, AChat derives an encryption key **in your browser** and encrypts message bodies and file metadata before they leave the device:

- The key is derived with **PBKDF2** (150,000 iterations, SHA-256) from your password and a per-chat random salt.
- Messages and file metadata are stored as AES-GCM ciphertext; the server never receives the password or the key.
- **If you lose the password, the chat is unrecoverable** — there is no reset, by design.

Share the password with the other participants over a separate, trusted channel (not inside the chat).

:::tip
No password is fine for casual, non-sensitive chats — just remember an open chat is readable by anyone with the ID.
:::

## 4. Share the link

Use the in-app **Share** button to send the chat URL via the social grid / copy-link (on the web) or the native share sheet (on Android). Only the link is shared — never your messages.

## 5. Talk

- Type in the composer; **Cmd/Ctrl + Enter** sends.
- Use **bold**, *italic*, `code`, and links via the minimal rich-text toolbar, or type `/` for slash commands and `:` for emoji.
- Drag in or attach files up to 10 MB each (100 MB per chat).
- Long-press / hover a message to react, quote-reply, or open a thread.

## 6. Let it expire — or keep it

By default everything auto-deletes about 10 days after it is sent. If you want a room to persist longer, sign in with Google (optional) and **reserve** the chat — see [Keep chats & accounts](/features/keep-chats-and-accounts).

## Next steps

- [Anonymous chats](/features/anonymous-chats) — IDs, presence, and sharing in depth.
- [Passwords & encryption](/features/passwords-and-encryption) — exactly what the password protects.
- [Groups & communities](/features/groups-and-communities) — go beyond one-link rooms.
