---
sidebar_position: 5
title: "Webhooks"
description: "Webhooks AChat : ajoutez une adresse https, choisissez des événements et vérifiez la signature Standard Webhooks de chaque livraison en Node ou en Python. Tous les événements et leurs données, le calendrier des nouvelles tentatives, la pause et ce qui désactive une adresse."
keywords: [webhooks AChat, Standard Webhooks, signature de webhook, vérifier webhook-signature, HMAC-SHA256, webhook de demande de contact]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# Webhooks

**AChat envoie un court message signé à votre propre serveur quand quelque chose change dans votre compte, pour que vos outils réagissent sans demander chaque minute.** Chaque événement dit ce qui a changé et quand, avec des identifiants. Il ne transporte jamais le texte d'un message, un nom ni rien d'autre que vous devriez protéger ; votre serveur récupère le reste avec une [clé d'accès](./access-keys.md).

## Ajouter une adresse

1. Dans **Compte › Autres apps › Webhooks**, choisissez **Ajouter une adresse de webhook**.
2. Collez l'adresse et, si vous voulez, une note pour vous.
3. Choisissez les événements qu'elle doit recevoir.
4. Choisissez **Ajouter l'adresse**, puis copiez le secret de signature (`whsec_…`).

Ajouter une adresse demande une connexion dans les 10 dernières minutes, avec le code quand la [connexion en deux étapes](./two-step-sign-in.md) est activée. AChat vous envoie un e-mail quand une adresse est ajoutée.

L'adresse doit :

- commencer par `https://` ; AChat n'envoie pas en http simple ;
- utiliser le port standard (443) ou 8443 ;
- ne contenir ni nom ni mot de passe ; vérifiez plutôt la signature ;
- être joignable depuis internet. Les réseaux privés, cet ordinateur et les domaines d'AChat lui-même sont refusés.

Votre forfait fixe le nombre d'adresses que vous pouvez avoir à la fois (3 sur Free par défaut ; voir [ce que permet votre forfait](./index.md#what-your-plan-allows)).

## À quoi ressemble une livraison

Un `POST` avec un corps JSON et trois en-têtes, envoyé en tant que `AChat-Webhooks/1.0` :

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` est l'événement, `timestamp` le moment où il s'est produit, et `data` contient les identifiants et horaires listés ci-dessous. `webhook-id` est l'identifiant de l'événement et reste le même à chaque nouvelle tentative : servez-vous-en pour repérer un doublon.

## Événements

| Événement | Quand | `data` |
|---|---|---|
| `profile.updated` | Votre nom d'utilisateur, votre nom, la couleur de votre avatar ou votre photo a changé | `id` (le vôtre) |
| `status.posted` | Vous avez publié un statut | `id`, `created_at`, `expires_at` |
| `status.deleted` | Un de vos statuts a été supprimé | `id` |
| `block.added` | Vous avez bloqué quelqu'un | `id` (le sien), `created_at` |
| `block.removed` | Vous avez débloqué quelqu'un | `id` (le sien) |
| `contact.added` | Un contact a été ajouté | `id` (celui du contact), `created_at` |
| `contact.removed` | Un contact a été retiré | `id` (celui du contact) |
| `contact_request.received` | Quelqu'un vous a envoyé une demande de contact | `id` (la personne qui demande), `created_at` |
| `chat.joined` | Vous avez rejoint une discussion ou un salon | `id` (celui de la discussion), `joined_at` |
| `chat.left` | Vous avez quitté une discussion ou un salon, ou en avez été retiré | `id` (celui de la discussion) |
| `message.created` | Un message est arrivé dans un salon ouvert ou un canal dont vous faites partie | `id`, `chat_id`, `created_at` |
| `webhook.test` | Vous avez choisi **Envoyer un événement de test** | `message` : `"Test event"` |

`message.created` ne se déclenche que pour les messages texte et les liens des salons ouverts et des canaux. Un message dans une discussion directe, un groupe ou un salon avec mot de passe ne crée jamais d'événement, car AChat ne peut pas le lire. Chaque `id` correspond à l'élément de même identifiant dans l'[API](./api.md) : récupérez `/messages/{id}`, `/status/{id}` ou `/contacts/{id}` avec une clé qui a la permission.

Un événement n'est enregistré que tant qu'une de vos adresses l'écoute. Ajoutez d'abord l'adresse ; les changements antérieurs à son existence ne sont pas envoyés plus tard.

## Vérifier la signature

Chaque livraison est signée selon [Standard Webhooks](https://www.standardwebhooks.com) : HMAC-SHA256 sur `webhook-id`, un point, `webhook-timestamp`, un point et le corps brut, avec pour clé les octets de votre secret (la partie après `whsec_`, décodée du base64). `webhook-signature` contient une ou plusieurs valeurs `v1,<base64>` séparées par des espaces ; acceptez la livraison si l'une d'elles correspond. Refusez tout ce dont l'horodatage s'écarte de plus de cinq minutes de votre horloge.

Vérifiez le corps **brut** exactement tel qu'il est arrivé. Analyser le JSON puis le resérialiser modifie les octets et casse la correspondance.

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

Avec Express, récupérez le corps brut sur cette route :

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

Avec Flask, passez `request.get_data()` et `request.headers`. N'importe quelle bibliothèque Standard Webhooks fait la même vérification si vous préférez ne pas l'écrire.

## Répondre vite

Répondez par n'importe quel `2xx` dans les 10 secondes et faites le travail ensuite. AChat ne suit aucune redirection. Un `410 Gone` demande à AChat de désactiver l'adresse immédiatement ; toute autre réponse, ou aucune réponse, compte comme un échec.

## Nouvelles tentatives

Une livraison en échec est tentée 8 fois en tout : immédiatement, puis 5 secondes, 5 minutes, 30 minutes, 2 heures, 5 heures, 10 heures et 10 heures après chaque tentative précédente, soit un peu plus d'une journée de la première à la dernière. Chaque tentative porte le même `webhook-id`.

Le **Journal de livraison** de chaque adresse affiche chaque livraison : Livré, Non envoyé, Pas de réponse, ou le statut renvoyé par votre serveur, avec le numéro de tentative. **Renvoyer** en renvoie une avec le même identifiant. Les événements et leur journal sont conservés 30 jours.

## Pause, désactivation et réactivation

- **Mettre en pause** saute les événements jusqu'à ce que vous choisissiez **Reprendre**. Les événements survenus pendant la pause ne sont pas envoyés plus tard.
- Une adresse en échec sans interruption pendant 5 jours devient **Désactivée après des échecs**, et AChat vous envoie par e-mail l'adresse, sa dernière réponse et le début des échecs. Rien n'est envoyé tant que vous n'avez pas choisi **Réactiver**.
- **Retirer l'adresse** arrête les envois immédiatement, et son journal de livraison disparaît avec elle.

## Le secret de signature

AChat affiche le secret une fois à l'ajout de l'adresse, puis à nouveau pendant 10 minutes après une connexion (avec le code si la connexion en deux étapes est activée) : **Afficher le secret de signature**. **Remplacer le secret** en crée un nouveau, et pendant 24 heures chaque événement porte deux signatures, une par secret, pour que votre serveur bascule sans rien manquer. Les vérifications ci-dessus acceptent déjà l'une ou l'autre.
