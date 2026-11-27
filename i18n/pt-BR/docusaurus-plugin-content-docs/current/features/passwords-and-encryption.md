---
sidebar_position: 4
title: Senhas e criptografia
description: 'Quais conversas do AChat têm criptografia de ponta a ponta, o que a senha de uma sala protege, e os limites: salas abertas, comunidades e status não têm criptografia de ponta a ponta.'
keywords: ['chat com criptografia de ponta a ponta', 'senha de sala', 'conversa em grupo criptografada', 'criptografia do AChat']
last_update:
  date: 2026-10-01
  author: Equipe do AChat
---

# Senhas e criptografia

**Conversas pessoais, grupos privados e os arquivos deles têm criptografia de ponta a ponta, então cada mensagem só pode ser lida nos aparelhos das pessoas que participam.** Uma sala com senha criptografa as mensagens no seu aparelho, usando essa senha.

## O que é criptografado

| Conversa | Criptografia de ponta a ponta? |
|---|---|
| Conversas pessoais | Sim, com os arquivos |
| Grupos privados | Sim, com os arquivos |
| Salas anônimas com senha | Sim, criptografadas com a senha da sala |
| Salas anônimas abertas | Não. Qualquer pessoa com o link pode ler |
| Comunidades e seus canais | Não |
| Status | Não. Os servidores do AChat conseguem ler; regras de acesso limitam quem mais vê cada um |

O AChat guarda mensagens com criptografia de ponta a ponta de um jeito que os servidores e os administradores dele não conseguem ler. O AChat não guarda cópia das chaves das suas mensagens.

## Senhas de sala

- Todo mundo precisa da senha para entrar e ler a sala.
- Mande a senha separada do link.
- Muitas tentativas erradas seguidas fazem você esperar alguns minutos antes de tentar de novo.
- Senhas novas mostram um medidor de força. A checagem é feita no seu aparelho, e a senha não é enviada a lugar nenhum para isso.

## Grupos e mudança de membros

Quando os membros de um grupo mudam, o grupo ganha novas chaves de segurança, então quem saiu não consegue ler as mensagens novas. Quem entra vê as mensagens enviadas depois de entrar; as anteriores não são compartilhadas automaticamente.

## Conferindo um aparelho vinculado

Em **Conta**, depois **Dispositivos**, você pode comparar os códigos de segurança entre dois aparelhos seus. Se não baterem, remova o aparelho em que você não confia. Veja [Aparelhos e chave de recuperação](/features/devices-and-recovery).

## Os limites

- Qualquer pessoa numa conversa pode copiar, salvar ou fazer captura de tela de uma mensagem. A criptografia protege as mensagens no caminho e no servidor, não depois que alguém as leu.
- A busca só olha mensagens que já estão no seu aparelho.
- Notificações push nunca trazem o texto da mensagem.
- Perder a chave de recuperação e todos os aparelhos vinculados significa que o seu histórico não pode ser restaurado, nem por você nem pela equipe do AChat.

O modelo completo está em [Segurança e criptografia](/concepts/security-and-encryption).
