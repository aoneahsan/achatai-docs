---
sidebar_position: 3
title: "AChat API"
description: "AChat 的 REST API：基础 URL、Authorization 请求头、响应信封、错误码、游标分页和限制，以及每个资源附带可用的 curl 示例，从你的资料、动态到开放房间的消息。"
keywords: [AChat API, AChat REST API, achat_pat, AChat OpenAPI, AChat curl, 动态 API, 屏蔽名单 API]
last_update:
  date: 2026-11-27
  author: AChat 团队
---

# AChat API

**把[访问密钥](./access-keys.md)作为 Bearer 令牌发到 `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`，就能拿到 JSON。** 你的资料、设置、动态和屏蔽名单可以读取和更改；联系人、聊天、开放房间的消息、社区和频道只能读取。任何端到端加密的内容都完全不在 API 里。

机器可读的参考是 [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)（OpenAPI 3.1），也有 [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md) 版本。两者都不需要密钥。

## 基础 URL 和密钥

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` 会说明这个凭据是什么、能做什么，这是检查新密钥最快的方法：

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

访问密钥的 `kind` 是 `pat`，你连接的应用（比如[助手](./assistants.md)）是 `oauth`。API 两者都接受。

## 信封

每个响应都是以下三种形式之一的 JSON。

| 响应 | 形式 |
|---|---|
| 一条记录 | `{ "data": { … } }` |
| 一个列表 | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| 一个错误 | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

删除返回 `204`，没有正文。AChat 没有值的字段会返回 `null`。

## 错误

| HTTP | `code` | 何时 |
|---|---|---|
| 400 | `invalid_request` | 错误的查询、错误的游标，或正文不符合字段规则（`details.issues` 列出每个字段） |
| 401 | `invalid_token` | 密钥缺失、错误、过期或已移除 |
| 403 | `scope_required` | 密钥缺少权限；`details.scope` 写明是哪个 |
| 404 | `not_found` | 这个地址对这个密钥没有内容，包括别人的记录 |
| 405 | `method_not_allowed` | 这个资源不接受这个方法，比如对联系人发 POST |
| 409 | `conflict` | AChat 的某条规则拒绝了这次更改；消息会用平实的话说明是哪条 |
| 413 | `payload_too_large` | 正文太大 |
| 429 | `rate_limited` | 请求太多；见[限制](#limits) |
| 500 | `internal` | 是我们的问题。请通过[联系页面](https://achat.aoneahsan.com/zh-Hans/contact)把 `correlation_id` 发给 AChat 团队 |

消息是写给人看的，从不带堆栈、SQL 或密钥。完全没有密钥时：

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## 分页、排序和筛选

列表默认返回 20 条记录，最多 50 条（`limit=1` 到 `limit=50`）。还有更多时，`meta.next_cursor` 里有游标：用同样的查询把它作为 `cursor` 发回去，就能拿到下一页，为 `null` 时停止。游标与它来自的查询绑定；改了排序或筛选，AChat 会拒绝它，那就不带游标重新开始。

`sort` 接受下文每个资源列出的值；前面的 `-` 表示最新的在前。筛选写成 `field.op=value`：

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## 限制 {#limits}

每个密钥或连接每分钟最多 120 次请求。此外，你的套餐还决定整个账户每天能发多少请求，从 UTC 午夜开始，所有密钥和助手合计（Free 默认 5,000；见[你的套餐允许什么](./index.md#what-your-plan-allows)）。每个响应都带有 `ratelimit-limit`、`ratelimit-remaining` 和 `ratelimit-reset`（距离最紧的那个限制重置还有几秒）；`429` 还会加上以秒计的 `retry-after`。被拒绝时请求仍会计数，所以请退避，而不是在循环里重试。

## 资料

你自己的资料：一条记录，`id` 就是你自己的 ID。`username` 在这里只读，因为新用户名要走应用里的认领流程。用 `profile:read` 读取，用 `profile:write` 更改。

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | uuid | 你的 ID |
| `username` | 字符串，最多 24 | 只读 |
| `name` | 字符串，1 到 100 | 别人看到的名字 |
| `hue` | 整数 0 到 359 | 没有照片时的头像颜色 |
| `created_at` | 日期时间 | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

你的照片要在应用里更改，不在这里。

## 设置

你自己的设置：一条记录，位于 `/preferences`。用 `preferences:read` 读取，用 `preferences:write` 更改。

| 字段 | 值 |
|---|---|
| `presence_visibility` | `everyone`、`contacts` 或 `nobody`：谁能看到你是否在线 |
| `read_receipts` | `true` 或 `false` |
| `language` | `en`、`zh-Hans`、`hi`、`es`、`ar`、`fr`、`pt-BR`、`ru`、`ja`、`ur`、`de`，未设置时为 `null` |
| `notify_sounds` | `true` 或 `false` |
| `notify_preview` | `name` 或 `none`：通知是否显示是谁写的 |
| `notify_mute_all` | `true` 或 `false` |
| `show_mature` | 只读：跟随你在应用里声明的年龄 |
| `id`、`updated_at` | 只读 |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

设置记录的 `id` 就是你自己的 ID，和资料的一样，也和 `/token` 返回的 `user_id` 一样。

## 动态

你最近 24 小时的动态。用 `status:read` 读取；用 `status:write` 发布；用 `status:delete` 删除。

| 字段 | 说明 |
|---|---|
| `id`、`created_at`、`expires_at` | 只读 |
| `kind` | `text`、`photo` 或 `video`；只读 |
| `text` | 文字动态的内容，最多 700 个字符；以你套餐的动态长度为准 |
| `bg_hue` | 文字动态的背景色，0 到 359；不填时使用你的头像颜色 |
| `caption` | 照片或视频的说明；只读 |
| `audience_mode` | `contacts`、`except` 或 `only`；只读 |
| `audience_count` | 这条动态能触达多少人；只读 |

筛选：`kind.eq`、`created_at.gte`、`created_at.lt`。排序：`-created_at`（默认）或 `created_at`。

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

API 只能发文字；照片和视频需要用应用上传。新动态会发给应用里动态设置指定的受众，并遵守应用本身的发布限制（每小时 30 条），达到上限时返回 `409` 并说明原因。无论在应用里还是在这里，动态都不是端到端加密的。

## 屏蔽的人

你屏蔽的人，按他们显示的用户名和名字列出。用 `blocks:read` 读取；用 `blocks:write` 屏蔽；用 `blocks:delete` 取消屏蔽。这里的 `id` 是被屏蔽者的 ID。

| 字段 | 说明 |
|---|---|
| `id` | 被屏蔽者的 ID |
| `username` | 对方的。要屏蔽某人，就发送它 |
| `name` | 对方显示的名字；只读 |
| `created_at` | 你屏蔽对方的时间 |

排序：`-created_at`（默认）或 `created_at`。

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

屏蔽的效果和应用里一样：对方不能再给你发消息或看你的动态，你们之间的联系人关系也随之结束。

## 联系人

只读，需要 `contacts:read`。每条记录以对方命名：`id`（对方的 ID）、`username`、`name`、`hue`、`chat_id`（你和对方的私人聊天，或 `null`）和 `created_at`。排序：`-created_at` 或 `created_at`。

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

等待你处理的联系人请求不是一个资源；你的服务器可以通过 `contact_request.received` [Webhook](./webhooks.md) 得知。

## 聊天

你所在的聊天，只读，需要 `chats:read`。

| 字段 | 说明 |
|---|---|
| `id`、`created_at` | |
| `kind` | `direct`、`group`、`anonymous_room` 或 `channel` |
| `title`、`topic` | 聊天没有时为 `null` |
| `end_to_end` | 消息是端到端加密、在这里永远读不到时为 `true` |
| `has_password` | 带密码的房间为 `true` |
| `last_message_at`、`joined_at` | 没有时为 `null` |

筛选：`kind.eq`。排序：`-created_at` 或 `created_at`。

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

私人聊天、群组或带密码的房间会被列出，带有名称和最后一条消息的时间，但它们的消息永远不会出现。

## 消息 {#messages}

你所在的开放房间和频道里的消息，原样呈现：只读，需要 `chats:read`。带密码的房间、私人聊天和群组不在这里，阅后即焚的消息、被管理员移除的消息、附件、表情回应和投票也不在。

| 字段 | 说明 |
|---|---|
| `id`、`created_at` | |
| `chat_id` | 开放房间或频道 |
| `kind` | `text` 或 `link` |
| `body` | 消息原文 |
| `sender_name` | 发送时使用的显示名称 |
| `reply_to_id` | 它回复的消息，或 `null` |
| `edited_at` | 从未编辑时为 `null` |

筛选：`chat_id.eq`、`created_at.gte`、`created_at.lt`。排序：`-created_at` 或 `created_at`。

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## 社区

你是成员的社区，只读，需要 `communities:read`：`id`、`name`、`about`、`topic`（`general`、`tech`、`gaming`、`study`、`creative`、`support`、`local` 或 `random`）、`join_mode`（`open` 或 `account`）、`member_count`、你的 `role`（`owner`、`admin` 或 `member`）和 `joined_at`。排序：`name`（默认）或 `-joined_at`。

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## 频道

你在自己的社区里能看到的频道，只读，需要 `communities:read`：`id`、`community_id`、`chat_id`（通过[消息](#messages)读取它的消息）、`name`、`topic`、`access`（`open` 或 `private`）和 `position`。筛选：`community_id.eq`。排序：`position`。

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## 来自已连接应用的删除

用访问密钥做的删除会立即执行，返回 `204`。你连接的应用请求的删除则从不会立即执行：它返回 `202`，等你决定。

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

你打开链接，看看会删掉什么，然后在 10 分钟内在 AChat 上同意或拒绝。见[删除要等你](./assistants.md#deletes-wait-for-you)。
