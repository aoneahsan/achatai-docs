---
sidebar_position: 3
title: "The AChat API"
description: "AChat's REST API: the base URL, the Authorization header, the response envelope, error codes, cursor pagination and limits, then every resource with a working curl example, from your profile and status posts to open-room messages."
keywords: [AChat API, AChat REST API, achat_pat, AChat OpenAPI, AChat curl, status API, blocked list API]
last_update:
  date: 2026-11-21
  author: AChat team
---

# The AChat API

**Send an [access key](./access-keys.md) as a Bearer token to `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` and you get JSON back.** Your profile, settings, status posts and blocked list can be read and changed; contacts, chats, open-room messages, communities and channels are read only. Nothing end-to-end encrypted is in the API at all.

The machine-readable reference is [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1), also as [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). Neither needs a key.

## Base URL and the key

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` answers what the credential is and what it may do, which is the quickest way to check a new key:

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

`kind` is `pat` for an access key and `oauth` for an app you connected, such as an [assistant](./assistants.md). The API accepts both.

## The envelope

Every answer is JSON in one of three shapes.

| Answer | Shape |
|---|---|
| One record | `{ "data": { … } }` |
| A list | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| An error | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

A delete answers `204` with no body. A field AChat holds no value for comes back as `null`.

## Errors

| HTTP | `code` | When |
|---|---|---|
| 400 | `invalid_request` | A bad query, a bad cursor, or a body that fails the field rules (`details.issues` names each field) |
| 401 | `invalid_token` | The key is missing, wrong, expired or removed |
| 403 | `scope_required` | The key lacks the permission; `details.scope` names it |
| 404 | `not_found` | Nothing at this address for this key, including someone else's record |
| 405 | `method_not_allowed` | The resource doesn't take this method, such as a POST to contacts |
| 409 | `conflict` | An AChat rule refused the change; the message says which, in plain words |
| 413 | `payload_too_large` | The body is too big |
| 429 | `rate_limited` | Too many requests; see [Limits](#limits) |
| 500 | `internal` | Our fault. Send the `correlation_id` to the AChat team through the [contact page](https://achat.aoneahsan.com/contact) |

The message is written for a person and never carries a stack trace, SQL or a secret. With no key at all:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## Pages, sorting and filters

Lists return 20 records by default and 50 at most (`limit=1` to `limit=50`). When there are more, `meta.next_cursor` holds a cursor: send it back as `cursor` with the same query to get the next page, and stop when it's `null`. A cursor is tied to the query it came from; change the sort or a filter and AChat refuses it, so start again without one.

`sort` takes the values each resource lists below; a leading `-` means newest first. Filters are written `field.op=value`:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Limits

Each key or connection may make 120 requests a minute. On top of that, your plan sets how many requests the whole account may make each day, counted from midnight UTC across every key and assistant (5,000 on Free by default; see [what your plan allows](./index.md#what-your-plan-allows)). Every answer carries `ratelimit-limit`, `ratelimit-remaining` and `ratelimit-reset` (seconds until the tightest limit resets); a `429` adds `retry-after` in seconds. Requests keep counting while you're refused, so back off rather than retry in a loop.

## Profile

Your own profile: one record, whose `id` is your own id. `username` is read only here, because a new username goes through the app's claim flow. Read with `profile:read`, change with `profile:write`.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | Your id |
| `username` | string, up to 24 | Read only |
| `name` | string, 1 to 100 | The name other people see |
| `hue` | integer 0 to 359 | Your avatar colour when there's no photo |
| `created_at` | date-time | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

Your photo is changed in the app, not here.

## Settings

Your own settings: one record, at `/preferences`. Read with `preferences:read`, change with `preferences:write`.

| Field | Values |
|---|---|
| `presence_visibility` | `everyone`, `contacts` or `nobody`: who sees whether you're online |
| `read_receipts` | `true` or `false` |
| `language` | `en`, `es`, `fr`, `de`, `ar`, or `null` when none is set |
| `notify_sounds` | `true` or `false` |
| `notify_preview` | `name` or `none`: whether a notification shows who wrote |
| `notify_mute_all` | `true` or `false` |
| `show_mature` | Read only: it follows the age you declared in the app |
| `id`, `updated_at` | Read only |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

The settings record's `id` is your own id, the same as your profile's and the `user_id` that `/token` returns.

## Status posts

Your own status posts of the last 24 hours. Read with `status:read`; post with `status:write`; delete with `status:delete`.

| Field | Notes |
|---|---|
| `id`, `created_at`, `expires_at` | Read only |
| `kind` | `text`, `photo` or `video`; read only |
| `text` | The words of a text post, up to 700 characters; your plan's status length applies |
| `bg_hue` | The background colour of a text post, 0 to 359; when you leave it out, your avatar colour is used |
| `caption` | A photo or video caption; read only |
| `audience_mode` | `contacts`, `except` or `only`; read only |
| `audience_count` | How many people the post reaches; read only |

Filters: `kind.eq`, `created_at.gte`, `created_at.lt`. Sort: `-created_at` (the default) or `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

The API posts text only; photos and videos need the app's upload. A new post goes to the audience your app's status settings name, with the app's own posting limit (30 an hour), which answers `409` with the reason when reached. Status isn't end-to-end encrypted, in the app or here.

## Blocked people

The people you blocked, by the username and name they show. Read with `blocks:read`; block with `blocks:write`; unblock with `blocks:delete`. Here `id` is the blocked person's id.

| Field | Notes |
|---|---|
| `id` | The blocked person's id |
| `username` | Theirs. To block someone, send it |
| `name` | The name they show; read only |
| `created_at` | When you blocked them |

Sort: `-created_at` (the default) or `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Blocking works as it does in the app: the person can no longer message you or see your status, and the contact between you ends.

## Contacts

Read only, with `contacts:read`. Each record is named by the other person: `id` (their id), `username`, `name`, `hue`, `chat_id` (your direct chat with them, or `null`) and `created_at`. Sort: `-created_at` or `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

Contact requests waiting for you aren't a resource; your server can hear about them with the `contact_request.received` [webhook](./webhooks.md).

## Chats

The chats you belong to, read only, with `chats:read`.

| Field | Notes |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` or `channel` |
| `title`, `topic` | `null` when the chat has none |
| `end_to_end` | `true` when the messages are end-to-end encrypted and never readable here |
| `has_password` | `true` for a room with a password |
| `last_message_at`, `joined_at` | `null` when there's none |

Filter: `kind.eq`. Sort: `-created_at` or `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

A direct chat, a group or a password room is listed, with its name and the time of its last message, but its messages never are.

## Messages

Messages in the open rooms and channels you belong to, as people wrote them: read only, with `chats:read`. Rooms with a password, direct chats and groups aren't here, and neither are view-once messages, messages a moderator removed, attachments, reactions or polls.

| Field | Notes |
|---|---|
| `id`, `created_at` | |
| `chat_id` | The open room or channel |
| `kind` | `text` or `link` |
| `body` | The message as written |
| `sender_name` | The display name it was sent under |
| `reply_to_id` | The message it answers, or `null` |
| `edited_at` | `null` when never edited |

Filters: `chat_id.eq`, `created_at.gte`, `created_at.lt`. Sort: `-created_at` or `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Communities

The communities you're a member of, read only, with `communities:read`: `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` or `random`), `join_mode` (`open` or `account`), `member_count`, your `role` (`owner`, `admin` or `member`) and `joined_at`. Sort: `name` (the default) or `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## Channels

The channels you can see in your communities, read only, with `communities:read`: `id`, `community_id`, `chat_id` (read its messages through [Messages](#messages)), `name`, `topic`, `access` (`open` or `private`) and `position`. Filter: `community_id.eq`. Sort: `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## Deletes from a connected app

A delete made with an access key happens at once and answers `204`. A delete asked for by an app you connected never does: it answers `202` and waits for you.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

You open the link, see what would go, and say yes or no on AChat within 10 minutes. See [Deletes wait for you](./assistants.md#deletes-wait-for-you).
