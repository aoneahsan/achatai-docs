---
sidebar_position: 2
title: "Zugangsschlüssel"
description: "Erstelle unter Konto › Andere Apps einen AChat-Zugangsschlüssel, wähle, was er lesen, ändern oder löschen darf und wann er aufhört zu funktionieren. Wann ein Schlüssel wieder angezeigt werden kann, wie du ihn ohne Lücke ersetzt und wie du ihn entfernst."
keywords: [AChat Zugangsschlüssel, achat_pat, API-Schlüssel, persönliches Zugriffstoken, Schlüsselberechtigungen, Schlüssel rotieren]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# Zugangsschlüssel

**Mit einem Zugangsschlüssel kann ein Skript oder Dienst von dir dein Konto über die [AChat-API](./api.md) lesen oder ändern.** Er beginnt mit `achat_pat_`, handelt als du und kann nur, was du beim Erstellen angekreuzt hast. Behandle jeden wie ein Passwort.

## Einen Schlüssel erstellen

1. Öffne **Konto › Andere Apps** und wähle **Zugangsschlüssel erstellen**.
2. Gib ihm einen Namen, den du wiedererkennst, etwa „Heimserver“.
3. Kreuze an, was er darf (siehe [Berechtigungen](#permissions)).
4. Wähle, wann er aufhört zu funktionieren: 30, 90 oder 365 Tage oder **Nie**.
5. Wähle **Schlüssel erstellen**, kopiere ihn und leg ihn dort ab, wo er gebraucht wird.

Zum Erstellen eines Schlüssels brauchst du eine Anmeldung in den letzten 10 Minuten. Ist die [Anmeldung in zwei Schritten](./two-step-sign-in.md) an, muss diese Anmeldung den Code enthalten haben; ein Browser, der den Code übersprungen hat, weil er dich merken sollte, zählt nicht. Ist es länger her, bittet AChat dich, dich neu anzumelden, und bringt dich direkt zurück.

AChat schickt dir jedes Mal eine E-Mail, wenn ein Schlüssel erstellt wird.

## Berechtigungen {#permissions}

Jede Art von Daten hat bis zu drei Häkchen: **Lesen**, **Ändern** und **Löschen**. Ändern schließt Lesen ein. Löschen schließt nichts anderes ein und wird nie für dich angekreuzt.

| Daten | Lesen | Ändern | Löschen |
|---|---|---|---|
| Profil: Benutzername, der Name, den andere sehen, Avatarfarbe | `profile:read` | `profile:write` (Name und Farbe) | — |
| Einstellungen: wer dich online sieht, Lesebestätigungen, Sprache, Benachrichtigungen | `preferences:read` | `preferences:write` | — |
| Status-Beiträge | `status:read` | `status:write` (neue Textbeiträge) | `status:delete` |
| Gesperrte Personen | `blocks:read` | `blocks:write` (jemanden sperren) | `blocks:delete` (entsperren) |
| Kontakte | `contacts:read` | — | — |
| Chats und Nachrichten in offenen Räumen und Kanälen | `chats:read` | — | — |
| Communities und ihre Kanäle | `communities:read` | — | — |

In Kontakten, Chats und Communities sind andere Menschen, deshalb sind sie nur lesbar, egal was du ankreuzt. Direktchats, Gruppen und Räume mit Passwort zeigen ihren Namen und ihre Mitglieder; ihre Nachrichten verlassen AChat nie.

## Wann ein Schlüssel aufhört zu funktionieren

- **30, 90 oder 365 Tage** für jeden Schlüssel.
- **Nie** nur für einen Schlüssel, der nur liest. Ein Schlüssel, der ändern oder löschen kann, endet immer, höchstens nach 365 Tagen.

Die Zeile des Schlüssels unter Andere Apps zeigt, an welchem Datum er aufhört zu funktionieren und wann er zuletzt benutzt wurde.

## Einen Schlüssel erneut anzeigen

AChat kann einen Schlüssel 10 Minuten nach deiner Anmeldung erneut anzeigen, mit dem Code, wenn die Anmeldung in zwei Schritten an ist. Danach wähle **Melde dich neu an, um ihn anzuzeigen**. AChat zeigt Schlüssel höchstens 10-mal pro Stunde und Konto. AChat speichert nur eine versiegelte Kopie und einen Einweg-Fingerabdruck, nie den Schlüssel im Klartext.

## Einen Schlüssel ersetzen

**Ersetzen** gibt dir einen neuen Schlüssel mit demselben Namen und denselben Berechtigungen. Der alte funktioniert noch 24 Stunden, damit du ohne Lücke umstellen kannst. Ein Schlüssel mit Enddatum bekommt ein neues nach 90 Tagen; ein Nur-Lese-Schlüssel mit Nie endet weiterhin nie. Ersetzen braucht dieselbe frische Anmeldung wie das Erstellen, und AChat schickt dir dazu eine E-Mail.

## Einen Schlüssel entfernen

**Entfernen** stoppt den Schlüssel sofort: Alles, was ihn noch nutzt, wird ab der nächsten Anfrage abgelehnt. Das lässt sich nicht rückgängig machen, aber du kannst einen neuen Schlüssel erstellen.

## Wie viele Schlüssel

Dein Tarif legt fest, wie viele Schlüssel du gleichzeitig haben kannst (5 bei Free standardmäßig; die ganze Tabelle steht unter [AChat für Entwickler](./index.md#what-your-plan-allows)). Sind alle belegt, entferne einen, um einen neuen zu erstellen.

## Wer keine Schlüssel erstellen kann

Sitzungen in anonymen Räumen sind nie Konten, also können sie keine Schlüssel erstellen, keine Apps verbinden und keine Webhook-Adressen hinzufügen. Bei einem gesperrten Konto oder einem, dessen Löschung beantragt wurde, werden alle Schlüssel und Verbindungen abgelehnt.
