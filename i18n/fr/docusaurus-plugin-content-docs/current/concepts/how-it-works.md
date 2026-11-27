---
sidebar_position: 1
title: Comment fonctionne AChat
description: Les deux identités dans AChat — un compte et un pseudo anonyme —, les types de discussion, où vivent les messages et combien de temps chaque chose est gardée.
keywords: [comment fonctionne AChat, discussion anonyme ou avec compte, durée de conservation, recherche sur l'appareil, messages hors ligne]
last_update:
  date: 2026-11-27
  author: Équipe AChat
---

# Comment fonctionne AChat

**Dans AChat, il y a deux façons d'être dans une discussion : un compte (connexion Google et nom d'utilisateur) ou, dans les salons anonymes, un pseudo sans compte.** Les deux ne sont jamais reliés : si tu as aussi un compte, AChat ne rattache pas tes messages anonymes à ce compte.

## Types de discussion

| Discussion | Qui y est | Compte nécessaire | Chiffrée de bout en bout |
|---|---|---|---|
| Discussion personnelle | Toi et un contact | Oui | Oui |
| Groupe privé | Les contacts que tu invites, ou les personnes qu'un admin approuve | Oui | Oui |
| Salon anonyme | Toute personne qui a le lien (et le mot de passe, s'il y en a un) | Non | Seulement avec mot de passe |
| Canal de communauté | Les membres de la communauté | Selon la communauté | Non |
| Statut | Tes contacts acceptés | Oui | Non |

## Où vivent les messages

- **Sur les serveurs d'AChat :** les messages de chaque discussion, pour que chaque appareil puisse les récupérer. Les messages chiffrés de bout en bout sont stockés sous une forme que ni les serveurs ni les administrateurs d'AChat ne peuvent lire.
- **Sur tes appareils :** les discussions et fichiers que tu as ouverts, pour qu'ils se chargent vite et s'ouvrent hors ligne, plus une boîte d'envoi des messages en attente. La recherche se fait ici, sur ce que l'appareil contient.
- **Tes clés :** sur tes appareils associés, et récupérables avec ta clé de récupération. AChat n'en garde aucune copie.

## Combien de temps les choses durent

| Quoi | Combien de temps |
|---|---|
| Discussions personnelles et groupes | Jusqu'à ce que quelqu'un les supprime, sauf si la discussion utilise les messages éphémères (1 minute, 1 heure ou 1 jour) |
| Messages des salons anonymes | Un nombre de jours fixé après chaque envoi (10 par défaut), ou jusqu'à la date de garde si quelqu'un garde le salon |
| Corbeille | Un nombre de jours fixé (30 par défaut), jamais plus que l'historique de la discussion elle-même |
| Statut | 24 heures |
| Historique de localisation | Jusqu'à ce que la discussion soit supprimée définitivement de la Corbeille ou expire |

La [page de confidentialité](https://achat.aoneahsan.com/fr/privacy) liste tout le reste, et [Données, confidentialité et suppression](/concepts/data-privacy-and-deletion) le résume.

## Envoyer un message

1. Tu l'écris. Il passe d'abord par la boîte d'envoi, donc il survit à une coupure de connexion ou à un rechargement.
2. AChat l'envoie et réessaie jusqu'à ce qu'il soit accepté, sans l'envoyer deux fois.
3. L'indication en dessous passe de **Envoi en cours** (ou **En attente d'envoi** hors ligne) à **Envoyé** une fois qu'il est arrivé.

## Plateformes

Le même AChat fonctionne dans le navigateur et sur Android, en onze langues. Il n'y a pas d'appels vocaux ni vidéo.
