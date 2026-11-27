---
sidebar_position: 5
title: "Вебхуки"
description: "Вебхуки AChat: добавьте адрес https, выберите события и проверяйте подпись Standard Webhooks каждой доставки на Node или Python. Все события и их данные, график повторов, пауза и что выключает адрес."
keywords: [вебхуки AChat, Standard Webhooks, подпись вебхука, проверка webhook-signature, HMAC-SHA256, вебхук запроса в контакты]
last_update:
  date: 2026-11-21
  author: Команда AChat
---

# Вебхуки

**Когда в вашем аккаунте что-то меняется, AChat отправляет короткое подписанное сообщение на ваш сервер, чтобы ваши инструменты реагировали, не спрашивая каждую минуту.** Каждое событие сообщает, что и когда изменилось, с ID. Оно никогда не несёт текст сообщения, имя или что-либо ещё, что пришлось бы беречь; остальное ваш сервер получает по [ключу доступа](./access-keys.md).

## Добавить адрес

1. В разделе **Аккаунт › Другие приложения › Вебхуки** выберите **Добавить адрес вебхука**.
2. Вставьте адрес и, если хотите, заметку для себя.
3. Выберите события, о которых он должен узнавать.
4. Выберите **Добавить адрес**, затем скопируйте секрет подписи (`whsec_…`).

Для добавления адреса нужен вход за последние 10 минут — с кодом, если включён [двухэтапный вход](./two-step-sign-in.md). Когда адрес добавлен, AChat присылает письмо.

Адрес должен:

- начинаться с `https://` — AChat не отправляет по обычному http;
- использовать стандартный порт (443) или 8443;
- не содержать имени или пароля — вместо этого проверяйте подпись;
- быть доступен из интернета. Частные сети, этот компьютер и собственные домены AChat отклоняются.

Сколько адресов можно держать одновременно, задаёт тариф (на Free по умолчанию 3; см. [что позволяет ваш тариф](./index.md#what-your-plan-allows)).

## Как выглядит доставка

`POST` с телом JSON и тремя заголовками, отправленный как `AChat-Webhooks/1.0`:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` — событие, `timestamp` — когда оно произошло, а `data` содержит перечисленные ниже ID и время. `webhook-id` — ID события, он не меняется при повторах, поэтому по нему можно распознать дубликат.

## События

| Событие | Когда | `data` |
|---|---|---|
| `profile.updated` | Изменились имя пользователя, имя, цвет аватара или фото | `id` (ваш) |
| `status.posted` | Вы опубликовали статус | `id`, `created_at`, `expires_at` |
| `status.deleted` | Ваш статус удалён | `id` |
| `block.added` | Вы заблокировали кого-то | `id` (его), `created_at` |
| `block.removed` | Вы разблокировали кого-то | `id` (его) |
| `contact.added` | Добавлен контакт | `id` (контакта), `created_at` |
| `contact.removed` | Контакт удалён | `id` (контакта) |
| `contact_request.received` | Вам прислали запрос в контакты | `id` (того, кто просит), `created_at` |
| `chat.joined` | Вы вошли в чат или комнату | `id` (чата), `joined_at` |
| `chat.left` | Вы вышли из чата или комнаты, или вас удалили | `id` (чата) |
| `message.created` | В открытой комнате или канале, где вы есть, появилось сообщение | `id`, `chat_id`, `created_at` |
| `webhook.test` | Вы выбрали **Отправить тестовое событие** | `message`: `"Test event"` |

`message.created` срабатывает только для текстовых сообщений и ссылок в открытых комнатах и каналах. Сообщение в личном чате, группе или комнате с паролем никогда не создаёт событие, потому что AChat не может его прочитать. Каждый `id` соответствует записи с тем же ID в [API](./api.md): получайте `/messages/{id}`, `/status/{id}` или `/contacts/{id}` ключом с нужным разрешением.

Событие записывается, только пока его слушает один из ваших адресов. Сначала добавьте адрес: изменения, сделанные до его появления, позже не отправляются.

## Проверка подписи

Каждая доставка подписана по [Standard Webhooks](https://www.standardwebhooks.com): HMAC-SHA256 от `webhook-id`, точки, `webhook-timestamp`, точки и сырого тела, на ключе из байтов вашего секрета (часть после `whsec_`, декодированная из base64). `webhook-signature` содержит одно или несколько значений `v1,<base64>` через пробел; принимайте доставку, если совпадает любое. Отклоняйте всё, у чего метка времени отличается от ваших часов больше чем на пять минут.

Проверяйте **сырое** тело ровно в том виде, в каком оно пришло. Если разобрать JSON и сериализовать заново, байты изменятся и подпись не совпадёт.

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

В Express на этом маршруте принимайте тело в сыром виде:

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

Во Flask передайте `request.get_data()` и `request.headers`. Если не хотите писать это сами, ту же проверку делает любая библиотека Standard Webhooks.

## Отвечайте быстро

Ответьте любым `2xx` в течение 10 секунд, а работу делайте после. AChat не следует перенаправлениям. `410 Gone` велит AChat сразу выключить адрес; любой другой ответ или его отсутствие считается сбоем.

## Повторы

Неудачная доставка пробуется всего 8 раз: сразу, затем через 5 секунд, 5 минут, 30 минут, 2 часа, 5 часов, 10 часов и 10 часов после каждой предыдущей попытки — чуть больше суток от первой до последней. Каждая попытка несёт тот же `webhook-id`.

**Журнал доставки** под каждым адресом показывает каждую доставку: Доставлено, Не отправлено, Нет ответа или статус, который вернул ваш сервер, с номером попытки. **Отправить снова** повторяет одну доставку с тем же ID. События и их журнал хранятся 30 дней.

## Пауза, выключение и повторное включение

- **Пауза** пропускает события, пока вы не выберете **Возобновить**. События, случившиеся во время паузы, позже не отправляются.
- Адрес, который непрерывно давал сбои 5 дней, становится **Выключен после сбоев**, и AChat пишет вам адрес, его последний ответ и когда начались сбои. Пока вы не выберете **Включить снова**, ничего не отправляется.
- **Удалить адрес** сразу прекращает отправку, и журнал доставки удаляется вместе с ним.

## Секрет подписи

AChat показывает секрет один раз при добавлении адреса и ещё раз в течение 10 минут после входа (с кодом, если включён двухэтапный вход): **Показать секрет подписи**. **Заменить секрет** создаёт новый, и 24 часа каждое событие несёт две подписи, по одной от каждого секрета, чтобы ваш сервер переключился, ничего не пропустив. Код проверки выше уже принимает любую из них.
