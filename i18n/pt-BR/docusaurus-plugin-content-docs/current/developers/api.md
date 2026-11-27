---
sidebar_position: 3
title: "A API do AChat"
description: "A API REST do AChat: a URL base, o cabeçalho Authorization, o envelope de resposta, códigos de erro, paginação por cursor e limites, e depois cada recurso com um exemplo de curl que funciona, do seu perfil e posts de status às mensagens de salas abertas."
keywords: [API do AChat, API REST do AChat, achat_pat, OpenAPI do AChat, curl do AChat, API de status, API de bloqueados]
last_update:
  date: 2026-11-27
  author: Equipe do AChat
---

# A API do AChat

**Mande uma [chave de acesso](./access-keys.md) como token Bearer para `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` e você recebe JSON de volta.** Seu perfil, suas configurações, seus posts de status e sua lista de bloqueados podem ser lidos e alterados; contatos, conversas, mensagens de salas abertas, comunidades e canais são só leitura. Nada com criptografia de ponta a ponta está na API.

A referência para máquinas é o [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1), também como [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). Nenhum dos dois precisa de chave.

## URL base e a chave

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` responde o que a credencial é e o que ela pode fazer, que é o jeito mais rápido de conferir uma chave nova:

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

`kind` é `pat` para uma chave de acesso e `oauth` para um app que você conectou, como um [assistente](./assistants.md). A API aceita os dois.

## O envelope

Toda resposta é JSON numa destas três formas.

| Resposta | Forma |
|---|---|
| Um registro | `{ "data": { … } }` |
| Uma lista | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| Um erro | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

Uma exclusão responde `204` sem corpo. Um campo para o qual o AChat não tem valor volta como `null`.

## Erros

| HTTP | `code` | Quando |
|---|---|---|
| 400 | `invalid_request` | Uma consulta ruim, um cursor ruim, ou um corpo que não passa nas regras dos campos (`details.issues` cita cada campo) |
| 401 | `invalid_token` | A chave está faltando, errada, expirada ou removida |
| 403 | `scope_required` | Falta permissão à chave; `details.scope` diz qual |
| 404 | `not_found` | Nada neste endereço para esta chave, inclusive o registro de outra pessoa |
| 405 | `method_not_allowed` | O recurso não aceita este método, como um POST em contatos |
| 409 | `conflict` | Uma regra do AChat recusou a mudança; a mensagem diz qual, em palavras simples |
| 413 | `payload_too_large` | O corpo é grande demais |
| 429 | `rate_limited` | Pedidos demais; veja [Limites](#limits) |
| 500 | `internal` | Culpa nossa. Mande o `correlation_id` para a equipe do AChat pela [página de contato](https://achat.aoneahsan.com/pt-BR/contact) |

A mensagem é escrita para uma pessoa e nunca traz stack trace, SQL ou segredo. Sem chave nenhuma:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## Páginas, ordenação e filtros

Listas retornam 20 registros por padrão e 50 no máximo (`limit=1` a `limit=50`). Quando há mais, `meta.next_cursor` traz um cursor: mande-o de volta como `cursor` com a mesma consulta para pegar a próxima página, e pare quando ele for `null`. Um cursor fica preso à consulta de onde veio; mude a ordenação ou um filtro e o AChat o recusa, então comece de novo sem ele.

`sort` aceita os valores que cada recurso lista abaixo; um `-` na frente significa mais novos primeiro. Filtros são escritos `field.op=value`:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Limites {#limits}

Cada chave ou conexão pode fazer 120 pedidos por minuto. Além disso, o seu plano define quantos pedidos a conta inteira pode fazer por dia, contados a partir da meia-noite UTC, somando todas as chaves e assistentes (5.000 no Free, por padrão; veja [o que o seu plano permite](./index.md#what-your-plan-allows)). Toda resposta traz `ratelimit-limit`, `ratelimit-remaining` e `ratelimit-reset` (segundos até o limite mais apertado zerar); um `429` acrescenta `retry-after` em segundos. Os pedidos continuam contando enquanto você é recusado, então espere em vez de repetir num loop.

## Perfil

O seu próprio perfil: um registro, cujo `id` é o seu próprio ID. `username` é só leitura aqui, porque um nome de usuário novo passa pelo fluxo de escolha do app. Leia com `profile:read`, altere com `profile:write`.

| Campo | Tipo | Observações |
|---|---|---|
| `id` | uuid | O seu ID |
| `username` | string, até 24 | Só leitura |
| `name` | string, de 1 a 100 | O nome que as pessoas veem |
| `hue` | inteiro de 0 a 359 | A cor do seu avatar quando não há foto |
| `created_at` | data e hora | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

A sua foto é trocada no app, não aqui.

## Configurações

As suas próprias configurações: um registro, em `/preferences`. Leia com `preferences:read`, altere com `preferences:write`.

| Campo | Valores |
|---|---|
| `presence_visibility` | `everyone`, `contacts` ou `nobody`: quem vê se você está online |
| `read_receipts` | `true` ou `false` |
| `language` | `en`, `zh-Hans`, `hi`, `es`, `ar`, `fr`, `pt-BR`, `ru`, `ja`, `ur`, `de`, ou `null` quando nenhum está definido |
| `notify_sounds` | `true` ou `false` |
| `notify_preview` | `name` ou `none`: se a notificação mostra quem escreveu |
| `notify_mute_all` | `true` ou `false` |
| `show_mature` | Só leitura: segue a idade que você declarou no app |
| `id`, `updated_at` | Só leitura |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

O `id` do registro de configurações é o seu próprio ID, o mesmo do perfil e o `user_id` que `/token` retorna.

## Posts de status

Os seus próprios posts de status das últimas 24 horas. Leia com `status:read`; publique com `status:write`; apague com `status:delete`.

| Campo | Observações |
|---|---|
| `id`, `created_at`, `expires_at` | Só leitura |
| `kind` | `text`, `photo` ou `video`; só leitura |
| `text` | As palavras de um post de texto, até 700 caracteres; vale o tamanho de status do seu plano |
| `bg_hue` | A cor de fundo de um post de texto, de 0 a 359; se você deixar de fora, usa a cor do seu avatar |
| `caption` | A legenda de uma foto ou vídeo; só leitura |
| `audience_mode` | `contacts`, `except` ou `only`; só leitura |
| `audience_count` | Quantas pessoas o post alcança; só leitura |

Filtros: `kind.eq`, `created_at.gte`, `created_at.lt`. Ordenação: `-created_at` (o padrão) ou `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

A API publica só texto; fotos e vídeos precisam do envio pelo app. Um post novo vai para o público que as configurações de status do app indicam, com o limite de publicação do próprio app (30 por hora), que responde `409` com o motivo quando é atingido. Status não tem criptografia de ponta a ponta, nem no app nem aqui.

## Pessoas bloqueadas

As pessoas que você bloqueou, pelo nome de usuário e nome que elas mostram. Leia com `blocks:read`; bloqueie com `blocks:write`; desbloqueie com `blocks:delete`. Aqui o `id` é o ID da pessoa bloqueada.

| Campo | Observações |
|---|---|
| `id` | O ID da pessoa bloqueada |
| `username` | O dela. Para bloquear alguém, mande isto |
| `name` | O nome que ela mostra; só leitura |
| `created_at` | Quando você a bloqueou |

Ordenação: `-created_at` (o padrão) ou `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Bloquear funciona como no app: a pessoa não consegue mais te mandar mensagem nem ver o seu status, e o contato entre vocês termina.

## Contatos

Só leitura, com `contacts:read`. Cada registro leva o nome da outra pessoa: `id` (o ID dela), `username`, `name`, `hue`, `chat_id` (a sua conversa direta com ela, ou `null`) e `created_at`. Ordenação: `-created_at` ou `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

Pedidos de contato esperando por você não são um recurso; o seu servidor pode saber deles pelo [webhook](./webhooks.md) `contact_request.received`.

## Conversas

As conversas de que você participa, só leitura, com `chats:read`.

| Campo | Observações |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` ou `channel` |
| `title`, `topic` | `null` quando a conversa não tem |
| `end_to_end` | `true` quando as mensagens têm criptografia de ponta a ponta e nunca são legíveis aqui |
| `has_password` | `true` para uma sala com senha |
| `last_message_at`, `joined_at` | `null` quando não há |

Filtro: `kind.eq`. Ordenação: `-created_at` ou `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

Uma conversa direta, um grupo ou uma sala com senha aparece na lista, com o nome e o horário da última mensagem, mas as mensagens nunca aparecem.

## Mensagens {#messages}

Mensagens nas salas abertas e canais de que você participa, do jeito que as pessoas escreveram: só leitura, com `chats:read`. Salas com senha, conversas diretas e grupos não estão aqui, nem mensagens de visualização única, mensagens que um moderador removeu, anexos, reações ou enquetes.

| Campo | Observações |
|---|---|
| `id`, `created_at` | |
| `chat_id` | A sala aberta ou o canal |
| `kind` | `text` ou `link` |
| `body` | A mensagem como foi escrita |
| `sender_name` | O nome de exibição com que foi enviada |
| `reply_to_id` | A mensagem que ela responde, ou `null` |
| `edited_at` | `null` quando nunca foi editada |

Filtros: `chat_id.eq`, `created_at.gte`, `created_at.lt`. Ordenação: `-created_at` ou `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Comunidades

As comunidades de que você é membro, só leitura, com `communities:read`: `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` ou `random`), `join_mode` (`open` ou `account`), `member_count`, o seu `role` (`owner`, `admin` ou `member`) e `joined_at`. Ordenação: `name` (o padrão) ou `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## Canais

Os canais que você consegue ver nas suas comunidades, só leitura, com `communities:read`: `id`, `community_id`, `chat_id` (leia as mensagens dele por [Mensagens](#messages)), `name`, `topic`, `access` (`open` ou `private`) e `position`. Filtro: `community_id.eq`. Ordenação: `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## Exclusões vindas de um app conectado

Uma exclusão feita com uma chave de acesso acontece na hora e responde `204`. Uma exclusão pedida por um app que você conectou nunca acontece assim: ela responde `202` e espera por você.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

Você abre o link, vê o que iria embora e diz sim ou não no AChat em até 10 minutos. Veja [Exclusões esperam por você](./assistants.md#deletes-wait-for-you).
