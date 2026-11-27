---
sidebar_position: 3
title: "AChat API"
description: "AChat का REST API: बेस URL, Authorization हेडर, जवाब का ढाँचा, एरर कोड, कर्सर से पेज और सीमाएँ, फिर हर रिसोर्स चलते curl उदाहरण के साथ, आपकी प्रोफ़ाइल और स्टेटस पोस्ट से खुले रूम के मैसेज तक।"
keywords: [AChat API, AChat REST API, achat_pat, AChat OpenAPI, AChat curl, स्टेटस API, ब्लॉक सूची API]
last_update:
  date: 2026-11-27
  author: AChat टीम
---

# AChat API

**[एक्सेस की](./access-keys.md) को Bearer टोकन के रूप में `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` पर भेजें और आपको JSON वापस मिलता है।** आपकी प्रोफ़ाइल, सेटिंग, स्टेटस पोस्ट और ब्लॉक सूची पढ़ी और बदली जा सकती है; कॉन्टैक्ट, चैट, खुले रूम के मैसेज, कम्युनिटी और चैनल सिर्फ़ पढ़े जा सकते हैं। एंड-टू-एंड एन्क्रिप्टेड कुछ भी API में है ही नहीं।

मशीन के पढ़ने लायक़ संदर्भ [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1) है, और [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md) भी। दोनों को की नहीं चाहिए।

## बेस URL और की

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` बताता है कि क्रेडेंशियल क्या है और क्या कर सकता है, जो नई की जाँचने का सबसे तेज़ तरीक़ा है:

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

एक्सेस की के लिए `kind` `pat` होता है और आपके जोड़े ऐप के लिए `oauth`, जैसे कोई [असिस्टेंट](./assistants.md)। API दोनों स्वीकार करता है।

## जवाब का ढाँचा

हर जवाब इन तीन में से किसी एक रूप का JSON होता है।

| जवाब | रूप |
|---|---|
| एक रिकॉर्ड | `{ "data": { … } }` |
| एक सूची | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| एक एरर | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

मिटाने पर बिना बॉडी के `204` आता है। जिस फ़ील्ड का AChat के पास कोई मान नहीं, वह `null` के रूप में आता है।

## एरर

| HTTP | `code` | कब |
|---|---|---|
| 400 | `invalid_request` | ग़लत क्वेरी, ग़लत कर्सर, या ऐसी बॉडी जो फ़ील्ड के नियम पूरे न करे (`details.issues` हर फ़ील्ड बताता है) |
| 401 | `invalid_token` | की नहीं है, ग़लत है, ख़त्म हो गई या हटा दी गई |
| 403 | `scope_required` | की के पास अनुमति नहीं; `details.scope` उसका नाम बताता है |
| 404 | `not_found` | इस की के लिए इस पते पर कुछ नहीं, किसी और का रिकॉर्ड भी |
| 405 | `method_not_allowed` | रिसोर्स यह तरीक़ा नहीं लेता, जैसे कॉन्टैक्ट पर POST |
| 409 | `conflict` | AChat के किसी नियम ने बदलाव मना किया; संदेश सीधे शब्दों में बताता है कि कौन-सा |
| 413 | `payload_too_large` | बॉडी बहुत बड़ी है |
| 429 | `rate_limited` | बहुत ज़्यादा अनुरोध; देखें [सीमाएँ](#limits) |
| 500 | `internal` | हमारी ग़लती। `correlation_id` [संपर्क पेज](https://achat.aoneahsan.com/hi/contact) से AChat टीम को भेजें |

संदेश इंसान के लिए लिखा जाता है और उसमें कभी स्टैक ट्रेस, SQL या सीक्रेट नहीं होता। बिना किसी की के:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## पेज, क्रम और फ़िल्टर

सूचियाँ डिफ़ॉल्ट रूप से 20 रिकॉर्ड लौटाती हैं और ज़्यादा से ज़्यादा 50 (`limit=1` से `limit=50`)। और हों, तो `meta.next_cursor` में एक कर्सर होता है: उसी क्वेरी के साथ उसे `cursor` के रूप में वापस भेजें तो अगला पेज मिलता है, और जब वह `null` हो तो रुकें। कर्सर उसी क्वेरी से बँधा है जिससे वह आया; क्रम या फ़िल्टर बदलें तो AChat उसे मना करता है, इसलिए उसके बिना फिर से शुरू करें।

`sort` वे मान लेता है जो नीचे हर रिसोर्स बताता है; आगे का `-` मतलब सबसे नए पहले। फ़िल्टर `field.op=value` लिखे जाते हैं:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## सीमाएँ {#limits}

हर की या कनेक्शन एक मिनट में 120 अनुरोध कर सकता है। इसके ऊपर, आपका प्लान तय करता है कि पूरा अकाउंट हर दिन कितने अनुरोध कर सकता है, UTC आधी रात से हर की और असिस्टेंट को मिलाकर गिना जाता है (Free पर डिफ़ॉल्ट 5,000; देखें [आपका प्लान क्या देता है](./index.md#what-your-plan-allows))। हर जवाब में `ratelimit-limit`, `ratelimit-remaining` और `ratelimit-reset` (सबसे कड़ी सीमा रीसेट होने तक के सेकंड) होते हैं; `429` में सेकंड में `retry-after` भी जुड़ता है। मना होने के दौरान भी अनुरोध गिने जाते हैं, इसलिए लूप में दोबारा कोशिश करने की जगह रुककर करें।

## प्रोफ़ाइल

आपकी अपनी प्रोफ़ाइल: एक रिकॉर्ड, जिसकी `id` आपकी अपनी ID है। `username` यहाँ सिर्फ़ पढ़ने के लिए है, क्योंकि नया यूज़रनेम ऐप के क्लेम फ़्लो से होकर जाता है। `profile:read` से पढ़ें, `profile:write` से बदलें।

| फ़ील्ड | प्रकार | नोट |
|---|---|---|
| `id` | uuid | आपकी ID |
| `username` | स्ट्रिंग, 24 तक | सिर्फ़ पढ़ने के लिए |
| `name` | स्ट्रिंग, 1 से 100 | वह नाम जो दूसरे देखते हैं |
| `hue` | पूर्णांक 0 से 359 | फ़ोटो न होने पर आपके अवतार का रंग |
| `created_at` | तारीख़-समय | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

आपकी फ़ोटो ऐप में बदलती है, यहाँ नहीं।

## सेटिंग

आपकी अपनी सेटिंग: एक रिकॉर्ड, `/preferences` पर। `preferences:read` से पढ़ें, `preferences:write` से बदलें।

| फ़ील्ड | मान |
|---|---|
| `presence_visibility` | `everyone`, `contacts` या `nobody`: कौन देखता है कि आप ऑनलाइन हैं या नहीं |
| `read_receipts` | `true` या `false` |
| `language` | `en`, `zh-Hans`, `hi`, `es`, `ar`, `fr`, `pt-BR`, `ru`, `ja`, `ur`, `de`, या कुछ सेट न हो तो `null` |
| `notify_sounds` | `true` या `false` |
| `notify_preview` | `name` या `none`: नोटिफ़िकेशन में लिखने वाले का नाम दिखे या नहीं |
| `notify_mute_all` | `true` या `false` |
| `show_mature` | सिर्फ़ पढ़ने के लिए: ऐप में बताई आपकी उम्र के हिसाब से |
| `id`, `updated_at` | सिर्फ़ पढ़ने के लिए |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

सेटिंग रिकॉर्ड की `id` आपकी अपनी ID है, प्रोफ़ाइल वाली जैसी, और `/token` के लौटाए `user_id` जैसी।

## स्टेटस पोस्ट

पिछले 24 घंटे की आपकी अपनी स्टेटस पोस्ट। `status:read` से पढ़ें; `status:write` से पोस्ट करें; `status:delete` से मिटाएँ।

| फ़ील्ड | नोट |
|---|---|
| `id`, `created_at`, `expires_at` | सिर्फ़ पढ़ने के लिए |
| `kind` | `text`, `photo` या `video`; सिर्फ़ पढ़ने के लिए |
| `text` | टेक्स्ट पोस्ट के शब्द, 700 अक्षरों तक; आपके प्लान की स्टेटस लंबाई लागू होती है |
| `bg_hue` | टेक्स्ट पोस्ट का बैकग्राउंड रंग, 0 से 359; छोड़ दें तो आपके अवतार का रंग लगता है |
| `caption` | फ़ोटो या वीडियो का कैप्शन; सिर्फ़ पढ़ने के लिए |
| `audience_mode` | `contacts`, `except` या `only`; सिर्फ़ पढ़ने के लिए |
| `audience_count` | पोस्ट कितने लोगों तक पहुँचती है; सिर्फ़ पढ़ने के लिए |

फ़िल्टर: `kind.eq`, `created_at.gte`, `created_at.lt`। क्रम: `-created_at` (डिफ़ॉल्ट) या `created_at`।

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

API सिर्फ़ टेक्स्ट पोस्ट करता है; फ़ोटो और वीडियो के लिए ऐप से अपलोड चाहिए। नई पोस्ट उस दर्शक वर्ग तक जाती है जो आपकी ऐप की स्टेटस सेटिंग बताती है, ऐप की अपनी पोस्टिंग सीमा (घंटे में 30) के साथ, जो पहुँचने पर वजह के साथ `409` लौटाती है। स्टेटस एंड-टू-एंड एन्क्रिप्टेड नहीं होता, न ऐप में न यहाँ।

## ब्लॉक किए लोग

जिन लोगों को आपने ब्लॉक किया, उनके दिखाए यूज़रनेम और नाम से। `blocks:read` से पढ़ें; `blocks:write` से ब्लॉक करें; `blocks:delete` से अनब्लॉक करें। यहाँ `id` ब्लॉक किए व्यक्ति की ID है।

| फ़ील्ड | नोट |
|---|---|
| `id` | ब्लॉक किए व्यक्ति की ID |
| `username` | उनका। किसी को ब्लॉक करने के लिए यही भेजें |
| `name` | उनका दिखाया नाम; सिर्फ़ पढ़ने के लिए |
| `created_at` | आपने कब ब्लॉक किया |

क्रम: `-created_at` (डिफ़ॉल्ट) या `created_at`।

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

ब्लॉक करना वैसे ही काम करता है जैसे ऐप में: वह व्यक्ति आपको मैसेज नहीं कर सकता या आपका स्टेटस नहीं देख सकता, और आपके बीच का कॉन्टैक्ट ख़त्म हो जाता है।

## कॉन्टैक्ट

सिर्फ़ पढ़ने के लिए, `contacts:read` के साथ। हर रिकॉर्ड दूसरे व्यक्ति के नाम से है: `id` (उनकी ID), `username`, `name`, `hue`, `chat_id` (उनके साथ आपकी निजी चैट, या `null`) और `created_at`। क्रम: `-created_at` या `created_at`।

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

आपका इंतज़ार कर रहे कॉन्टैक्ट अनुरोध कोई रिसोर्स नहीं हैं; आपका सर्वर `contact_request.received` [वेबहुक](./webhooks.md) से उनके बारे में सुन सकता है।

## चैट

जिन चैट में आप हैं, सिर्फ़ पढ़ने के लिए, `chats:read` के साथ।

| फ़ील्ड | नोट |
|---|---|
| `id`, `created_at` | |
| `kind` | `direct`, `group`, `anonymous_room` या `channel` |
| `title`, `topic` | चैट में न हो तो `null` |
| `end_to_end` | `true` जब मैसेज एंड-टू-एंड एन्क्रिप्टेड हैं और यहाँ कभी पढ़े नहीं जा सकते |
| `has_password` | पासवर्ड वाले रूम के लिए `true` |
| `last_message_at`, `joined_at` | न हो तो `null` |

फ़िल्टर: `kind.eq`। क्रम: `-created_at` या `created_at`।

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

निजी चैट, ग्रुप या पासवर्ड वाला रूम सूची में आता है, अपने नाम और आख़िरी मैसेज के समय के साथ, पर उसके मैसेज कभी नहीं।

## मैसेज {#messages}

जिन खुले रूम और चैनल में आप हैं, उनके मैसेज, जैसे लोगों ने लिखे: सिर्फ़ पढ़ने के लिए, `chats:read` के साथ। पासवर्ड वाले रूम, निजी चैट और ग्रुप यहाँ नहीं हैं, और न ही एक बार देखने वाले मैसेज, मॉडरेटर के हटाए मैसेज, अटैचमेंट, रिएक्शन या पोल।

| फ़ील्ड | नोट |
|---|---|
| `id`, `created_at` | |
| `chat_id` | खुला रूम या चैनल |
| `kind` | `text` या `link` |
| `body` | मैसेज जैसा लिखा गया |
| `sender_name` | जिस डिस्प्ले नाम से भेजा गया |
| `reply_to_id` | जिस मैसेज का यह जवाब है, या `null` |
| `edited_at` | कभी एडिट न हुआ हो तो `null` |

फ़िल्टर: `chat_id.eq`, `created_at.gte`, `created_at.lt`। क्रम: `-created_at` या `created_at`।

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## कम्युनिटी

जिन कम्युनिटी के आप सदस्य हैं, सिर्फ़ पढ़ने के लिए, `communities:read` के साथ: `id`, `name`, `about`, `topic` (`general`, `tech`, `gaming`, `study`, `creative`, `support`, `local` या `random`), `join_mode` (`open` या `account`), `member_count`, आपकी `role` (`owner`, `admin` या `member`) और `joined_at`। क्रम: `name` (डिफ़ॉल्ट) या `-joined_at`।

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## चैनल

आपकी कम्युनिटी में जो चैनल आप देख सकते हैं, सिर्फ़ पढ़ने के लिए, `communities:read` के साथ: `id`, `community_id`, `chat_id` (उसके मैसेज [मैसेज](#messages) से पढ़ें), `name`, `topic`, `access` (`open` या `private`) और `position`। फ़िल्टर: `community_id.eq`। क्रम: `position`।

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## जुड़े ऐप से मिटाना

एक्सेस की से किया मिटाना तुरंत होता है और `204` लौटाता है। आपके जोड़े ऐप का माँगा मिटाना कभी तुरंत नहीं होता: यह `202` लौटाता है और आपका इंतज़ार करता है।

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

आप लिंक खोलते हैं, देखते हैं कि क्या जाएगा, और 10 मिनट के अंदर AChat पर हाँ या ना कहते हैं। देखें [मिटाना आपका इंतज़ार करता है](./assistants.md#deletes-wait-for-you)।
