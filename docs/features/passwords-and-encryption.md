---
sidebar_position: 4
title: Passwords & encryption
description: Which AChat chats are end-to-end encrypted, what a room password protects, and the limits — open rooms, communities and status aren't end-to-end encrypted.
keywords: [end-to-end encrypted chat, room password, encrypted group chat, AChat encryption]
last_update:
  date: 2026-09-28
  author: AChat team
---

# Passwords & encryption

**Personal chats, private groups and their files are end-to-end encrypted, so each message can be read only on the devices of the people in them.** A room with a password encrypts its messages on your device, using that password.

## What's encrypted

| Chat | End-to-end encrypted? |
|---|---|
| Personal chats | Yes, with their files |
| Private groups | Yes, with their files |
| Anonymous rooms with a password | Yes, encrypted with the room password |
| Open anonymous rooms | No. Anyone with the link can read them |
| Communities and their channels | No |
| Status updates | No. AChat's servers can read them; access rules limit who else sees each one |

AChat stores end-to-end encrypted messages in a form its servers and administrators can't read. AChat doesn't keep a copy of your message keys.

## Room passwords

- Everyone needs the password to join and read the room.
- Send the password separately from the link.
- Too many wrong tries in a row make you wait some minutes before you can try again.
- New passwords show a strength meter. It's checked on your device, and the password isn't sent anywhere to check it.

## Groups and changing members

When a group's members change, the group gets new security keys, so people who left can't read new messages. People who join see messages sent after they join; earlier messages aren't shared automatically.

## Checking a linked device

On **Account**, then **Devices**, you can compare security codes between two of your devices. If they don't match, remove the device you don't trust. See [Devices & recovery key](/features/devices-and-recovery).

## The limits

- Anyone in a chat can copy, save or screenshot a message. Encryption protects messages on the way and on the server, not after someone has read them.
- Search looks only at messages already on your device.
- Push notifications never include the message text.
- Losing your recovery key and every linked device means your history can't be restored, by you or by the AChat team.

The full model is in [Security & encryption](/concepts/security-and-encryption).
