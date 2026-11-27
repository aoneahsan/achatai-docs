---
sidebar_position: 7
title: "Changelog para desenvolvedores"
description: "Mudanças na API do AChat, na conexão com assistentes, nos webhooks e no login em duas etapas, das mais novas para as mais antigas, a partir da plataforma aberta em 2026-11-21."
keywords: [changelog da API do AChat, mudanças para desenvolvedores do AChat, mudanças no MCP do AChat]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# Changelog para desenvolvedores

Mudanças na API, na conexão com assistentes, nos webhooks e no login em duas etapas, das mais novas para as mais antigas. A API é a `v1`.

## A plataforma aberta (2026-11-21)

- **[A API do AChat](./api.md)** em `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`, com [chaves de acesso](./access-keys.md) (`achat_pat_…`) criadas em Conta › Outros apps. Seu perfil, suas configurações, seus posts de status (texto) e sua lista de bloqueados podem ser lidos e alterados; contatos, conversas, mensagens de salas abertas, comunidades e canais são só para leitura. Há um documento OpenAPI 3.1 em `/openapi.json`.
- **[Conexão com assistentes](./assistants.md)** em `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp` para Claude, ChatGPT, Claude Code e Cursor. Você aprova cada um no AChat, e uma exclusão feita por um assistente espera o seu sim em `/developers/confirm`.
- **[Webhooks](./webhooks.md)** para onze eventos, assinados com Standard Webhooks, levando só IDs e horários.
- **[Login em duas etapas](./two-step-sign-in.md)** com um app autenticador, dez códigos de recuperação e a opção de lembrar o navegador por 7 dias. Obrigatório para as contas que operam as telas de admin do AChat.
- Conversas com criptografia de ponta a ponta ficam fora de tudo isso: apps de fora veem o nome e os membros de uma conversa, nunca as mensagens.
- Sem feed de calendário: o AChat não tem nada com data para colocar num.
