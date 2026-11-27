---
sidebar_position: 3
title: "API AChat"
description: "REST API AChat: базовый URL, заголовок Authorization, формат ответа, коды ошибок, постраничная выдача по курсору и лимиты, а затем каждый ресурс с рабочим примером curl — от профиля и статусов до сообщений открытых комнат."
keywords: [API AChat, REST API AChat, achat_pat, OpenAPI AChat, curl AChat, API статусов, API списка заблокированных]
last_update:
  date: 2026-11-27
  author: Команда AChat
---

# API AChat

**Отправьте [ключ доступа](./access-keys.md) как Bearer-токен на `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` — и получите в ответ JSON.** Профиль, настройки, статусы и список заблокированных можно читать и менять; контакты, чаты, сообщения открытых комнат, сообщества и каналы — только читать. Ничего со сквозным шифрованием в API нет вообще.

Машиночитаемый справочник — [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1), есть и [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). Ни тому ни другому ключ не нужен.

## Базовый URL и ключ

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` отвечает, что это за учётные данные и что им можно, — самый быстрый способ проверить новый ключ:

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

`kind` — это `pat` для ключа доступа и `oauth` для подключённого приложения, например [ассистента](./assistants.md). API принимает оба.

## Формат ответа

Каждый ответ — JSON одного из трёх видов.

| Ответ | Вид |
|---|---|
| Одна запись | `{ "data": { … } }` |
| Список | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| Ошибка | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

Удаление отвечает `204` без тела. Поле, для которого у AChat нет значения, возвращается как `null`.

## Ошибки

| HTTP | `code` | Когда |
|---|---|---|
| 400 | `invalid_request` | Неверный запрос, неверный курсор или тело, не прошедшее правила полей (`details.issues` называет каждое поле) |
| 401 | `invalid_token` | Ключа нет, он неверный, истёк или удалён |
| 403 | `scope_required` | У ключа нет разрешения; `details.scope` называет его |
| 404 | `not_found` | По этому адресу для этого ключа ничего нет, в том числе чужие записи |
| 405 | `method_not_allowed` | Ресурс не принимает этот метод, например POST к контактам |
| 409 | `conflict` | Правило AChat отклонило изменение; сообщение простыми словами говорит, какое |
| 413 | `payload_too_large` | Тело слишком большое |
| 429 | `rate_limited` | Слишком много запросов; см. [Лимиты](#limits) |
| 500 | `internal` | Наша ошибка. Отправьте `correlation_id` команде AChat через [страницу контактов](https://achat.aoneahsan.com/ru/contact) |

Сообщение пишется для человека и никогда не содержит трассировку стека, SQL или секреты. Совсем без ключа:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## Страницы, сортировка и фильтры

Списки по умолчанию возвращают 20 записей, максимум 50 (`limit=1` … `limit=50`). Если записей больше, в `meta.next_cursor` лежит курсор: отправьте его обратно как `cursor` с тем же запросом, чтобы получить следующую страницу, и остановитесь, когда он станет `null`. Курсор привязан к запросу, из которого пришёл; поменяете сортировку или фильтр — AChat его отклонит, так что начните заново без курсора.

`sort` принимает значения, перечисленные ниже у каждого ресурса; ведущий `-` означает «сначала новые». Фильтры пишутся как `field.op=value`:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Лимиты {#limits}

Каждый ключ или подключение может делать 120 запросов в минуту. Сверх того ваш тариф задаёт, сколько запросов весь аккаунт может сделать за день, — считая с полуночи UTC по всем ключам и ассистентам (на Free по умолчанию 5 000; см. [что позволяет ваш тариф](./index.md#what-your-plan-allows)). Каждый ответ несёт `ratelimit-limit`, `ratelimit-remaining` и `ratelimit-reset` (секунды до сброса самого жёсткого лимита); `429` добавляет `retry-after` в секундах. Запросы продолжают считаться и во время отказа, поэтому делайте паузу, а не повторяйте в цикле.

## Профиль

Ваш собственный профиль: одна запись, чей `id` — ваш собственный ID. `username` здесь только для чтения: новое имя пользователя проходит через процедуру в приложении. Чтение — с `profile:read`, изменение — с `profile:write`.

| Поле | Тип | Примечание |
|---|---|---|
| `id` | uuid | Ваш ID |
| `username` | строка, до 24 | Только чтение |
| `name` | строка, от 1 до 100 | Имя, которое видят другие |
| `hue` | целое от 0 до 359 | Цвет аватара, когда нет фото |
| `created_at` | дата и время | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

Фото меняется в приложении, а не здесь.

## Настройки

Ваши собственные настройки: одна запись по адресу `/preferences`. Чтение — с `preferences:read`, изменение — с `preferences:write`.

| Поле | Значения |
|---|---|
| `presence_visibility` | `everyone`, `contacts` или `nobody`: кто видит, в сети ли вы |
| `read_receipts` | `true` или `false` |
| `language` | `en`, `zh-Hans`, `hi`, `es`, `ar`, `fr`, `pt-BR`, `ru`, `ja`, `ur`, `de` или `null`, если ничего не задано |
| `notify_sounds` | `true` или `false` |
| `notify_preview` | `name` или `none`: показывает ли уведомление, кто написал |
| `notify_mute_all` | `true` или `false` |
| `show_mature` | Только чтение: следует возрасту, указанному в приложении |
| `id`, `updated_at` | Только чтение |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

`id` записи настроек — ваш собственный ID, тот же, что у профиля, и тот же `user_id`, который возвращает `/token`.

## Статусы

Ваши собственные статусы за последние 24 часа. Чтение — с `status:read`; публикация — с `status:write`; удаление — с `status:delete`.

| Поле | Примечание |
|---|---|
| `id`, `created_at`, `expires_at` | Только чтение |
| `kind` | `text`, `photo` или `video`; только чтение |
| `text` | Текст текстового статуса, до 700 символов; действует длина статуса вашего тарифа |
| `bg_hue` | Цвет фона текстового статуса, от 0 до 359; если не указать, берётся цвет вашего аватара |
| `caption` | Подпись к фото или видео; только чтение |
| `audience_mode` | `contacts`, `except` или `only`; только чтение |
| `audience_count` | Скольким людям доступен статус; только чтение |

Фильтры: `kind.eq`, `created_at.gte`, `created_at.lt`. Сортировка: `-created_at` (по умолчанию) или `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

API публикует только текст; для фото и видео нужна загрузка в приложении. Новый статус уходит аудитории из настроек статусов в приложении, с собственным лимитом приложения (30 в час); при его достижении API отвечает `409` с причиной. Статусы не защищены сквозным шифрованием — ни в приложении, ни здесь.

## Заблокированные

Люди, которых вы заблокировали, — по имени пользователя и имени, которые они показывают. Чтение — с `blocks:read`; блокировка — с `blocks:write`; разблокировка — с `blocks:delete`. Здесь `id` — ID заблокированного человека.

| Поле | Примечание |
|---|---|
| `id` | ID заблокированного человека |
| `username` | Его. Чтобы заблокировать кого-то, отправьте его |
| `name` | Имя, которое он показывает; только чтение |
| `created_at` | Когда вы его заблокировали |

Сортировка: `-created_at` (по умолчанию) или `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Блокировка работает как в приложении: человек больше не может писать вам или видеть ваш статус, и контакт между вами прекращается.

## Контакты

Только чтение, с `contacts:read`. Каждая запись названа по другому человеку: `id` (его ID), `username`, `name`, `hue`, `chat_id` (ваш личный чат с ним или `null`) и `created_at`. Сортировка: `-created_at` или `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

Ожидающие вас запросы в контакты — не ресурс; ваш сервер может узнавать о них через [вебхук](./webhooks.md) `contact_request.received`.

## Чаты

Чаты, в которых вы состоите, только чтение, с `chats:read`.

| Поле | Примечание |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` или `channel` |
| `title`, `topic` | `null`, если у чата их нет |
| `end_to_end` | `true`, если сообщения защищены сквозным шифрованием и здесь никогда не читаются |
| `has_password` | `true` для комнаты с паролем |
| `last_message_at`, `joined_at` | `null`, если нет |

Фильтр: `kind.eq`. Сортировка: `-created_at` или `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

Личный чат, группа или комната с паролем есть в списке — с названием и временем последнего сообщения, но их сообщений нет никогда.

## Сообщения {#messages}

Сообщения в открытых комнатах и каналах, где вы состоите, в том виде, как их написали: только чтение, с `chats:read`. Комнат с паролем, личных чатов и групп здесь нет, как нет и одноразовых сообщений, сообщений, удалённых модератором, вложений, реакций и опросов.

| Поле | Примечание |
|---|---|
| `id`, `created_at` | |
| `chat_id` | Открытая комната или канал |
| `kind` | `text` или `link` |
| `body` | Сообщение, как его написали |
| `sender_name` | Отображаемое имя, под которым оно отправлено |
| `reply_to_id` | Сообщение, на которое это отвечает, или `null` |
| `edited_at` | `null`, если не редактировалось |

Фильтры: `chat_id.eq`, `created_at.gte`, `created_at.lt`. Сортировка: `-created_at` или `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Сообщества

Сообщества, в которых вы состоите, только чтение, с `communities:read`: `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` или `random`), `join_mode` (`open` или `account`), `member_count`, ваша `role` (`owner`, `admin` или `member`) и `joined_at`. Сортировка: `name` (по умолчанию) или `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## Каналы

Каналы, которые вы видите в своих сообществах, только чтение, с `communities:read`: `id`, `community_id`, `chat_id` (его сообщения читаются через [Сообщения](#messages)), `name`, `topic`, `access` (`open` или `private`) и `position`. Фильтр: `community_id.eq`. Сортировка: `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## Удаление из подключённого приложения

Удаление по ключу доступа происходит сразу и отвечает `204`. Удаление, которое запросило подключённое вами приложение, сразу не происходит никогда: оно отвечает `202` и ждёт вас.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

Вы открываете ссылку, видите, что будет удалено, и говорите «да» или «нет» в AChat в течение 10 минут. См. [Удаление ждёт вас](./assistants.md#deletes-wait-for-you).
