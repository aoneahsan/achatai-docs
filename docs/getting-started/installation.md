---
sidebar_position: 1
title: Installation & access
description: How to use AChat on the web, install it as a PWA, or get the Android app. No account, email, or phone number required.
keywords: [AChat install, anonymous chat web app, install chat PWA, anonymous chat android, no account chat]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Installation & access

**AChat needs no installation to use — open [achat.aoneahsan.com](https://achat.aoneahsan.com) in any modern browser and you are ready.** There is no sign-up step. If you want an app-like experience, you can install it as a Progressive Web App (PWA) or get the Android build from Google Play.

## 1. Web (recommended, zero install)

Open [achat.aoneahsan.com](https://achat.aoneahsan.com) in Chrome, Firefox, Safari, Edge, or any current browser, on desktop or mobile. Everything works immediately: starting chats, passwords, file sharing, threads, communities, and the theme customizer. The web app is responsive from 320 px phones to full-HD desktops.

## 2. Install as a PWA

AChat is an installable PWA, so you can pin it to your home screen or app launcher and open it in its own window.

- **Chrome / Edge (desktop):** click the install icon in the address bar, or use the in-app **Install** button in the header when it appears.
- **Android (Chrome):** open the browser menu and choose **Install app** / **Add to Home screen**.
- **iOS (Safari):** tap the **Share** button, then **Add to Home Screen**. (iOS Safari does not expose an automatic install prompt; AChat shows a one-tap reminder of these steps.)

Installing does not create an account and does not change how data is stored — it is the same web app in a standalone window.

## 3. Android app (Google Play)

The Android build wraps the same web experience with Capacitor and adds native niceties (share sheet, clipboard, haptics, keyboard handling).

- Get it on [Google Play](https://play.google.com/store/apps/details?id=com.aoneahsan.achatachat).
- The app ships with **only the INTERNET and VIBRATE permissions** — no camera, microphone, location, contacts, or storage permissions.

## 4. iOS

An iOS build exists in the codebase (Capacitor) but is not yet published to the App Store. On iPhone and iPad, use the web app and add it to your home screen (step 2).

## Requirements

| Surface | Requirement |
|---|---|
| Web | A current browser with the Web Crypto API (all modern browsers). Encryption needs a secure context (HTTPS), which the live site provides. |
| PWA | The same browser; a service worker enables offline shell + installability. |
| Android | Android device supporting the Play listing's minimum SDK. |

## What you do *not* need

- No account, email, username, or password to *use* AChat. (A password is only for per-chat encryption, and even that is optional.)
- No payment — AChat is free, with no paid tier.
- No app install on the web — the link is the app.

Next: start talking with the [Quick Start](/getting-started/quick-start).
