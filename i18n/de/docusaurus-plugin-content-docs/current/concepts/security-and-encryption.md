---
sidebar_position: 2
title: Sicherheits- und Verschlüsselungsmodell
description: Was die Ende-zu-Ende-Verschlüsselung von AChat abdeckt und was nicht, wie Schlüssel, verknüpfte Geräte und der Wiederherstellungsschlüssel zusammenhängen, und die Grenzen, die keine App aufheben kann.
keywords: [AChat Sicherheit, Modell der Ende-zu-Ende-Verschlüsselung, Wiederherstellungsschlüssel, verknüpfte Geräte, Bedrohungsmodell]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# Sicherheits- und Verschlüsselungsmodell

**AChat verspricht Ende-zu-Ende-Verschlüsselung für persönliche Chats, private Gruppen und Räume mit Passwort. Für Communities und ihre Kanäle, offene Räume und Status nicht.**

## Was Ende-zu-Ende-Verschlüsselung hier heißt

- Nachrichten in diesen Chats sind nur auf den Geräten der Leute darin lesbar.
- AChat speichert sie in einer Form, die weder seine Server noch seine Administratoren lesen können.
- AChat hat keine Kopie deiner Nachrichtenschlüssel und kann deinen Verlauf daher weder lesen noch wiederherstellen.
- Push-Benachrichtigungen enthalten den Namen des Chats oder des Absenders, nie den Nachrichtentext.
- Die Suche schaut nur auf Nachrichten, die schon auf deinem Gerät sind.
- Auch andere Apps können sie nicht lesen. Ein Zugangsschlüssel, ein KI-Assistent oder ein Webhook sieht Namen und Mitglieder eines verschlüsselten Chats, nie seine Nachrichten. Siehe [AChat für Entwickler](/developers#what-other-apps-can-reach).

## Schlüssel, Geräte und Wiederherstellung

- **Verknüpfte Geräte** halten jeweils deine Schlüssel. Gibst du ein Gerät frei, kann es deine Chats samt Verlauf lesen und als du Nachrichten senden. Vergleiche die Sicherheitscodes, um eine Verknüpfung zu prüfen.
- **Ein Gerät zu entfernen** stoppt neue Nachrichten an dieses Gerät und meldet es ab. Was es schon gespeichert hat, bleibt darauf.
- **Gruppen bekommen neue Schlüssel**, wenn sich ihre Mitglieder ändern, damit Ausgetretene keine neuen Nachrichten lesen.
- **Den Wiederherstellungsschlüssel** bewahrst du auf. Die Google-Anmeldung allein stellt deinen Verlauf nicht wieder her. Verlierst du den Schlüssel und alle verknüpften Geräte, kann ihn niemand wiederherstellen.

## Raumpasswörter

Ein Raum mit Passwort verschlüsselt seine Nachrichten auf deinem Gerät mit diesem Passwort. Nach zu vielen Fehlversuchen hintereinander musst du warten, bevor du es erneut versuchst. Für ein Passwort, das du festlegst, gibt es Hinweise zur Stärke, geprüft auf deinem Gerät.

## Privater Standortverlauf

In einem persönlichen Chat, einer privaten Gruppe oder einem Raum mit Passwort ist der [Geräte- und Standortverlauf](/features/location-history) Ende-zu-Ende-verschlüsselt. Nur Mitglieder, die das Audit-Passwort des Chats (oder das Raumpasswort) eingeben, können ihn sehen, und die Administratoren von AChat können ihn nicht öffnen.

## Was Verschlüsselung nicht kann

- **Wer eine Nachricht liest, kann sie kopieren.** Leute in einem Chat können alles kopieren, speichern oder per Screenshot festhalten, auch selbstlöschende und Einmal-Nachrichten, solange sie offen sind. Späteres Löschen erreicht diese Kopien nicht.
- **Offene Chats sind offen.** Jeder mit dem Link zu einem offenen Raum kann ihn lesen. Communities und ihre Kanäle sind nicht Ende-zu-Ende-verschlüsselt.
- **Anonym heißt nicht unauffindbar.** Dein Gerät verbindet sich wie mit jeder Website mit den Servern von AChat, und Hoster speichern Verbindungsdaten wie deine IP-Adresse.
- **Ein verlorenes, entsperrtes Gerät ist ein Risiko.** Wer es hat, kann öffnen, was darauf gespeichert ist. [Datenschutz auf diesem Gerät](/features/privacy-on-this-device) erklärt den Sichtschutz und Von diesem Gerät löschen.
- **Was gesehen wurde, lässt sich nicht zurückholen.** Eine spätere Änderung von Einstellung oder Regeln holt nicht zurück, was gelesen, kopiert, gespeichert oder exportiert wurde.

## Moderation und Verschlüsselung

Die Moderatoren von AChat sehen eine Nachricht aus einem verschlüsselten Chat nur, wenn jemand in diesem Chat sie meldet und mit der Meldung schickt. Siehe [Aufsicht durch Admins](/concepts/admin-oversight).
