---
sidebar_position: 5
title: "Webhooks"
description: "Webhooks do AChat: adicione um endereço https, escolha eventos e verifique a assinatura Standard Webhooks de cada entrega em Node ou Python. Todos os eventos e seus dados, o cronograma de novas tentativas, pausar e o que desliga um endereço."
keywords: [webhooks do AChat, Standard Webhooks, assinatura de webhook, verificar webhook-signature, HMAC-SHA256, webhook de pedido de contato]
last_update:
  date: 2026-11-21
  author: Equipe do AChat
---

# Webhooks

**O AChat manda uma mensagem curta e assinada para o seu próprio servidor quando algo muda na sua conta, para as suas ferramentas reagirem sem perguntar a cada minuto.** Cada evento diz o que mudou e quando, com IDs. Ele nunca leva o texto de uma mensagem, um nome ou qualquer outra coisa que você precisaria proteger; o seu servidor busca o resto com uma [chave de acesso](./access-keys.md).

## Adicionar um endereço

1. Em **Conta › Outros apps › Webhooks**, escolha **Adicionar um endereço de webhook**.
2. Cole o endereço e, se quiser, uma anotação para você.
3. Escolha os eventos que ele deve receber.
4. Escolha **Adicionar endereço** e copie o segredo de assinatura (`whsec_…`).

Adicionar um endereço exige um login nos últimos 10 minutos, com o código quando o [login em duas etapas](./two-step-sign-in.md) está ligado. O AChat te manda um e-mail quando um endereço é adicionado.

O endereço precisa:

- começar com `https://`; o AChat não envia por http simples;
- usar a porta padrão (443) ou 8443;
- não levar nome nem senha; confira a assinatura no lugar disso;
- ser alcançável pela internet. Redes privadas, este computador e os domínios do próprio AChat são recusados.

O seu plano define quantos endereços você pode ter ao mesmo tempo (3 no Free, por padrão; veja [o que o seu plano permite](./index.md#what-your-plan-allows)).

## Como é uma entrega

Um `POST` com corpo JSON e três cabeçalhos, enviado como `AChat-Webhooks/1.0`:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` é o evento, `timestamp` é quando aconteceu e `data` traz os IDs e horários listados abaixo. `webhook-id` é o ID do evento e continua igual em toda nova tentativa, então use-o para identificar uma repetição.

## Eventos

| Evento | Quando | `data` |
|---|---|---|
| `profile.updated` | Seu nome de usuário, nome, cor do avatar ou foto mudou | `id` (o seu) |
| `status.posted` | Você publicou um status | `id`, `created_at`, `expires_at` |
| `status.deleted` | Um status seu foi apagado | `id` |
| `block.added` | Você bloqueou alguém | `id` (da pessoa), `created_at` |
| `block.removed` | Você desbloqueou alguém | `id` (da pessoa) |
| `contact.added` | Um contato foi adicionado | `id` (do contato), `created_at` |
| `contact.removed` | Um contato foi removido | `id` (do contato) |
| `contact_request.received` | Alguém te mandou um pedido de contato | `id` (de quem pediu), `created_at` |
| `chat.joined` | Você entrou numa conversa ou sala | `id` (da conversa), `joined_at` |
| `chat.left` | Você saiu de uma conversa ou sala, ou foi removido | `id` (da conversa) |
| `message.created` | Chegou uma mensagem numa sala aberta ou canal em que você está | `id`, `chat_id`, `created_at` |
| `webhook.test` | Você escolheu **Enviar um evento de teste** | `message`: `"Test event"` |

`message.created` dispara só para mensagens de texto e link em salas abertas e canais. Uma mensagem numa conversa direta, num grupo ou numa sala com senha nunca gera evento, porque o AChat não consegue lê-la. Cada `id` corresponde ao registro de mesmo ID na [API](./api.md): busque `/messages/{id}`, `/status/{id}` ou `/contacts/{id}` com uma chave que tenha a permissão.

Um evento só é registrado enquanto um dos seus endereços o escuta. Adicione o endereço primeiro; mudanças feitas antes de ele existir não são enviadas depois.

## Verificar a assinatura

Toda entrega é assinada com [Standard Webhooks](https://www.standardwebhooks.com): HMAC-SHA256 sobre `webhook-id`, um ponto, `webhook-timestamp`, um ponto e o corpo bruto, com a chave nos bytes do seu segredo (a parte depois de `whsec_`, decodificada de base64). `webhook-signature` traz um ou mais valores `v1,<base64>` separados por espaço; aceite a entrega se qualquer um bater. Recuse qualquer coisa cujo horário esteja a mais de cinco minutos do seu relógio.

Confira o corpo **bruto** exatamente como chegou. Fazer o parse do JSON e serializar de novo muda os bytes e quebra a correspondência.

### Node

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyAchatWebhook(secret, headers, rawBody) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

Com Express, pegue o corpo bruto nesta rota:

```js
import express from 'express';

const app = express();

app.post('/hooks/achat', express.raw({ type: 'application/json' }), (req, res) => {
  const raw = req.body.toString('utf8');
  if (!verifyAchatWebhook(process.env.ACHAT_WEBHOOK_SECRET, req.headers, raw)) {
    return res.status(401).end();
  }
  const event = JSON.parse(raw);
  // event.type, event.data.id …
  res.status(204).end();
});
```

### Python

```python
import base64
import hashlib
import hmac
import time


def verify_achat_webhook(secret: str, headers, raw_body: bytes) -> bool:
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not (msg_id and timestamp and signatures):
        return False
    if abs(time.time() - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()

    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

Com Flask, passe `request.get_data()` e `request.headers`. Qualquer biblioteca de Standard Webhooks faz a mesma verificação, se você preferir não escrever.

## Responda rápido

Responda com qualquer `2xx` em até 10 segundos e faça o trabalho depois. O AChat não segue redirecionamentos. Um `410 Gone` diz ao AChat para desligar o endereço na hora; qualquer outra coisa, ou nenhuma resposta, conta como falha.

## Novas tentativas

Uma entrega que falhou é tentada 8 vezes no total: na hora, depois 5 segundos, 5 minutos, 30 minutos, 2 horas, 5 horas, 10 horas e 10 horas após cada tentativa anterior, um pouco mais de um dia da primeira à última. Toda tentativa leva o mesmo `webhook-id`.

O **Registro de entregas** de cada endereço mostra todas as entregas: Entregue, Não enviado, Sem resposta, ou o status que o seu servidor respondeu, com o número da tentativa. **Enviar de novo** reenvia uma com o mesmo ID. Eventos e o registro ficam guardados por 30 dias.

## Pausar, desligar e ligar de novo

- **Pausar** pula os eventos até você escolher **Retomar**. Eventos que acontecem durante a pausa não são enviados depois.
- Um endereço que falhou sem parar por 5 dias fica **Desligado depois de falhar**, e o AChat te manda por e-mail o endereço, a última resposta e quando as falhas começaram. Nada é enviado até você escolher **Ligar de novo**.
- **Remover endereço** para os envios na hora, e o registro de entregas vai junto.

## O segredo de assinatura

O AChat mostra o segredo uma vez quando você adiciona o endereço, e de novo por 10 minutos depois de um login (com o código quando o login em duas etapas está ligado): **Mostrar o segredo de assinatura**. **Trocar o segredo** cria um novo, e por 24 horas todo evento leva duas assinaturas, uma de cada segredo, para o seu servidor trocar sem perder nada. As verificações acima já aceitam qualquer uma.
