---
sidebar_position: 2
title: Modèle de sécurité et de chiffrement
description: Ce que couvre le chiffrement de bout en bout d'AChat et ce qu'il ne couvre pas, comment s'articulent les clés, les appareils associés et la clé de récupération, et les limites qu'aucune app ne peut lever.
keywords: [sécurité AChat, modèle de chiffrement de bout en bout, clé de récupération, appareils associés, modèle de menace]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# Modèle de sécurité et de chiffrement

**AChat promet le chiffrement de bout en bout pour les discussions personnelles, les groupes privés et les salons à mot de passe. Pas pour les communautés et leurs canaux, les salons ouverts ni les statuts.**

## Ce que veut dire ici chiffrement de bout en bout

- Les messages de ces discussions ne se lisent que sur les appareils des personnes qui y sont.
- AChat les stocke sous une forme que ni ses serveurs ni ses administrateurs ne peuvent lire.
- AChat ne garde aucune copie des clés de tes messages : il ne peut ni lire ni restaurer ton historique.
- Les notifications push contiennent le nom de la discussion ou de l'expéditeur, jamais le texte du message.
- La recherche ne porte que sur les messages déjà présents sur ton appareil.
- Les autres apps ne peuvent pas les lire non plus. Une clé d'accès, un assistant IA ou un webhook voit le nom et les membres d'une discussion chiffrée, jamais ses messages. Voir [AChat pour les développeurs](/developers#what-other-apps-can-reach).

## Clés, appareils et récupération

- **Les appareils associés** détiennent chacun tes clés. Approuver un appareil lui permet de lire tes discussions, historique compris, et d'envoyer des messages en ton nom. Compare les codes de sécurité pour vérifier une association.
- **Retirer un appareil** l'empêche de recevoir les nouveaux messages et le déconnecte. Ce qu'il a déjà stocké reste dessus.
- **Les groupes changent de clés** quand leurs membres changent, donc ceux qui sont partis ne lisent pas les nouveaux messages.
- **La clé de récupération**, c'est à toi de la garder. La connexion Google seule ne restaure pas ton historique. Si tu perds la clé et tous tes appareils associés, personne ne peut le restaurer.

## Mots de passe des salons

Un salon à mot de passe chiffre ses messages sur ton appareil avec ce mot de passe. Trop d'essais ratés d'affilée t'obligent à attendre avant de réessayer. Le mot de passe que tu choisis reçoit des conseils de robustesse vérifiés sur ton appareil.

## Historique de localisation privé

Dans une discussion personnelle, un groupe privé ou un salon à mot de passe, l'[historique de l'appareil et de la localisation](/features/location-history) est chiffré de bout en bout. Seuls les membres qui saisissent le mot de passe d'audit de la discussion (ou le mot de passe du salon) peuvent le voir, et les administrateurs d'AChat ne peuvent pas l'ouvrir.

## Ce que le chiffrement ne peut pas faire

- **Quiconque lit un message peut le copier.** Les gens d'une discussion peuvent tout copier, enregistrer ou capturer, y compris les messages éphémères et à vue unique pendant qu'ils sont ouverts. Les supprimer ensuite n'atteint pas ces copies.
- **Les discussions ouvertes sont ouvertes.** N'importe qui avec le lien d'un salon ouvert peut le lire. Les communautés et leurs canaux ne sont pas chiffrés de bout en bout.
- **Anonyme ne veut pas dire introuvable.** Ton appareil se connecte aux serveurs d'AChat comme à n'importe quel site, et les hébergeurs enregistrent des données de connexion comme ton adresse IP.
- **Un appareil perdu et déverrouillé est un risque.** Qui le tient peut ouvrir ce qui y est stocké. [La confidentialité sur cet appareil](/features/privacy-on-this-device) présente l'écran de confidentialité et Effacer de cet appareil.
- **Ce qui a été vu ne se rattrape pas.** Un changement de réglage ou de règle ultérieur ne reprend pas ce qui a été lu, copié, enregistré ou exporté.

## Modération et chiffrement

Les modérateurs d'AChat ne voient un message d'une discussion chiffrée que si quelqu'un de cette discussion le signale et l'envoie avec le signalement. Voir [Le contrôle des admins](/concepts/admin-oversight).
