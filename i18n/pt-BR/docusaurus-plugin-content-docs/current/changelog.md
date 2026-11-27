---
sidebar_position: 95
title: Changelog
description: Histórico de versões do AChat: a reconstrução que trouxe conversas pessoais, grupos, comunidades e status, e as versões anteriores do chat anônimo.
keywords: [changelog do AChat, notas de versão, histórico de versões]
last_update:
  date: 2026-11-27
  author: Equipe do AChat
---

# Changelog

As [notas de versão](https://achat.aoneahsan.com/pt-BR/feed) dentro do app são a referência, com a data em que cada mudança foi ao ar. Os registros mais antigos aqui descrevem o AChat como ele era na época.

## Onze idiomas (2026-11-27)

- **Mais seis idiomas:** chinês, hindi, português (Brasil), russo, japonês e urdu se juntam ao inglês, espanhol, francês, alemão e árabe, no app, nas páginas públicas, nos e-mails e nesta documentação. O urdu é lido da direita para a esquerda, em nastaliq.
- **Toda página pública tem o próprio endereço em cada idioma**, como `/ja/about`, e o idioma escolhido continua na próxima visita.
- **Traduzir** na **Ajuda com o rascunho** oferece os onze.

## Outros apps, assistentes e login em duas etapas (2026-11-21)

- **Acesse a sua própria conta de fora do AChat:** uma API com chaves de acesso, uma conexão para Claude, ChatGPT, Claude Code e Cursor, e webhooks assinados, tudo em Conta › Outros apps. Seu perfil, configurações, posts de status e lista de bloqueados podem ser alterados; contatos, conversas e comunidades são só leitura. Veja [AChat para desenvolvedores](./developers/index.md).
- **Conversas com criptografia de ponta a ponta ficam de fora:** apps de fora veem o nome e os membros de uma conversa, nunca as mensagens. Uma exclusão feita por um assistente espera o seu sim no AChat.
- **Login em duas etapas:** um código de um app autenticador depois do Google, dez códigos de recuperação e a opção de lembrar o navegador por 7 dias. Veja [Login em duas etapas](./developers/two-step-sign-in.md).

## Pagamentos white-label e o royalty da compra (2026-11-14)

- **Licenças, compras e renovações são pagas por transferência bancária Wise.** A equipe do AChat confirma a transferência, e a chave de licença chega por e-mail.
- **A compra agora tem royalty:** 7% da receita bruta do AChat, pago a cada trimestre com um demonstrativo de receita, enquanto ele gerar receita. Veja [Perguntas sobre white-label](./white-label/faq.md).

## Licenças white-label e compra do código-fonte (2026-11-13)

- **Rode o AChat com o seu nome:** a equipe do AChat hospeda no seu domínio, com o seu nome, logo e cores, na web e no Android, com iOS sob pedido. Veja [White-label e licenciamento](./white-label/index.md).
- **Ou compre de vez:** o código-fonte de todos os repositórios que geram o app web e o Android, depois do que o AChat sai de venda.
- **Confira a licença de qualquer cópia** pela chave ou pelo domínio em [Verificar uma licença](https://achat.aoneahsan.com/pt-BR/verify-license).

## Arquivar mensagens e respostas (2026-10-30)

- **Arquive uma mensagem ou uma resposta** pelo menu. A sua fica escondida para todo mundo até você desarquivar; a de outra pessoa fica escondida só para você. Uma mensagem principal leva a conversa paralela junto, exceto as respostas de outras pessoas à sua mensagem, que ficam, sob "Mensagem arquivada".
- **Selecione** várias mensagens, respostas ou conversas e arquive ou desarquive todas de uma vez. A barra diz quem deixa de vê-las antes de você apertar "Arquivar".
- **Conversas arquivadas**, **Mensagens arquivadas** e **Respostas arquivadas** têm cada uma a sua tela. Arquivar não define prazo próprio, e só você pode desarquivar o que arquivou. Veja [Gerenciar mensagens](./features/manage-messages.md#archive-and-private-archive).

## Reconstrução (2026-10-03)

O AChat foi reconstruído do zero. Entrou no ar em achat.aoneahsan.com em 2026-10-03.

- **Conversas pessoais e contatos:** adicione pessoas por nome de usuário, link de convite ou QR code, com pedidos de mensagem, bloqueios, status online e confirmações de leitura. Conversas pessoais e grupos privados têm criptografia de ponta a ponta.
- **Aparelhos vinculados e uma chave de recuperação** levam o seu histórico a cada aparelho que você aprova, e o trazem de volta se você perder todos. Aprovar um vínculo leva o histórico junto.
- **Grupos** com papéis e links de convite, legíveis (só leitura) depois que você sai; **comunidades** com canais, conversas paralelas, marcação de conteúdo adulto, denúncias, banimentos e um histórico de moderação.
- **Status** para os seus contatos, que some depois de 24 horas.
- **Salas anônimas** continuam funcionando, inclusive os links antigos, com senhas, salas guardadas e um arquivo privado. Mensagens e arquivos antigos de salas com senha continuam legíveis.
- **Mensagens:** editar, encaminhar, fixar, enquetes que podem ser encerradas, mensagens temporárias por conversa, visualização única, Limpar para mim / Limpar para todos e uma Lixeira por conversa.
- **Escrita:** rascunhos, spoilers, matemática, menções, figurinhas, imagens coladas, mensagens de voz, ditado, tradução no aparelho e leitura em voz alta.
- **Privacidade neste aparelho:** tela de privacidade, título de aba discreto, limpeza da área de transferência e Apagar deste dispositivo.
- **Histórico de aparelho e localização**, opcional por conversa, com consentimento antes de entrar.
- **Planos:** Free, Pro e Team / Family, pagos no checkout do próprio AChat, mais indicações.
- **Pagamento com cartão**, quando disponível: uma assinatura mensal ou anual feita na página da Polar, gerenciada em Sua assinatura, na Conta. A transferência bancária continua.
- **Cinco idiomas:** inglês, espanhol, francês, alemão e árabe.
- **Painel de admin** que mostra detalhes das conversas mas nunca as mensagens, com um registro de ações que ninguém consegue editar, concessões de Guardar para sempre e limites de busca definidos pelo admin.
- **Offline:** uma caixa de saída que envia em ordem quando você volta.
- **Busca** no seu aparelho, sobre um número definido de conversas e mensagens.

Não incluído: chamadas de voz e vídeo.

## Correção na exclusão de conversas paralelas (2026-08-05)

- Apague uma resposta da conversa paralela sozinha, ou apague a mensagem onde ela começa para mandar a mensagem e todas as respostas para a Lixeira juntas.

## 0.4.0: primeira versão no Google Play (2026-07-24)

- O chat anônimo sem cadastro como app Android.
- Conversas longas carregam as mensagens mais novas primeiro, com **Carregar anteriores**.
- Análises e relatórios de erro que nunca recebem IDs de conversa, mensagens, senhas ou arquivos.
- E-mails de conta opcionais, uma página de contato e notificações push por escolha.

## 0.3.0: gerenciar, buscar e trancar (2026-06)

- Busca no aparelho nas conversas que você tinha aberto.
- Uma Lixeira por conversa, um arquivo privado para quem entrou na conta e encaminhamento.
- Colocar senha numa conversa aberta depois; as mensagens anteriores ficavam como foram enviadas.
- Um papel de administrador com registro de ações.

## 0.2.0: preparação para a Play Store (2026-06)

- Exclusão de conta no app, além de privacidade, termos e declarações da loja.

## Antes (2026-05)

- **Espaços:** conversas paralelas, conversas em grupo privadas, comunidades públicas e o widget incorporável.
- **Guardar conversas:** login opcional com o Google para guardar uma conversa além dos 10 dias.
- **Campo de mensagem e temas:** reações, enquetes, fixar, paleta de comandos, editar mensagens, menções, exportação e o personalizador de tema.
- **Primeira versão:** chats anônimos por ID, criptografia opcional por senha, envio de arquivos e exclusão automática em 10 dias.
