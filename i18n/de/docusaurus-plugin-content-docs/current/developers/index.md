---
sidebar_position: 1
title: "AChat für Entwickler"
description: "Erreiche dein eigenes AChat-Konto aus einem Skript, einem KI-Assistenten oder deinem Server: eine API mit Zugangsschlüsseln, eine Assistenten-Verbindung für Claude und ChatGPT, signierte Webhooks und die Anmeldung in zwei Schritten. Verschlüsselte Chats verlassen AChat nie."
keywords: [AChat API, AChat MCP, AChat Webhooks, Zugangsschlüssel, Claude mit AChat verbinden, AChat Anmeldung in zwei Schritten]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# AChat für Entwickler

**Dein AChat-Konto ist auch außerhalb der App erreichbar, durch dich, zu deinen Bedingungen.** Ein Skript kann einen Status posten oder deine Sperrliste abgleichen, Claude kann dir sagen, in welchen offenen Räumen neue Nachrichten kamen, und dein Server erfährt in dem Moment, in dem dir jemand eine Kontaktanfrage schickt. Jeder Tarif hat es, Free eingeschlossen, und jeder Weg führt zu genau einem Konto: deinem.

## Was brauchst du?

| Du willst | Nutze |
|---|---|
| Dass ein Skript oder Dienst von dir dein Konto liest oder ändert | Einen [Zugangsschlüssel](./access-keys.md) und die [API](./api.md) |
| Dass Claude, ChatGPT, Claude Code oder Cursor mit deinem Konto arbeiten | Eine [Assistenten-Verbindung](./assistants.md) |
| Dass dein Server Bescheid bekommt, wenn sich etwas ändert, ohne jede Minute zu fragen | [Webhooks](./webhooks.md) |
| Einen Code nach der Google-Anmeldung, damit ein gestohlenes Google-Konto nicht reicht | [Anmeldung in zwei Schritten](./two-step-sign-in.md) |

Alle vier sind in der App: Schlüssel, verbundene Apps und Webhooks unter **Konto › Andere Apps**, die Anmeldung in zwei Schritten unter **Konto › Sicherheit**.

## Was andere Apps erreichen {#what-other-apps-can-reach}

Eine App kommt nur über einen Schlüssel herein, den du erstellt hast, oder eine Verbindung, die du erlaubt hast. In beiden Fällen gelten drei Regeln.

| | Was | Von außerhalb von AChat |
|---|---|---|
| **Deins** | Dein Profil, deine Einstellungen, deine Status-Beiträge und deine Sperrliste | Lesen und ändern. Löschen ist eine eigene Berechtigung, aus, solange du sie nicht ankreuzt |
| **Mit anderen geteilt** | Kontakte, Chats, Nachrichten in offenen Räumen, Communities und Kanäle | Nur lesen. Keine App kann dort posten, entfernen oder einladen |
| **Ende-zu-Ende-verschlüsselt** | Direktchats, Gruppen und Räume mit Passwort | Nie. Eine App sieht den Namen eines Chats und dass du darin bist, nie seine Nachrichten |

Die letzte Regel ist keine Einstellung. Die Nachrichten deiner Direktchats, Gruppen und Räume mit Passwort sind auf deinen Geräten verschlossen, und die Server von AChat können sie nicht lesen, also auch kein Schlüssel und kein Assistent. Dasselbe gilt für deine Geräteschlüssel, deinen Wiederherstellungsschlüssel und deine Codes für die Anmeldung in zwei Schritten. Siehe [Sicherheit und Verschlüsselung](/concepts/security-and-encryption).

## Was dein Tarif erlaubt {#what-your-plan-allows}

| | Free | Pro | Team / Family |
|---|---|---|---|
| Zugangsschlüssel gleichzeitig | 5 | 25 | 50 |
| API- und Assistenten-Anfragen pro Tag | 5.000 | 50.000 | 100.000 |
| Webhook-Adressen gleichzeitig | 3 | 20 | 40 |
| Assistenten-Verbindungen gleichzeitig | 3 | 10 | 25 |

Das sind die heutigen Standardwerte. Das AChat-Team legt die Zahlen jedes Tarifs fest, deshalb zeigt **Konto › Andere Apps › Nutzung nach deinem Tarif**, was für dich gilt, mit dem heutigen Stand. Anfragen zählen ab Mitternacht UTC, über alle Schlüssel und Assistenten des Kontos. Jeder Schlüssel und jede Verbindung ist außerdem auf jedem Tarif auf 120 Anfragen pro Minute begrenzt, damit ein außer Kontrolle geratenes Skript stoppt, bevor es den Tag aufbraucht.

## Es gibt keinen Kalender-Feed

AChat hat nichts Datiertes, das in einen Kalender gehört, also gibt es keinen Kalender-Feed zum Abonnieren.

## Für Maschinen

- OpenAPI 3.1: [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)
- Dieselbe Referenz als Markdown: [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md)
- Was sich wann geändert hat: [Änderungsprotokoll für Entwickler](./changelog.md)
