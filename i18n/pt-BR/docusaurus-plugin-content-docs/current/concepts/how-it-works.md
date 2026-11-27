---
sidebar_position: 1
title: Como o AChat funciona
description: As duas identidades no AChat — uma conta e um nome de exibição anônimo —, os tipos de conversa, onde as mensagens ficam e por quanto tempo cada coisa é guardada.
keywords: [como o AChat funciona, conversa anônima ou com conta, tempo de guarda das conversas, busca no dispositivo, mensagens offline]
last_update:
  date: 2026-11-27
  author: Equipe do AChat
---

# Como o AChat funciona

**No AChat há duas formas de estar numa conversa: uma conta (login com o Google mais um nome de usuário) ou, nas salas anônimas, um nome de exibição sem conta.** As duas nunca são ligadas: se você também tem conta, o AChat não conecta suas mensagens anônimas a ela.

## Tipos de conversa

| Conversa | Quem está nela | Precisa de conta | Criptografia de ponta a ponta |
|---|---|---|---|
| Conversa pessoal | Você e um contato | Sim | Sim |
| Grupo privado | Contatos que você convida, ou pessoas que um admin aprova | Sim | Sim |
| Sala anônima | Qualquer pessoa com o link (e a senha, se houver) | Não | Só com senha |
| Canal de comunidade | Membros da comunidade | Depende da comunidade | Não |
| Status | Seus contatos aceitos | Sim | Não |

## Onde as mensagens ficam

- **Nos servidores do AChat:** as mensagens de todas as conversas, para que cada dispositivo consiga buscá-las. Mensagens com criptografia de ponta a ponta ficam guardadas num formato que nem os servidores nem os administradores do AChat conseguem ler.
- **Nos seus dispositivos:** conversas e arquivos que você já abriu, para carregarem rápido e abrirem offline, mais uma caixa de saída com mensagens esperando envio. A busca roda aqui, no que o dispositivo tem.
- **Suas chaves:** nos seus dispositivos vinculados, e recuperáveis com a sua chave de recuperação. O AChat não guarda cópia.

## Quanto tempo as coisas duram

| O quê | Por quanto tempo |
|---|---|
| Conversas pessoais e grupos | Até alguém apagar, a não ser que a conversa use mensagens temporárias (1 minuto, 1 hora ou 1 dia) |
| Mensagens de sala anônima | Um número definido de dias depois de cada envio (10 por padrão), ou até a data de guarda se alguém guardar a sala |
| Lixeira | Um número definido de dias (30 por padrão), nunca mais do que o histórico da própria conversa |
| Status | 24 horas |
| Histórico de localização | Até a conversa ser excluída de vez da Lixeira ou expirar |

A [página de privacidade](https://achat.aoneahsan.com/pt-BR/privacy) lista todo o resto, e [Dados, privacidade e exclusão](/concepts/data-privacy-and-deletion) resume.

## Enviando uma mensagem

1. Você escreve. Ela entra primeiro na caixa de saída, então sobrevive a uma queda de conexão ou a um recarregamento.
2. O AChat envia e tenta de novo até ela ser aceita, sem mandar duas vezes.
3. O texto embaixo dela passa de **Enviando** (ou **Aguardando envio** quando offline) para **Enviada** quando ela chega.

## Plataformas

O mesmo AChat roda no navegador e no Android, em onze idiomas. Não há chamadas de voz nem de vídeo.
