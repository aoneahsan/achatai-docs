---
sidebar_position: 2
title: "Clés d'accès"
description: "Créez une clé d'accès AChat dans Compte › Autres apps, choisissez ce qu'elle peut lire, modifier ou supprimer, et quand elle cesse de fonctionner. Quand une clé peut être réaffichée, comment la remplacer sans coupure et comment la retirer."
keywords: [clé d'accès AChat, achat_pat, clé API, jeton d'accès personnel, permissions de la clé, renouveler une clé]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# Clés d'accès

**Une clé d'accès permet à un script ou à un service à vous de lire ou de modifier votre compte via l'[API d'AChat](./api.md).** Elle commence par `achat_pat_`, agit en votre nom et ne peut faire que ce que vous avez coché en la créant. Traitez chacune comme un mot de passe.

## Créer une clé

1. Ouvrez **Compte › Autres apps** et choisissez **Créer une clé d'accès**.
2. Donnez-lui un nom que vous reconnaîtrez, par exemple « Serveur maison ».
3. Cochez ce qu'elle peut faire (voir [Permissions](#permissions)).
4. Choisissez quand elle cesse de fonctionner : 30, 90 ou 365 jours, ou **Jamais**.
5. Choisissez **Créer la clé**, copiez-la et placez-la là où elle servira.

Créer une clé demande une connexion dans les 10 dernières minutes. Avec la [connexion en deux étapes](./two-step-sign-in.md) activée, cette connexion doit avoir inclus le code ; un navigateur qui a sauté le code parce que vous lui avez demandé de vous mémoriser ne compte pas. Si le délai est dépassé, AChat vous demande de vous reconnecter et vous ramène directement.

AChat vous envoie un e-mail à chaque création de clé.

## Permissions {#permissions}

Chaque type de données a jusqu'à trois cases : **Lire**, **Modifier** et **Supprimer**. Modifier inclut Lire. Supprimer n'inclut rien d'autre et n'est jamais coché à votre place.

| Données | Lire | Modifier | Supprimer |
|---|---|---|---|
| Profil : nom d'utilisateur, nom affiché aux autres, couleur de l'avatar | `profile:read` | `profile:write` (nom et couleur) | — |
| Réglages : qui vous voit en ligne, accusés de lecture, langue, notifications | `preferences:read` | `preferences:write` | — |
| Statuts | `status:read` | `status:write` (nouveaux statuts texte) | `status:delete` |
| Personnes bloquées | `blocks:read` | `blocks:write` (bloquer quelqu'un) | `blocks:delete` (débloquer) |
| Contacts | `contacts:read` | — | — |
| Discussions, et messages des salons ouverts et des canaux | `chats:read` | — | — |
| Communautés et leurs canaux | `communities:read` | — | — |

Les contacts, les discussions et les communautés impliquent d'autres personnes : ils restent en lecture seule, quoi que vous cochiez. Les discussions directes, les groupes et les salons avec mot de passe montrent leur nom et leurs membres ; leurs messages ne quittent jamais AChat.

## Quand une clé cesse de fonctionner

- **30, 90 ou 365 jours** pour n'importe quelle clé.
- **Jamais**, uniquement pour une clé qui ne fait que lire. Une clé qui peut modifier ou supprimer expire toujours, et 365 jours est le maximum.

La ligne de la clé dans Autres apps indique la date à laquelle elle cesse de fonctionner et sa dernière utilisation.

## Réafficher une clé

AChat peut réafficher une clé pendant 10 minutes après votre connexion, avec le code si la connexion en deux étapes est activée. Au-delà, choisissez **Reconnectez-vous pour l'afficher**. AChat affiche les clés au plus 10 fois par heure et par compte. AChat ne conserve qu'une copie scellée et une empreinte à sens unique, jamais la clé en clair.

## Remplacer une clé

**Remplacer** vous donne une nouvelle clé avec le même nom et les mêmes permissions. L'ancienne continue de fonctionner 24 heures, pour que vous fassiez la bascule sans coupure. Une clé qui avait une date de fin en reçoit une nouvelle à 90 jours ; une clé en lecture seule réglée sur Jamais n'expire toujours pas. Remplacer demande la même connexion récente que créer une clé, et AChat vous envoie un e-mail à ce sujet.

## Retirer une clé

**Retirer** arrête la clé immédiatement : tout ce qui l'utilise encore est refusé dès sa requête suivante. C'est irréversible, mais vous pouvez créer une nouvelle clé.

## Combien de clés

Votre forfait fixe le nombre de clés que vous pouvez détenir à la fois (5 sur Free par défaut ; le tableau complet est dans [AChat pour les développeurs](./index.md#what-your-plan-allows)). Quand elles sont toutes utilisées, retirez-en une pour en créer une autre.

## Qui ne peut pas créer de clés

Les sessions de salons anonymes ne sont jamais des comptes : elles ne peuvent pas créer de clés, connecter d'apps ni ajouter d'adresses de webhook. Un compte suspendu, ou dont la suppression a été demandée, voit toutes ses clés et connexions refusées.
