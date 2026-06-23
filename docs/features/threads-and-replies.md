---
sidebar_position: 4
title: Threads & replies
description: Branch focused side-conversations off any message with AChat threads, or quote-reply inline — with reply counts, scroll memory, and file uploads inside replies.
keywords: [chat threads, threaded conversation, quote reply, message replies, conversation branching]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Threads & replies

**AChat lets you reply to a specific message two ways: an inline quote-reply, or a full thread that branches a focused side-conversation off the original message.** Threads keep busy rooms readable.

## Quote replies

Hover or long-press a message and choose **Reply** to quote it. Your message renders with the quoted original above it, so context travels with the reply even in a fast-moving room.

## Threads

Open a **thread** on any message to start a dedicated, scrollable side-conversation:

- The thread panel pins the **parent message** at the top with an accent "spine" so you always see what the thread is about.
- A single **reply count** and **last-reply time** are tracked on the parent (`replyCount`, `lastReplyAt`).
- Thread replies support the same composer features, including **file uploads inside a reply**.
- The panel remembers your scroll position and shows a friendly empty state before the first reply.

On desktop the thread opens in a side panel at a snap width (40 / 60 / 80 / 100%); on mobile it goes full-screen.

## Encryption behaviour (honest framing)

- A thread reply's **body keeps the chat's encryption setting** — encrypted on passworded chats, plaintext on open chats.
- The thread **structure fields** (`threadParentId`, `replyCount`, `lastReplyAt`) are stored **plaintext** even on passworded chats, because they are grouping metadata, not message content.

## Related

- [Anonymous chats](/features/anonymous-chats)
- [Groups & communities](/features/groups-and-communities)
