---
sidebar_position: 5
title: "Webhooks"
description: "AChat-Webhooks: Füge eine https-Adresse hinzu, wähle Ereignisse und prüfe die Standard-Webhooks-Signatur jeder Zustellung in Node oder Python. Jedes Ereignis und seine Daten, der Wiederholungsplan, Pausieren und was eine Adresse abschaltet."
keywords: [AChat Webhooks, Standard Webhooks, Webhook-Signatur, webhook-signature prüfen, HMAC-SHA256, Webhook für Kontaktanfragen]
last_update:
  date: 2026-11-21
  author: AChat-Team
---

# Webhooks

**AChat schickt eine kurze, signierte Nachricht an deinen eigenen Server, wenn sich in deinem Konto etwas ändert, damit deine Werkzeuge reagieren können, ohne jede Minute zu fragen.** Jedes Ereignis sagt mit IDs, was sich wann geändert hat. Es trägt nie den Text einer Nachricht, einen Namen oder sonst etwas, das du schützen müsstest; den Rest holt dein Server mit einem [Zugangsschlüssel](./access-keys.md).

## Eine Adresse hinzufügen

1. Wähle unter **Konto › Andere Apps › Webhooks** **Webhook-Adresse hinzufügen**.
2. Füge die Adresse ein und, wenn du magst, eine Notiz für dich.
3. Wähle die Ereignisse, über die sie Bescheid bekommen soll.
4. Wähle **Adresse hinzufügen** und kopiere dann das Signaturgeheimnis (`whsec_…`).

Zum Hinzufügen einer Adresse brauchst du eine Anmeldung in den letzten 10 Minuten, mit dem Code, wenn die [Anmeldung in zwei Schritten](./two-step-sign-in.md) an ist. AChat schickt dir eine E-Mail, wenn eine Adresse hinzugefügt wird.

Die Adresse muss:

- mit `https://` beginnen; AChat sendet nicht über einfaches http;
- den Standardport (443) oder 8443 nutzen;
- keinen Namen und kein Passwort enthalten; prüfe stattdessen die Signatur;
- aus dem Internet erreichbar sein. Private Netze, dieser Computer und die eigenen Domains von AChat werden abgelehnt.

Dein Tarif legt fest, wie viele Adressen du gleichzeitig haben kannst (3 bei Free standardmäßig; siehe [was dein Tarif erlaubt](./index.md#what-your-plan-allows)).

## Wie eine Zustellung aussieht

Ein `POST` mit JSON-Body und drei Headern, gesendet als `AChat-Webhooks/1.0`:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` ist das Ereignis, `timestamp` der Zeitpunkt, und `data` enthält die unten aufgeführten IDs und Zeiten. `webhook-id` ist die ID des Ereignisses und bleibt bei jeder Wiederholung gleich, also nutze sie, um ein Duplikat zu erkennen.

## Ereignisse

| Ereignis | Wann | `data` |
|---|---|---|
| `profile.updated` | Dein Benutzername, Name, deine Avatarfarbe oder dein Foto hat sich geändert | `id` (deine) |
| `status.posted` | Du hast einen Status gepostet | `id`, `created_at`, `expires_at` |
| `status.deleted` | Ein Status von dir wurde gelöscht | `id` |
| `block.added` | Du hast jemanden gesperrt | `id` (dessen), `created_at` |
| `block.removed` | Du hast jemanden entsperrt | `id` (dessen) |
| `contact.added` | Ein Kontakt wurde hinzugefügt | `id` (des Kontakts), `created_at` |
| `contact.removed` | Ein Kontakt wurde entfernt | `id` (des Kontakts) |
| `contact_request.received` | Jemand hat dir eine Kontaktanfrage geschickt | `id` (der anfragenden Person), `created_at` |
| `chat.joined` | Du bist einem Chat oder Raum beigetreten | `id` (des Chats), `joined_at` |
| `chat.left` | Du hast einen Chat oder Raum verlassen oder wurdest entfernt | `id` (des Chats) |
| `message.created` | In einem offenen Raum oder Kanal, in dem du bist, kam eine Nachricht an | `id`, `chat_id`, `created_at` |
| `webhook.test` | Du hast **Test-Ereignis senden** gewählt | `message`: `"Test event"` |

`message.created` löst nur bei Text- und Link-Nachrichten in offenen Räumen und Kanälen aus. Eine Nachricht in einem Direktchat, einer Gruppe oder einem Raum mit Passwort erzeugt nie ein Ereignis, weil AChat sie nicht lesen kann. Jede `id` passt zum Eintrag mit derselben ID in der [API](./api.md): Hol `/messages/{id}`, `/status/{id}` oder `/contacts/{id}` mit einem Schlüssel, der die Berechtigung hat.

Ein Ereignis wird nur aufgezeichnet, solange eine deiner Adressen darauf hört. Füge zuerst die Adresse hinzu; Änderungen von vor ihrer Existenz werden nicht nachträglich gesendet.

## Die Signatur prüfen

Jede Zustellung ist nach [Standard Webhooks](https://www.standardwebhooks.com) signiert: HMAC-SHA256 über `webhook-id`, einen Punkt, `webhook-timestamp`, einen Punkt und den Roh-Body, mit den Bytes deines Geheimnisses als Schlüssel (der Teil nach `whsec_`, base64-dekodiert). `webhook-signature` enthält einen oder mehrere durch Leerzeichen getrennte `v1,<base64>`-Werte; nimm die Zustellung an, wenn einer davon passt. Lehne alles ab, dessen Zeitstempel mehr als fünf Minuten von deiner Uhr abweicht.

Prüfe den **rohen** Body genau so, wie er angekommen ist. JSON zu parsen und neu zu serialisieren verändert die Bytes und bricht den Abgleich.

### Node

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyAchatWebhook(secret, headers, rawBody) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

Mit Express nimmst du den Body auf dieser Route roh entgegen:

```js
import express from 'express';

const app = express();

app.post('/hooks/achat', express.raw({ type: 'application/json' }), (req, res) => {
  const raw = req.body.toString('utf8');
  if (!verifyAchatWebhook(process.env.ACHAT_WEBHOOK_SECRET, req.headers, raw)) {
    return res.status(401).end();
  }
  const event = JSON.parse(raw);
  // event.type, event.data.id …
  res.status(204).end();
});
```

### Python

```python
import base64
import hashlib
import hmac
import time


def verify_achat_webhook(secret: str, headers, raw_body: bytes) -> bool:
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not (msg_id and timestamp and signatures):
        return False
    if abs(time.time() - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()

    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

Mit Flask übergibst du `request.get_data()` und `request.headers`. Jede Standard-Webhooks-Bibliothek macht dieselbe Prüfung, wenn du sie nicht selbst schreiben willst.

## Schnell antworten

Antworte innerhalb von 10 Sekunden mit irgendeinem `2xx` und erledige die Arbeit danach. AChat folgt keinen Weiterleitungen. Ein `410 Gone` sagt AChat, die Adresse sofort abzuschalten; alles andere oder keine Antwort zählt als Fehler.

## Wiederholungen

Eine fehlgeschlagene Zustellung wird insgesamt 8-mal versucht: sofort, dann 5 Sekunden, 5 Minuten, 30 Minuten, 2 Stunden, 5 Stunden, 10 Stunden und 10 Stunden nach dem jeweils vorigen Versuch, etwas mehr als ein Tag vom ersten bis zum letzten. Jeder Versuch trägt dieselbe `webhook-id`.

Das **Zustellprotokoll** unter jeder Adresse zeigt jede Zustellung: Zugestellt, Nicht gesendet, Keine Antwort oder den Status, den dein Server geantwortet hat, mit der Nummer des Versuchs. **Erneut senden** schickt eine mit derselben ID noch einmal. Ereignisse und ihr Protokoll werden 30 Tage aufbewahrt.

## Pausieren, abschalten und wieder einschalten

- **Pausieren** überspringt Ereignisse, bis du **Fortsetzen** wählst. Ereignisse während der Pause werden nicht nachträglich gesendet.
- Eine Adresse, die 5 Tage ohne Unterbrechung fehlgeschlagen ist, wird **Nach Fehlern abgeschaltet**, und AChat schickt dir per E-Mail die Adresse, ihre letzte Antwort und wann die Fehler begannen. Nichts wird gesendet, bis du **Wieder einschalten** wählst.
- **Adresse entfernen** stoppt das Senden sofort, und ihr Zustellprotokoll verschwindet mit.

## Das Signaturgeheimnis

AChat zeigt das Geheimnis einmal beim Hinzufügen der Adresse und erneut 10 Minuten nach einer Anmeldung (mit dem Code, wenn die Anmeldung in zwei Schritten an ist): **Signaturgeheimnis anzeigen**. **Geheimnis ersetzen** erstellt ein neues, und 24 Stunden lang trägt jedes Ereignis zwei Signaturen, eine von jedem Geheimnis, damit dein Server umstellen kann, ohne etwas zu verpassen. Die Prüfungen oben akzeptieren bereits beide.
