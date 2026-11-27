---
sidebar_position: 7
title: "开发者更新日志"
description: "AChat 的 API、助手连接、Webhook 和两步登录的变更，最新的在前，从 2026-11-21 的开放平台开始。"
keywords: [AChat API 更新日志, AChat 开发者变更, AChat MCP 变更]
last_update:
  date: 2026-11-21
  author: AChat 团队
---

# 开发者更新日志

API、助手连接、Webhook 和两步登录的变更，最新的在前。API 版本是 `v1`。

## 开放平台（2026-11-21）

- **[AChat API](./api.md)** 位于 `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`，使用在 账户 › 其他应用 下创建的[访问密钥](./access-keys.md)（`achat_pat_…`）。你的资料、设置、动态（文字）和屏蔽名单可以读取和修改；联系人、聊天、开放房间的消息、社区和频道只能读取。OpenAPI 3.1 文档位于 `/openapi.json`。
- **[助手连接](./assistants.md)** 位于 `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp`，供 Claude、ChatGPT、Claude Code 和 Cursor 使用。每一个都要你在 AChat 上批准，助手的删除操作要等你在 `/developers/confirm` 上点头。
- **[Webhook](./webhooks.md)** 覆盖十一种事件，用 Standard Webhooks 签名，只携带 ID 和时间。
- **[两步登录](./two-step-sign-in.md)**，使用身份验证器应用、十个恢复码和可选的 7 天记住浏览器。运行 AChat 管理界面的账号必须开启。
- 端到端加密的聊天完全不在其中：外部应用只能看到聊天的名称和成员，从看不到消息。
- 没有日历订阅：AChat 没有需要放进日历的带日期内容。
