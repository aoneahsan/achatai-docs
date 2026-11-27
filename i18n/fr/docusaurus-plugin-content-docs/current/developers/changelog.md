---
sidebar_position: 7
title: "Journal des modifications pour les développeurs"
description: "Les changements de l'API d'AChat, de la connexion des assistants, des webhooks et de la connexion en deux étapes, du plus récent au plus ancien, depuis la plateforme ouverte du 2026-11-21."
keywords: [journal des modifications API AChat, changements développeurs AChat, changements MCP AChat]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# Journal des modifications pour les développeurs

Les changements de l'API, de la connexion des assistants, des webhooks et de la connexion en deux étapes, du plus récent au plus ancien. L'API est en `v1`.

## La plateforme ouverte (2026-11-21)

- **[L'API d'AChat](./api.md)** à `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`, avec des [clés d'accès](./access-keys.md) (`achat_pat_…`) créées dans Compte › Autres apps. Votre profil, vos réglages, vos statuts (texte) et votre liste de blocage peuvent être lus et modifiés ; les contacts, les discussions, les messages des salons ouverts, les communautés et les canaux sont en lecture seule. Un document OpenAPI 3.1 se trouve à `/openapi.json`.
- **[Connexion des assistants](./assistants.md)** à `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp` pour Claude, ChatGPT, Claude Code et Cursor. Vous approuvez chacun dans AChat, et une suppression faite par un assistant attend votre accord sur `/developers/confirm`.
- **[Webhooks](./webhooks.md)** pour onze événements, signés selon Standard Webhooks, ne portant que des identifiants et des horaires.
- **[Connexion en deux étapes](./two-step-sign-in.md)** avec une app d'authentification, dix codes de récupération et la possibilité de mémoriser le navigateur 7 jours. Obligatoire pour les comptes qui gèrent les écrans d'admin d'AChat.
- Les discussions chiffrées de bout en bout restent à l'écart de tout cela : les apps extérieures voient le nom et les membres d'une discussion, jamais ses messages.
- Pas de flux de calendrier : AChat n'a rien de daté à y mettre.
