---
sidebar_position: 17
title: Geräte- und Standortverlauf
description: Manche Chats in AChat zeichnen einen Geräte- und Standortverlauf auf. Was aufgezeichnet wird, wer es sehen kann, wie lange es bleibt und wie ein Chat fragt, bevor du ihn betrittst.
keywords: [Standortverlauf im Chat, Chat-Prüfprotokoll, Standort-Zustimmung, AChat Standort]
last_update:
  date: 2026-09-28
  author: AChat-Team
---

# Geräte- und Standortverlauf

**Ein Chat kann den Geräte- und Standortverlauf einschalten. Bevor du ihn betrittst, zeigt er, was er aufzeichnet und wer es sehen kann. Sagst du Nein, bleibt der Chat geschlossen.** Deine anderen Chats sind nicht betroffen.

## Was aufgezeichnet wird

Der Chat zeichnet einen Eintrag auf, wenn du ihn betrittst, alle 5 Minuten, solange er offen ist, und jedes Mal, wenn du zurückkommst. Jeder Eintrag enthält:

- deinen genauen Standort und wie genau dein Gerät ihn angibt
- Datum und Uhrzeit
- eine Geräte-ID, die nur in diesem Chat verwendet wird
- deinen Browser und dein Betriebssystem sowie deine Sprache und Zeitzone

Der Verlauf zeigt nie deine IP-Adresse oder eine ID, die dich über Chats hinweg verknüpft. Dein Gerät meldet den Standort, also kann die echte Position weiter abweichen.

## Wer es sehen kann

| Chat | Wer die Einträge sieht |
|---|---|
| Öffentlicher Chat | Jeder, der den Chat öffnen kann, jetzt oder später. Was man sieht, kann man kopieren |
| Persönlicher Chat oder private Gruppe | Nur Mitglieder, die das **Audit-Passwort** des Chats eingeben. Die Einträge sind Ende-zu-Ende-verschlüsselt; die Administratoren von AChat können sie nicht öffnen |
| Raum mit Passwort | Nur Mitglieder, die das Raumpasswort eingeben, ebenso Ende-zu-Ende-verschlüsselt |

Vergessen alle in einem Chat das Audit-Passwort, ist der private Standortverlauf dieses Chats für immer verloren.

## Wie lange es bleibt

So lange, wie der Chat besteht. Einträge enden erst, wenn der Chat endgültig aus dem Papierkorb gelöscht wird oder abläuft. Den Verlauf auszuschalten, stoppt neue Einträge; frühere werden nicht gelöscht.

## Alter

Diese Chats sind für Menschen, die angeben, ein Mindestalter erreicht zu haben, das der Chat vor dem Betreten zeigt. AChat prüft die Angabe nicht.

## Grenzen

- Ein Chat mit eingeschaltetem Standortverlauf braucht zum Öffnen eine Verbindung.
- Er lässt sich nicht im [Widget](/features/embeddable-widget) einer anderen Website öffnen; öffne ihn in AChat.
- Pausiert dein Browser den Tab, pausiert auch die Aufzeichnung, und der Chat bittet bei deiner Rückkehr um einen neuen Eintrag.
- Den Chat zu verlassen, stoppt neue Einträge. Deine früheren bleiben.
- Den Verlauf einzuschalten, schließt den Chat für alle, auch für dich, bis jede Person zustimmt und ihren Standort teilt.
