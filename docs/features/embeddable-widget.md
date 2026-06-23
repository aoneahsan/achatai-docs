---
sidebar_position: 6
title: Embeddable widget
description: Embed an AChat room on any website as an inline iframe or a floating launcher — sandboxed, so the host page cannot read the messages inside.
keywords: [embeddable chat widget, iframe chat, add chat to website, floating chat launcher, anonymous chat embed]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Embeddable widget

**AChat can be embedded on any website as a sandboxed chat — either an inline iframe or a floating launcher button — without standing up your own backend, and the host page cannot read the messages inside.** This makes AChat a drop-in anonymous chat for landing pages, docs, events, and support corners.

## Two embed modes

- **Inline iframe** — render a specific chat room directly in the page layout (for example, a support box in a sidebar).
- **Floating launcher** — a small button that opens the chat in a panel, similar to a typical website chat bubble.

Both point at a specific chat ID, so you control which room the widget opens.

## Sandboxing & privacy

The widget runs inside a sandboxed iframe:

- The **host page cannot read the chat's messages** — the iframe is an isolated browsing context.
- The widget only carries the permissions the iframe `allow`-list grants; AChat ships with no sensitive permissions (e.g. no microphone) in the widget.
- The chat behaves like any AChat room: optionally passworded, ephemeral, and auto-deleting.

## Sign-in inside an embed (honest limit)

Optional Google sign-in **may be blocked inside a third-party iframe** by the browser (third-party cookie / popup restrictions). When that happens, AChat falls back to opening sign-in in a new tab. Because anonymous chat needs no sign-in at all, embeds work fully without it — sign-in only matters if a user wants to *keep* a chat.

## Direct widget link

There is also a direct `/widget` route, so you can link people straight to the widget experience without embedding it yourself.

## Related

- [Anonymous chats](/features/anonymous-chats)
- [Keep chats & accounts](/features/keep-chats-and-accounts)
