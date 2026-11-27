---
sidebar_position: 1
title: "AChat para desenvolvedores"
description: "Acesse a sua conta do AChat de um script, de um assistente de IA ou do seu próprio servidor: uma API com chaves de acesso, uma conexão de assistente para Claude e ChatGPT, webhooks assinados e login em duas etapas. Conversas criptografadas nunca saem do AChat."
keywords: [API do AChat, MCP do AChat, webhooks do AChat, chave de acesso, conectar o Claude ao AChat, login em duas etapas do AChat]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# AChat para desenvolvedores

**A sua conta do AChat pode ser acessada de fora do app, por você, do seu jeito.** Um script pode publicar um status ou manter a sua lista de bloqueados em dia, o Claude pode dizer quais salas abertas tiveram mensagens novas, e o seu servidor pode saber na hora quando alguém te manda um pedido de contato. Todo plano tem isso, inclusive o Free, e cada caminho chega a uma conta só: a sua.

## De qual você precisa?

| Você quer | Use |
|---|---|
| Que um script ou serviço seu leia ou altere a sua conta | Uma [chave de acesso](./access-keys.md) e a [API](./api.md) |
| Que Claude, ChatGPT, Claude Code ou Cursor trabalhem com a sua conta | Uma [conexão de assistente](./assistants.md) |
| Que o seu servidor seja avisado quando algo mudar, sem perguntar a cada minuto | [Webhooks](./webhooks.md) |
| Um código depois do login com o Google, para uma conta Google roubada não bastar | [Login em duas etapas](./two-step-sign-in.md) |

Os quatro ficam no app: chaves, apps conectados e webhooks em **Conta › Outros apps**, login em duas etapas em **Conta › Segurança**.

## O que outros apps conseguem acessar {#what-other-apps-can-reach}

Um app só entra por uma chave que você criou ou uma conexão que você aprovou. De um jeito ou de outro, valem três regras.

| | O quê | De fora do AChat |
|---|---|---|
| **Seu** | Seu perfil, suas configurações, seus posts de status e sua lista de bloqueados | Ler e alterar. Apagar é uma permissão à parte, desligada a menos que você marque |
| **Compartilhado com outras pessoas** | Contatos, conversas, mensagens em salas abertas, comunidades e canais | Só leitura. Nenhum app pode postar, remover ou convidar ali |
| **Com criptografia de ponta a ponta** | Conversas diretas, grupos e salas com senha | Nunca. Um app vê o nome da conversa e que você está nela, nunca as mensagens |

A última regra não é uma configuração. As mensagens das suas conversas diretas, grupos e salas com senha ficam trancadas nos seus aparelhos, e os servidores do AChat não conseguem lê-las, então nenhuma chave ou assistente consegue. O mesmo vale para as chaves dos seus aparelhos, a sua chave de recuperação e os seus códigos de duas etapas. Veja [Segurança e criptografia](/concepts/security-and-encryption).

## O que o seu plano permite {#what-your-plan-allows}

| | Free | Pro | Team / Family |
|---|---|---|---|
| Chaves de acesso ao mesmo tempo | 5 | 25 | 50 |
| Pedidos à API e a assistentes por dia | 5.000 | 50.000 | 100.000 |
| Endereços de webhook ao mesmo tempo | 3 | 20 | 40 |
| Conexões de assistente ao mesmo tempo | 3 | 10 | 25 |

Esses são os padrões de hoje. A equipe do AChat define os números de cada plano, então **Conta › Outros apps › Uso em relação ao seu plano** mostra o que vale para você, com a contagem de hoje. Os pedidos contam a partir da meia-noite UTC, somando todas as chaves e assistentes da conta. Cada chave ou conexão também fica limitada a 120 pedidos por minuto, em todo plano, para um script descontrolado parar antes de gastar o dia inteiro.

## Não há feed de calendário

O AChat não guarda nada com data que caiba num calendário, então não há feed de calendário para assinar.

## Para máquinas

- OpenAPI 3.1: [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)
- A mesma referência em Markdown: [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md)
- O que mudou, e quando: [Changelog para desenvolvedores](./changelog.md)
