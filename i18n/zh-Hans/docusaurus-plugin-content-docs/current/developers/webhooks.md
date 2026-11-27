---
sidebar_position: 5
title: "Webhook"
description: "AChat Webhook：添加 https 地址，选择事件，并用 Node 或 Python 验证每次投递的 Standard Webhooks 签名。每个事件及其载荷、重试时间表、暂停，以及什么会让地址被关闭。"
keywords: [AChat Webhook, Standard Webhooks, Webhook 签名, webhook-signature 验证, HMAC-SHA256, 联系人请求 Webhook]
last_update:
  date: 2026-11-21
  author: AChat 团队
---

# Webhook

**你账户里有变化时，AChat 会向你自己的服务器发送一条简短的签名消息，让你的工具不用每分钟去问就能做出反应。** 每个事件都用 ID 说明变了什么、何时变的。它从不携带消息正文、名字或任何你需要妥善保管的内容；其余部分由你的服务器用[访问密钥](./access-keys.md)去获取。

## 添加地址

1. 在 **账户 › 其他应用 › Webhook** 下，选择 **添加 Webhook 地址**。
2. 粘贴地址，愿意的话再给自己写个备注。
3. 选择它要接收的事件。
4. 选择 **添加地址**，然后复制签名密钥（`whsec_…`）。

添加地址需要最近 10 分钟内的登录，开启[两步登录](./two-step-sign-in.md)时还需要验证码。添加地址后，AChat 会给你发邮件。

地址必须：

- 以 `https://` 开头；AChat 不通过明文 http 发送；
- 使用标准端口（443）或 8443；
- 不带用户名或密码；请改为校验签名；
- 能从互联网访问。私有网络、本机和 AChat 自己的域名都会被拒绝。

你的套餐决定你同时能有多少个地址（Free 默认 3 个；见[你的套餐允许什么](./index.md#what-your-plan-allows)）。

## 一次投递长什么样

一个带 JSON 正文和三个请求头的 `POST`，以 `AChat-Webhooks/1.0` 的身份发送：

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` 是事件，`timestamp` 是发生时间，`data` 包含下文列出的 ID 和时间。`webhook-id` 是事件的 ID，每次重试都相同，可以用它识别重复投递。

## 事件

| 事件 | 何时 | `data` |
|---|---|---|
| `profile.updated` | 你的用户名、名字、头像颜色或照片变了 | `id`（你的） |
| `status.posted` | 你发布了一条动态 | `id`、`created_at`、`expires_at` |
| `status.deleted` | 你的一条动态被删除 | `id` |
| `block.added` | 你屏蔽了某人 | `id`（对方的）、`created_at` |
| `block.removed` | 你取消屏蔽了某人 | `id`（对方的） |
| `contact.added` | 添加了一个联系人 | `id`（联系人的）、`created_at` |
| `contact.removed` | 移除了一个联系人 | `id`（联系人的） |
| `contact_request.received` | 有人给你发了联系人请求 | `id`（提出请求的人）、`created_at` |
| `chat.joined` | 你加入了一个聊天或房间 | `id`（聊天的）、`joined_at` |
| `chat.left` | 你离开了一个聊天或房间，或被移出 | `id`（聊天的） |
| `message.created` | 你所在的开放房间或频道里来了一条消息 | `id`、`chat_id`、`created_at` |
| `webhook.test` | 你选择了 **发送测试事件** | `message`：`"Test event"` |

`message.created` 只针对开放房间和频道里的文字和链接消息。私人聊天、群组或带密码房间里的消息从不产生事件，因为 AChat 读不了它们。每个 `id` 都对应 [API](./api.md) 里同一 ID 的记录：用有相应权限的密钥获取 `/messages/{id}`、`/status/{id}` 或 `/contacts/{id}`。

只有在你的某个地址在监听时，事件才会被记录。请先添加地址；地址存在之前发生的变化不会补发。

## 验证签名

每次投递都用 [Standard Webhooks](https://www.standardwebhooks.com) 签名：对 `webhook-id`、一个点、`webhook-timestamp`、一个点和原始正文做 HMAC-SHA256，密钥是你的密钥字节（`whsec_` 之后的部分，经 base64 解码）。`webhook-signature` 包含一个或多个用空格分隔的 `v1,<base64>` 值；任意一个匹配即接受这次投递。时间戳与你的时钟相差超过五分钟的，一律拒绝。

校验 **原始** 正文，必须与到达时完全一致。把 JSON 解析后再序列化会改变字节，签名就对不上了。

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

使用 Express 时，在这个路由上以原始形式读取正文：

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

使用 Flask 时，传入 `request.get_data()` 和 `request.headers`。不想自己写的话，任何 Standard Webhooks 库都能做同样的校验。

## 快速响应

在 10 秒内返回任意 `2xx`，之后再处理。AChat 不跟随重定向。`410 Gone` 会让 AChat 立即关闭这个地址；其他任何响应或没有响应，都算失败。

## 重试

失败的投递总共尝试 8 次：立即一次，然后分别在上一次之后 5 秒、5 分钟、30 分钟、2 小时、5 小时、10 小时和 10 小时，从第一次到最后一次一天多一点。每次尝试都带同一个 `webhook-id`。

每个地址下的 **发送记录** 显示每次投递：已送达、未发送、无响应，或你的服务器返回的状态，以及尝试次数。**重新发送** 用同一个 ID 再发一次。事件及其记录保留 30 天。

## 暂停、关闭和重新开启

- **暂停** 会跳过事件，直到你选择 **恢复**。暂停期间发生的事件之后不会补发。
- 连续失败 5 天、没有中断的地址会 **因失败已关闭**，AChat 会发邮件告诉你地址、最后一次响应，以及从何时开始失败。在你选择 **重新开启** 之前，什么都不会发送。
- **移除地址** 会立即停止发送，它的发送记录也随之删除。

## 签名密钥

添加地址时 AChat 会显示一次密钥，登录后 10 分钟内还能再看（开启两步登录时需带验证码）：**显示签名密钥**。**更换密钥** 会生成一个新密钥，在 24 小时内每个事件都带两个签名，各对应一个密钥，让你的服务器无缝切换。上面的校验代码已经接受其中任意一个。
