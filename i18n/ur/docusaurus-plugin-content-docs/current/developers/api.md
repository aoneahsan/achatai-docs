---
sidebar_position: 3
title: "AChat API"
description: "AChat کا REST API: بیس URL، Authorization ہیڈر، جواب کا ڈھانچہ، ایرر کوڈز، کرسر سے صفحات اور حدیں، پھر ہر ریسورس چلتی curl مثال کے ساتھ، آپ کی پروفائل اور اسٹیٹس پوسٹس سے کھلے روم کے پیغامات تک۔"
keywords: [AChat API, AChat REST API, achat_pat, AChat OpenAPI, AChat curl, اسٹیٹس API, بلاک فہرست API]
last_update:
  date: 2026-11-27
  author: AChat ٹیم
---

# AChat API

**[رسائی کی](./access-keys.md) کو Bearer ٹوکن کے طور پر `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` پر بھیجیں اور آپ کو JSON واپس ملتا ہے۔** آپ کی پروفائل، سیٹنگز، اسٹیٹس پوسٹس اور بلاک فہرست پڑھی اور بدلی جا سکتی ہے؛ کانٹیکٹس، چیٹس، کھلے رومز کے پیغامات، کمیونٹیز اور چینلز صرف پڑھے جا سکتے ہیں۔ اینڈ ٹو اینڈ انکرپٹڈ کچھ بھی API میں ہے ہی نہیں۔

مشین کے پڑھنے لائق حوالہ [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1) ہے، اور [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md) بھی۔ دونوں کو کی نہیں چاہیے۔

## بیس URL اور کی

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` بتاتا ہے کہ کریڈنشل کیا ہے اور کیا کر سکتا ہے، جو نئی کی جانچنے کا سب سے تیز طریقہ ہے:

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8",
    "client_id": null,
    "scopes": ["blocks:read", "profile:read", "status:read", "status:write"]
  }
}
```

رسائی کی کے لیے `kind`، `pat` ہوتا ہے اور آپ کی منسلک کی ہوئی ایپ کے لیے `oauth`، جیسے کوئی [اسسٹنٹ](./assistants.md)۔ API دونوں قبول کرتا ہے۔

## جواب کا ڈھانچہ

ہر جواب ان تین میں سے کسی ایک شکل کا JSON ہوتا ہے۔

| جواب | شکل |
|---|---|
| ایک ریکارڈ | `{ "data": { … } }` |
| ایک فہرست | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| ایک ایرر | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

حذف کرنے پر بغیر باڈی کے `204` آتا ہے۔ جس فیلڈ کی AChat کے پاس کوئی قدر نہیں، وہ `null` کے طور پر آتا ہے۔

## ایررز

| HTTP | `code` | کب |
|---|---|---|
| 400 | `invalid_request` | غلط کوئری، غلط کرسر، یا ایسی باڈی جو فیلڈ کے اصول پورے نہ کرے (`details.issues` ہر فیلڈ بتاتا ہے) |
| 401 | `invalid_token` | کی نہیں ہے، غلط ہے، ختم ہو گئی یا ہٹا دی گئی |
| 403 | `scope_required` | کی کے پاس اجازت نہیں؛ `details.scope` اس کا نام بتاتا ہے |
| 404 | `not_found` | اس کی کے لیے اس پتے پر کچھ نہیں، کسی اور کا ریکارڈ بھی |
| 405 | `method_not_allowed` | ریسورس یہ طریقہ نہیں لیتا، جیسے کانٹیکٹس پر POST |
| 409 | `conflict` | AChat کے کسی اصول نے تبدیلی منع کی؛ پیغام سیدھے الفاظ میں بتاتا ہے کہ کون سا |
| 413 | `payload_too_large` | باڈی بہت بڑی ہے |
| 429 | `rate_limited` | بہت زیادہ درخواستیں؛ دیکھیں [حدیں](#limits) |
| 500 | `internal` | ہماری غلطی۔ `correlation_id` [رابطے کے صفحے](https://achat.aoneahsan.com/ur/contact) سے AChat ٹیم کو بھیجیں |

پیغام انسان کے لیے لکھا جاتا ہے اور اس میں کبھی اسٹیک ٹریس، SQL یا سیکرٹ نہیں ہوتا۔ بغیر کسی کی کے:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## صفحات، ترتیب اور فلٹرز

فہرستیں ڈیفالٹ طور پر 20 ریکارڈ لوٹاتی ہیں اور زیادہ سے زیادہ 50 (`limit=1` سے `limit=50`)۔ اور ہوں، تو `meta.next_cursor` میں ایک کرسر ہوتا ہے: اسی کوئری کے ساتھ اسے `cursor` کے طور پر واپس بھیجیں تو اگلا صفحہ ملتا ہے، اور جب وہ `null` ہو تو رکیں۔ کرسر اسی کوئری سے بندھا ہے جس سے وہ آیا؛ ترتیب یا فلٹر بدلیں تو AChat اسے منع کرتی ہے، اس لیے اس کے بغیر دوبارہ شروع کریں۔

`sort` وہ قدریں لیتا ہے جو نیچے ہر ریسورس بتاتا ہے؛ آگے کا `-` مطلب سب سے نئے پہلے۔ فلٹرز `field.op=value` لکھے جاتے ہیں:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## حدیں {#limits}

ہر کی یا کنکشن ایک منٹ میں 120 درخواستیں کر سکتا ہے۔ اس کے اوپر، آپ کا پلان طے کرتا ہے کہ پورا اکاؤنٹ ہر دن کتنی درخواستیں کر سکتا ہے، UTC آدھی رات سے ہر کی اور اسسٹنٹ کو ملا کر گنا جاتا ہے (Free پر ڈیفالٹ 5,000؛ دیکھیں [آپ کا پلان کیا دیتا ہے](./index.md#what-your-plan-allows))۔ ہر جواب میں `ratelimit-limit`، `ratelimit-remaining` اور `ratelimit-reset` (سب سے سخت حد ری سیٹ ہونے تک کے سیکنڈ) ہوتے ہیں؛ `429` میں سیکنڈز میں `retry-after` بھی جڑتا ہے۔ منع ہونے کے دوران بھی درخواستیں گنی جاتی ہیں، اس لیے لوپ میں دوبارہ کوشش کی جگہ رک کر کریں۔

## پروفائل

آپ کی اپنی پروفائل: ایک ریکارڈ، جس کی `id` آپ کی اپنی ID ہے۔ `username` یہاں صرف پڑھنے کے لیے ہے، کیونکہ نیا یوزرنیم ایپ کے کلیم فلو سے ہو کر جاتا ہے۔ `profile:read` سے پڑھیں، `profile:write` سے بدلیں۔

| فیلڈ | قسم | نوٹ |
|---|---|---|
| `id` | uuid | آپ کی ID |
| `username` | اسٹرنگ، 24 تک | صرف پڑھنے کے لیے |
| `name` | اسٹرنگ، 1 سے 100 | وہ نام جو دوسرے دیکھتے ہیں |
| `hue` | عدد صحیح 0 سے 359 | تصویر نہ ہونے پر آپ کے اوتار کا رنگ |
| `created_at` | تاریخ و وقت | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

آپ کی تصویر ایپ میں بدلتی ہے، یہاں نہیں۔

## سیٹنگز

آپ کی اپنی سیٹنگز: ایک ریکارڈ، `/preferences` پر۔ `preferences:read` سے پڑھیں، `preferences:write` سے بدلیں۔

| فیلڈ | قدریں |
|---|---|
| `presence_visibility` | `everyone`، `contacts` یا `nobody`: کون دیکھتا ہے کہ آپ آن لائن ہیں یا نہیں |
| `read_receipts` | `true` یا `false` |
| `language` | `en`، `zh-Hans`، `hi`، `es`، `ar`، `fr`، `pt-BR`، `ru`، `ja`، `ur`، `de`، یا کچھ سیٹ نہ ہو تو `null` |
| `notify_sounds` | `true` یا `false` |
| `notify_preview` | `name` یا `none`: اطلاع میں لکھنے والے کا نام دکھے یا نہیں |
| `notify_mute_all` | `true` یا `false` |
| `show_mature` | صرف پڑھنے کے لیے: ایپ میں بتائی گئی آپ کی عمر کے حساب سے |
| `id`، `updated_at` | صرف پڑھنے کے لیے |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

سیٹنگز ریکارڈ کی `id` آپ کی اپنی ID ہے، پروفائل والی جیسی، اور `/token` کے لوٹائے `user_id` جیسی۔

## اسٹیٹس پوسٹس

پچھلے 24 گھنٹوں کی آپ کی اپنی اسٹیٹس پوسٹس۔ `status:read` سے پڑھیں؛ `status:write` سے پوسٹ کریں؛ `status:delete` سے حذف کریں۔

| فیلڈ | نوٹ |
|---|---|
| `id`، `created_at`، `expires_at` | صرف پڑھنے کے لیے |
| `kind` | `text`، `photo` یا `video`؛ صرف پڑھنے کے لیے |
| `text` | متنی پوسٹ کے الفاظ، 700 حروف تک؛ آپ کے پلان کی اسٹیٹس لمبائی لاگو ہوتی ہے |
| `bg_hue` | متنی پوسٹ کا پس منظر رنگ، 0 سے 359؛ چھوڑ دیں تو آپ کے اوتار کا رنگ لگتا ہے |
| `caption` | تصویر یا ویڈیو کا کیپشن؛ صرف پڑھنے کے لیے |
| `audience_mode` | `contacts`، `except` یا `only`؛ صرف پڑھنے کے لیے |
| `audience_count` | پوسٹ کتنے لوگوں تک پہنچتی ہے؛ صرف پڑھنے کے لیے |

فلٹرز: `kind.eq`، `created_at.gte`، `created_at.lt`۔ ترتیب: `-created_at` (ڈیفالٹ) یا `created_at`۔

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

API صرف متن پوسٹ کرتا ہے؛ تصاویر اور ویڈیوز کے لیے ایپ سے اپ لوڈ چاہیے۔ نئی پوسٹ اس سامعین تک جاتی ہے جو آپ کی ایپ کی اسٹیٹس سیٹنگز بتاتی ہیں، ایپ کی اپنی پوسٹنگ حد (گھنٹے میں 30) کے ساتھ، جو پہنچنے پر وجہ کے ساتھ `409` لوٹاتی ہے۔ اسٹیٹس اینڈ ٹو اینڈ انکرپٹڈ نہیں ہوتا، نہ ایپ میں نہ یہاں۔

## بلاک کیے لوگ

جن لوگوں کو آپ نے بلاک کیا، ان کے دکھائے یوزرنیم اور نام سے۔ `blocks:read` سے پڑھیں؛ `blocks:write` سے بلاک کریں؛ `blocks:delete` سے ان بلاک کریں۔ یہاں `id` بلاک کیے شخص کی ID ہے۔

| فیلڈ | نوٹ |
|---|---|
| `id` | بلاک کیے شخص کی ID |
| `username` | ان کا۔ کسی کو بلاک کرنے کے لیے یہی بھیجیں |
| `name` | ان کا دکھایا نام؛ صرف پڑھنے کے لیے |
| `created_at` | آپ نے کب بلاک کیا |

ترتیب: `-created_at` (ڈیفالٹ) یا `created_at`۔

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

بلاک کرنا ویسے ہی کام کرتا ہے جیسے ایپ میں: وہ شخص آپ کو پیغام نہیں بھیج سکتا یا آپ کا اسٹیٹس نہیں دیکھ سکتا، اور آپ کے بیچ کا کانٹیکٹ ختم ہو جاتا ہے۔

## کانٹیکٹس

صرف پڑھنے کے لیے، `contacts:read` کے ساتھ۔ ہر ریکارڈ دوسرے شخص کے نام سے ہے: `id` (ان کی ID)، `username`، `name`، `hue`، `chat_id` (ان کے ساتھ آپ کی ذاتی چیٹ، یا `null`) اور `created_at`۔ ترتیب: `-created_at` یا `created_at`۔

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

آپ کا انتظار کرتی کانٹیکٹ درخواستیں کوئی ریسورس نہیں؛ آپ کا سرور `contact_request.received` [ویب ہُک](./webhooks.md) سے ان کے بارے میں سن سکتا ہے۔

## چیٹس

جن چیٹس میں آپ ہیں، صرف پڑھنے کے لیے، `chats:read` کے ساتھ۔

| فیلڈ | نوٹ |
|---|---|
| `id`، `created_at` | |
| `kind` | `direct`، `group`، `anonymous_room` یا `channel` |
| `title`، `topic` | چیٹ میں نہ ہو تو `null` |
| `end_to_end` | `true` جب پیغامات اینڈ ٹو اینڈ انکرپٹڈ ہیں اور یہاں کبھی پڑھے نہیں جا سکتے |
| `has_password` | پاس ورڈ والے روم کے لیے `true` |
| `last_message_at`، `joined_at` | نہ ہو تو `null` |

فلٹر: `kind.eq`۔ ترتیب: `-created_at` یا `created_at`۔

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

ذاتی چیٹ، گروپ یا پاس ورڈ والا روم فہرست میں آتا ہے، اپنے نام اور آخری پیغام کے وقت کے ساتھ، لیکن اس کے پیغامات کبھی نہیں۔

## پیغامات {#messages}

جن کھلے رومز اور چینلز میں آپ ہیں، ان کے پیغامات، جیسے لوگوں نے لکھے: صرف پڑھنے کے لیے، `chats:read` کے ساتھ۔ پاس ورڈ والے رومز، ذاتی چیٹس اور گروپس یہاں نہیں، اور نہ ہی ایک بار دیکھنے والے پیغامات، ماڈریٹر کے ہٹائے پیغامات، اٹیچمنٹس، ری ایکشنز یا پولز۔

| فیلڈ | نوٹ |
|---|---|
| `id`، `created_at` | |
| `chat_id` | کھلا روم یا چینل |
| `kind` | `text` یا `link` |
| `body` | پیغام جیسا لکھا گیا |
| `sender_name` | جس ڈسپلے نام سے بھیجا گیا |
| `reply_to_id` | جس پیغام کا یہ جواب ہے، یا `null` |
| `edited_at` | کبھی ایڈٹ نہ ہوا ہو تو `null` |

فلٹرز: `chat_id.eq`، `created_at.gte`، `created_at.lt`۔ ترتیب: `-created_at` یا `created_at`۔

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## کمیونٹیز

جن کمیونٹیز کے آپ رکن ہیں، صرف پڑھنے کے لیے، `communities:read` کے ساتھ: `id`، `name`، `about`، `topic` (`general`، `tech`، `gaming`، `study`، `creative`، `support`، `local` یا `random`)، `join_mode` (`open` یا `account`)، `member_count`، آپ کا `role` (`owner`، `admin` یا `member`) اور `joined_at`۔ ترتیب: `name` (ڈیفالٹ) یا `-joined_at`۔

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## چینلز

آپ کی کمیونٹیز میں جو چینلز آپ دیکھ سکتے ہیں، صرف پڑھنے کے لیے، `communities:read` کے ساتھ: `id`، `community_id`، `chat_id` (اس کے پیغامات [پیغامات](#messages) سے پڑھیں)، `name`، `topic`، `access` (`open` یا `private`) اور `position`۔ فلٹر: `community_id.eq`۔ ترتیب: `position`۔

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## منسلک ایپ سے حذف

رسائی کی سے کیا گیا حذف فوراً ہوتا ہے اور `204` لوٹاتا ہے۔ آپ کی منسلک کی ہوئی ایپ کا مانگا حذف کبھی فوراً نہیں ہوتا: یہ `202` لوٹاتا ہے اور آپ کا انتظار کرتا ہے۔

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

آپ لنک کھولتے ہیں، دیکھتے ہیں کہ کیا جائے گا، اور 10 منٹ کے اندر AChat پر ہاں یا نہ کہتے ہیں۔ دیکھیں [حذف کرنا آپ کا انتظار کرتا ہے](./assistants.md#deletes-wait-for-you)۔
