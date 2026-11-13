---
sidebar_position: 5
title: "Verify a licence"
description: "How to check that a copy of AChat running under another name is licensed, by licence key or by domain, and what each answer means."
keywords: [verify AChat licence, check white-label licence, licence key check]
last_update:
  date: 2026-11-13
  author: AChat team
---

# Verify a licence

**Anyone can check a copy of AChat that runs under another name.** Open [Verify a licence](https://achat.aoneahsan.com/verify-license) and enter the copy's licence key or its domain. Verification is run by our licensing service.

## By domain

Each licensed copy serves a licence file on its own domain, under `/.well-known/`. A domain check reads that file and checks the key it names.

| Answer | What it means |
|---|---|
| Active licence | The file names a licence for this domain, and it's active |
| Another domain | The file names a licence issued for a different domain |
| Not a valid licence | The file doesn't name a licence that exists |
| No licence file | The domain doesn't serve one |
| Didn't answer | The domain couldn't be reached |

## By key

A key check answers whether the licence is active, still being set up, or revoked, and shows its public details: who it's licensed to, its domains, platforms and dates. It never shows an email address or a price.

## A copy whose licence isn't active

It shows "This licence is not active" instead of the app, with a link to this check. Nothing in it is deleted.
