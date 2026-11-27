---
sidebar_position: 5
title: "Vérifier une licence"
description: "Comment vérifier, par clé de licence ou par domaine, qu'une copie d'AChat qui tourne sous un autre nom est sous licence, et ce que veut dire chaque réponse."
keywords: [vérifier une licence AChat, contrôler une licence marque blanche, vérification de clé de licence]
last_update:
  date: 2026-11-13
  author: Équipe AChat
---

# Vérifier une licence

**N'importe qui peut vérifier une copie d'AChat qui tourne sous un autre nom.** Ouvrez [Vérifier une licence](https://achat.aoneahsan.com/fr/verify-license) et saisissez la clé de licence de la copie ou son domaine. La vérification est assurée par notre service de licences.

## Par domaine

Chaque copie sous licence publie un fichier de licence sur son propre domaine, sous `/.well-known/`. Une vérification par domaine lit ce fichier et contrôle la clé qu'il indique.

| Réponse | Ce que cela veut dire |
|---|---|
| Licence active | Le fichier indique une licence pour ce domaine, et elle est active |
| Un autre domaine | Le fichier indique une licence délivrée pour un autre domaine |
| Pas une licence valide | Le fichier indique une licence qui n'existe pas |
| Pas de fichier de licence | Le domaine n'en publie pas |
| Pas de réponse | Le domaine n'a pas pu être joint |

## Par clé

Une vérification par clé indique si la licence est active, encore en cours de mise en place ou révoquée, et montre ses informations publiques : à qui elle est accordée, ses domaines, plateformes et dates. Elle ne montre jamais d'adresse e-mail ni de prix.

## Une copie dont la licence n'est pas active

Elle affiche « Cette licence n'est pas active » à la place de l'app, avec un lien vers cette vérification. Rien n'y est supprimé.
