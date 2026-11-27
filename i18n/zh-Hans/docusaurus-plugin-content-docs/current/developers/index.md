---
sidebar_position: 1
title: "面向开发者的 AChat"
description: "从脚本、AI 助手或你自己的服务器访问你的 AChat 账户：带访问密钥的 API、供 Claude 和 ChatGPT 使用的助手连接、签名的 Webhook 和两步登录。加密聊天永远不会离开 AChat。"
keywords: [AChat API, AChat MCP, AChat Webhook, 访问密钥, 把 Claude 连接到 AChat, AChat 两步登录]
last_update:
  date: 2026-11-21
  author: AChat 团队
---

# 面向开发者的 AChat

**你的 AChat 账户可以在应用之外被访问，由你来做，按你的规矩来。** 脚本可以发一条动态或同步你的屏蔽名单，Claude 可以告诉你哪些开放房间有新消息，你的服务器可以在有人给你发联系人请求的那一刻收到通知。每个套餐都有，包括 Free，而且每种方式只能访问一个账户：你的。

## 你需要哪一种？

| 你想要 | 使用 |
|---|---|
| 让你的脚本或服务读取或更改你的账户 | [访问密钥](./access-keys.md)和 [API](./api.md) |
| 让 Claude、ChatGPT、Claude Code 或 Cursor 操作你的账户 | [助手连接](./assistants.md) |
| 有变化时通知你的服务器，而不用每分钟去问 | [Webhook](./webhooks.md) |
| Google 登录之后再要一个验证码，让被盗的 Google 账号不够用 | [两步登录](./two-step-sign-in.md) |

这四项都在应用里：密钥、已连接的应用和 Webhook 在 **账户 › 其他应用** 下，两步登录在 **账户 › 安全** 下。

## 其他应用能访问什么 {#what-other-apps-can-reach}

应用只能通过你创建的密钥或你批准的连接进来。无论哪种，都遵守三条规则。

| | 内容 | 从 AChat 之外 |
|---|---|---|
| **你自己的** | 你的资料、设置、动态和屏蔽名单 | 读取和更改。删除是单独的权限，除非你勾选，否则关闭 |
| **与他人共享的** | 联系人、聊天、开放房间里的消息、社区和频道 | 只读。任何应用都不能在那里发消息、移除或邀请 |
| **端到端加密的** | 私人聊天、群组和带密码的房间 | 从不。应用只能看到聊天的名称以及你在其中，看不到它的消息 |

最后一条不是一个设置。你的私人聊天、群组和带密码房间里的消息锁在你的设备上，AChat 的服务器读不了，所以任何密钥或助手也读不了。你的设备密钥、恢复密钥和两步验证码也一样。见[安全与加密](/concepts/security-and-encryption)。

## 你的套餐允许什么 {#what-your-plan-allows}

| | Free | Pro | Team / Family |
|---|---|---|---|
| 同时持有的访问密钥 | 5 | 25 | 50 |
| 每天的 API 和助手请求 | 5,000 | 50,000 | 100,000 |
| 同时持有的 Webhook 地址 | 3 | 20 | 40 |
| 同时持有的助手连接 | 3 | 10 | 25 |

这些是目前的默认值。每个套餐的数字由 AChat 团队设定，所以 **账户 › 其他应用 › 套餐用量** 会显示适用于你的数字和今天的计数。请求从 UTC 午夜开始计算，账户里所有密钥和助手合计。每个密钥或连接在每个套餐里还限制为每分钟 120 次请求，这样失控的脚本会在用光一天的额度之前停下。

## 没有日历订阅

AChat 没有任何需要放进日历的带日期内容，所以没有可订阅的日历。

## 给机器读的

- OpenAPI 3.1：[`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)
- 同一份参考的 Markdown 版：[`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md)
- 改了什么、什么时候改的：[开发者更新日志](./changelog.md)
