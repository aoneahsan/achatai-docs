---
sidebar_position: 4
title: Mots de passe et chiffrement
description: 'Quelles discussions AChat sont chiffrées de bout en bout, ce que protège le mot de passe d''un salon, et les limites : les salons ouverts, les communautés et les statuts ne sont pas chiffrés de bout en bout.'
keywords: ['discussion chiffrée de bout en bout', 'mot de passe de salon', 'discussion de groupe chiffrée', 'chiffrement AChat']
last_update:
  date: 2026-10-01
  author: Équipe AChat
---

# Mots de passe et chiffrement

**Les discussions personnelles, les groupes privés et leurs fichiers sont chiffrés de bout en bout : chaque message ne peut être lu que sur les appareils des personnes qui en font partie.** Un salon avec mot de passe chiffre ses messages sur ton appareil, avec ce mot de passe.

## Ce qui est chiffré

| Discussion | Chiffrée de bout en bout ? |
|---|---|
| Discussions personnelles | Oui, avec leurs fichiers |
| Groupes privés | Oui, avec leurs fichiers |
| Salons anonymes avec mot de passe | Oui, chiffrés avec le mot de passe du salon |
| Salons anonymes ouverts | Non. Quiconque a le lien peut les lire |
| Communautés et leurs canaux | Non |
| Statuts | Non. Les serveurs d'AChat peuvent les lire ; des règles d'accès limitent qui d'autre voit chacun d'eux |

AChat stocke les messages chiffrés de bout en bout sous une forme que ni ses serveurs ni ses administrateurs ne peuvent lire. AChat ne garde aucune copie des clés de tes messages.

## Mots de passe de salon

- Tout le monde a besoin du mot de passe pour rejoindre le salon et le lire.
- Envoie le mot de passe séparément du lien.
- Trop d'essais erronés d'affilée t'obligent à attendre quelques minutes avant de réessayer.
- Les nouveaux mots de passe affichent un indicateur de robustesse. La vérification se fait sur ton appareil, et le mot de passe n'est envoyé nulle part pour cela.

## Groupes et changements de membres

Quand les membres d'un groupe changent, le groupe reçoit de nouvelles clés de sécurité : les personnes parties ne peuvent pas lire les nouveaux messages. Celles qui arrivent voient les messages envoyés après leur arrivée ; les messages antérieurs ne sont pas partagés automatiquement.

## Vérifier un appareil associé

Dans **Compte**, puis **Appareils**, tu peux comparer les codes de sécurité entre deux de tes appareils. S'ils ne correspondent pas, retire l'appareil dont tu doutes. Voir [Appareils et clé de récupération](/features/devices-and-recovery).

## Les limites

- N'importe qui dans une discussion peut copier, enregistrer ou faire une capture d'écran d'un message. Le chiffrement protège les messages en transit et sur le serveur, pas une fois que quelqu'un les a lus.
- La recherche ne regarde que les messages déjà présents sur ton appareil.
- Les notifications push ne contiennent jamais le texte du message.
- Perdre ta clé de récupération et tous tes appareils associés signifie que ton historique ne peut pas être restauré, ni par toi ni par l'équipe AChat.

Le modèle complet est dans [Sécurité et chiffrement](/concepts/security-and-encryption).
