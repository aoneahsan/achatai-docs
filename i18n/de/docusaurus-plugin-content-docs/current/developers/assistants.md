---
sidebar_position: 4
title: "Claude, ChatGPT, Claude Code oder Cursor verbinden"
description: "Verbinde einen KI-Assistenten über die MCP-Adresse von AChat mit deinem AChat-Konto. Einrichtung für Claude, ChatGPT, Claude Code und Cursor, was du erlaubst, warum ein Löschen immer auf dein Ja wartet und wie du die Verbindung trennst."
keywords: [AChat MCP, Claude mit AChat verbinden, AChat Connector für ChatGPT, Claude Code MCP, Cursor MCP, Chat-App mit KI-Assistent]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# Claude, ChatGPT, Claude Code oder Cursor verbinden

**Füge die Assistenten-Adresse von AChat in deinen Assistenten ein, erlaube ihn in AChat, und er kann dein Konto lesen und ändern, was dir gehört.** Er sieht nur, was du beim Erlauben ankreuzt. Er kann nie eine Ende-zu-Ende-verschlüsselte Nachricht lesen und nie etwas löschen, ohne dass du in AChat Ja sagst.

Die Assistenten-Adresse von AChat:

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

Es ist ein entfernter MCP-Server über Streamable HTTP. Du findest die Adresse auch mit einer **Kopieren**-Schaltfläche unter **Konto › Andere Apps › Einen Assistenten verbinden**.

## Claude

1. Öffne in Claude **Settings**, dann **Connectors**.
2. Wähle **Add custom connector** und füge die Adresse von AChat ein.
3. Claude öffnet AChat. Prüf, was angefragt wird, und erlaube es.

## ChatGPT

1. Öffne in ChatGPT **Settings**, dann **Apps and Connectors**, und schalte den Entwicklermodus ein.
2. Wähle **Create**, nenne es AChat und füge die Adresse ein.
3. ChatGPT öffnet AChat. Prüf, was angefragt wird, und erlaube es.

## Claude Code

1. Führe in einem Terminal aus:

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. Führe in Claude Code `/mcp` aus und wähle **achat**.
3. Dein Browser öffnet AChat. Prüf, was angefragt wird, und erlaube es.

## Cursor

1. Öffne in Cursor **Settings**, dann **MCP**, dann **Add new MCP server**.
2. Füge das in `mcp.json` ein:

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor öffnet AChat. Prüf, was angefragt wird, und erlaube es.

Andere MCP-Clients mit OAuth-Unterstützung funktionieren genauso: Einem Client ohne Token antwortet die Adresse, wo er sich anmelden soll, und der Client registriert sich selbst.

## Was du erlaubst

Die Zustimmungsseite in AChat nennt die App, die Adresse, zu der sie dich zurückschickt, und jede angefragte Berechtigung, mit denselben Häkchen Lesen, Ändern und Löschen wie ein [Zugangsschlüssel](./access-keys.md#permissions). Geteilte Daten bleiben nur lesbar, egal was angefragt wird, und eine Berechtigung, die AChat nicht anbietet, fällt aus der Anfrage. Nichts wird geteilt, bis du **Erlauben** wählst.

- Eine App, die sich „selbst bei AChat registriert“ hat: AChat hat nicht geprüft, wer sie betreibt, also lies, was sie anfragt.
- Kann die Verbindung etwas ändern, braucht das Erlauben eine Anmeldung in den letzten 10 Minuten und auch den Code, wenn die [Anmeldung in zwei Schritten](./two-step-sign-in.md) an ist.
- Du kannst der Verbindung einen Namen geben, damit du später zwei auseinanderhalten kannst.

AChat schickt dir eine E-Mail, wenn eine App verbunden wird. Dein Tarif legt fest, wie viele gleichzeitig verbunden sein können (3 bei Free standardmäßig; siehe [was dein Tarif erlaubt](./index.md#what-your-plan-allows)). Aufrufe von Assistenten zählen zum selben täglichen Anfragekontingent wie die API.

## Was ein Assistent kann

Jedes Werkzeug braucht die Berechtigung daneben, und die Werkzeugliste des Assistenten zeigt nur die Werkzeuge, die deine Erlaubnis gerade zulässt.

| Werkzeuge | Berechtigung |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

Die Felder sind die der API; siehe [Die AChat-API](./api.md). Listen liefern bis zu 50 Einträge pro Aufruf, mit einem Cursor für die nächste Seite. Nachrichten kommen nur aus offenen Räumen und Kanälen. Ein Direktchat, eine Gruppe oder ein Raum mit Passwort zeigt Namen und Mitglieder, nie, was gesagt wurde.

## Löschen wartet auf dich {#deletes-wait-for-you}

Ein Assistent löscht nie. Bittest du ihn, einen Status-Beitrag zu entfernen oder jemanden zu entsperren, ruft er `prepare_delete_status` oder `prepare_delete_blocks` auf, und AChat antwortet mit einem Link zu `https://achat.aoneahsan.com/developers/confirm/…`.

1. Öffne den Link. AChat zeigt, was der Assistent angefragt hat und was damit verschwindet.
2. Wähle **Löschen** (oder **Blockierung aufheben**) oder **Behalten**. Du bist in AChat, nicht im Assistenten, also kann er diese Schaltflächen nicht drücken.
3. Der Assistent erfährt nur, dass die Anfrage beendet ist.

Die Anfrage läuft nach 10 Minuten ab, und nichts wird gelöscht. Zum Bestätigen brauchst du eine Anmeldung in den letzten 10 Minuten, mit dem Code, wenn die Anmeldung in zwei Schritten an ist. Noch wartende Löschvorgänge stehen unter **Konto › Andere Apps › Verbundene Apps**. Ein [Zugangsschlüssel](./access-keys.md) mit der Berechtigung Löschen löscht sofort, weil du derjenige bist, der ihn ausführt.

## Trennen

Wähle unter **Konto › Andere Apps › Verbundene Apps** bei der Verbindung **Entfernen**. Sie verliert sofort den Zugriff, auch bei einer laufenden Anfrage. Willst du sie wieder nutzen, verbinde sie neu. **Umbenennen** ändert nur den Namen, den du siehst.

## Was Assistenten nicht erreichen

- Nachrichten in Direktchats, Gruppen und Räumen mit Passwort, die AChat selbst nicht lesen kann.
- Deine Geräteschlüssel, deinen Wiederherstellungsschlüssel, Codes für die Anmeldung in zwei Schritten, Zugangsschlüssel und Webhook-Geheimnisse.
- Dein Foto, Anhänge, Reaktionen und Umfragen.
- Alles, was einem anderen Konto gehört.

Der Text, den ein Assistent aus AChat liest (ein Status-Beitrag, eine Nachricht in einem offenen Raum), wird ihm als Daten zurückgegeben. Behandle Worte anderer Leute als deren Worte, nicht als Anweisungen an deinen Assistenten.
