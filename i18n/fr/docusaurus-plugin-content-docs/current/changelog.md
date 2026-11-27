---
sidebar_position: 95
title: Journal des modifications
description: L'historique des versions d'AChat : la refonte qui ajoute les discussions personnelles, les groupes, les communautés et les statuts, et les versions antérieures de la discussion anonyme.
keywords: [journal des modifications AChat, notes de version, historique des versions]
last_update:
  date: 2026-11-27
  author: Équipe AChat
---

# Journal des modifications

Les [notes de version](https://achat.aoneahsan.com/fr/feed) dans l'app font foi, avec la date de mise en ligne de chaque changement. Les entrées plus anciennes ici décrivent AChat tel qu'il était à l'époque.

## Onze langues (2026-11-27)

- **Six langues de plus :** le chinois, l'hindi, le portugais (Brésil), le russe, le japonais et l'ourdou rejoignent l'anglais, l'espagnol, le français, l'allemand et l'arabe, dans l'app, ses pages publiques, ses e-mails et cette documentation. L'ourdou se lit de droite à gauche, en nastaliq.
- **Chaque page publique a sa propre adresse dans chaque langue**, comme `/ja/about`, et la langue choisie est gardée pour la visite suivante.
- **Traduire** dans l'**Aide à la rédaction** propose les onze.

## Autres apps, assistants et connexion en deux étapes (2026-11-21)

- **Accède à ton propre compte depuis l'extérieur d'AChat :** une API avec des clés d'accès, une connexion pour Claude, ChatGPT, Claude Code et Cursor, et des webhooks signés, le tout dans Compte › Autres apps. Ton profil, tes réglages, tes statuts et ta liste de blocage peuvent être modifiés ; les contacts, les discussions et les communautés sont en lecture seule. Voir [AChat pour les développeurs](./developers/index.md).
- **Les discussions chiffrées de bout en bout restent à l'écart :** les apps extérieures voient le nom et les membres d'une discussion, jamais ses messages. Une suppression demandée par un assistant attend ton accord sur AChat.
- **Connexion en deux étapes :** un code d'une app d'authentification après Google, dix codes de secours et la possibilité de mémoriser le navigateur 7 jours. Voir [Connexion en deux étapes](./developers/two-step-sign-in.md).

## Paiements en marque blanche et redevance du rachat (2026-11-14)

- **Les licences, rachats et renouvellements se paient par virement bancaire Wise.** L'équipe AChat confirme le virement, puis la clé de licence arrive par e-mail.
- **Un rachat comporte désormais une redevance :** 7 % du chiffre d'affaires brut d'AChat, payée chaque trimestre avec un relevé, tant qu'il génère des revenus. Voir [Questions sur la marque blanche](./white-label/faq.md).

## Licences en marque blanche et rachat du code (2026-11-13)

- **Fais tourner AChat sous ton propre nom :** l'équipe AChat l'héberge sur ton domaine avec ton nom, ton logo et tes couleurs, sur le web et Android, avec iOS sur demande. Voir [Marque blanche et licences](./white-label/index.md).
- **Ou rachète-le :** le code source de tous les dépôts qui produisent l'app web et l'app Android, après quoi AChat est retiré de la vente.
- **Vérifie la licence de n'importe quelle copie** par clé ou par domaine sur [Vérifier une licence](https://achat.aoneahsan.com/fr/verify-license).

## Archiver des messages et des réponses (2026-10-30)

- **Archive un message ou une réponse** depuis son menu. Le tien est masqué pour tout le monde jusqu'à ce que tu le désarchives ; celui de quelqu'un d'autre n'est masqué que pour toi. Un message principal emporte son fil, sauf les réponses des autres à ton message, qui restent sous « Message archivé ».
- **Sélectionne** plusieurs messages, réponses ou discussions, puis archive-les ou désarchive-les ensemble. La barre indique qui cesse de les voir avant que tu n'appuies sur « Archiver ».
- **Discussions archivées**, **Messages archivés** et **Réponses archivées** ont chacun leur vue. L'archivage n'impose aucune échéance, et toi seul peux désarchiver ce que tu as archivé. Voir [Gérer les messages](./features/manage-messages.md#archive-and-private-archive).

## Refonte (2026-10-03)

AChat a été reconstruit de zéro. Il est en ligne sur achat.aoneahsan.com depuis le 2026-10-03.

- **Discussions personnelles et contacts :** ajoute des gens par nom d'utilisateur, lien d'invitation ou QR code, avec demandes de message, blocages, statut en ligne et accusés de lecture. Les discussions personnelles et les groupes privés sont chiffrés de bout en bout.
- **Appareils associés et clé de récupération** apportent ton historique sur chaque appareil que tu approuves, et le ramènent si tu les perds tous. Approuver une association transfère l'historique.
- **Groupes** avec rôles et liens d'invitation, lisibles (en lecture seule) après ton départ ; **communautés** avec canaux, fils, marquage pour adultes, signalements, bannissements et historique de modération.
- **Statuts** pour tes contacts, effacés au bout de 24 heures.
- **Les salons anonymes** fonctionnent toujours, anciens liens compris, avec mots de passe, salons conservés et archive privée. Les messages et fichiers antérieurs des salons avec mot de passe restent lisibles.
- **Messages :** modifier, transférer, épingler, sondages qu'on peut clôturer, messages éphémères par discussion, vue unique, Effacer pour moi / Effacer pour tous, et une Corbeille par discussion.
- **Écriture :** brouillons, spoilers, maths, mentions, stickers, images collées, notes vocales, dictée, traduction sur l'appareil et lecture à voix haute.
- **Confidentialité sur cet appareil :** écran de confidentialité, titre d'onglet neutre, effacement du presse-papiers et Effacer de cet appareil.
- **Historique d'appareil et de position**, au choix par discussion, avec consentement avant d'entrer.
- **Forfaits :** Free, Pro et Team / Family, payés dans le propre paiement d'AChat, plus le parrainage.
- **Paiement par carte**, quand il est disponible : un abonnement mensuel ou annuel souscrit sur la page de Polar, géré dans Ton abonnement, dans Compte. Le virement bancaire reste possible.
- **Cinq langues :** anglais, espagnol, français, allemand et arabe.
- **Panneau d'admin** qui montre les détails des discussions mais jamais les messages, avec un journal d'actions que personne ne peut modifier, des autorisations Conserver pour toujours et des limites de recherche fixées par l'admin.
- **Hors ligne :** une boîte d'envoi qui expédie dans l'ordre à ton retour.
- **Recherche** sur ton appareil, sur un nombre défini de discussions et de messages.

Non inclus : appels vocaux et vidéo.

## Correction de la suppression dans les fils (2026-08-05)

- Supprime une seule réponse d'un fil, ou supprime le message d'où part un fil pour l'envoyer à la Corbeille avec toutes ses réponses.

## 0.4.0 : première version sur Google Play (2026-07-24)

- La discussion anonyme sans inscription, en app Android.
- Les longues discussions chargent d'abord les messages les plus récents, avec **Charger les précédents**.
- Des statistiques et des rapports d'erreur qui ne reçoivent jamais d'identifiants de discussion, de messages, de mots de passe ni de fichiers.
- Des e-mails de compte facultatifs, une page de contact et des notifications push à activer soi-même.

## 0.3.0 : gérer, chercher et verrouiller (2026-06)

- Recherche sur l'appareil dans les discussions que tu avais ouvertes.
- Une Corbeille par discussion, une archive privée pour les personnes connectées et le transfert.
- Ajout ultérieur d'un mot de passe à une discussion ouverte ; les messages antérieurs restaient tels qu'envoyés.
- Un rôle d'administrateur avec journal d'actions.

## 0.2.0 : préparation pour le Play Store (2026-06)

- Suppression du compte dans l'app, plus confidentialité, conditions et déclarations pour la boutique.

## Avant (2026-05)

- **Espaces :** fils, discussions de groupe privées, communautés publiques et widget intégrable.
- **Garder ses discussions :** connexion Google facultative pour garder une discussion au-delà de ses 10 jours.
- **Zone de saisie et thèmes :** réactions, sondages, épingles, palette de commandes, modification des messages, mentions, export et personnalisation du thème.
- **Première version :** discussions anonymes par identifiant, chiffrement facultatif par mot de passe, envoi de fichiers et suppression automatique au bout de 10 jours.
