---
sidebar_position: 5
title: Groups & communities
description: Beyond one-link rooms, AChat supports named private group chats and public, discoverable communities with best-effort, client-side moderation.
keywords: [anonymous group chat, public chat community, discoverable chat rooms, community moderation, group messaging]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Groups & communities

**AChat goes beyond one-link rooms with two grouping models: named private *group chats* you share by link, and public *communities* that are open, anonymous, and discoverable in an in-app directory.** Both still auto-delete their messages on the 10-day schedule.

## Group chats

A group chat is a room with a `kind` of `group` plus a plaintext **title** and optional **topic**, so the room has a friendly identity instead of a bare ID. Groups are otherwise like any anonymous chat:

- Shared by link; no account required to join.
- Can be passworded for [end-to-end encryption](/features/passwords-and-encryption).
- Support threads, reactions, files, and presence.

The title/topic are stored **plaintext** (they are grouping metadata), even when the message bodies are encrypted.

## Communities

A community is a **public** room that anyone can discover and join from the in-app communities directory:

- Each community has a **title**, **topic**, **category**, and an **NSFW** flag for filtering.
- Communities are listed in a discovery index so people can browse and join — they are designed *not* to vanish the way a private room does (the community record itself is not auto-deleted), while **the messages inside still carry the 10-day TTL**.
- A community has a creator and can have **moderators** (by uid or by invited email).

### Moderation — best-effort and client-side (honest framing)

Community moderation is deliberately lightweight and **bypassable**; treat communities as public spaces, not secure ones:

- A **profanity filter** runs client-side and can be bypassed.
- **Anonymous-ID bans are soft** — they discourage, not strictly prevent, a determined user.
- **Reports raise a counter** for owner visibility rather than triggering automated removal.

Because communities are public and anonymous, do not post anything private in them, and assume anything posted may be seen by anyone before it expires.

## Choosing between them

| You want… | Use |
|---|---|
| A private room for known people | A one-link chat or a **group chat** (optionally passworded) |
| An open, discoverable, public space | A **community** |
| A focused side-conversation | A [thread](/features/threads-and-replies) inside any of the above |

## Related

- [Anonymous chats](/features/anonymous-chats)
- [Embeddable widget](/features/embeddable-widget)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
