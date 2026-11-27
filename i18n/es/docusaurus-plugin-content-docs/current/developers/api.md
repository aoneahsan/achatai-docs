---
sidebar_position: 3
title: "La API de AChat"
description: "La API REST de AChat: la URL base, la cabecera Authorization, el envoltorio de respuesta, los códigos de error, la paginación por cursor y los límites, y luego cada recurso con un ejemplo de curl que funciona, desde tu perfil y tus estados hasta los mensajes de salas abiertas."
keywords: [API de AChat, API REST de AChat, achat_pat, OpenAPI de AChat, curl de AChat, API de estados, API de bloqueados]
last_update:
  date: 2026-11-27
  author: Equipo de AChat
---

# La API de AChat

**Envía una [clave de acceso](./access-keys.md) como token Bearer a `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` y recibes JSON.** Tu perfil, tus ajustes, tus estados y tu lista de bloqueados se pueden leer y cambiar; los contactos, los chats, los mensajes de salas abiertas, las comunidades y los canales son de solo lectura. Nada con cifrado de extremo a extremo está en la API.

La referencia para máquinas es [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1), también como [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). Ninguno necesita clave.

## URL base y la clave

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` responde qué es la credencial y qué puede hacer, la forma más rápida de comprobar una clave nueva:

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

`kind` es `pat` para una clave de acceso y `oauth` para una app que conectaste, como un [asistente](./assistants.md). La API acepta ambas.

## El envoltorio

Cada respuesta es JSON con una de estas tres formas.

| Respuesta | Forma |
|---|---|
| Un registro | `{ "data": { … } }` |
| Una lista | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| Un error | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

Un borrado responde `204` sin cuerpo. Un campo para el que AChat no tiene valor vuelve como `null`.

## Errores

| HTTP | `code` | Cuándo |
|---|---|---|
| 400 | `invalid_request` | Una consulta incorrecta, un cursor incorrecto o un cuerpo que no cumple las reglas de los campos (`details.issues` nombra cada campo) |
| 401 | `invalid_token` | La clave falta, es incorrecta, caducó o se quitó |
| 403 | `scope_required` | A la clave le falta el permiso; `details.scope` lo nombra |
| 404 | `not_found` | No hay nada en esta dirección para esta clave, incluido el registro de otra persona |
| 405 | `method_not_allowed` | El recurso no acepta este método, como un POST a contactos |
| 409 | `conflict` | Una regla de AChat rechazó el cambio; el mensaje dice cuál, en palabras sencillas |
| 413 | `payload_too_large` | El cuerpo es demasiado grande |
| 429 | `rate_limited` | Demasiadas solicitudes; consulta [Límites](#limits) |
| 500 | `internal` | Culpa nuestra. Envía el `correlation_id` al equipo de AChat desde la [página de contacto](https://achat.aoneahsan.com/es/contact) |

El mensaje está escrito para una persona y nunca lleva una traza, SQL ni un secreto. Sin clave alguna:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## Páginas, orden y filtros

Las listas devuelven 20 registros de forma predeterminada y 50 como máximo (`limit=1` a `limit=50`). Cuando hay más, `meta.next_cursor` lleva un cursor: envíalo de vuelta como `cursor` con la misma consulta para obtener la página siguiente, y para cuando sea `null`. Un cursor está atado a la consulta de la que salió; cambia el orden o un filtro y AChat lo rechaza, así que empieza de nuevo sin él.

`sort` acepta los valores que cada recurso indica abajo; un `-` delante significa más recientes primero. Los filtros se escriben `field.op=value`:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Límites {#limits}

Cada clave o conexión puede hacer 120 solicitudes por minuto. Además, tu plan fija cuántas solicitudes puede hacer la cuenta entera al día, contadas desde la medianoche UTC sumando todas las claves y asistentes (5000 en Free de forma predeterminada; consulta [lo que permite tu plan](./index.md#what-your-plan-allows)). Cada respuesta lleva `ratelimit-limit`, `ratelimit-remaining` y `ratelimit-reset` (segundos hasta que se reinicia el límite más estricto); un `429` añade `retry-after` en segundos. Las solicitudes siguen contando mientras se te rechaza, así que espera en lugar de reintentar en bucle.

## Perfil

Tu propio perfil: un registro, cuyo `id` es tu propio ID. `username` es de solo lectura aquí, porque un nombre de usuario nuevo pasa por el proceso de la app para reclamarlo. Lee con `profile:read`, cambia con `profile:write`.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | uuid | Tu ID |
| `username` | cadena, hasta 24 | Solo lectura |
| `name` | cadena, de 1 a 100 | El nombre que ven los demás |
| `hue` | entero de 0 a 359 | El color de tu avatar cuando no hay foto |
| `created_at` | fecha y hora | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

Tu foto se cambia en la app, no aquí.

## Ajustes

Tus propios ajustes: un registro, en `/preferences`. Lee con `preferences:read`, cambia con `preferences:write`.

| Campo | Valores |
|---|---|
| `presence_visibility` | `everyone`, `contacts` o `nobody`: quién ve si estás en línea |
| `read_receipts` | `true` o `false` |
| `language` | `en`, `zh-Hans`, `hi`, `es`, `ar`, `fr`, `pt-BR`, `ru`, `ja`, `ur`, `de`, o `null` si no hay ninguno |
| `notify_sounds` | `true` o `false` |
| `notify_preview` | `name` o `none`: si una notificación muestra quién escribió |
| `notify_mute_all` | `true` o `false` |
| `show_mature` | Solo lectura: sigue la edad que declaraste en la app |
| `id`, `updated_at` | Solo lectura |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

El `id` del registro de ajustes es tu propio ID, el mismo que el de tu perfil y el `user_id` que devuelve `/token`.

## Estados

Tus propios estados de las últimas 24 horas. Lee con `status:read`; publica con `status:write`; borra con `status:delete`.

| Campo | Notas |
|---|---|
| `id`, `created_at`, `expires_at` | Solo lectura |
| `kind` | `text`, `photo` o `video`; solo lectura |
| `text` | Las palabras de un estado de texto, hasta 700 caracteres; se aplica la longitud de estado de tu plan |
| `bg_hue` | El color de fondo de un estado de texto, de 0 a 359; si lo omites, se usa el color de tu avatar |
| `caption` | El pie de una foto o un vídeo; solo lectura |
| `audience_mode` | `contacts`, `except` o `only`; solo lectura |
| `audience_count` | A cuántas personas llega el estado; solo lectura |

Filtros: `kind.eq`, `created_at.gte`, `created_at.lt`. Orden: `-created_at` (el predeterminado) o `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

La API solo publica texto; las fotos y los vídeos necesitan la subida de la app. Un estado nuevo va al público que indican los ajustes de estado de la app, con el límite de publicación de la propia app (30 por hora), que responde `409` con el motivo cuando se alcanza. Los estados no tienen cifrado de extremo a extremo, ni en la app ni aquí.

## Personas bloqueadas

Las personas que bloqueaste, por el nombre de usuario y el nombre que muestran. Lee con `blocks:read`; bloquea con `blocks:write`; desbloquea con `blocks:delete`. Aquí `id` es el ID de la persona bloqueada.

| Campo | Notas |
|---|---|
| `id` | El ID de la persona bloqueada |
| `username` | El suyo. Para bloquear a alguien, envíalo |
| `name` | El nombre que muestra; solo lectura |
| `created_at` | Cuándo la bloqueaste |

Orden: `-created_at` (el predeterminado) o `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Bloquear funciona como en la app: la persona ya no puede escribirte ni ver tu estado, y el contacto entre vosotros termina.

## Contactos

Solo lectura, con `contacts:read`. Cada registro lleva el nombre de la otra persona: `id` (su ID), `username`, `name`, `hue`, `chat_id` (tu chat directo con ella, o `null`) y `created_at`. Orden: `-created_at` o `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

Las solicitudes de contacto que te esperan no son un recurso; tu servidor puede enterarse de ellas con el [webhook](./webhooks.md) `contact_request.received`.

## Chats

Los chats a los que perteneces, de solo lectura, con `chats:read`.

| Campo | Notas |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` o `channel` |
| `title`, `topic` | `null` cuando el chat no tiene |
| `end_to_end` | `true` cuando los mensajes tienen cifrado de extremo a extremo y nunca se pueden leer aquí |
| `has_password` | `true` para una sala con contraseña |
| `last_message_at`, `joined_at` | `null` cuando no hay |

Filtro: `kind.eq`. Orden: `-created_at` o `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

Un chat directo, un grupo o una sala con contraseña aparece en la lista, con su nombre y la hora de su último mensaje, pero sus mensajes nunca.

## Mensajes {#messages}

Los mensajes de las salas abiertas y los canales a los que perteneces, tal como se escribieron: solo lectura, con `chats:read`. Las salas con contraseña, los chats directos y los grupos no están aquí, ni tampoco los mensajes de una sola visualización, los mensajes que quitó un moderador, los adjuntos, las reacciones o las encuestas.

| Campo | Notas |
|---|---|
| `id`, `created_at` | |
| `chat_id` | La sala abierta o el canal |
| `kind` | `text` o `link` |
| `body` | El mensaje tal como se escribió |
| `sender_name` | El nombre visible con que se envió |
| `reply_to_id` | El mensaje al que responde, o `null` |
| `edited_at` | `null` si nunca se editó |

Filtros: `chat_id.eq`, `created_at.gte`, `created_at.lt`. Orden: `-created_at` o `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Comunidades

Las comunidades de las que eres miembro, de solo lectura, con `communities:read`: `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` o `random`), `join_mode` (`open` o `account`), `member_count`, tu `role` (`owner`, `admin` o `member`) y `joined_at`. Orden: `name` (el predeterminado) o `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## Canales

Los canales que puedes ver en tus comunidades, de solo lectura, con `communities:read`: `id`, `community_id`, `chat_id` (lee sus mensajes con [Mensajes](#messages)), `name`, `topic`, `access` (`open` o `private`) y `position`. Filtro: `community_id.eq`. Orden: `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## Borrados desde una app conectada

Un borrado hecho con una clave de acceso ocurre al instante y responde `204`. Un borrado pedido por una app que conectaste nunca ocurre así: responde `202` y te espera.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

Abres el enlace, ves lo que se iría y dices sí o no en AChat en menos de 10 minutos. Consulta [Los borrados te esperan](./assistants.md#deletes-wait-for-you).
