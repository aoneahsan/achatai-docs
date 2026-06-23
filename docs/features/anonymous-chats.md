---
sidebar_position: 1
title: Anonymous chats
description: How AChat's anonymous one-link chat rooms work — chat IDs, sharing, presence, recents, and the no-signup model.
keywords: [anonymous chat room, no signup chat, chat by link, ephemeral chat room, anonymous messaging]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Anonymous chats

**An AChat room is a URL: anyone with the chat ID can open `achat.aoneahsan.com/c/<id>` and join, with no account and no identity attached to their messages.** This page covers how the core anonymous-chat experience behaves.

## Chat IDs

The chat ID is the room's address and its access key.

- **Format:** 8–20 characters, lowercase letters, numbers, and hyphens (`a–z`, `0–9`, `-`).
- **Generated IDs** are random and 12–15 characters long — long enough to be hard to guess.
- **Custom IDs** let you use a memorable name, but a memorable open chat is also a guessable one. For anything sensitive, set a [password](/features/passwords-and-encryption) or use a generated ID.

## Identity (or the lack of it)

AChat does not ask who you are. Each participant gets a client-side anonymous identity used only to render "who sent what" within the room. You can set a display name and avatar for a friendlier UI, but:

- There is no account requirement to chat.
- Even if you *optionally* sign in (to [keep chats](/features/keep-chats-and-accounts)), your account is **never linked to message authorship** — sign-in is for reservations, not attribution.

## Presence

When others are in the room, AChat shows lightweight presence (who is currently active / typing). Presence records carry the same 10-day TTL as everything else and are best-effort, not a guarantee of who is watching.

## Sharing a room

Use the in-app **Share** action to distribute the room:

- **On the web:** an in-app share modal with a social grid (X, Facebook, LinkedIn, WhatsApp, Telegram, Reddit, Email) plus a click-to-copy link.
- **On Android:** the native OS share sheet.

You can also share a **QR code** for the room, and there is a one-link copy for quick pasting. Only the public chat URL is ever shared — never message contents.

## Recents

AChat remembers rooms you have recently visited on this device (locally, via Capacitor Preferences) so you can hop back in. Clearing them is local and does not affect anyone else.

## Honest limits

- **Open (no-password) chats are not private.** Anyone with the ID can read the whole history until it expires.
- **Presence and identity are client-side.** They make the UI friendly; they are not a security boundary.
- **Rooms are ephemeral.** Messages and files auto-delete about 10 days after they are sent. To persist a room, see [Keep chats & accounts](/features/keep-chats-and-accounts).

## Related

- [Passwords & encryption](/features/passwords-and-encryption)
- [Threads & replies](/features/threads-and-replies)
- [How AChat works](/concepts/how-it-works)
