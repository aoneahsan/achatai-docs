---
sidebar_position: 2
title: "Chaves de acesso"
description: "Crie uma chave de acesso do AChat em Conta › Outros apps, escolha o que ela pode ler, alterar ou apagar e quando para de funcionar. Quando uma chave pode ser mostrada de novo, como trocá-la sem interrupção e como removê-la."
keywords: [chave de acesso do AChat, achat_pat, chave de API, token de acesso pessoal, permissões da chave, trocar chave]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# Chaves de acesso

**Uma chave de acesso deixa um script ou serviço seu ler ou alterar a sua conta pela [API do AChat](./api.md).** Ela começa com `achat_pat_`, age como você e só pode fazer o que você marcou ao criá-la. Trate cada uma como uma senha.

## Criar uma chave

1. Abra **Conta › Outros apps** e escolha **Criar uma chave de acesso**.
2. Dê um nome que você reconheça, como "Servidor de casa".
3. Marque o que ela pode fazer (veja [Permissões](#permissions)).
4. Escolha quando ela para de funcionar: 30, 90 ou 365 dias, ou **Nunca**.
5. Escolha **Criar chave**, copie e coloque onde ela vai ser usada.

Criar uma chave exige um login nos últimos 10 minutos. Com o [login em duas etapas](./two-step-sign-in.md) ligado, esse login precisa ter incluído o código; um navegador que pulou o código porque você pediu para ser lembrado não conta. Se passou mais tempo, o AChat pede para você entrar de novo e te traz direto de volta.

O AChat te manda um e-mail toda vez que uma chave é criada.

## Permissões {#permissions}

Cada tipo de dado tem até três marcações: **Ler**, **Alterar** e **Apagar**. Alterar inclui Ler. Apagar não inclui mais nada e nunca é marcado por você.

| Dado | Ler | Alterar | Apagar |
|---|---|---|---|
| Perfil: nome de usuário, o nome que as pessoas veem, cor do avatar | `profile:read` | `profile:write` (nome e cor) | — |
| Configurações: quem te vê online, confirmações de leitura, idioma, notificações | `preferences:read` | `preferences:write` | — |
| Posts de status | `status:read` | `status:write` (novos posts de texto) | `status:delete` |
| Pessoas bloqueadas | `blocks:read` | `blocks:write` (bloquear alguém) | `blocks:delete` (desbloquear) |
| Contatos | `contacts:read` | — | — |
| Conversas, e mensagens em salas abertas e canais | `chats:read` | — | — |
| Comunidades e seus canais | `communities:read` | — | — |

Contatos, conversas e comunidades têm outras pessoas, então são só leitura, seja lá o que você marcar. Conversas diretas, grupos e salas com senha mostram o nome e os membros; as mensagens nunca saem do AChat.

## Quando uma chave para de funcionar

- **30, 90 ou 365 dias** para qualquer chave.
- **Nunca** só para uma chave que apenas lê. Uma chave que pode alterar ou apagar sempre termina, e 365 dias é o máximo.

A linha da chave em Outros apps mostra a data em que ela para de funcionar e quando foi usada pela última vez.

## Mostrar uma chave de novo

O AChat pode mostrar uma chave de novo por 10 minutos depois que você entra, com o código quando o login em duas etapas está ligado. Depois disso, escolha **Entre de novo para mostrar**. O AChat mostra chaves no máximo 10 vezes por hora por conta. O AChat guarda só uma cópia lacrada e uma impressão digital de mão única, nunca a chave em texto aberto.

## Trocar uma chave

**Trocar** te dá uma chave nova com o mesmo nome e as mesmas permissões. A chave antiga continua funcionando por 24 horas, para você fazer a troca sem interrupção. Uma chave que tinha data de término ganha uma nova de 90 dias; uma chave só de leitura marcada como Nunca continua sem término. Trocar exige o mesmo login recente que criar uma chave, e o AChat te manda um e-mail sobre isso.

## Remover uma chave

**Remover** para a chave na hora: qualquer coisa que ainda a use é recusada a partir do próximo pedido. Não dá para desfazer, mas você pode criar uma chave nova.

## Quantas chaves

O seu plano define quantas chaves você pode ter ao mesmo tempo (5 no Free, por padrão; a tabela completa está em [AChat para desenvolvedores](./index.md#what-your-plan-allows)). Quando todas estiverem em uso, remova uma para criar outra.

## Quem não pode criar chaves

Sessões de salas anônimas nunca são contas, então não podem criar chaves, conectar apps nem adicionar endereços de webhook. Uma conta suspensa, ou cuja exclusão foi pedida, tem todas as chaves e conexões recusadas.
