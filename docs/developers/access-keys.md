---
sidebar_position: 2
title: "Access keys"
description: "Make an AChat access key in Account › Other apps, pick what it may read, change or delete, and choose when it stops working. When a key can be shown again, how to replace one without a gap, and how to remove it."
keywords: [AChat access key, achat_pat, API key, personal access token, key permissions, rotate key]
last_update:
  date: 2026-11-21
  author: AChat team
---

# Access keys

**An access key lets a script or a service of yours read or change your account through the [AChat API](./api.md).** It starts with `achat_pat_`, acts as you, and can do only what you ticked when you made it. Treat each one like a password.

## Make a key

1. Open **Account › Other apps** and choose **Make an access key**.
2. Give it a name you'll recognise, such as "Home server".
3. Tick what it may do (see [Permissions](#permissions)).
4. Pick when it stops working: 30, 90 or 365 days, or **Never**.
5. Choose **Make key**, copy it, and put it where it will be used.

Making a key needs a sign-in in the last 10 minutes. With [two-step sign-in](./two-step-sign-in.md) on, that sign-in must have included the code; a browser that skipped the code because you told it to remember you doesn't count. If it's been longer, AChat asks you to sign in again and brings you straight back.

AChat emails you each time a key is made.

## Permissions

Each kind of data has up to three ticks: **Read**, **Change** and **Delete**. Change includes Read. Delete includes nothing else and is never ticked for you.

| Data | Read | Change | Delete |
|---|---|---|---|
| Profile: username, the name people see, avatar colour | `profile:read` | `profile:write` (name and colour) | — |
| Settings: who sees you online, read receipts, language, notifications | `preferences:read` | `preferences:write` | — |
| Status posts | `status:read` | `status:write` (new text posts) | `status:delete` |
| Blocked people | `blocks:read` | `blocks:write` (block someone) | `blocks:delete` (unblock) |
| Contacts | `contacts:read` | — | — |
| Chats, and messages in open rooms and channels | `chats:read` | — | — |
| Communities and their channels | `communities:read` | — | — |

Contacts, chats and communities have other people in them, so they're read only whatever you tick. Direct chats, groups and password rooms show their name and members; their messages never leave AChat.

## When a key stops working

- **30, 90 or 365 days** for any key.
- **Never** only for a key that just reads. A key that can change or delete always ends, and 365 days is the longest.

The key's row in Other apps shows the date it stops working and when it was last used.

## Showing a key again

AChat can show a key again for 10 minutes after you sign in, with the code when two-step sign-in is on. After that, choose **Sign in again to show it**. AChat shows keys at most 10 times an hour per account. AChat stores only a sealed copy and a one-way fingerprint, never the key in plain form.

## Replace a key

**Replace** gives you a new key with the same name and the same permissions. The old key keeps working for 24 hours, so you can swap it over without a gap. A key that had an end date gets a new 90-day one; a read-only key set to Never keeps never ending. Replacing needs the same recent sign-in as making a key, and AChat emails you about it.

## Remove a key

**Remove** stops the key at once: anything still using it is refused from its next request. It can't be undone, but you can make a new key.

## How many keys

Your plan sets how many keys you can hold at once (5 on Free by default; the full table is on [AChat for developers](./index.md#what-your-plan-allows)). When they're all in use, remove one to make another.

## Who can't make keys

Anonymous room sessions are never accounts, so they can't make keys, connect apps or add webhook addresses. An account that is suspended, or whose deletion has been asked for, has every key and connection refused.
