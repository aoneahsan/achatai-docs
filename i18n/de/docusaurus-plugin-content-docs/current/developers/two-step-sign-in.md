---
sidebar_position: 6
title: "Anmeldung in zwei Schritten"
description: "Füge nach der Google-Anmeldung bei AChat einen sechsstelligen Code aus einer Authenticator-App hinzu. Einrichtung, die zehn Wiederherstellungscodes, einen Browser 7 Tage merken, Handy verloren und was das AChat-Team für dich tun kann und was nicht."
keywords: [AChat Anmeldung in zwei Schritten, AChat 2FA, Authenticator-App, Wiederherstellungscodes, diesen Browser merken, Handy verloren AChat]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# Anmeldung in zwei Schritten

**Ist die Anmeldung in zwei Schritten an, fragt AChat nach der Google-Anmeldung nach einem sechsstelligen Code aus einer App auf deinem Handy.** Wer in dein Google-Konto kommt, kann dein AChat-Konto trotzdem nicht öffnen. Sie ist für alle und auf jedem Tarif freiwillig und Pflicht für die Konten, die die Admin-Bildschirme von AChat bedienen.

Sie funktioniert mit jeder Authenticator-App: Google Authenticator, Microsoft Authenticator, 1Password, Aegis und anderen. Du meldest dich weiterhin zuerst mit Google an; der Code kommt danach.

## Einrichten

1. Öffne **Konto › Sicherheit** und wähle **Anmeldung in zwei Schritten einrichten**.
2. Füge in deiner Authenticator-App ein Konto hinzu und scanne den Code, den AChat zeigt. Scannen klappt nicht? Gib stattdessen den Einrichtungsschlüssel ein. Die App nennt das Konto AChat.
3. Gib die sechs Ziffern aus der App ein, damit klar ist, dass App und AChat übereinstimmen.
4. Speichere deine zehn Wiederherstellungscodes (unten), setz das Häkchen und wähle **Fertig**.

## Wiederherstellungscodes

Du bekommst zehn Wiederherstellungscodes aus je zehn Buchstaben und Ziffern. Sie sind für den Tag, an dem das Handy weg ist: Einer davon meldet dich statt des Codes an, und jeder funktioniert einmal.

- Bewahre sie nicht auf dem Handy auf: in einem Passwortmanager oder ausgedruckt zu Hause. **Alle zehn kopieren** und **Als Datei herunterladen** (`achat-recovery-codes.txt`) sind auf demselben Bildschirm.
- AChat zeigt sie nur einmal. Es speichert einen Einweg-Fingerabdruck jedes Codes, nie den Code.
- **Konto › Sicherheit** zeigt, wie viele übrig sind. **Neue Wiederherstellungscodes erstellen** ersetzt den ganzen Satz, und die alten funktionieren nicht mehr, sobald die neuen erscheinen. Dafür brauchst du den Code aus deiner App und eine Anmeldung in den letzten 10 Minuten.

AChat schickt dir jedes Mal eine E-Mail, wenn ein Wiederherstellungscode benutzt wird.

## Anmelden

Gib nach Google den Code ein, den deine App für AChat zeigt. Nach fünf falschen Codes lässt AChat dich 10 Minuten warten; ein Wiederherstellungscode funktioniert sofort.

### Diesen Browser merken

Setz auf einem Computer oder Handy, das nur dir gehört, das Häkchen bei **Diesen Browser 7 Tage lang merken**, dann überspringt dieser Browser den Code 7 Tage lang. Die 7 Tage beginnen nicht neu, wenn du wiederkommst.

Ein gemerkter Browser fragt trotzdem nach dem Code, bevor er einen [Zugangsschlüssel](./access-keys.md) oder ein Webhook-Geheimnis anzeigt, erstellt oder ersetzt, und vor jedem Admin-Bildschirm. **Konto › Sicherheit › Browser, die den Code überspringen** listet jeden mit seinem Enddatum; **Vergessen** einen davon oder **Alle Browser vergessen**. Abmelden vergisst den Browser, in dem du gerade bist.

## Handy verloren?

1. Melde dich mit Google an, wähle **Stattdessen einen Wiederherstellungscode nutzen** und gib einen deiner Codes ein. Die Anmeldung in zwei Schritten bleibt an.
2. AChat sagt, wie viele Codes übrig sind, und bietet **Neues Handy einrichten** an. Mach das sofort, innerhalb von 10 Minuten nach dieser Anmeldung: Scanne den neuen Code mit dem neuen Handy, gib seine sechs Ziffern ein, und die Codes des verlorenen Handys funktionieren nicht mehr.

Du hast das alte Handy noch und willst nur umziehen? Wähle **Neues Handy einrichten** unter Konto › Sicherheit, gib einen Code vom Handy ein, das du jetzt nutzt, und scanne dann den neuen Code mit dem neuen.

## Handy und Codes verloren

Schreib dem AChat-Team über die [Kontaktseite](https://achat.aoneahsan.com/de/contact), von der E-Mail-Adresse deines Kontos. Bevor sich etwas ändert, prüft das Team mit mindestens zwei davon, dass du es bist:

- du hast von der E-Mail-Adresse deines Kontos geschrieben;
- du hast genannt, wo du dich normalerweise anmeldest;
- du hast etwas aus dem Verlauf deines Kontos genannt.

Sind die Prüfungen bestanden, schaltet das Team die Anmeldung in zwei Schritten für dein Konto aus. Deine Wiederherstellungscodes und gemerkten Browser gehen mit, und AChat schickt dir eine E-Mail, dass der Support sie ausgeschaltet hat. Melde dich mit Google an und richte sie neu ein.

Was das Team **nicht** kann:

- dir einen Code, einen Wiederherstellungscode oder deinen Einrichtungsschlüssel nennen; AChat speichert sie in keiner Form, die jemand lesen kann;
- sie ohne die Prüfungen oben ausschalten;
- deine Ende-zu-Ende-verschlüsselten Chats öffnen. Die kommen von einem verknüpften Gerät oder über deinen [Wiederherstellungsschlüssel](/features/devices-and-recovery) zurück, nie über den Support.

## Ausschalten

**Anmeldung in zwei Schritten ausschalten** unter Konto › Sicherheit, mit einem Code. Dann steht nur noch dein Google-Konto zwischen jemandem und deinem AChat-Konto, gemerkte Browser werden vergessen und deine Wiederherstellungscodes funktionieren nicht mehr. Mitarbeiterkonten behalten sie an.

## Letzte Anmeldungen

**Konto › Sicherheit › Letzte Anmeldungen** listet die letzten zehn Anmeldungen, neueste zuerst, und wie jede durchkam: Google und ein Code, Google in einem gemerkten Browser, Google und ein Wiederherstellungscode oder nur Google. Orte kommen aus der Netzwerkadresse und sind daher ungefähr. Erkennst du eine nicht? Wähle **Überall sonst abmelden** und erstelle dann neue Wiederherstellungscodes.
