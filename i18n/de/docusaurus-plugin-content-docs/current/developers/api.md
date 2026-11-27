---
sidebar_position: 3
title: "Die AChat-API"
description: "Die REST-API von AChat: die Basis-URL, der Authorization-Header, die Antwortstruktur, Fehlercodes, Cursor-Paginierung und Limits, dann jede Ressource mit einem funktionierenden curl-Beispiel, von deinem Profil und deinen Status-Beiträgen bis zu Nachrichten in offenen Räumen."
keywords: [AChat API, AChat REST API, achat_pat, AChat OpenAPI, AChat curl, Status-API, Sperrlisten-API]
last_update:
  date: 2026-11-27
  author: AChat-Team
---

# Die AChat-API

**Schick einen [Zugangsschlüssel](./access-keys.md) als Bearer-Token an `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`, und du bekommst JSON zurück.** Dein Profil, deine Einstellungen, deine Status-Beiträge und deine Sperrliste können gelesen und geändert werden; Kontakte, Chats, Nachrichten offener Räume, Communities und Kanäle nur gelesen. Nichts Ende-zu-Ende-Verschlüsseltes ist überhaupt in der API.

Die maschinenlesbare Referenz ist [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1), auch als [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). Keine von beiden braucht einen Schlüssel.

## Basis-URL und Schlüssel

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` sagt, was die Zugangsdaten sind und was sie dürfen, der schnellste Weg, einen neuen Schlüssel zu prüfen:

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8",
    "client_id": null,
    "scopes": ["blocks:read", "profile:read", "status:read", "status:write"]
  }
}
```

`kind` ist `pat` für einen Zugangsschlüssel und `oauth` für eine App, die du verbunden hast, etwa einen [Assistenten](./assistants.md). Die API akzeptiert beides.

## Die Antwortstruktur

Jede Antwort ist JSON in einer von drei Formen.

| Antwort | Form |
|---|---|
| Ein Eintrag | `{ "data": { … } }` |
| Eine Liste | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| Ein Fehler | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

Ein Löschen antwortet `204` ohne Body. Ein Feld, für das AChat keinen Wert hat, kommt als `null` zurück.

## Fehler

| HTTP | `code` | Wann |
|---|---|---|
| 400 | `invalid_request` | Eine falsche Abfrage, ein falscher Cursor oder ein Body, der die Feldregeln verletzt (`details.issues` nennt jedes Feld) |
| 401 | `invalid_token` | Der Schlüssel fehlt, ist falsch, abgelaufen oder entfernt |
| 403 | `scope_required` | Dem Schlüssel fehlt die Berechtigung; `details.scope` nennt sie |
| 404 | `not_found` | Nichts unter dieser Adresse für diesen Schlüssel, auch nicht der Eintrag einer anderen Person |
| 405 | `method_not_allowed` | Die Ressource nimmt diese Methode nicht an, etwa ein POST auf Kontakte |
| 409 | `conflict` | Eine Regel von AChat hat die Änderung abgelehnt; die Meldung sagt in einfachen Worten, welche |
| 413 | `payload_too_large` | Der Body ist zu groß |
| 429 | `rate_limited` | Zu viele Anfragen; siehe [Limits](#limits) |
| 500 | `internal` | Unser Fehler. Schick die `correlation_id` über die [Kontaktseite](https://achat.aoneahsan.com/de/contact) an das AChat-Team |

Die Meldung ist für Menschen geschrieben und enthält nie einen Stacktrace, SQL oder ein Geheimnis. Ganz ohne Schlüssel:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## Seiten, Sortierung und Filter

Listen liefern standardmäßig 20 Einträge und höchstens 50 (`limit=1` bis `limit=50`). Gibt es mehr, enthält `meta.next_cursor` einen Cursor: Schick ihn mit derselben Abfrage als `cursor` zurück, um die nächste Seite zu bekommen, und hör auf, wenn er `null` ist. Ein Cursor ist an die Abfrage gebunden, aus der er stammt; änderst du die Sortierung oder einen Filter, lehnt AChat ihn ab, also fang ohne ihn neu an.

`sort` nimmt die Werte, die jede Ressource unten nennt; ein führendes `-` bedeutet neueste zuerst. Filter schreibt man `field.op=value`:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Limits {#limits}

Jeder Schlüssel und jede Verbindung darf 120 Anfragen pro Minute stellen. Dazu legt dein Tarif fest, wie viele Anfragen das ganze Konto pro Tag stellen darf, gezählt ab Mitternacht UTC über alle Schlüssel und Assistenten (5.000 bei Free standardmäßig; siehe [was dein Tarif erlaubt](./index.md#what-your-plan-allows)). Jede Antwort trägt `ratelimit-limit`, `ratelimit-remaining` und `ratelimit-reset` (Sekunden, bis das engste Limit zurückgesetzt wird); ein `429` fügt `retry-after` in Sekunden hinzu. Anfragen zählen weiter, während du abgelehnt wirst, also warte lieber, statt in einer Schleife zu wiederholen.

## Profil

Dein eigenes Profil: ein Eintrag, dessen `id` deine eigene ID ist. `username` ist hier nur lesbar, weil ein neuer Benutzername über den Ablauf in der App geht. Lesen mit `profile:read`, ändern mit `profile:write`.

| Feld | Typ | Hinweise |
|---|---|---|
| `id` | uuid | Deine ID |
| `username` | String, bis 24 | Nur lesbar |
| `name` | String, 1 bis 100 | Der Name, den andere sehen |
| `hue` | Ganzzahl 0 bis 359 | Deine Avatarfarbe, wenn es kein Foto gibt |
| `created_at` | Datum und Uhrzeit | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

Dein Foto änderst du in der App, nicht hier.

## Einstellungen

Deine eigenen Einstellungen: ein Eintrag unter `/preferences`. Lesen mit `preferences:read`, ändern mit `preferences:write`.

| Feld | Werte |
|---|---|
| `presence_visibility` | `everyone`, `contacts` oder `nobody`: wer sieht, ob du online bist |
| `read_receipts` | `true` oder `false` |
| `language` | `en`, `zh-Hans`, `hi`, `es`, `ar`, `fr`, `pt-BR`, `ru`, `ja`, `ur`, `de` oder `null`, wenn keine gesetzt ist |
| `notify_sounds` | `true` oder `false` |
| `notify_preview` | `name` oder `none`: ob eine Benachrichtigung zeigt, wer geschrieben hat |
| `notify_mute_all` | `true` oder `false` |
| `show_mature` | Nur lesbar: folgt dem Alter, das du in der App angegeben hast |
| `id`, `updated_at` | Nur lesbar |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

Die `id` des Einstellungseintrags ist deine eigene ID, dieselbe wie die deines Profils und die `user_id`, die `/token` zurückgibt.

## Status-Beiträge

Deine eigenen Status-Beiträge der letzten 24 Stunden. Lesen mit `status:read`; posten mit `status:write`; löschen mit `status:delete`.

| Feld | Hinweise |
|---|---|
| `id`, `created_at`, `expires_at` | Nur lesbar |
| `kind` | `text`, `photo` oder `video`; nur lesbar |
| `text` | Die Worte eines Textbeitrags, bis zu 700 Zeichen; die Status-Länge deines Tarifs gilt |
| `bg_hue` | Die Hintergrundfarbe eines Textbeitrags, 0 bis 359; lässt du sie weg, wird deine Avatarfarbe genommen |
| `caption` | Die Bildunterschrift eines Fotos oder Videos; nur lesbar |
| `audience_mode` | `contacts`, `except` oder `only`; nur lesbar |
| `audience_count` | Wie viele Menschen der Beitrag erreicht; nur lesbar |

Filter: `kind.eq`, `created_at.gte`, `created_at.lt`. Sortierung: `-created_at` (Standard) oder `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Die API postet nur Text; Fotos und Videos brauchen den Upload in der App. Ein neuer Beitrag geht an das Publikum, das die Status-Einstellungen deiner App nennen, mit dem Posting-Limit der App selbst (30 pro Stunde), das beim Erreichen mit `409` und dem Grund antwortet. Status sind nicht Ende-zu-Ende-verschlüsselt, weder in der App noch hier.

## Gesperrte Personen

Die Personen, die du gesperrt hast, mit dem Benutzernamen und Namen, den sie zeigen. Lesen mit `blocks:read`; sperren mit `blocks:write`; entsperren mit `blocks:delete`. Hier ist `id` die ID der gesperrten Person.

| Feld | Hinweise |
|---|---|
| `id` | Die ID der gesperrten Person |
| `username` | Deren. Um jemanden zu sperren, schick ihn |
| `name` | Der Name, den sie zeigt; nur lesbar |
| `created_at` | Wann du sie gesperrt hast |

Sortierung: `-created_at` (Standard) oder `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Sperren funktioniert wie in der App: Die Person kann dir nicht mehr schreiben oder deinen Status sehen, und der Kontakt zwischen euch endet.

## Kontakte

Nur lesbar, mit `contacts:read`. Jeder Eintrag ist nach der anderen Person benannt: `id` (deren ID), `username`, `name`, `hue`, `chat_id` (dein Direktchat mit ihr oder `null`) und `created_at`. Sortierung: `-created_at` oder `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

Offene Kontaktanfragen an dich sind keine Ressource; dein Server kann über den [Webhook](./webhooks.md) `contact_request.received` davon erfahren.

## Chats

Die Chats, zu denen du gehörst, nur lesbar, mit `chats:read`.

| Feld | Hinweise |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` oder `channel` |
| `title`, `topic` | `null`, wenn der Chat keine hat |
| `end_to_end` | `true`, wenn die Nachrichten Ende-zu-Ende-verschlüsselt und hier nie lesbar sind |
| `has_password` | `true` für einen Raum mit Passwort |
| `last_message_at`, `joined_at` | `null`, wenn es keine gibt |

Filter: `kind.eq`. Sortierung: `-created_at` oder `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

Ein Direktchat, eine Gruppe oder ein Raum mit Passwort steht in der Liste, mit Namen und der Zeit der letzten Nachricht, aber seine Nachrichten nie.

## Nachrichten {#messages}

Nachrichten in den offenen Räumen und Kanälen, zu denen du gehörst, so wie sie geschrieben wurden: nur lesbar, mit `chats:read`. Räume mit Passwort, Direktchats und Gruppen sind nicht hier, ebenso wenig Einmal-ansehen-Nachrichten, von Moderatoren entfernte Nachrichten, Anhänge, Reaktionen oder Umfragen.

| Feld | Hinweise |
|---|---|
| `id`, `created_at` | |
| `chat_id` | Der offene Raum oder Kanal |
| `kind` | `text` oder `link` |
| `body` | Die Nachricht, wie sie geschrieben wurde |
| `sender_name` | Der Anzeigename, unter dem sie gesendet wurde |
| `reply_to_id` | Die Nachricht, auf die sie antwortet, oder `null` |
| `edited_at` | `null`, wenn nie bearbeitet |

Filter: `chat_id.eq`, `created_at.gte`, `created_at.lt`. Sortierung: `-created_at` oder `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Communities

Die Communities, in denen du Mitglied bist, nur lesbar, mit `communities:read`: `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` oder `random`), `join_mode` (`open` oder `account`), `member_count`, deine `role` (`owner`, `admin` oder `member`) und `joined_at`. Sortierung: `name` (Standard) oder `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## Kanäle

Die Kanäle, die du in deinen Communities sehen kannst, nur lesbar, mit `communities:read`: `id`, `community_id`, `chat_id` (seine Nachrichten liest du über [Nachrichten](#messages)), `name`, `topic`, `access` (`open` oder `private`) und `position`. Filter: `community_id.eq`. Sortierung: `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## Löschen durch eine verbundene App

Ein Löschen mit einem Zugangsschlüssel passiert sofort und antwortet `204`. Ein Löschen, das eine von dir verbundene App anfragt, passiert nie so: Es antwortet `202` und wartet auf dich.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

Du öffnest den Link, siehst, was verschwinden würde, und sagst innerhalb von 10 Minuten in AChat Ja oder Nein. Siehe [Löschen wartet auf dich](./assistants.md#deletes-wait-for-you).
