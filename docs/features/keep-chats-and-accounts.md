---
sidebar_position: 7
title: Keep chats & accounts
description: An optional Google sign-in lets you reserve AChat rooms past the 10-day auto-delete — anonymous chat still works with zero sign-in, and your account is never linked to message authorship.
keywords: [keep chat, reserve chat, optional account, google sign-in chat, persistent anonymous chat, account deletion]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Keep chats & accounts

**By default every chat auto-deletes in about 10 days. If you want to keep a room longer, you can *optionally* sign in with Google and reserve it — but anonymous chat works with zero sign-in, and your account is never linked to who wrote which message.** Accounts exist for one reason: persistence.

## Why sign in (and why you usually don't need to)

- **Anonymous by default.** You never need an account to start, join, or use any AChat feature.
- **Sign in only to keep.** A Google account lets you **reserve** chats so they survive past the 10-day delete.
- **No attribution.** Your account stores only your uid, email, name, and photo. It is **never linked to message authorship** — signing in does not de-anonymize your messages.

## Reservations

When signed in, you can reserve a chat to extend its lifetime:

- Reserve up to **100 chats**.
- A reserved chat gets a **base retention of about 3 months**, extendable up to about **1 year** through achievements (see below).
- Reservations are managed from your account / "kept" area; releasing a reservation lets the chat return to the normal expiry schedule.

A reserved chat's retention is implemented by extending its `expiresAt`, so it simply lives longer rather than being special-cased out of the deletion system.

## Achievements & referrals (honest framing)

AChat includes lightweight gamification that can extend retention:

- **Achievements are tracked client-side** with limited anti-cheat. They are a fun way to extend retention, not a hardened system.
- **Referrals are self-referable** — the referral mechanic is intentionally low-stakes and not fraud-proof.

These exist to reward engagement, not to gate core functionality.

## Account deletion

Account deletion is built in and mandatory-grade:

- In the app, go to **Account → Delete account**. You type-to-confirm, and AChat releases your reservations, deletes your profile, and deletes your Firebase Auth record (re-authenticating if required).
- A public [/delete-account](https://achat.aoneahsan.com/delete-account) page documents the same flow.

After deletion, your reserved chats return to the normal 10-day expiry.

## Native Google sign-in (setup note)

On the web, Google sign-in uses the Firebase Auth popup. On the Android app, it uses the native Google auth flow and lands the same Firebase user. Configuring native sign-in (OAuth client, signing-certificate fingerprints) is a one-time developer/operator setup step.

## Related

- [Anonymous chats](/features/anonymous-chats)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
