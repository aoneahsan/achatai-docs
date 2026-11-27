---
sidebar_position: 95
title: Änderungsprotokoll
description: Die Versionsgeschichte von AChat – der Neubau, der persönliche Chats, Gruppen, Communities und Status bringt, und die früheren Versionen des anonymen Chats.
keywords: [AChat Änderungsprotokoll, Versionshinweise, Versionsgeschichte]
last_update:
  date: 2026-11-27
  author: AChat-Team
---

# Änderungsprotokoll

Maßgeblich sind die [Versionshinweise](https://achat.aoneahsan.com/de/feed) in der App, mit dem Datum, an dem jede Änderung live ging. Ältere Einträge hier beschreiben AChat so, wie es damals war.

## Elf Sprachen (2026-11-27)

- **Sechs weitere Sprachen:** Chinesisch, Hindi, Portugiesisch (Brasilien), Russisch, Japanisch und Urdu kommen zu Englisch, Spanisch, Französisch, Deutsch und Arabisch hinzu, in der App, auf ihren öffentlichen Seiten, in ihren E-Mails und in diesen Docs. Urdu liest sich von rechts nach links, in Nastaliq.
- **Jede öffentliche Seite hat in jeder Sprache ihre eigene Adresse**, etwa `/ja/about`, und die gewählte Sprache bleibt beim nächsten Besuch erhalten.
- **Übersetzen** in der **Entwurfshilfe** bietet alle elf an.

## Andere Apps, Assistenten und Anmeldung in zwei Schritten (2026-11-21)

- **Erreiche dein eigenes Konto von außerhalb von AChat:** eine API mit Zugangsschlüsseln, eine Verbindung für Claude, ChatGPT, Claude Code und Cursor und signierte Webhooks, alles unter Konto › Andere Apps. Profil, Einstellungen, Status-Beiträge und Sperrliste lassen sich ändern; Kontakte, Chats und Communities sind nur lesbar. Siehe [AChat für Entwickler](./developers/index.md).
- **Ende-zu-Ende-verschlüsselte Chats bleiben außen vor:** Externe Apps sehen Namen und Mitglieder eines Chats, nie seine Nachrichten. Ein Löschen durch einen Assistenten wartet auf dein Ja in AChat.
- **Anmeldung in zwei Schritten:** ein Code aus einer Authenticator-App nach Google, zehn Wiederherstellungscodes und ein freiwillig 7 Tage gemerkter Browser. Siehe [Anmeldung in zwei Schritten](./developers/two-step-sign-in.md).

## White-Label-Zahlungen und die Lizenzgebühr beim Kauf (2026-11-14)

- **Lizenzen, Käufe und Verlängerungen werden per Wise-Banküberweisung bezahlt.** Das AChat-Team bestätigt die Überweisung, dann kommt der Lizenzschlüssel per E-Mail.
- **Ein Kauf trägt jetzt eine Lizenzgebühr:** 7 % des Bruttoumsatzes von AChat, vierteljährlich mit einer Umsatzaufstellung, solange es Umsatz macht. Siehe [Fragen zu White-Label](./white-label/faq.md).

## White-Label-Lizenzen und Quellcode-Kauf (2026-11-13)

- **Betreibe AChat unter deinem eigenen Namen:** Das AChat-Team hostet es unter deiner Domain mit deinem Namen, Logo und deinen Farben, im Web und auf Android, iOS auf Anfrage. Siehe [White-Label und Lizenzen](./white-label/index.md).
- **Oder kauf es komplett:** den Quellcode aller Repositorys, aus denen die Web- und die Android-App entstehen, danach wird AChat nicht mehr verkauft.
- **Prüf die Lizenz jeder Kopie** per Schlüssel oder Domain unter [Lizenz prüfen](https://achat.aoneahsan.com/de/verify-license).

## Nachrichten und Antworten archivieren (2026-10-30)

- **Archiviere eine Nachricht oder Antwort** über ihr Menü. Deine eigene ist für alle verborgen, bis du sie zurückholst; die von jemand anderem nur für dich. Eine Hauptnachricht nimmt ihren Thread mit, nur die Antworten anderer auf deine Nachricht bleiben unter „Nachricht archiviert“.
- **Wähle** mehrere Nachrichten, Antworten oder Chats **aus** und archiviere sie gemeinsam oder hol sie gemeinsam zurück. Die Leiste sagt, wer sie nicht mehr sieht, bevor du „Archivieren“ drückst.
- **Archivierte Chats**, **Archivierte Nachrichten** und **Archivierte Antworten** haben je eine eigene Ansicht. Archivieren setzt kein eigenes Ablaufdatum, und nur du kannst zurückholen, was du archiviert hast. Siehe [Nachrichten verwalten](./features/manage-messages.md#archive-and-private-archive).

## Neubau (2026-10-03)

AChat wurde von Grund auf neu gebaut. Es ging am 2026-10-03 auf achat.aoneahsan.com live.

- **Persönliche Chats und Kontakte:** Leute per Benutzername, Einladungslink oder QR-Code hinzufügen, mit Nachrichtenanfragen, Sperren, Online-Status und Lesebestätigungen. Persönliche Chats und private Gruppen sind Ende-zu-Ende-verschlüsselt.
- **Verknüpfte Geräte und ein Wiederherstellungsschlüssel** bringen deinen Verlauf auf jedes Gerät, das du erlaubst, und zurück, wenn du alle verlierst. Eine Verknüpfung zu erlauben, nimmt den Verlauf mit.
- **Gruppen** mit Rollen und Einladungslinks, nach dem Verlassen weiter lesbar (nur lesen); **Communities** mit Kanälen, Threads, Ab-18-Kennzeichnung, Meldungen, Sperren und einem Moderationsverlauf.
- **Status** für deine Kontakte, nach 24 Stunden weg.
- **Anonyme Räume** funktionieren weiter, alte Links eingeschlossen, mit Passwörtern, behaltenen Räumen und einem privaten Archiv. Frühere Nachrichten und Dateien in Räumen mit Passwort bleiben lesbar.
- **Nachrichten:** bearbeiten, weiterleiten, anheften, Umfragen, die man schließen kann, verschwindende Nachrichten pro Chat, einmal ansehen, Für mich leeren / Für alle leeren und ein Papierkorb pro Chat.
- **Schreiben:** Entwürfe, Spoiler, Mathe, Erwähnungen, Sticker, eingefügte Bilder, Sprachnachrichten, Diktat, Übersetzung auf dem Gerät und Vorlesen.
- **Privatsphäre auf diesem Gerät:** Sichtschutz, neutraler Tab-Titel, Leeren der Zwischenablage und Von diesem Gerät löschen.
- **Geräte- und Standortverlauf**, pro Chat freiwillig, mit Zustimmung vor dem Betreten.
- **Tarife:** Free, Pro und Team / Family, bezahlt in AChats eigenem Bezahlvorgang, dazu Empfehlungen.
- **Zahlung per Karte**, wenn verfügbar: ein Monats- oder Jahresabo auf der Seite von Polar, verwaltet unter Dein Abonnement im Konto. Die Banküberweisung bleibt.
- **Fünf Sprachen:** Englisch, Spanisch, Französisch, Deutsch und Arabisch.
- **Admin-Bereich**, der Chat-Details zeigt, aber nie Nachrichten, mit einem Aktionsprotokoll, das niemand ändern kann, Freigaben für Dauerhaft behalten und Suchgrenzen, die der Admin festlegt.
- **Offline:** ein Postausgang, der der Reihe nach sendet, wenn du wieder da bist.
- **Suche** auf deinem Gerät, über eine festgelegte Zahl von Chats und Nachrichten.

Nicht enthalten: Sprach- und Videoanrufe.

## Korrektur beim Löschen in Threads (2026-08-05)

- Lösch eine einzelne Thread-Antwort für sich, oder lösch die Nachricht, mit der ein Thread beginnt, um sie samt allen Antworten zusammen in den Papierkorb zu schieben.

## 0.4.0: erste Version auf Google Play (2026-07-24)

- Der anonyme Chat ohne Registrierung als Android-App.
- Lange Chats laden zuerst die neuesten Nachrichten, mit **Ältere laden**.
- Analyse und Fehlerberichte, die nie Chat-IDs, Nachrichten, Passwörter oder Dateien bekommen.
- Freiwillige Konto-E-Mails, eine Kontaktseite und Push-Benachrichtigungen auf Wunsch.

## 0.3.0: verwalten, suchen und sperren (2026-06)

- Suche auf dem Gerät in den Chats, die du geöffnet hattest.
- Ein Papierkorb pro Chat, ein privates Archiv für Angemeldete und Weiterleiten.
- Einem offenen Chat später ein Passwort geben; frühere Nachrichten blieben, wie sie gesendet wurden.
- Eine Administratorrolle mit Aktionsprotokoll.

## 0.2.0: Vorbereitung für den Play Store (2026-06)

- Kontolöschung in der App, dazu Datenschutz, Bedingungen und Store-Angaben.

## Früher (2026-05)

- **Spaces:** Threads, private Gruppenchats, öffentliche Communities und das einbettbare Widget.
- **Chats behalten:** freiwillige Google-Anmeldung, um einen Chat über seine 10 Tage hinaus zu behalten.
- **Eingabefeld und Themes:** Reaktionen, Umfragen, Anheften, eine Befehlspalette, Nachrichten bearbeiten, Erwähnungen, Export und die Theme-Anpassung.
- **Erste Version:** anonyme Chats per ID, freiwillige Passwortverschlüsselung, Datei-Uploads und automatisches Löschen nach 10 Tagen.
