---
sidebar_position: 1
title: So funktioniert AChat
description: Die zwei Identitäten in AChat — ein Konto und ein anonymer Anzeigename —, welche Chatarten es gibt, wo Nachrichten liegen und wie lange alles bleibt.
keywords: [wie AChat funktioniert, anonymer Chat oder mit Konto, Aufbewahrung von Chats, Suche auf dem Gerät, Nachrichten offline]
last_update:
  date: 2026-11-27
  author: AChat-Team
---

# So funktioniert AChat

**In AChat gibt es zwei Arten, in einem Chat zu sein: ein Konto (Google-Anmeldung plus Benutzername) oder, in anonymen Räumen, ein Anzeigename ohne Konto.** Beides wird nie verknüpft: Auch wenn du ein Konto hast, verbindet AChat deine anonymen Nachrichten nicht damit.

## Chatarten

| Chat | Wer drin ist | Konto nötig | Ende-zu-Ende-verschlüsselt |
|---|---|---|---|
| Persönlicher Chat | Du und ein Kontakt | Ja | Ja |
| Private Gruppe | Kontakte, die du einlädst, oder Leute, die ein Admin freigibt | Ja | Ja |
| Anonymer Raum | Jeder mit dem Link (und dem Passwort, falls gesetzt) | Nein | Nur mit Passwort |
| Community-Kanal | Mitglieder der Community | Je nach Community | Nein |
| Status | Deine angenommenen Kontakte | Ja | Nein |

## Wo Nachrichten liegen

- **Auf den Servern von AChat:** die Nachrichten jedes Chats, damit jedes Gerät sie abrufen kann. Ende-zu-Ende-verschlüsselte Nachrichten liegen dort in einer Form, die weder die Server noch die Administratoren von AChat lesen können.
- **Auf deinen Geräten:** Chats und Dateien, die du geöffnet hast, damit sie schnell laden und offline aufgehen, dazu ein Postausgang mit Nachrichten, die auf den Versand warten. Die Suche läuft hier, über das, was das Gerät hat.
- **Deine Schlüssel:** auf deinen verknüpften Geräten, und mit deinem Wiederherstellungsschlüssel zurückzuholen. AChat hat keine Kopie.

## Wie lange etwas bleibt

| Was | Wie lange |
|---|---|
| Persönliche Chats und Gruppen | Bis jemand sie löscht, außer der Chat nutzt selbstlöschende Nachrichten (1 Minute, 1 Stunde oder 1 Tag) |
| Nachrichten in anonymen Räumen | Eine festgelegte Zahl von Tagen nach dem Senden jeder Nachricht (standardmäßig 10), oder bis zum Aufbewahrungsdatum, wenn jemand den Raum behält |
| Papierkorb | Eine festgelegte Zahl von Tagen (standardmäßig 30), nie länger als der Verlauf des Chats selbst |
| Status | 24 Stunden |
| Standortverlauf | Bis der Chat endgültig aus dem Papierkorb gelöscht wird oder abläuft |

Alles Weitere steht auf der [Datenschutzseite](https://achat.aoneahsan.com/de/privacy), zusammengefasst in [Daten, Datenschutz und Löschen](/concepts/data-privacy-and-deletion).

## So wird eine Nachricht gesendet

1. Du schreibst sie. Sie landet zuerst im Postausgang und übersteht so einen Verbindungsabbruch oder ein Neuladen.
2. AChat sendet sie und versucht es erneut, bis sie angenommen ist, ohne sie doppelt zu senden.
3. Die Angabe darunter wechselt von **Wird gesendet** (offline **Wartet auf Senden**) zu **Gesendet**, sobald sie angekommen ist.

## Plattformen

Dasselbe AChat läuft im Browser und auf Android, in elf Sprachen. Sprach- oder Videoanrufe gibt es nicht.
