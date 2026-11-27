---
sidebar_position: 2
title: Modelo de segurança e criptografia
description: O que a criptografia de ponta a ponta do AChat cobre e o que não cobre, como chaves, dispositivos vinculados e a chave de recuperação se encaixam, e os limites que nenhum app consegue tirar.
keywords: [segurança do AChat, modelo de criptografia de ponta a ponta, chave de recuperação, dispositivos vinculados, modelo de ameaças]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# Modelo de segurança e criptografia

**O AChat promete criptografia de ponta a ponta para conversas pessoais, grupos privados e salas com senha. Não promete para comunidades e seus canais, salas abertas ou status.**

## O que criptografia de ponta a ponta quer dizer aqui

- As mensagens dessas conversas só podem ser lidas nos dispositivos das pessoas que estão nelas.
- O AChat guarda essas mensagens num formato que nem os servidores nem os administradores conseguem ler.
- O AChat não guarda cópia das chaves das suas mensagens, então não consegue ler nem restaurar seu histórico.
- As notificações push mostram o nome da conversa ou de quem enviou, nunca o texto da mensagem.
- A busca olha só para as mensagens que já estão no seu dispositivo.
- Outros apps também não conseguem lê-las. Uma chave de acesso, um assistente de IA ou um webhook vê o nome e os membros de uma conversa criptografada, nunca as mensagens. Veja [AChat para desenvolvedores](/developers#what-other-apps-can-reach).

## Chaves, dispositivos e recuperação

- **Dispositivos vinculados** guardam, cada um, as suas chaves. Aprovar um dispositivo deixa ele ler suas conversas, com o histórico, e enviar mensagens como você. Compare os códigos de segurança para conferir o vínculo.
- **Remover um dispositivo** faz as mensagens novas pararem de chegar nele e o desconecta. O que ele já guardou continua nele.
- **Os grupos ganham chaves novas** quando os membros mudam, então quem saiu não lê as mensagens novas.
- **A chave de recuperação** fica com você. Só o login com o Google não restaura seu histórico. Perca a chave e todos os dispositivos vinculados, e ninguém consegue restaurá-lo.

## Senhas de sala

Uma sala com senha criptografa as mensagens no seu dispositivo usando essa senha. Muitas tentativas erradas seguidas fazem você esperar antes de tentar de novo. A senha que você define recebe dicas de força verificadas no seu dispositivo.

## Histórico de localização privado

Numa conversa pessoal, num grupo privado ou numa sala com senha, o [histórico de dispositivos e localização](/features/location-history) tem criptografia de ponta a ponta. Só os membros que digitam a senha de auditoria da conversa (ou a senha da sala) conseguem vê-lo, e os administradores do AChat não conseguem abri-lo.

## O que a criptografia não consegue fazer

- **Quem lê uma mensagem pode copiá-la.** As pessoas numa conversa podem copiar, salvar ou fazer captura de tela de qualquer coisa, inclusive de mensagens temporárias e de visualização única enquanto estão abertas. Apagar depois não alcança essas cópias.
- **Conversas abertas são abertas.** Qualquer pessoa com o link de uma sala aberta consegue lê-la. Comunidades e seus canais não têm criptografia de ponta a ponta.
- **Anônimo não quer dizer impossível de rastrear.** Seu dispositivo se conecta aos servidores do AChat como a qualquer site, e os provedores registram dados de conexão como o seu endereço IP.
- **Um dispositivo perdido e desbloqueado é um risco.** Quem estiver com ele pode abrir o que está guardado ali. [Privacidade neste dispositivo](/features/privacy-on-this-device) fala da tela de privacidade e de Apagar deste dispositivo.
- **O que já foi visto não volta.** Uma mudança de configuração ou de política depois não recupera o que foi lido, copiado, salvo ou exportado.

## Moderação e criptografia

Os moderadores do AChat só veem uma mensagem numa conversa criptografada se alguém dessa conversa denunciá-la e enviá-la junto com a denúncia. Veja [Supervisão dos admins](/concepts/admin-oversight).
