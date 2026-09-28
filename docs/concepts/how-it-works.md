---
sidebar_position: 1
title: How AChat works
description: The two identities in AChat — an account and an anonymous display name — which chat types exist, where messages live, and how long each kind is kept.
keywords: [how AChat works, anonymous vs account chat, chat retention, on-device search, offline messages]
last_update:
  date: 2026-09-28
  author: AChat team
---

# How AChat works

**AChat has two ways to be in a chat: an account (Google sign-in plus a username) or, in anonymous rooms, a display name with no account.** The two are never linked: if you also have an account, AChat doesn't connect your anonymous messages to it.

## Chat types

| Chat | Who's in it | Needs an account | End-to-end encrypted |
|---|---|---|---|
| Personal chat | You and one contact | Yes | Yes |
| Private group | Contacts you invite, or people an admin approves | Yes | Yes |
| Anonymous room | Anyone with the link (and password, if set) | No | Only with a password |
| Community channel | Community members | Depends on the community | No |
| Status | Your accepted contacts | Yes | No |

## Where messages live

- **On AChat's servers:** every chat's messages, so each device can fetch them. End-to-end encrypted messages are stored in a form the servers and AChat's administrators can't read.
- **On your devices:** chats and files you've opened, so they load fast and open offline, plus an outbox of messages waiting to send. Search runs here, over what the device holds.
- **Your keys:** on your linked devices, and restorable with your recovery key. AChat doesn't keep a copy.

## How long things last

| What | How long |
|---|---|
| Personal chats and groups | Until someone deletes them, unless the chat sets disappearing messages (1 minute, 1 hour or 1 day) |
| Anonymous room messages | A set number of days after each one is sent (10 by default), or until the kept-until date if someone keeps the room |
| Trash | A set number of days (30 by default), never longer than the chat's own history |
| Status | 24 hours |
| Location history | Until the chat is permanently deleted from Trash or expires |

The [privacy page](https://achat.aoneahsan.com/privacy) lists everything else, and [Data, privacy & deletion](/concepts/data-privacy-and-deletion) summarises it.

## Sending a message

1. You write it. It goes into the outbox first, so it survives a lost connection or a reload.
2. AChat sends it and retries until it's accepted, without sending it twice.
3. The label under it moves from **Sending** (or **Waiting to send** while offline) to **Sent** once it has arrived.

## Platforms

The same AChat runs in the browser and on Android, in five languages. There are no voice or video calls.
