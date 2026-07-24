---
sidebar_position: 3
title: Admin oversight
description: AChat has a built-in administrator role for safety and moderation. This is the honest boundary — what an admin can and cannot see, why passworded chats stay end-to-end encrypted, and how every admin action is logged.
keywords: [chat admin, moderation, admin oversight, audit log, key escrow, content moderation, admin transparency]
last_update:
  date: 2026-07-24
  author: Ahsan Mahmood
---

# Admin oversight

**AChat has a built-in administrator role so the operator can keep the service safe — handle abuse reports, moderate public communities, and run the app. This page is the honest boundary of that role: it is oversight, not behavioural tracking, and passworded chats stay end-to-end encrypted even from an admin.**

The administrator is the operator's own **verified Google account** (plus any co-admins they add). It is enforced in the Firestore security rules by that verified email — not by a client-side flag — so it is a real server-side boundary.

## What an admin can do

- **Enumerate and inspect** all chats and all signed-in accounts (and their reservations) — the reach here is *discovery*, so abuse can be found and acted on.
- **Read open chats.** A chat without a password was always readable by anyone who had its ID; an admin can now find those chats to moderate them.
- **Keep a chat indefinitely** (or mark it eligible to be kept), and grant a specific account a larger upload limit or a longer keep window.
- **Edit app policy parameters** and the co-admin list.

## What an admin cannot do

- **Read passworded chats.** These stay end-to-end encrypted. There is **no key escrow** — the operator holds no copy of your key and cannot decrypt your messages or file metadata. An admin sees only the unencrypted **metadata** (things like a chat's kind, title, or reservation state).
- **Change the structural guarantees.** The encryption model, the anonymous-by-design writes, and the fixed limits are not runtime-editable — only tunable parameters inside a fixed envelope can be changed.

## Accountability

- **Every admin action is written to an immutable audit log** — it can be added to but not edited or deleted.
- **Co-admin transparency:** the list of co-admin emails is readable by any signed-in user, so who has oversight is not hidden.

## What this means for you

- **Passworded chats remain private from the operator** — the honest, load-bearing guarantee is unchanged.
- **Treat open chats and communities as visible** — to other participants, and now to a moderator.
- **Reserving or keeping a chat records your account on that chat** (an account-to-chat link, never an account-to-message one), which is how it is exempted from the 10-day delete.

## Related

- [Security & encryption model](/concepts/security-and-encryption)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
