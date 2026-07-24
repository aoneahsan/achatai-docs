---
sidebar_position: 10
title: Notifications & email
description: AChat's optional extras — opt-in push notifications via OneSignal (off by default) and optional transactional emails via FilesHub, plus how to reach the developer.
keywords: [push notifications, onesignal, opt-in notifications, transactional email, contact form, reserved chat reminder]
last_update:
  date: 2026-07-24
  author: Ahsan Mahmood
---

# Notifications & email

**Notifications and email are both optional. Push is off until you turn it on, and emails only go out for a few account-related events if you sign in or use the contact form.**

## Push notifications (opt-in)

AChat can send push notifications on the web and on Android through **OneSignal**, and it is **off by default**.

- Turn it on from the theme/settings panel. Enabling it registers this device or browser with OneSignal so it can deliver a notification.
- OneSignal receives a push token and basic delivery metadata (device/browser type, timezone, IP) to route the notification. It **never receives chat IDs, message contents, passwords, or files**, and **no advertising ID is collected**.
- On Android this is the only reason the app requests the notifications permission (`POST_NOTIFICATIONS`); leave push off and no notifications are requested. Opt out any time from the toggle or your browser/OS settings.

## Transactional email (optional)

AChat sends a small number of account-related emails through **FilesHub**, only when they apply to you:

- a **welcome** email on your first sign-in,
- an **account-deletion confirmation**,
- a **reminder** before a chat you reserved is due to expire.

There are no marketing emails. Anonymous use sends no email at all.

## Contact

Questions or feedback go through the [contact page](https://achat.aoneahsan.com/contact). Its form delivers your message to the developer (again via FilesHub), with your address used only to reply.

## Related

- [Keep chats & accounts](/features/keep-chats-and-accounts)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
