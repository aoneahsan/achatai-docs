---
sidebar_position: 4
title: "Connect Claude, ChatGPT, Claude Code or Cursor"
description: "Connect an AI assistant to your AChat account through AChat's MCP address. Setup for Claude, ChatGPT, Claude Code and Cursor, what you approve, why a delete always waits for your yes, and how to disconnect."
keywords: [AChat MCP, connect Claude to AChat, AChat ChatGPT connector, Claude Code MCP, Cursor MCP, AI assistant chat app]
last_update:
  date: 2026-11-21
  author: AChat team
---

# Connect Claude, ChatGPT, Claude Code or Cursor

**Paste AChat's assistant address into your assistant, approve it on AChat, and it can read your account and change what's yours.** It sees only what you tick when you approve it. It can never read an end-to-end encrypted message, and it can never delete anything without you saying yes on AChat.

AChat's assistant address:

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

It's a remote MCP server over Streamable HTTP. You'll also find it, with a Copy button, under **Account › Other apps › Connect an assistant**.

## Claude

1. In Claude, open **Settings**, then **Connectors**.
2. Choose **Add custom connector** and paste AChat's address.
3. Claude opens AChat. Check what it asks for and approve.

## ChatGPT

1. In ChatGPT, open **Settings**, then **Apps and Connectors**, and turn on developer mode.
2. Choose **Create**, name it AChat and paste the address.
3. ChatGPT opens AChat. Check what it asks for and approve.

## Claude Code

1. In a terminal, run:

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. Run `/mcp` in Claude Code and choose **achat**.
3. Your browser opens AChat. Check what it asks for and approve.

## Cursor

1. In Cursor, open **Settings**, then **MCP**, then **Add new MCP server**.
2. Paste this into `mcp.json`:

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor opens AChat. Check what it asks for and approve.

Other MCP clients that support OAuth work the same way: the address answers a client without a token with where to sign in, and the client registers itself.

## What you approve

The consent page on AChat names the app, the address it sends you back to, and each permission it asks for, using the same Read, Change and Delete ticks as an [access key](./access-keys.md#permissions). Shared data stays read only whatever is asked, and a permission AChat doesn't offer is dropped from the request. Nothing is shared until you choose **Approve**.

- An app "registered itself with AChat": AChat hasn't checked who runs it, so read what it asks for.
- If the connection can change things, approving needs a sign-in in the last 10 minutes, and the code too when [two-step sign-in](./two-step-sign-in.md) is on.
- You can give the connection a name, so you can tell two of them apart later.

AChat emails you when an app is connected. Your plan sets how many can be connected at once (3 on Free by default; see [what your plan allows](./index.md#what-your-plan-allows)). Assistant calls count toward the same daily request allowance as the API.

## What an assistant can do

Each tool needs the permission beside it, and the assistant's tool list shows only the tools your approval allows right now.

| Tools | Permission |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

The fields are the API's; see [The AChat API](./api.md). Lists return up to 50 records a call, with a cursor for the next page. Messages come only from open rooms and channels. A direct chat, group or password room shows its name and members, never what was said.

## Deletes wait for you

An assistant never deletes. When you ask it to remove a status post or unblock someone, it calls `prepare_delete_status` or `prepare_delete_blocks`, and AChat answers with a link to `https://achat.aoneahsan.com/developers/confirm/…`.

1. Open the link. AChat shows what the assistant asked for and what goes with it.
2. Choose **Delete it** (or **Unblock**), or **Keep it**. You're on AChat, not in the assistant, so it can't press these buttons.
3. The assistant only learns that the request finished.

The request runs out after 10 minutes, and nothing is deleted. Confirming needs a sign-in in the last 10 minutes, with the code when two-step sign-in is on. Deletes still waiting are listed under **Account › Other apps › Connected apps**. An [access key](./access-keys.md) with a Delete permission deletes at once, because you're the one running it.

## Disconnect

Under **Account › Other apps › Connected apps**, choose **Remove** on the connection. It loses access straight away, including any request it's in the middle of. To use it again, connect it again. **Rename** changes only the name you see.

## What assistants can't reach

- Messages in direct chats, groups and password rooms, which AChat itself can't read.
- Your device keys, recovery key, two-step codes, access keys and webhook secrets.
- Your photo, attachments, reactions and polls.
- Anything belonging to another account.

The text an assistant reads from AChat (a status post, a message in an open room) is returned to it as data. Treat words written by other people as their words, not as instructions for your assistant.
