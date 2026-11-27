---
sidebar_position: 3
title: "L'API d'AChat"
description: "L'API REST d'AChat : l'URL de base, l'en-tête Authorization, l'enveloppe de réponse, les codes d'erreur, la pagination par curseur et les limites, puis chaque ressource avec un exemple curl qui fonctionne, de votre profil et vos statuts aux messages des salons ouverts."
keywords: [API AChat, API REST AChat, achat_pat, OpenAPI AChat, curl AChat, API des statuts, API de la liste de blocage]
last_update:
  date: 2026-11-27
  author: Équipe AChat
---

# L'API d'AChat

**Envoyez une [clé d'accès](./access-keys.md) comme jeton Bearer à `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` et vous recevez du JSON.** Votre profil, vos réglages, vos statuts et votre liste de blocage peuvent être lus et modifiés ; les contacts, les discussions, les messages des salons ouverts, les communautés et les canaux sont en lecture seule. Rien de chiffré de bout en bout ne figure dans l'API.

La référence lisible par machine est [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1), aussi en [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). Aucune des deux ne demande de clé.

## URL de base et clé

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` indique ce qu'est l'identifiant et ce qu'il peut faire, le moyen le plus rapide de vérifier une nouvelle clé :

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8",
    "client_id": null,
    "scopes": ["blocks:read", "profile:read", "status:read", "status:write"]
  }
}
```

`kind` vaut `pat` pour une clé d'accès et `oauth` pour une app que vous avez connectée, comme un [assistant](./assistants.md). L'API accepte les deux.

## L'enveloppe

Chaque réponse est du JSON sous l'une de ces trois formes.

| Réponse | Forme |
|---|---|
| Un élément | `{ "data": { … } }` |
| Une liste | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| Une erreur | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

Une suppression répond `204` sans corps. Un champ pour lequel AChat n'a pas de valeur revient à `null`.

## Erreurs

| HTTP | `code` | Quand |
|---|---|---|
| 400 | `invalid_request` | Une requête incorrecte, un curseur incorrect, ou un corps qui ne respecte pas les règles des champs (`details.issues` nomme chaque champ) |
| 401 | `invalid_token` | La clé est absente, erronée, expirée ou retirée |
| 403 | `scope_required` | La clé n'a pas la permission ; `details.scope` la nomme |
| 404 | `not_found` | Rien à cette adresse pour cette clé, y compris l'élément de quelqu'un d'autre |
| 405 | `method_not_allowed` | La ressource n'accepte pas cette méthode, comme un POST sur les contacts |
| 409 | `conflict` | Une règle d'AChat a refusé le changement ; le message dit laquelle, en termes simples |
| 413 | `payload_too_large` | Le corps est trop gros |
| 429 | `rate_limited` | Trop de requêtes ; voir [Limites](#limits) |
| 500 | `internal` | Notre faute. Envoyez le `correlation_id` à l'équipe AChat via la [page de contact](https://achat.aoneahsan.com/fr/contact) |

Le message est écrit pour une personne et ne contient jamais de trace de pile, de SQL ni de secret. Sans aucune clé :

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## Pages, tri et filtres

Les listes renvoient 20 éléments par défaut et 50 au plus (`limit=1` à `limit=50`). S'il y en a davantage, `meta.next_cursor` contient un curseur : renvoyez-le en tant que `cursor` avec la même requête pour obtenir la page suivante, et arrêtez-vous quand il vaut `null`. Un curseur est lié à la requête d'où il vient ; changez le tri ou un filtre et AChat le refuse, alors recommencez sans.

`sort` accepte les valeurs que chaque ressource indique ci-dessous ; un `-` en tête signifie du plus récent au plus ancien. Les filtres s'écrivent `field.op=value` :

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Limites {#limits}

Chaque clé ou connexion peut faire 120 requêtes par minute. En plus, votre forfait fixe combien de requêtes le compte entier peut faire chaque jour, comptées à partir de minuit UTC sur toutes les clés et tous les assistants (5 000 sur Free par défaut ; voir [ce que permet votre forfait](./index.md#what-your-plan-allows)). Chaque réponse porte `ratelimit-limit`, `ratelimit-remaining` et `ratelimit-reset` (les secondes avant la remise à zéro de la limite la plus stricte) ; un `429` ajoute `retry-after` en secondes. Les requêtes continuent de compter pendant les refus : patientez plutôt que de réessayer en boucle.

## Profil

Votre propre profil : un élément, dont l'`id` est votre propre identifiant. `username` est en lecture seule ici, car un nouveau nom d'utilisateur passe par la procédure de l'app. Lecture avec `profile:read`, modification avec `profile:write`.

| Champ | Type | Remarques |
|---|---|---|
| `id` | uuid | Votre identifiant |
| `username` | chaîne, jusqu'à 24 | Lecture seule |
| `name` | chaîne, de 1 à 100 | Le nom que voient les autres |
| `hue` | entier de 0 à 359 | La couleur de votre avatar sans photo |
| `created_at` | date et heure | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

Votre photo se change dans l'app, pas ici.

## Réglages

Vos propres réglages : un élément, à `/preferences`. Lecture avec `preferences:read`, modification avec `preferences:write`.

| Champ | Valeurs |
|---|---|
| `presence_visibility` | `everyone`, `contacts` ou `nobody` : qui voit si vous êtes en ligne |
| `read_receipts` | `true` ou `false` |
| `language` | `en`, `zh-Hans`, `hi`, `es`, `ar`, `fr`, `pt-BR`, `ru`, `ja`, `ur`, `de`, ou `null` si aucune n'est définie |
| `notify_sounds` | `true` ou `false` |
| `notify_preview` | `name` ou `none` : si une notification montre qui a écrit |
| `notify_mute_all` | `true` ou `false` |
| `show_mature` | Lecture seule : suit l'âge que vous avez déclaré dans l'app |
| `id`, `updated_at` | Lecture seule |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

L'`id` de l'élément de réglages est votre propre identifiant, le même que celui de votre profil et que le `user_id` renvoyé par `/token`.

## Statuts

Vos propres statuts des dernières 24 heures. Lecture avec `status:read` ; publication avec `status:write` ; suppression avec `status:delete`.

| Champ | Remarques |
|---|---|
| `id`, `created_at`, `expires_at` | Lecture seule |
| `kind` | `text`, `photo` ou `video` ; lecture seule |
| `text` | Les mots d'un statut texte, jusqu'à 700 caractères ; la longueur de statut de votre forfait s'applique |
| `bg_hue` | La couleur de fond d'un statut texte, de 0 à 359 ; sans elle, la couleur de votre avatar est utilisée |
| `caption` | La légende d'une photo ou d'une vidéo ; lecture seule |
| `audience_mode` | `contacts`, `except` ou `only` ; lecture seule |
| `audience_count` | Combien de personnes le statut atteint ; lecture seule |

Filtres : `kind.eq`, `created_at.gte`, `created_at.lt`. Tri : `-created_at` (par défaut) ou `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

L'API ne publie que du texte ; les photos et les vidéos passent par l'envoi dans l'app. Un nouveau statut va au public défini dans les réglages de statut de l'app, avec la limite de publication de l'app elle-même (30 par heure), qui répond `409` avec la raison une fois atteinte. Les statuts ne sont pas chiffrés de bout en bout, ni dans l'app ni ici.

## Personnes bloquées

Les personnes que vous avez bloquées, par le nom d'utilisateur et le nom qu'elles affichent. Lecture avec `blocks:read` ; blocage avec `blocks:write` ; déblocage avec `blocks:delete`. Ici, `id` est l'identifiant de la personne bloquée.

| Champ | Remarques |
|---|---|
| `id` | L'identifiant de la personne bloquée |
| `username` | Le sien. Pour bloquer quelqu'un, envoyez-le |
| `name` | Le nom qu'elle affiche ; lecture seule |
| `created_at` | Quand vous l'avez bloquée |

Tri : `-created_at` (par défaut) ou `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

Le blocage fonctionne comme dans l'app : la personne ne peut plus vous écrire ni voir votre statut, et le lien de contact entre vous prend fin.

## Contacts

Lecture seule, avec `contacts:read`. Chaque élément porte le nom de l'autre personne : `id` (son identifiant), `username`, `name`, `hue`, `chat_id` (votre discussion directe avec elle, ou `null`) et `created_at`. Tri : `-created_at` ou `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

Les demandes de contact en attente ne sont pas une ressource ; votre serveur peut en être informé avec le [webhook](./webhooks.md) `contact_request.received`.

## Discussions

Les discussions dont vous faites partie, en lecture seule, avec `chats:read`.

| Champ | Remarques |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` ou `channel` |
| `title`, `topic` | `null` quand la discussion n'en a pas |
| `end_to_end` | `true` quand les messages sont chiffrés de bout en bout et jamais lisibles ici |
| `has_password` | `true` pour un salon avec mot de passe |
| `last_message_at`, `joined_at` | `null` quand il n'y en a pas |

Filtre : `kind.eq`. Tri : `-created_at` ou `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

Une discussion directe, un groupe ou un salon avec mot de passe figure dans la liste, avec son nom et l'heure de son dernier message, mais jamais ses messages.

## Messages {#messages}

Les messages des salons ouverts et des canaux dont vous faites partie, tels qu'ils ont été écrits : lecture seule, avec `chats:read`. Les salons avec mot de passe, les discussions directes et les groupes n'y figurent pas, pas plus que les messages à vue unique, les messages retirés par un modérateur, les pièces jointes, les réactions ou les sondages.

| Champ | Remarques |
|---|---|
| `id`, `created_at` | |
| `chat_id` | Le salon ouvert ou le canal |
| `kind` | `text` ou `link` |
| `body` | Le message tel qu'écrit |
| `sender_name` | Le nom affiché sous lequel il a été envoyé |
| `reply_to_id` | Le message auquel il répond, ou `null` |
| `edited_at` | `null` s'il n'a jamais été modifié |

Filtres : `chat_id.eq`, `created_at.gte`, `created_at.lt`. Tri : `-created_at` ou `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## Communautés

Les communautés dont vous êtes membre, en lecture seule, avec `communities:read` : `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` ou `random`), `join_mode` (`open` ou `account`), `member_count`, votre `role` (`owner`, `admin` ou `member`) et `joined_at`. Tri : `name` (par défaut) ou `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## Canaux

Les canaux que vous voyez dans vos communautés, en lecture seule, avec `communities:read` : `id`, `community_id`, `chat_id` (lisez ses messages via [Messages](#messages)), `name`, `topic`, `access` (`open` ou `private`) et `position`. Filtre : `community_id.eq`. Tri : `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## Suppressions depuis une app connectée

Une suppression faite avec une clé d'accès a lieu tout de suite et répond `204`. Une suppression demandée par une app que vous avez connectée n'a jamais lieu ainsi : elle répond `202` et vous attend.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

Vous ouvrez le lien, voyez ce qui partirait, et dites oui ou non sur AChat dans les 10 minutes. Voir [Les suppressions vous attendent](./assistants.md#deletes-wait-for-you).
