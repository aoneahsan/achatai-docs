---
sidebar_position: 6
title: "Login em duas etapas"
description: "Some um código de seis dígitos de um app autenticador depois do login com o Google no AChat. Como configurar, os dez códigos de recuperação, lembrar um navegador por 7 dias, perder o celular e o que a equipe do AChat pode e não pode fazer por você."
keywords: [login em duas etapas do AChat, 2FA do AChat, app autenticador, códigos de recuperação, lembrar este navegador, perdi o celular AChat]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# Login em duas etapas

**Com o login em duas etapas ligado, depois que o Google te deixa entrar, o AChat pede um código de seis dígitos de um app no seu celular.** Alguém que entrar na sua conta Google ainda não consegue abrir a sua conta do AChat. É opcional para todo mundo e em todo plano, e obrigatório para as contas que operam as telas de admin do AChat.

Funciona com qualquer app autenticador: Google Authenticator, Microsoft Authenticator, 1Password, Aegis e outros. Você continua entrando com o Google primeiro; o código vem depois.

## Configurar

1. Abra **Conta › Segurança** e escolha **Configurar login em duas etapas**.
2. No app autenticador, adicione uma conta e escaneie o código que o AChat mostra. Não consegue escanear? Digite a chave de configuração. O app chama a conta de AChat.
3. Digite os seis dígitos que o app mostra, para provar que o app e o AChat batem.
4. Salve os seus dez códigos de recuperação (abaixo), marque a caixa e escolha **Concluir**.

## Códigos de recuperação

Você recebe dez códigos de recuperação, cada um com dez letras e números. Eles são para o dia em que o celular sumir: um deles te deixa entrar no lugar do código, e cada um funciona uma vez.

- Guarde-os fora do celular: num gerenciador de senhas, ou impressos em casa. **Copiar os dez** e **Baixar como arquivo** (`achat-recovery-codes.txt`) ficam na mesma tela.
- O AChat mostra os códigos uma vez só. Ele guarda uma impressão digital de mão única de cada um, nunca o código.
- **Conta › Segurança** mostra quantos restam. **Gerar novos códigos de recuperação** troca o conjunto inteiro, e os antigos param de funcionar assim que os novos aparecem. Gerar novos códigos exige o código do app e um login nos últimos 10 minutos.

O AChat te manda um e-mail sempre que um código de recuperação é usado.

## Entrando

Depois do Google, digite o código que o app mostra para o AChat. Depois de cinco códigos errados, o AChat te faz esperar 10 minutos; um código de recuperação funciona na hora.

### Lembrar este navegador

Marque **Lembrar este navegador por 7 dias** num computador ou celular que é só seu, e esse navegador pula o código por 7 dias. Os 7 dias não recomeçam quando você volta.

Um navegador lembrado ainda pede o código antes de mostrar, criar ou trocar uma [chave de acesso](./access-keys.md) ou um segredo de webhook, e antes de toda tela de admin. **Conta › Segurança › Navegadores que pulam o código** lista cada um com a data de término; **Esquecer** um, ou **Esquecer todos os navegadores**. Sair da conta esquece o navegador em que você está.

## Perdeu o celular?

1. Entre com o Google, escolha **Usar um código de recuperação** e digite um dos seus. O login em duas etapas continua ligado.
2. O AChat diz quantos códigos restam e oferece **Configurar o celular novo**. Faça na hora, em até 10 minutos depois desse login: escaneie o código novo com o celular novo, digite os seis dígitos dele, e os códigos do celular perdido param de funcionar.

Ainda tem o celular antigo e só quer trocar? Escolha **Configurar um celular novo** em Conta › Segurança, digite um código do celular que você usa agora e depois escaneie o código novo com o novo aparelho.

## Perdeu o celular e os códigos

Escreva para a equipe do AChat pela [página de contato](https://achat.aoneahsan.com/pt-BR/contact), do e-mail da sua conta. Antes de mudar qualquer coisa, a equipe confere que é você, com pelo menos dois destes:

- você escreveu do e-mail da sua conta;
- você disse de onde costuma entrar;
- você citou algo do histórico da sua conta.

Quando a conferência passa, a equipe desliga o login em duas etapas da sua conta. Os seus códigos de recuperação e navegadores lembrados vão junto, e o AChat te avisa por e-mail que o suporte desligou. Entre com o Google e configure de novo.

O que a equipe **não pode** fazer:

- te dizer um código, um código de recuperação ou a sua chave de configuração; o AChat não os guarda de um jeito que alguém consiga ler;
- desligar sem a conferência acima;
- abrir as suas conversas com criptografia de ponta a ponta. Elas voltam de um aparelho vinculado ou da sua [chave de recuperação](/features/devices-and-recovery), nunca pelo suporte.

## Desligar

**Desligar login em duas etapas** em Conta › Segurança, com um código. A sua conta Google passa a ser a única coisa entre alguém e a sua conta do AChat, os navegadores lembrados são esquecidos e os seus códigos de recuperação param de funcionar. Contas da equipe continuam com ele ligado.

## Logins recentes

**Conta › Segurança › Logins recentes** lista os últimos dez logins, do mais novo para o mais antigo, com como cada um passou: Google e código, Google num navegador lembrado, Google e código de recuperação, ou só Google. Os lugares vêm do endereço de rede, então são aproximados. Não reconhece algum? Escolha **Sair em todos os outros lugares** e depois gere novos códigos de recuperação.
