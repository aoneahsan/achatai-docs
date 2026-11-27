---
sidebar_position: 5
title: "Lizenz prüfen"
description: "Wie du per Lizenzschlüssel oder Domain prüfst, ob eine Kopie von AChat unter anderem Namen lizenziert ist, und was jede Antwort bedeutet."
keywords: [AChat-Lizenz prüfen, White-Label-Lizenz prüfen, Lizenzschlüssel prüfen]
last_update:
  date: 2026-11-13
  author: AChat-Team
---

# Lizenz prüfen

**Jeder kann eine Kopie von AChat prüfen, die unter anderem Namen läuft.** Öffne [Lizenz prüfen](https://achat.aoneahsan.com/de/verify-license) und gib den Lizenzschlüssel der Kopie oder ihre Domain ein. Die Prüfung übernimmt unser Lizenzdienst.

## Per Domain

Jede lizenzierte Kopie stellt auf ihrer eigenen Domain unter `/.well-known/` eine Lizenzdatei bereit. Eine Domainprüfung liest diese Datei und prüft den darin genannten Schlüssel.

| Antwort | Bedeutung |
|---|---|
| Aktive Lizenz | Die Datei nennt eine Lizenz für diese Domain, und sie ist aktiv |
| Andere Domain | Die Datei nennt eine Lizenz, die für eine andere Domain ausgestellt wurde |
| Keine gültige Lizenz | Die Datei nennt eine Lizenz, die es nicht gibt |
| Keine Lizenzdatei | Die Domain stellt keine bereit |
| Keine Antwort | Die Domain war nicht erreichbar |

## Per Schlüssel

Eine Schlüsselprüfung sagt, ob die Lizenz aktiv ist, noch eingerichtet wird oder widerrufen wurde, und zeigt ihre öffentlichen Angaben: an wen sie lizenziert ist, ihre Domains, Plattformen und Daten. Eine E-Mail-Adresse oder einen Preis zeigt sie nie.

## Eine Kopie ohne aktive Lizenz

Sie zeigt statt der App „Diese Lizenz ist nicht aktiv“ mit einem Link zu dieser Prüfung. Nichts darin wird gelöscht.
