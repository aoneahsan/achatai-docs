---
sidebar_position: 6
title: Search & message history
description: Search across the chats you have opened — entirely on your device — and page through long conversations with Load-earlier. Nothing about your search leaves the browser.
keywords: [cross-chat search, on-device search, private chat search, load earlier messages, chat history, indexeddb search]
last_update:
  date: 2026-07-24
  author: Ahsan Mahmood
---

# Search & message history

**AChat can search across every chat you have opened, and it does the searching entirely on your device — your search terms never leave the browser.** Long conversations load the newest messages first and let you pull older ones in on demand.

## Cross-chat search

Search from the chat header, the app header, or the landing page. Results are ranked, with prefix and fuzzy matching.

- **On-device only.** AChat keeps a small local cache of the chats you have recently opened in this browser's IndexedDB and searches that cache with an in-browser index (run in a Web Worker so typing stays smooth). **Search terms are never sent to any server.**
- **How many chats are cached:** the last **5** chats when you are anonymous, or **10** when you are signed in (least-recently-used eviction). An administrator can raise these limits for a specific account.
- **Passworded chats:** a passworded chat is cached **decrypted** only when you have chosen to save its password on this device. Otherwise it is searchable only while it is open, and never stored in a readable form.
- **It always refreshes on open**, and you can trigger a manual refresh (rate-limited to once a minute).

Clicking a result jumps straight to the message — including a message inside a thread, which opens its thread and flashes the reply.

## Load-earlier messages

Long chats do not load everything at once:

- Opening a chat loads the **200 newest messages instantly**, with a **Load earlier** button for older ones.
- Search reports **how far back it has looked** so you know whether a term simply is not there or lies beyond what is loaded — and it can load more when you ask.

## Clearing the cache

The on-device cache wipes automatically on sign-out and on a per-chat wipe (panic / forget), and you can clear it manually at any time from the search controls.

## Honest framing

- Search only covers chats **already cached on this device** — it is not a server-side search of all chats everywhere.
- A passworded chat whose password you have **not** saved is not in the readable cache, so it will not appear in results unless it is currently open.

## Related

- [Passwords & encryption](/features/passwords-and-encryption)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
