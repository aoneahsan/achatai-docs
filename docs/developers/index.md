---
sidebar_position: 1
title: "AChat for developers"
description: "Reach your own AChat account from a script, an AI assistant or your own server: an API with access keys, an assistant connection for Claude and ChatGPT, signed webhooks and two-step sign-in. Encrypted chats never leave AChat."
keywords: [AChat API, AChat MCP, AChat webhooks, access key, connect Claude to AChat, AChat two-step sign-in]
last_update:
  date: 2026-11-21
  author: AChat team
---

# AChat for developers

**Your AChat account can be reached from outside the app, by you, on your terms.** A script can post a status or keep your blocked list in step, Claude can tell you which open rooms had new messages, and your server can hear the moment someone sends you a contact request. Every plan has it, Free included, and each way in reaches one account: yours.

## Which one do you need?

| You want | Use |
|---|---|
| A script or a service of yours to read or change your account | An [access key](./access-keys.md) and the [API](./api.md) |
| Claude, ChatGPT, Claude Code or Cursor to work with your account | An [assistant connection](./assistants.md) |
| Your server told when something changes, without asking every minute | [Webhooks](./webhooks.md) |
| A code after Google sign-in, so a stolen Google account isn't enough | [Two-step sign-in](./two-step-sign-in.md) |

All four live in the app: keys, connected apps and webhooks under **Account › Other apps**, two-step sign-in under **Account › Security**.

## What other apps can reach

An app gets in only through a key you make or a connection you approve. Either way, three rules hold.

| | What | From outside AChat |
|---|---|---|
| **Yours** | Your profile, settings, status posts and blocked list | Read and change. Deleting is a separate permission, off unless you tick it |
| **Shared with other people** | Contacts, chats, messages in open rooms, communities and channels | Read only. No app can post, remove or invite there |
| **End-to-end encrypted** | Direct chats, groups and password rooms | Never. An app sees a chat's name and that you're in it, never its messages |

The last rule isn't a setting. Messages in your direct chats, groups and password rooms are locked on your devices, and AChat's servers can't read them, so no key or assistant can either. The same goes for your device keys, your recovery key and your two-step codes. See [Security & encryption](/concepts/security-and-encryption).

## What your plan allows

| | Free | Pro | Team / Family |
|---|---|---|---|
| Access keys at once | 5 | 25 | 50 |
| API and assistant requests a day | 5,000 | 50,000 | 100,000 |
| Webhook addresses at once | 3 | 20 | 40 |
| Assistant connections at once | 3 | 10 | 25 |

These are the defaults today. The AChat team sets each plan's numbers, so **Account › Other apps › Use against your plan** shows what applies to you, with today's count. Requests count from midnight UTC, across every key and assistant on the account. Each key or connection is also held to 120 requests a minute, on every plan, so a runaway script stops before it eats the day.

## There's no calendar feed

AChat holds nothing dated that belongs in a calendar, so there's no calendar feed to subscribe to.

## For machines

- OpenAPI 3.1: [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)
- The same reference as Markdown: [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md)
- What changed, and when: [Developer changelog](./changelog.md)
