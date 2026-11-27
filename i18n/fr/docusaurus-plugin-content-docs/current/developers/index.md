---
sidebar_position: 1
title: "AChat pour les développeurs"
description: "Accédez à votre propre compte AChat depuis un script, un assistant IA ou votre serveur : une API avec des clés d'accès, une connexion d'assistant pour Claude et ChatGPT, des webhooks signés et la connexion en deux étapes. Les discussions chiffrées ne quittent jamais AChat."
keywords: [API AChat, MCP AChat, webhooks AChat, clé d'accès, connecter Claude à AChat, connexion en deux étapes AChat]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# AChat pour les développeurs

**Votre compte AChat est accessible depuis l'extérieur de l'app, par vous, à vos conditions.** Un script peut publier un statut ou tenir votre liste de blocage à jour, Claude peut vous dire quels salons ouverts ont reçu de nouveaux messages, et votre serveur peut savoir à l'instant où quelqu'un vous envoie une demande de contact. Tous les forfaits l'incluent, Free compris, et chaque accès ne mène qu'à un compte : le vôtre.

## Lequel vous faut-il ?

| Vous voulez | Utilisez |
|---|---|
| Qu'un script ou un service à vous lise ou modifie votre compte | Une [clé d'accès](./access-keys.md) et l'[API](./api.md) |
| Que Claude, ChatGPT, Claude Code ou Cursor travaillent avec votre compte | Une [connexion d'assistant](./assistants.md) |
| Que votre serveur soit prévenu quand quelque chose change, sans demander chaque minute | Des [webhooks](./webhooks.md) |
| Un code après la connexion Google, pour qu'un compte Google volé ne suffise pas | La [connexion en deux étapes](./two-step-sign-in.md) |

Les quatre se trouvent dans l'app : clés, apps connectées et webhooks dans **Compte › Autres apps**, connexion en deux étapes dans **Compte › Sécurité**.

## Ce que les autres apps peuvent atteindre {#what-other-apps-can-reach}

Une app n'entre que par une clé que vous avez créée ou une connexion que vous avez approuvée. Dans les deux cas, trois règles s'appliquent.

| | Quoi | Depuis l'extérieur d'AChat |
|---|---|---|
| **À vous** | Votre profil, vos réglages, vos statuts et votre liste de blocage | Lecture et modification. La suppression est une permission à part, désactivée sauf si vous la cochez |
| **Partagé avec d'autres personnes** | Contacts, discussions, messages des salons ouverts, communautés et canaux | Lecture seule. Aucune app ne peut y publier, retirer ou inviter |
| **Chiffré de bout en bout** | Discussions directes, groupes et salons avec mot de passe | Jamais. Une app voit le nom de la discussion et que vous y êtes, jamais ses messages |

La dernière règle n'est pas un réglage. Les messages de vos discussions directes, groupes et salons avec mot de passe sont verrouillés sur vos appareils, et les serveurs d'AChat ne peuvent pas les lire ; aucune clé ni aucun assistant non plus. Il en va de même pour les clés de vos appareils, votre clé de récupération et vos codes de connexion en deux étapes. Voir [Sécurité et chiffrement](/concepts/security-and-encryption).

## Ce que permet votre forfait {#what-your-plan-allows}

| | Free | Pro | Team / Family |
|---|---|---|---|
| Clés d'accès simultanées | 5 | 25 | 50 |
| Requêtes API et assistants par jour | 5 000 | 50 000 | 100 000 |
| Adresses de webhook simultanées | 3 | 20 | 40 |
| Connexions d'assistant simultanées | 3 | 10 | 25 |

Ce sont les valeurs par défaut aujourd'hui. L'équipe AChat fixe les chiffres de chaque forfait, donc **Compte › Autres apps › Utilisation selon votre forfait** indique ce qui s'applique à vous, avec le compte du jour. Les requêtes se comptent à partir de minuit UTC, toutes clés et tous assistants du compte confondus. Chaque clé ou connexion est aussi limitée à 120 requêtes par minute, sur tous les forfaits, pour qu'un script emballé s'arrête avant d'épuiser la journée.

## Pas de flux de calendrier

AChat ne contient rien de daté qui ait sa place dans un calendrier ; il n'y a donc pas de flux de calendrier auquel s'abonner.

## Pour les machines

- OpenAPI 3.1 : [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)
- La même référence en Markdown : [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md)
- Ce qui a changé, et quand : [Journal des modifications pour les développeurs](./changelog.md)
