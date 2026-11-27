---
sidebar_position: 7
title: "Änderungsprotokoll für Entwickler"
description: "Änderungen an der API von AChat, der Assistenten-Verbindung, den Webhooks und der Anmeldung in zwei Schritten, neueste zuerst, ab der offenen Plattform vom 2026-11-21."
keywords: [AChat API Änderungsprotokoll, AChat Änderungen für Entwickler, AChat MCP Änderungen]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# Änderungsprotokoll für Entwickler

Änderungen an der API, der Assistenten-Verbindung, den Webhooks und der Anmeldung in zwei Schritten, neueste zuerst. Die API ist `v1`.

## Die offene Plattform (2026-11-21)

- **[Die AChat-API](./api.md)** unter `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`, mit [Zugangsschlüsseln](./access-keys.md) (`achat_pat_…`), die du unter Konto › Andere Apps erstellst. Dein Profil, deine Einstellungen, deine Status-Beiträge (Text) und deine Sperrliste können gelesen und geändert werden; Kontakte, Chats, Nachrichten offener Räume, Communities und Kanäle nur gelesen. Ein OpenAPI-3.1-Dokument liegt unter `/openapi.json`.
- **[Assistenten-Verbindung](./assistants.md)** unter `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp` für Claude, ChatGPT, Claude Code und Cursor. Du gibst jeden in AChat frei, und ein Löschvorgang eines Assistenten wartet auf dein Ja unter `/developers/confirm`.
- **[Webhooks](./webhooks.md)** für elf Ereignisse, signiert nach Standard Webhooks, nur mit IDs und Zeiten.
- **[Anmeldung in zwei Schritten](./two-step-sign-in.md)** mit einer Authenticator-App, zehn Wiederherstellungscodes und einem freiwillig 7 Tage gemerkten Browser. Pflicht für die Konten, die die Admin-Bildschirme von AChat bedienen.
- Ende-zu-Ende-verschlüsselte Chats bleiben bei alldem außen vor: Externe Apps sehen Namen und Mitglieder eines Chats, nie seine Nachrichten.
- Kein Kalender-Feed: AChat hat nichts Datiertes, das hineingehören würde.
