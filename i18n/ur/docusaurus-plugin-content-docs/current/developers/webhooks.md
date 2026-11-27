---
sidebar_position: 5
title: "ویب ہُکس"
description: "AChat ویب ہُکس: https پتا شامل کریں، ایونٹس چنیں، اور Node یا Python میں ہر ڈیلیوری کا Standard Webhooks دستخط جانچیں۔ ہر ایونٹ اور اس کا پے لوڈ، دوبارہ کوشش کا شیڈول، روکنا، اور کس وجہ سے پتا بند ہوتا ہے۔"
keywords: [AChat ویب ہُکس, Standard Webhooks, ویب ہُک دستخط, webhook-signature جانچ, HMAC-SHA256, کانٹیکٹ درخواست ویب ہُک]
last_update:
  date: 2026-11-21
  author: AChat ٹیم
---

# ویب ہُکس

**جب آپ کے اکاؤنٹ میں کچھ بدلتا ہے، AChat آپ کے اپنے سرور کو ایک مختصر، دستخط شدہ پیغام بھیجتی ہے، تاکہ آپ کے ٹولز ہر منٹ پوچھے بغیر ردعمل دے سکیں۔** ہر ایونٹ IDs کے ساتھ بتاتا ہے کہ کیا اور کب بدلا۔ اس میں کبھی پیغام کا متن، کوئی نام یا ایسی کوئی چیز نہیں ہوتی جسے آپ کو سنبھال کر رکھنا پڑے؛ باقی آپ کا سرور [رسائی کی](./access-keys.md) سے لاتا ہے۔

## پتا شامل کریں

1. **اکاؤنٹ › دوسری ایپس › ویب ہُکس** میں **ویب ہُک پتا شامل کریں** چنیں۔
2. پتا پیسٹ کریں اور چاہیں تو اپنے لیے ایک نوٹ۔
3. وہ ایونٹس چنیں جن کے بارے میں اسے سننا ہے۔
4. **پتا شامل کریں** چنیں، پھر سائننگ سیکرٹ (`whsec_…`) کاپی کریں۔

پتا شامل کرنے کے لیے پچھلے 10 منٹ میں سائن اِن چاہیے، [دو مرحلہ سائن اِن](./two-step-sign-in.md) آن ہو تو کوڈ کے ساتھ۔ پتا شامل ہونے پر AChat آپ کو ای میل کرتی ہے۔

پتا ایسا ہونا چاہیے:

- `https://` سے شروع ہو؛ AChat سادہ http پر نہیں بھیجتی؛
- معیاری پورٹ (443) یا 8443 استعمال کرے؛
- اس میں کوئی نام یا پاس ورڈ نہ ہو؛ اس کی جگہ دستخط جانچیں؛
- انٹرنیٹ پر پہنچنے کے قابل ہو۔ نجی نیٹ ورکس، یہی کمپیوٹر اور AChat کے اپنے ڈومینز منع کر دیے جاتے ہیں۔

آپ کا پلان طے کرتا ہے کہ ایک ساتھ کتنے پتے ہو سکتے ہیں (Free پر ڈیفالٹ 3؛ دیکھیں [آپ کا پلان کیا دیتا ہے](./index.md#what-your-plan-allows))۔

## ڈیلیوری کیسی دکھتی ہے

JSON باڈی اور تین ہیڈرز والا ایک `POST`، `AChat-Webhooks/1.0` کے طور پر بھیجا گیا:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` ایونٹ ہے، `timestamp` یہ کہ وہ کب ہوا، اور `data` میں نیچے دی گئی IDs اور اوقات ہوتے ہیں۔ `webhook-id` ایونٹ کی ID ہے اور ہر دوبارہ کوشش میں وہی رہتی ہے، اس لیے دہراؤ پہچاننے کے لیے اسے استعمال کریں۔

## ایونٹس

| ایونٹ | کب | `data` |
|---|---|---|
| `profile.updated` | آپ کا یوزرنیم، نام، اوتار کا رنگ یا تصویر بدلی | `id` (آپ کی) |
| `status.posted` | آپ نے اسٹیٹس لگایا | `id`، `created_at`، `expires_at` |
| `status.deleted` | آپ کا کوئی اسٹیٹس حذف ہوا | `id` |
| `block.added` | آپ نے کسی کو بلاک کیا | `id` (ان کی)، `created_at` |
| `block.removed` | آپ نے کسی کو ان بلاک کیا | `id` (ان کی) |
| `contact.added` | ایک کانٹیکٹ شامل ہوا | `id` (کانٹیکٹ کی)، `created_at` |
| `contact.removed` | ایک کانٹیکٹ ہٹایا گیا | `id` (کانٹیکٹ کی) |
| `contact_request.received` | کسی نے آپ کو کانٹیکٹ کی درخواست بھیجی | `id` (درخواست کرنے والے کی)، `created_at` |
| `chat.joined` | آپ کسی چیٹ یا روم میں شامل ہوئے | `id` (چیٹ کی)، `joined_at` |
| `chat.left` | آپ نے کوئی چیٹ یا روم چھوڑا، یا آپ کو ہٹایا گیا | `id` (چیٹ کی) |
| `message.created` | آپ جس کھلے روم یا چینل میں ہیں وہاں پیغام آیا | `id`، `chat_id`، `created_at` |
| `webhook.test` | آپ نے **ٹیسٹ ایونٹ بھیجیں** چنا | `message`: `"Test event"` |

`message.created` صرف کھلے رومز اور چینلز کے متنی اور لنک والے پیغامات کے لیے چلتا ہے۔ ذاتی چیٹ، گروپ یا پاس ورڈ والے روم کا پیغام کبھی ایونٹ نہیں بناتا، کیونکہ AChat اسے نہیں پڑھ سکتی۔ ہر `id`، [API](./api.md) میں اسی ID والے ریکارڈ سے میل کھاتی ہے: اجازت والی کی سے `/messages/{id}`، `/status/{id}` یا `/contacts/{id}` لائیں۔

ایونٹ تبھی درج ہوتا ہے جب آپ کا کوئی پتا اسے سن رہا ہو۔ پہلے پتا شامل کریں؛ اس کے بننے سے پہلے کی تبدیلیاں بعد میں نہیں بھیجی جاتیں۔

## دستخط جانچیں

ہر ڈیلیوری [Standard Webhooks](https://www.standardwebhooks.com) سے دستخط شدہ ہوتی ہے: `webhook-id`، ایک نقطہ، `webhook-timestamp`، ایک نقطہ اور کچی باڈی پر HMAC-SHA256، آپ کے سیکرٹ کے بائٹس سے (`whsec_` کے بعد والا حصہ، base64 سے ڈی کوڈ کیا)۔ `webhook-signature` میں اسپیس سے الگ ایک یا زیادہ `v1,<base64>` قدریں ہوتی ہیں؛ ان میں سے کوئی ایک میل کھائے تو ڈیلیوری قبول کریں۔ جس کا ٹائم اسٹیمپ آپ کی گھڑی سے پانچ منٹ سے زیادہ دور ہو، اسے منع کریں۔

**کچی** باڈی بالکل ویسے ہی جانچیں جیسے وہ آئی۔ JSON پارس کر کے دوبارہ سیریلائز کرنے سے بائٹس بدل جاتے ہیں اور میل ٹوٹ جاتا ہے۔

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

Express کے ساتھ، اس روٹ پر باڈی کچی لیں:

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

Flask کے ساتھ `request.get_data()` اور `request.headers` دیں۔ خود لکھنا نہ چاہیں، تو کوئی بھی Standard Webhooks لائبریری یہی جانچ کرتی ہے۔

## جلدی جواب دیں

10 سیکنڈ کے اندر کوئی بھی `2xx` لوٹائیں اور کام اس کے بعد کریں۔ AChat کوئی ری ڈائریکٹ فالو نہیں کرتی۔ `410 Gone` AChat کو بتاتا ہے کہ پتا فوراً بند کر دے؛ باقی کچھ بھی، یا کوئی جواب نہیں، ناکامی گنا جاتا ہے۔

## دوبارہ کوشش

ناکام ڈیلیوری کل 8 بار آزمائی جاتی ہے: فوراً، پھر ہر پچھلی کوشش کے 5 سیکنڈ، 5 منٹ، 30 منٹ، 2 گھنٹے، 5 گھنٹے، 10 گھنٹے اور 10 گھنٹے بعد، پہلی سے آخری تک ایک دن سے تھوڑا زیادہ۔ ہر کوشش میں وہی `webhook-id` ہوتی ہے۔

ہر پتے کے نیچے کا **ڈیلیوری ریکارڈ** ہر ڈیلیوری دکھاتا ہے: پہنچ گیا، نہیں بھیجا، کوئی جواب نہیں، یا آپ کے سرور کا لوٹایا اسٹیٹس، کوشش کے نمبر کے ساتھ۔ **دوبارہ بھیجیں** اسی ID سے ایک کو پھر بھیجتا ہے۔ ایونٹس اور ان کا ریکارڈ 30 دن رکھے جاتے ہیں۔

## روکنا، بند ہونا اور دوبارہ آن کرنا

- **روکیں** ایونٹس تب تک چھوڑتا ہے جب تک آپ **دوبارہ شروع کریں** نہ چنیں۔ رکے رہنے کے دوران ہونے والے ایونٹس بعد میں نہیں بھیجے جاتے۔
- جو پتا 5 دن بغیر رکے ناکام رہا، وہ **ناکامی کے بعد بند** ہو جاتا ہے، اور AChat آپ کو پتا، اس کا آخری جواب اور ناکامی کب شروع ہوئی، ای میل کرتی ہے۔ جب تک آپ **دوبارہ آن کریں** نہ چنیں، کچھ نہیں بھیجا جاتا۔
- **پتا ہٹائیں** بھیجنا فوراً روک دیتا ہے، اور اس کا ڈیلیوری ریکارڈ بھی ساتھ جاتا ہے۔

## سائننگ سیکرٹ

AChat پتا شامل کرتے وقت سیکرٹ ایک بار دکھاتی ہے، اور سائن اِن کے بعد 10 منٹ تک دوبارہ (دو مرحلہ سائن اِن آن ہو تو کوڈ کے ساتھ): **سائننگ سیکرٹ دکھائیں**۔ **سیکرٹ بدلیں** نیا سیکرٹ بناتا ہے، اور 24 گھنٹے تک ہر ایونٹ پر دو دستخط ہوتے ہیں، ہر سیکرٹ سے ایک، تاکہ آپ کا سرور کچھ چھوڑے بغیر بدل سکے۔ اوپر کی جانچ دونوں میں سے کوئی بھی قبول کرتی ہے۔
