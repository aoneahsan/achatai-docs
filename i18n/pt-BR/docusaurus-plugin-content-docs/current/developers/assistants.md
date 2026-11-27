---
sidebar_position: 4
title: "Conectar Claude, ChatGPT, Claude Code ou Cursor"
description: "Conecte um assistente de IA à sua conta do AChat pelo endereço MCP do AChat. Configuração para Claude, ChatGPT, Claude Code e Cursor, o que você aprova, por que uma exclusão sempre espera o seu sim e como desconectar."
keywords: [MCP do AChat, conectar o Claude ao AChat, conector do AChat para ChatGPT, Claude Code MCP, Cursor MCP, app de chat com assistente de IA]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# Conectar Claude, ChatGPT, Claude Code ou Cursor

**Cole o endereço de assistente do AChat no seu assistente, aprove no AChat, e ele consegue ler a sua conta e mudar o que é seu.** Ele só vê o que você marcar ao aprovar. Nunca consegue ler uma mensagem com criptografia de ponta a ponta e nunca apaga nada sem você dizer sim no AChat.

Endereço de assistente do AChat:

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

É um servidor MCP remoto sobre Streamable HTTP. Ele também aparece, com um botão **Copiar**, em **Conta › Outros apps › Conectar um assistente**.

## Claude

1. No Claude, abra **Settings** e depois **Connectors**.
2. Escolha **Add custom connector** e cole o endereço do AChat.
3. O Claude abre o AChat. Confira o que ele pede e aprove.

## ChatGPT

1. No ChatGPT, abra **Settings** e depois **Apps and Connectors**, e ligue o modo de desenvolvedor.
2. Escolha **Create**, dê o nome AChat e cole o endereço.
3. O ChatGPT abre o AChat. Confira o que ele pede e aprove.

## Claude Code

1. Num terminal, rode:

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. Rode `/mcp` no Claude Code e escolha **achat**.
3. O seu navegador abre o AChat. Confira o que ele pede e aprove.

## Cursor

1. No Cursor, abra **Settings**, depois **MCP** e depois **Add new MCP server**.
2. Cole isto no `mcp.json`:

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. O Cursor abre o AChat. Confira o que ele pede e aprove.

Outros clientes MCP com suporte a OAuth funcionam do mesmo jeito: para um cliente sem token, o endereço responde onde entrar, e o cliente se registra sozinho.

## O que você aprova

A página de consentimento no AChat mostra o nome do app, o endereço para onde ele te devolve e cada permissão que pede, com as mesmas marcações Ler, Alterar e Apagar de uma [chave de acesso](./access-keys.md#permissions). Dados compartilhados continuam só para leitura, seja o que for pedido, e uma permissão que o AChat não oferece é tirada do pedido. Nada é compartilhado até você escolher **Aprovar**.

- Um app que "se registrou sozinho no AChat": o AChat não verificou quem o opera, então leia o que ele pede.
- Se a conexão pode mudar coisas, aprovar exige um login nos últimos 10 minutos, e o código também quando o [login em duas etapas](./two-step-sign-in.md) está ligado.
- Você pode dar um nome à conexão, para diferenciar duas delas depois.

O AChat te manda um e-mail quando um app é conectado. O seu plano define quantos podem estar conectados ao mesmo tempo (3 no Free, por padrão; veja [o que o seu plano permite](./index.md#what-your-plan-allows)). Chamadas de assistente contam na mesma franquia diária de pedidos da API.

## O que um assistente pode fazer

Cada ferramenta precisa da permissão ao lado, e a lista de ferramentas do assistente mostra só as que a sua aprovação permite agora.

| Ferramentas | Permissão |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

Os campos são os da API; veja [A API do AChat](./api.md). Listas retornam até 50 registros por chamada, com um cursor para a próxima página. Mensagens vêm só de salas abertas e canais. Uma conversa direta, um grupo ou uma sala com senha mostram o nome e os membros, nunca o que foi dito.

## Exclusões esperam por você {#deletes-wait-for-you}

Um assistente nunca apaga. Quando você pede para tirar um post de status ou desbloquear alguém, ele chama `prepare_delete_status` ou `prepare_delete_blocks`, e o AChat responde com um link para `https://achat.aoneahsan.com/developers/confirm/…`.

1. Abra o link. O AChat mostra o que o assistente pediu e o que vai junto.
2. Escolha **Apagar** (ou **Desbloquear**) ou **Manter**. Você está no AChat, não no assistente, então ele não consegue apertar esses botões.
3. O assistente só fica sabendo que o pedido terminou.

O pedido expira depois de 10 minutos, e nada é apagado. Confirmar exige um login nos últimos 10 minutos, com o código quando o login em duas etapas está ligado. Exclusões ainda esperando aparecem em **Conta › Outros apps › Apps conectados**. Uma [chave de acesso](./access-keys.md) com permissão de Apagar apaga na hora, porque é você quem a está rodando.

## Desconectar

Em **Conta › Outros apps › Apps conectados**, escolha **Remover** na conexão. Ela perde o acesso na hora, inclusive em qualquer pedido que esteja no meio. Para usar de novo, conecte de novo. **Renomear** muda só o nome que você vê.

## O que os assistentes não alcançam

- Mensagens em conversas diretas, grupos e salas com senha, que nem o próprio AChat consegue ler.
- As chaves dos seus aparelhos, a chave de recuperação, os códigos de duas etapas, as chaves de acesso e os segredos de webhook.
- A sua foto, anexos, reações e enquetes.
- Qualquer coisa de outra conta.

O texto que um assistente lê no AChat (um post de status, uma mensagem numa sala aberta) é entregue a ele como dado. Trate palavras escritas por outras pessoas como palavras delas, não como instruções para o seu assistente.
