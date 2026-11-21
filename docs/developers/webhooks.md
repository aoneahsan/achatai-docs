---
sidebar_position: 5
title: "Webhooks"
description: "AChat webhooks: add an https address, pick events, and verify each delivery's Standard Webhooks signature in Node or Python. Every event and its payload, the retry schedule, pausing, and what turns an address off."
keywords: [AChat webhooks, Standard Webhooks, webhook signature, webhook-signature verify, HMAC-SHA256, contact request webhook]
last_update:
  date: 2026-11-21
  author: AChat team
---

# Webhooks

**AChat sends a short, signed message to your own server when something in your account changes, so your tools can react without asking every minute.** Each event says what changed and when, with ids. It never carries a message's text, a name or anything else you'd have to keep safe; your server fetches the rest with an [access key](./access-keys.md).

## Add an address

1. Under **Account › Other apps › Webhooks**, choose **Add a webhook address**.
2. Paste the address and, if you like, a note for yourself.
3. Pick the events it should hear about.
4. Choose **Add address**, then copy the signing secret (`whsec_…`).

Adding an address needs a sign-in in the last 10 minutes, with the code when [two-step sign-in](./two-step-sign-in.md) is on. AChat emails you when an address is added.

The address must:

- start with `https://`; AChat doesn't send over plain http;
- use the standard port (443) or 8443;
- carry no name or password; check the signature instead;
- be reachable on the internet. Private networks, this computer and AChat's own domains are refused.

Your plan sets how many addresses you can have at once (3 on Free by default; see [what your plan allows](./index.md#what-your-plan-allows)).

## What a delivery looks like

A `POST` with a JSON body and three headers, sent as `AChat-Webhooks/1.0`:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` is the event, `timestamp` is when it happened, and `data` holds the ids and times listed below. `webhook-id` is the event's id and stays the same on every retry, so use it to spot a repeat.

## Events

| Event | When | `data` |
|---|---|---|
| `profile.updated` | Your username, name, avatar colour or photo changed | `id` (yours) |
| `status.posted` | You posted a status | `id`, `created_at`, `expires_at` |
| `status.deleted` | A status of yours was deleted | `id` |
| `block.added` | You blocked someone | `id` (theirs), `created_at` |
| `block.removed` | You unblocked someone | `id` (theirs) |
| `contact.added` | A contact was added | `id` (the contact's), `created_at` |
| `contact.removed` | A contact was removed | `id` (the contact's) |
| `contact_request.received` | Someone sent you a contact request | `id` (the person asking), `created_at` |
| `chat.joined` | You joined a chat or room | `id` (the chat's), `joined_at` |
| `chat.left` | You left a chat or room, or were removed | `id` (the chat's) |
| `message.created` | A message arrived in an open room or channel you're in | `id`, `chat_id`, `created_at` |
| `webhook.test` | You chose **Send a test event** | `message`: `"Test event"` |

`message.created` fires for text and link messages in open rooms and channels only. A message in a direct chat, a group or a password room never makes an event, because AChat can't read it. Each `id` matches the record of the same id in the [API](./api.md): fetch `/messages/{id}`, `/status/{id}` or `/contacts/{id}` with a key that has the permission.

An event is recorded only while one of your addresses listens for it. Add the address first; changes made before it existed aren't sent later.

## Verify the signature

Every delivery is signed with [Standard Webhooks](https://www.standardwebhooks.com): HMAC-SHA256 over `webhook-id`, a dot, `webhook-timestamp`, a dot and the raw body, keyed with your secret's bytes (the part after `whsec_`, base64-decoded). `webhook-signature` holds one or more `v1,<base64>` values separated by spaces; accept the delivery if any one matches. Refuse anything whose timestamp is more than five minutes from your clock.

Check the **raw** body exactly as it arrived. Parsing the JSON and serialising it again changes the bytes and breaks the match.

### Node

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyAchatWebhook(secret, headers, rawBody) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

With Express, take the body raw on this route:

```js
import express from 'express';

const app = express();

app.post('/hooks/achat', express.raw({ type: 'application/json' }), (req, res) => {
  const raw = req.body.toString('utf8');
  if (!verifyAchatWebhook(process.env.ACHAT_WEBHOOK_SECRET, req.headers, raw)) {
    return res.status(401).end();
  }
  const event = JSON.parse(raw);
  // event.type, event.data.id …
  res.status(204).end();
});
```

### Python

```python
import base64
import hashlib
import hmac
import time


def verify_achat_webhook(secret: str, headers, raw_body: bytes) -> bool:
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not (msg_id and timestamp and signatures):
        return False
    if abs(time.time() - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()

    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

With Flask, pass `request.get_data()` and `request.headers`. Any Standard Webhooks library does the same check if you'd rather not write it.

## Answer quickly

Answer with any `2xx` within 10 seconds and do the work afterwards. AChat follows no redirects. A `410 Gone` tells AChat to turn the address off at once; anything else, or no answer, counts as a failure.

## Retries

A failed delivery is tried 8 times in all: at once, then 5 seconds, 5 minutes, 30 minutes, 2 hours, 5 hours, 10 hours and 10 hours after each previous try, a little over a day from first to last. Every try carries the same `webhook-id`.

The **Delivery log** under each address shows every delivery: Delivered, Not sent, No answer, or the status your server answered, with the attempt number. **Send again** resends one with the same id. Events and their log are kept for 30 days.

## Pause, turn off and turn back on

- **Pause** skips events until you choose **Resume**. Events that happen while it's paused aren't sent later.
- An address that has failed without a break for 5 days is **turned off after failing**, and AChat emails you the address, its last answer and when it started failing. Nothing is sent until you choose **Turn back on**.
- **Remove address** stops sending straight away, and its delivery log goes with it.

## The signing secret

AChat shows the secret once when you add the address, and again for 10 minutes after a sign-in (with the code when two-step sign-in is on): **Show the signing secret**. **Replace the secret** makes a new one, and for 24 hours every event carries two signatures, one from each secret, so your server can switch over without missing anything. The verifiers above already accept either.
