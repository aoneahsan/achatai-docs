---
sidebar_position: 8
title: Themes & accessibility
description: AChat ships a full theme customizer (appearance, accent, radius, scaling, font size, panel background) plus accessibility options like a dyslexia font, colorblind modes, density, and full keyboard support.
keywords: [chat theme customizer, dark mode chat, dyslexia font, colorblind mode, accessible chat, keyboard navigation]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# Themes & accessibility

**AChat includes a full, card-based theme customizer and a set of accessibility options, available to everyone — signed in or not — and persisted on your device.** You can make the app match your taste and your needs without an account.

## Theme customizer

Open the palette button in the header to customize:

| Option | Choices |
|---|---|
| **Appearance** | Light · Dark · System |
| **Accent color** | A set of branded accents |
| **Border radius** | None → Full |
| **UI scaling** | 90% → 110% |
| **Font size** | Small · Medium · Large |
| **Panel background** | Solid · Translucent |

A quick **Light → Dark → System** cycle button sits next to the palette for one-tap switching.

## Personalization beyond color

AChat also exposes:

- **Avatar / density / bubble shape / background pattern / contrast** controls for the chat surface.
- **Per-chat theme overrides** plus saveable **presets** and **import/export** of your theme.

## Accessibility

- **Dyslexia-friendly font** toggle.
- **Colorblind modes** for clearer differentiation.
- **Keyboard support** throughout, including focus-visible rings and (in chat) vim-style `j`/`k` navigation.
- **Minimum text sizes and tap targets** — body text stays at least 12 px and interactive targets are at least 44 px on mobile.
- **Reduced-motion aware** — entrance animations and the carousel respect `prefers-reduced-motion`.
- Responsive from **320 px to 1920 px** with no horizontal scroll.

## Persistence

Your theme and accessibility choices are stored locally via Capacitor Preferences, so they restore on your next visit on the same device — no sign-in needed. A full-page boot loader holds first paint until the theme hydrates, so you never see a flash of the wrong theme.

## Related

- [Getting started](/getting-started/installation)
- [FAQ](/faq)
