---
sidebar_position: 5
title: "Verificar uma licença"
description: "Como conferir, pela chave de licença ou pelo domínio, se uma cópia do AChat rodando com outro nome está licenciada, e o que cada resposta quer dizer."
keywords: [verificar licença do AChat, conferir licença white-label, checar chave de licença]
last_update:
  date: 2026-11-13
  author: Equipe do AChat
---

# Verificar uma licença

**Qualquer pessoa pode conferir uma cópia do AChat que roda com outro nome.** Abra [Verificar uma licença](https://achat.aoneahsan.com/pt-BR/verify-license) e digite a chave de licença da cópia ou o domínio dela. A verificação é feita pelo nosso serviço de licenças.

## Pelo domínio

Cada cópia licenciada publica um arquivo de licença no próprio domínio, em `/.well-known/`. A verificação pelo domínio lê esse arquivo e confere a chave indicada nele.

| Resposta | O que quer dizer |
|---|---|
| Licença ativa | O arquivo indica uma licença para este domínio, e ela está ativa |
| Outro domínio | O arquivo indica uma licença emitida para outro domínio |
| Não é uma licença válida | O arquivo indica uma licença que não existe |
| Sem arquivo de licença | O domínio não publica um |
| Não respondeu | Não foi possível acessar o domínio |

## Pela chave

A verificação pela chave diz se a licença está ativa, ainda em configuração ou revogada, e mostra os dados públicos dela: para quem foi licenciada, os domínios, as plataformas e as datas. Ela nunca mostra um e-mail nem um preço.

## Uma cópia cuja licença não está ativa

Ela mostra "Esta licença não está ativa" no lugar do app, com um link para esta verificação. Nada nela é apagado.
