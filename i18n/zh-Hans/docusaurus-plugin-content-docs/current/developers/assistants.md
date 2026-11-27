---
sidebar_position: 4
title: "连接 Claude、ChatGPT、Claude Code 或 Cursor"
description: "通过 AChat 的 MCP 地址把 AI 助手连接到你的 AChat 账户。Claude、ChatGPT、Claude Code 和 Cursor 的设置方法，你要批准什么，为什么删除总要等你点头，以及如何断开。"
keywords: [AChat MCP, 把 Claude 连接到 AChat, AChat ChatGPT 连接器, Claude Code MCP, Cursor MCP, AI 助手 聊天应用]
last_update:
  date: 2026-11-21
  author: AChat 团队
---

# 连接 Claude、ChatGPT、Claude Code 或 Cursor

**把 AChat 的助手地址粘贴到你的助手里，在 AChat 上批准，它就能读取你的账户并更改属于你的内容。** 它只能看到你批准时勾选的内容。它永远读不了端到端加密的消息，而且不经你在 AChat 上同意，什么都不能删除。

AChat 的助手地址：

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

这是一个基于 Streamable HTTP 的远程 MCP 服务器。你也能在 **账户 › 其他应用 › 连接助手** 下找到它，旁边有 **复制** 按钮。

## Claude

1. 在 Claude 里打开 **Settings**，然后 **Connectors**。
2. 选择 **Add custom connector**，粘贴 AChat 的地址。
3. Claude 会打开 AChat。查看它请求的内容，然后批准。

## ChatGPT

1. 在 ChatGPT 里打开 **Settings**，然后 **Apps and Connectors**，开启开发者模式。
2. 选择 **Create**，命名为 AChat，粘贴地址。
3. ChatGPT 会打开 AChat。查看它请求的内容，然后批准。

## Claude Code

1. 在终端里运行：

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. 在 Claude Code 里运行 `/mcp`，选择 **achat**。
3. 你的浏览器会打开 AChat。查看它请求的内容，然后批准。

## Cursor

1. 在 Cursor 里打开 **Settings**，然后 **MCP**，然后 **Add new MCP server**。
2. 把这段粘贴进 `mcp.json`：

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor 会打开 AChat。查看它请求的内容，然后批准。

其他支持 OAuth 的 MCP 客户端也是同样的方式：对没有令牌的客户端，这个地址会告诉它去哪里登录，客户端会自行注册。

## 你要批准什么

AChat 上的授权页面会写明应用名称、它把你送回的地址，以及它请求的每项权限，使用和[访问密钥](./access-keys.md#permissions)相同的读取、更改和删除勾选项。无论请求什么，共享数据都只读；AChat 不提供的权限会从请求中去掉。在你选择 **批准** 之前，什么都不会共享。

- 应用“自行在 AChat 注册”：AChat 没有核实是谁在运行它，所以请看清它请求了什么。
- 如果这个连接能更改内容，批准需要最近 10 分钟内的登录；开启[两步登录](./two-step-sign-in.md)时还需要验证码。
- 你可以给连接起个名字，以后好区分两个连接。

应用连接后，AChat 会给你发邮件。你的套餐决定同时能连接多少个（Free 默认 3 个；见[你的套餐允许什么](./index.md#what-your-plan-allows)）。助手的调用和 API 计入同一个每日请求额度。

## 助手能做什么

每个工具都需要旁边的权限，助手的工具列表只显示你当前批准允许的工具。

| 工具 | 权限 |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

字段和 API 的一样；见 [AChat API](./api.md)。列表每次调用最多返回 50 条记录，并附带获取下一页的游标。消息只来自开放房间和频道。私人聊天、群组或带密码的房间只显示名称和成员，从不显示说了什么。

## 删除要等你 {#deletes-wait-for-you}

助手从不删除。当你让它删除一条动态或取消屏蔽某人时，它会调用 `prepare_delete_status` 或 `prepare_delete_blocks`，AChat 会回复一个指向 `https://achat.aoneahsan.com/developers/confirm/…` 的链接。

1. 打开链接。AChat 会显示助手请求了什么，以及会连带删除什么。
2. 选择 **删除**（或 **解除屏蔽**），或 **保留**。你是在 AChat 上，不是在助手里，所以它按不了这些按钮。
3. 助手只会知道请求已结束。

请求在 10 分钟后失效，什么都不会被删除。确认需要最近 10 分钟内的登录，开启两步登录时还需要验证码。仍在等待的删除列在 **账户 › 其他应用 › 已连接的应用** 下。有删除权限的[访问密钥](./access-keys.md)会立即删除，因为运行它的是你自己。

## 断开

在 **账户 › 其他应用 › 已连接的应用** 下，在连接上选择 **移除**。它立即失去访问权限，包括正在进行中的请求。想再用就重新连接。**重命名** 只改你看到的名称。

## 助手接触不到的

- 私人聊天、群组和带密码房间里的消息，AChat 自己也读不了。
- 你的设备密钥、恢复密钥、两步验证码、访问密钥和 Webhook 密钥。
- 你的照片、附件、表情回应和投票。
- 属于其他账户的任何内容。

助手从 AChat 读到的文字（一条动态、开放房间里的一条消息）是作为数据返回给它的。别人写的话就是别人的话，不是给你助手的指令。
