---
sidebar_position: 6
title: "Connexion en deux étapes"
description: "Ajoutez un code à six chiffres d'une app d'authentification après la connexion Google sur AChat. La mise en place, les dix codes de secours, mémoriser un navigateur 7 jours, la perte du téléphone, et ce que l'équipe AChat peut faire ou non pour vous."
keywords: [connexion en deux étapes AChat, 2FA AChat, app d'authentification, codes de secours, mémoriser ce navigateur, téléphone perdu AChat]
last_update:
  date: 2026-11-21
  author: Équipe AChat
---

# Connexion en deux étapes

**Avec la connexion en deux étapes activée, AChat demande un code à six chiffres d'une app de votre téléphone après la connexion Google.** Quelqu'un qui entre dans votre compte Google ne peut toujours pas ouvrir votre compte AChat. Elle est facultative pour tout le monde et sur tous les forfaits, et obligatoire pour les comptes qui gèrent les écrans d'admin d'AChat.

Elle fonctionne avec n'importe quelle app d'authentification : Google Authenticator, Microsoft Authenticator, 1Password, Aegis et d'autres. Vous vous connectez toujours d'abord avec Google ; le code vient ensuite.

## La mettre en place

1. Ouvrez **Compte › Sécurité** et choisissez **Configurer la connexion en deux étapes**.
2. Dans votre app d'authentification, ajoutez un compte et scannez le code affiché par AChat. Impossible de scanner ? Saisissez plutôt la clé de configuration. L'app nomme le compte AChat.
3. Saisissez les six chiffres affichés par l'app, pour prouver que l'app et AChat concordent.
4. Enregistrez vos dix codes de secours (ci-dessous), cochez la case et choisissez **Terminer**.

## Codes de secours

Vous recevez dix codes de secours, de dix lettres et chiffres chacun. Ils servent le jour où le téléphone est perdu : l'un d'eux vous connecte à la place du code, et chacun ne fonctionne qu'une fois.

- Gardez-les ailleurs que sur le téléphone : dans un gestionnaire de mots de passe, ou imprimés chez vous. **Copier les dix** et **Télécharger en fichier** (`achat-recovery-codes.txt`) sont sur le même écran.
- AChat ne les affiche qu'une fois. Il garde une empreinte à sens unique de chaque code, jamais le code.
- **Compte › Sécurité** indique combien il en reste. **Créer de nouveaux codes de secours** remplace tout le lot, et les anciens cessent de fonctionner dès que les nouveaux apparaissent. Créer de nouveaux codes demande le code de votre app et une connexion dans les 10 dernières minutes.

AChat vous envoie un e-mail chaque fois qu'un code de secours est utilisé.

## Se connecter

Après Google, saisissez le code que votre app affiche pour AChat. Après cinq codes erronés, AChat vous fait patienter 10 minutes ; un code de secours fonctionne tout de suite.

### Mémoriser ce navigateur

Cochez **Mémoriser ce navigateur pendant 7 jours** sur un ordinateur ou un téléphone qui n'est qu'à vous, et ce navigateur saute le code pendant 7 jours. Les 7 jours ne recommencent pas quand vous revenez.

Un navigateur mémorisé demande quand même le code avant d'afficher, de créer ou de remplacer une [clé d'accès](./access-keys.md) ou un secret de webhook, et avant chaque écran d'admin. **Compte › Sécurité › Navigateurs qui sautent le code** les liste avec leur date de fin ; vous pouvez en **Oublier** un, ou **Oublier tous les navigateurs**. Se déconnecter oublie le navigateur sur lequel vous êtes.

## Téléphone perdu ?

1. Connectez-vous avec Google, puis choisissez **Utiliser plutôt un code de secours** et saisissez l'un des vôtres. La connexion en deux étapes reste activée.
2. AChat indique combien de codes il reste et propose **Configurer le nouveau téléphone**. Faites-le tout de suite, dans les 10 minutes suivant cette connexion : scannez le nouveau code avec le nouveau téléphone, saisissez ses six chiffres, et les codes du téléphone perdu cessent de fonctionner.

Vous avez encore l'ancien téléphone et voulez juste changer ? Choisissez **Configurer un nouveau téléphone** dans Compte › Sécurité, saisissez un code du téléphone que vous utilisez aujourd'hui, puis scannez le nouveau code avec le nouveau.

## Téléphone et codes perdus

Écrivez à l'équipe AChat via la [page de contact](https://achat.aoneahsan.com/fr/contact), depuis l'adresse e-mail de votre compte. Avant tout changement, l'équipe vérifie que c'est bien vous, avec au moins deux de ces éléments :

- vous avez écrit depuis l'adresse e-mail de votre compte ;
- vous avez indiqué d'où vous vous connectez d'habitude ;
- vous avez cité quelque chose de l'historique de votre compte.

Une fois les vérifications passées, l'équipe désactive la connexion en deux étapes de votre compte. Vos codes de secours et vos navigateurs mémorisés disparaissent avec elle, et AChat vous prévient par e-mail que le support l'a désactivée. Connectez-vous avec Google et configurez-la à nouveau.

Ce que l'équipe **ne peut pas** faire :

- vous donner un code, un code de secours ou votre clé de configuration ; AChat ne les conserve sous aucune forme lisible ;
- la désactiver sans les vérifications ci-dessus ;
- ouvrir vos discussions chiffrées de bout en bout. Elles reviennent depuis un appareil associé ou votre [clé de récupération](/features/devices-and-recovery), jamais par le support.

## La désactiver

**Désactiver la connexion en deux étapes** dans Compte › Sécurité, avec un code. Votre compte Google devient alors la seule barrière entre quelqu'un et votre compte AChat, les navigateurs mémorisés sont oubliés et vos codes de secours cessent de fonctionner. Les comptes de l'équipe la gardent activée.

## Connexions récentes

**Compte › Sécurité › Connexions récentes** liste les dix dernières connexions, de la plus récente à la plus ancienne, avec la façon dont chacune est passée : Google et un code, Google sur un navigateur mémorisé, Google et un code de secours, ou Google seul. Les lieux viennent de l'adresse réseau, ils sont donc approximatifs. Vous n'en reconnaissez pas une ? Choisissez **Se déconnecter partout ailleurs**, puis créez de nouveaux codes de secours.
