---
sidebar_position: 2
title: Security & encryption model
description: What AChat's end-to-end encryption covers and what it doesn't, how keys, linked devices and the recovery key fit together, and the limits no app can remove.
keywords: [AChat security, end-to-end encryption model, recovery key, linked devices, threat model]
last_update:
  date: 2026-09-28
  author: AChat team
---

# Security & encryption model

**AChat promises end-to-end encryption for personal chats, private groups and rooms with a password. It doesn't promise it for communities, their channels, open rooms or status updates.**

## What end-to-end encryption means here

- Messages in those chats can be read only on the devices of the people in them.
- AChat stores them in a form its servers and administrators can't read.
- AChat doesn't keep a copy of your message keys, so it can't read or restore your history.
- Push notifications carry the chat or sender name, never the message text.
- Search looks only at messages already on your device.

## Keys, devices and recovery

- **Linked devices** each hold your keys. Approving a device lets it read your chats, history included, and send messages as you. Compare security codes to check a link.
- **Removing a device** stops new messages reaching it and signs it out. What it already stored stays on it.
- **Groups get new keys** when their members change, so people who left can't read new messages.
- **The recovery key** is yours to keep. Google sign-in alone can't restore your history. Lose the key and every linked device, and nobody can restore it.

## Room passwords

A room with a password encrypts its messages on your device, using that password. Too many wrong tries in a row make you wait before trying again. A password you set gets strength advice checked on your device.

## Private location history

In a personal chat, private group or room with a password, [device and location history](/features/location-history) is encrypted end to end. Only members who enter the chat's audit password (or the room password) can see it, and AChat's administrators can't open it.

## What encryption can't do

- **Anyone who reads a message can copy it.** People in a chat can copy, save or screenshot anything, including disappearing and view-once messages while they're open. Deleting later doesn't reach those copies.
- **Open chats are open.** Anyone with an open room's link can read it. Communities and their channels aren't end-to-end encrypted.
- **Anonymous isn't untraceable.** Your device connects to AChat's servers like any website, and hosts record connection details such as your IP address.
- **A lost, unlocked device is a risk.** Whoever holds it can open what's stored there. [Privacy on this device](/features/privacy-on-this-device) covers the privacy screen and Wipe from this device.
- **Nothing already seen can be recalled.** A later setting or policy change can't take back what was read, copied, saved or exported.

## Moderation and encryption

AChat's moderators see a message in an encrypted chat only if someone in that chat reports it and sends it with the report. See [Admin oversight](/concepts/admin-oversight).
