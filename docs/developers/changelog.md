---
sidebar_position: 7
title: "Developer changelog"
description: "Changes to AChat's API, assistant connection, webhooks and two-step sign-in, newest first, starting with the open platform on 2026-11-21."
keywords: [AChat API changelog, AChat developer changes, AChat MCP changes]
last_update:
  date: 2026-11-21
  author: AChat team
---

# Developer changelog

Changes to the API, the assistant connection, webhooks and two-step sign-in, newest first. The API is `v1`.

## The open platform (2026-11-21)

- **[The AChat API](./api.md)** at `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`, with [access keys](./access-keys.md) (`achat_pat_…`) made under Account › Other apps. Your profile, settings, status posts (text) and blocked list can be read and changed; contacts, chats, open-room messages, communities and channels are read only. An OpenAPI 3.1 document sits at `/openapi.json`.
- **[Assistant connection](./assistants.md)** at `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp` for Claude, ChatGPT, Claude Code and Cursor. You approve each one on AChat, and an assistant's delete waits for your yes at `/developers/confirm`.
- **[Webhooks](./webhooks.md)** for eleven events, signed with Standard Webhooks, carrying ids and times only.
- **[Two-step sign-in](./two-step-sign-in.md)** with an authenticator app, ten recovery codes and an opt-in 7-day remembered browser. Required for the accounts that run AChat's admin screens.
- End-to-end encrypted chats stay out of all of it: outside apps see a chat's name and members, never its messages.
- No calendar feed: AChat has nothing dated to put in one.
