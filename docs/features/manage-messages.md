---
sidebar_position: 7
title: Delete, archive & forward
description: Soft-delete messages to a per-chat 30-day Trash, lock a chat to your account with a login-gated private archive, or forward a message to another chat.
keywords: [delete chat message, message trash, restore deleted message, private chat archive, forward message, lock chat to account]
last_update:
  date: 2026-07-24
  author: Ahsan Mahmood
---

# Delete, archive & forward

**AChat gives you three ways to manage what is in a chat: soft-delete a message to a per-chat Trash you can restore from, privately archive a whole chat to your account, and forward a message into another chat.**

## Trash (soft-delete with a 30-day window)

Delete a message and it goes to that chat's **Trash** rather than vanishing:

- **Restore** it, **delete it permanently**, or **Clear all** trashed messages.
- Trash retention is capped by the chat's own lifetime — a Trash entry never outlives the chat, and deleting only ever pulls its expiry **earlier**, never later.
- Deletion is best-effort and owner-oriented, consistent with how AChat's other edits work: the rules constrain the shape of the change, not who may make it.

You can also delete a whole chat from your view.

## Private archive (login-gated)

Signing in with Google unlocks a **private archive** that locks a chat to your account:

- Once archived, **only you, while signed in, can read that chat** — a read-only snapshot.
- **A password alone will not unlock an archived chat.** The account gate is enforced by the security rules, separately from any chat password. Archiving implies keeping the chat past the 10-day auto-delete.

This is different from the local declutter archive (a personal "tidy this away" that only affects your own list) and from [reserving a chat](/features/keep-chats-and-accounts) (which extends a chat's lifetime for everyone in it).

## Forward

Forward a message to reuse it elsewhere:

- **Text** can be forwarded anywhere you can write.
- **Files** can be forwarded into any open chat.

You can also copy a direct link to a message, and mark messages read or unread.

## Honest framing

- Soft-delete and restore act on the copy stored in the chat; a message someone already read or copied is not recalled.
- The private archive gates **who can read** the chat (your signed-in account); it is a separate protection from the client-side [password encryption](/features/passwords-and-encryption), not a replacement for it.

## Related

- [Keep chats & accounts](/features/keep-chats-and-accounts)
- [Search & message history](/features/search-and-history)
