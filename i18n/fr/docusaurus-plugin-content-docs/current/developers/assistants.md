---
sidebar_position: 4
title: "Connecter Claude, ChatGPT, Claude Code ou Cursor"
description: "Connectez un assistant IA à votre compte AChat via l'adresse MCP d'AChat. La configuration pour Claude, ChatGPT, Claude Code et Cursor, ce que vous approuvez, pourquoi une suppression attend toujours votre accord, et comment déconnecter."
keywords: [MCP AChat, connecter Claude à AChat, connecteur AChat pour ChatGPT, Claude Code MCP, Cursor MCP, app de discussion avec assistant IA]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# Connecter Claude, ChatGPT, Claude Code ou Cursor

**Collez l'adresse d'assistant d'AChat dans votre assistant, approuvez-le sur AChat, et il peut lire votre compte et modifier ce qui vous appartient.** Il ne voit que ce que vous cochez en l'approuvant. Il ne peut jamais lire un message chiffré de bout en bout, ni rien supprimer sans votre accord sur AChat.

L'adresse d'assistant d'AChat :

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

C'est un serveur MCP distant en Streamable HTTP. Vous la trouverez aussi, avec un bouton **Copier**, dans **Compte › Autres apps › Connecter un assistant**.

## Claude

1. Dans Claude, ouvrez **Settings**, puis **Connectors**.
2. Choisissez **Add custom connector** et collez l'adresse d'AChat.
3. Claude ouvre AChat. Vérifiez ce qu'il demande et approuvez.

## ChatGPT

1. Dans ChatGPT, ouvrez **Settings**, puis **Apps and Connectors**, et activez le mode développeur.
2. Choisissez **Create**, nommez-le AChat et collez l'adresse.
3. ChatGPT ouvre AChat. Vérifiez ce qu'il demande et approuvez.

## Claude Code

1. Dans un terminal, lancez :

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. Lancez `/mcp` dans Claude Code et choisissez **achat**.
3. Votre navigateur ouvre AChat. Vérifiez ce qu'il demande et approuvez.

## Cursor

1. Dans Cursor, ouvrez **Settings**, puis **MCP**, puis **Add new MCP server**.
2. Collez ceci dans `mcp.json` :

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor ouvre AChat. Vérifiez ce qu'il demande et approuvez.

Les autres clients MCP compatibles OAuth fonctionnent de la même façon : à un client sans jeton, l'adresse indique où se connecter, et le client s'enregistre lui-même.

## Ce que vous approuvez

La page de consentement d'AChat nomme l'app, l'adresse où elle vous renvoie et chaque permission demandée, avec les mêmes cases Lire, Modifier et Supprimer qu'une [clé d'accès](./access-keys.md#permissions). Les données partagées restent en lecture seule quoi qu'on demande, et une permission qu'AChat ne propose pas est retirée de la demande. Rien n'est partagé tant que vous n'avez pas choisi **Approuver**.

- Une app qui « s'est enregistrée elle-même auprès d'AChat » : AChat n'a pas vérifié qui la gère, lisez donc bien ce qu'elle demande.
- Si la connexion peut modifier des choses, l'approuver demande une connexion dans les 10 dernières minutes, et le code aussi quand la [connexion en deux étapes](./two-step-sign-in.md) est activée.
- Vous pouvez nommer la connexion, pour en distinguer deux plus tard.

AChat vous envoie un e-mail quand une app est connectée. Votre forfait fixe combien peuvent être connectées à la fois (3 sur Free par défaut ; voir [ce que permet votre forfait](./index.md#what-your-plan-allows)). Les appels d'assistant comptent dans la même allocation quotidienne de requêtes que l'API.

## Ce qu'un assistant peut faire

Chaque outil a besoin de la permission indiquée à côté, et la liste d'outils de l'assistant n'affiche que ceux que votre approbation autorise en ce moment.

| Outils | Permission |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

Les champs sont ceux de l'API ; voir [L'API d'AChat](./api.md). Les listes renvoient jusqu'à 50 éléments par appel, avec un curseur pour la page suivante. Les messages ne viennent que des salons ouverts et des canaux. Une discussion directe, un groupe ou un salon avec mot de passe montrent leur nom et leurs membres, jamais ce qui s'y est dit.

## Les suppressions vous attendent {#deletes-wait-for-you}

Un assistant ne supprime jamais. Quand vous lui demandez de retirer un statut ou de débloquer quelqu'un, il appelle `prepare_delete_status` ou `prepare_delete_blocks`, et AChat répond avec un lien vers `https://achat.aoneahsan.com/developers/confirm/…`.

1. Ouvrez le lien. AChat montre ce que l'assistant a demandé et ce qui part avec.
2. Choisissez **Le supprimer** (ou **Débloquer**), ou **Le garder**. Vous êtes sur AChat, pas dans l'assistant : il ne peut pas appuyer sur ces boutons.
3. L'assistant apprend seulement que la demande est terminée.

La demande expire au bout de 10 minutes, et rien n'est supprimé. Confirmer demande une connexion dans les 10 dernières minutes, avec le code si la connexion en deux étapes est activée. Les suppressions en attente sont listées dans **Compte › Autres apps › Apps connectées**. Une [clé d'accès](./access-keys.md) avec la permission Supprimer supprime tout de suite, parce que c'est vous qui la faites tourner.

## Déconnecter

Dans **Compte › Autres apps › Apps connectées**, choisissez **Retirer** sur la connexion. Elle perd l'accès immédiatement, y compris pour une requête en cours. Pour la réutiliser, reconnectez-la. **Renommer** ne change que le nom que vous voyez.

## Ce que les assistants ne peuvent pas atteindre

- Les messages des discussions directes, des groupes et des salons avec mot de passe, qu'AChat lui-même ne peut pas lire.
- Les clés de vos appareils, votre clé de récupération, vos codes de connexion en deux étapes, vos clés d'accès et vos secrets de webhook.
- Votre photo, vos pièces jointes, vos réactions et vos sondages.
- Tout ce qui appartient à un autre compte.

Le texte qu'un assistant lit dans AChat (un statut, un message d'un salon ouvert) lui est renvoyé comme une donnée. Considérez les mots écrits par d'autres comme leurs mots, pas comme des instructions pour votre assistant.
