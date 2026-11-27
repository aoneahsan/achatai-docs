---
sidebar_position: 4
title: Passwörter und Verschlüsselung
description: Welche Chats in AChat Ende-zu-Ende-verschlüsselt sind, was ein Raumpasswort schützt, und die Grenzen – offene Räume, Communities und Status sind nicht Ende-zu-Ende-verschlüsselt.
keywords: [Ende-zu-Ende-verschlüsselter Chat, Raumpasswort, verschlüsselter Gruppenchat, AChat Verschlüsselung]
last_update:
  date: 2026-10-01
  author: AChat-Team
---

# Passwörter und Verschlüsselung

**Persönliche Chats, private Gruppen und ihre Dateien sind Ende-zu-Ende-verschlüsselt, also lässt sich jede Nachricht nur auf den Geräten der Leute darin lesen.** Ein Raum mit Passwort verschlüsselt seine Nachrichten auf deinem Gerät mit diesem Passwort.

## Was verschlüsselt ist

| Chat | Ende-zu-Ende-verschlüsselt? |
|---|---|
| Persönliche Chats | Ja, mit ihren Dateien |
| Private Gruppen | Ja, mit ihren Dateien |
| Anonyme Räume mit Passwort | Ja, mit dem Raumpasswort verschlüsselt |
| Offene anonyme Räume | Nein. Jeder mit dem Link kann sie lesen |
| Communities und ihre Kanäle | Nein |
| Status | Nein. Die Server von AChat können sie lesen; Zugriffsregeln begrenzen, wer sonst jeden einzelnen sieht |

AChat speichert Ende-zu-Ende-verschlüsselte Nachrichten in einer Form, die weder seine Server noch seine Administratoren lesen können. AChat bewahrt keine Kopie deiner Nachrichtenschlüssel auf.

## Raumpasswörter

- Jeder braucht das Passwort, um den Raum zu betreten und zu lesen.
- Schick das Passwort getrennt vom Link.
- Zu viele falsche Versuche hintereinander lassen dich ein paar Minuten warten, bevor du es erneut versuchen kannst.
- Neue Passwörter zeigen eine Stärkeanzeige. Geprüft wird auf deinem Gerät, und das Passwort wird dafür nirgendwohin geschickt.

## Gruppen und wechselnde Mitglieder

Wenn sich die Mitglieder einer Gruppe ändern, bekommt die Gruppe neue Sicherheitsschlüssel, sodass Ausgetretene neue Nachrichten nicht lesen können. Wer beitritt, sieht Nachrichten, die nach dem Beitritt gesendet wurden; frühere werden nicht automatisch geteilt.

## Ein verknüpftes Gerät prüfen

Unter **Konto**, dann **Geräte**, kannst du die Sicherheitscodes zwischen zwei deiner Geräte vergleichen. Stimmen sie nicht überein, entferne das Gerät, dem du nicht traust. Siehe [Geräte und Wiederherstellungsschlüssel](/features/devices-and-recovery).

## Die Grenzen

- Jeder in einem Chat kann eine Nachricht kopieren, speichern oder einen Screenshot machen. Verschlüsselung schützt Nachrichten unterwegs und auf dem Server, nicht mehr, nachdem jemand sie gelesen hat.
- Die Suche sieht nur Nachrichten, die schon auf deinem Gerät sind.
- Push-Benachrichtigungen enthalten nie den Text der Nachricht.
- Verlierst du deinen Wiederherstellungsschlüssel und alle verknüpften Geräte, lässt sich dein Verlauf nicht wiederherstellen, weder von dir noch vom AChat-Team.

Das vollständige Modell steht unter [Sicherheit und Verschlüsselung](/concepts/security-and-encryption).
