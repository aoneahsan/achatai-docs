---
sidebar_position: 6
title: "Two-step sign-in"
description: "Add a six-digit code from an authenticator app after Google sign-in on AChat. Setting it up, the ten recovery codes, remembering a browser for 7 days, losing your phone, and what the AChat team can and can't do for you."
keywords: [AChat two-step sign-in, AChat 2FA, authenticator app, recovery codes, remember this browser, lost phone AChat]
last_update:
  date: 2026-11-21
  author: AChat team
---

# Two-step sign-in

**With two-step sign-in on, AChat asks for a six-digit code from an app on your phone after Google signs you in.** Someone who gets into your Google account still can't open your AChat account. It's optional for everyone and on every plan, and required for the accounts that run AChat's admin screens.

It works with any authenticator app: Google Authenticator, Microsoft Authenticator, 1Password, Aegis and others. You still sign in with Google first; the code comes after it.

## Set it up

1. Open **Account › Security** and choose **Set up two-step sign-in**.
2. In your authenticator app, add an account and scan the code AChat shows. Can't scan? Type the setup key instead. The app names the account AChat.
3. Type the six digits the app shows, to prove the app and AChat agree.
4. Save your ten recovery codes (below), tick the box, and choose **Finish**.

## Recovery codes

You get ten recovery codes, each ten letters and numbers. They're for the day the phone is lost: one of them signs you in instead of the code, and each works once.

- Keep them somewhere other than the phone: a password manager, or printed at home. **Copy all ten** and **Download as a file** (`achat-recovery-codes.txt`) are on the same screen.
- AChat shows them only once. It keeps a one-way fingerprint of each code, never the code.
- **Account › Security** shows how many are left. **Make new recovery codes** replaces the whole set, and the old ones stop working as soon as the new ones appear. Making new codes needs the code from your app and a sign-in in the last 10 minutes.

AChat emails you whenever a recovery code is used.

## Signing in

After Google, type the code your app shows for AChat. After five codes that don't match, AChat makes you wait 10 minutes; a recovery code works straight away.

### Remember this browser

Tick **Remember this browser for 7 days** on a computer or phone that's yours alone, and that browser skips the code for 7 days. The 7 days don't restart when you come back.

A remembered browser still asks for the code before it shows, makes or replaces an [access key](./access-keys.md) or a webhook secret, and before every admin screen. **Account › Security › Browsers that skip the code** lists each one with its end date; **Forget** one, or **Forget every browser**. Signing out forgets the browser you're on.

## Lost your phone?

1. Sign in with Google, then choose **Use a recovery code instead** and type one of yours. Two-step sign-in stays on.
2. AChat says how many codes are left and offers **Set up the new phone**. Do it straight away, within 10 minutes of that sign-in: scan the new code with the new phone, type its six digits, and the lost phone's codes stop working.

Still have the old phone and just want to move? Choose **Set up a new phone** in Account › Security, type a code from the phone you use now, then scan the new code with the new one.

## Lost the phone and the codes

Write to the AChat team through the [contact page](https://achat.aoneahsan.com/contact), from the email address on your account. Before anything changes, the team checks it's you, with at least two of these:

- you wrote from your account's email address;
- you named where you usually sign in;
- you named something from your account's history.

When the checks pass, the team turns two-step sign-in off for your account. Your recovery codes and remembered browsers go with it, and AChat emails you that support turned it off. Sign in with Google and set it up again.

What the team **can't** do:

- tell you a code, a recovery code or your setup key; AChat doesn't hold them in a form anyone can read;
- turn it off without the checks above;
- open your end-to-end encrypted chats. Those come back from a linked device or your [recovery key](/features/devices-and-recovery), never from support.

## Turn it off

**Turn off two-step sign-in** in Account › Security, with a code. Your Google account becomes the only thing between someone and your AChat account, remembered browsers are forgotten, and your recovery codes stop working. Staff accounts keep it on.

## Recent sign-ins

**Account › Security › Recent sign-ins** lists the last ten sign-ins, newest first, with how each one passed: Google and a code, Google on a remembered browser, Google and a recovery code, or Google only. Places come from the network address, so they're approximate. Don't recognise one? Choose **Sign out everywhere else**, then make new recovery codes.
