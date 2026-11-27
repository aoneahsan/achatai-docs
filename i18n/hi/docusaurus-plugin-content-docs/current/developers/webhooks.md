---
sidebar_position: 5
title: "वेबहुक"
description: "AChat वेबहुक: https पता जोड़ें, इवेंट चुनें, और Node या Python में हर डिलीवरी का Standard Webhooks हस्ताक्षर जाँचें। हर इवेंट और उसका पेलोड, दोबारा कोशिश का क्रम, रोकना, और किस वजह से पता बंद होता है।"
keywords: [AChat वेबहुक, Standard Webhooks, वेबहुक हस्ताक्षर, webhook-signature जाँच, HMAC-SHA256, कॉन्टैक्ट अनुरोध वेबहुक]
last_update:
  date: 2026-11-21
  author: AChat टीम
---

# वेबहुक

**जब आपके अकाउंट में कुछ बदलता है, AChat आपके अपने सर्वर को एक छोटा, हस्ताक्षरित संदेश भेजता है, ताकि आपके टूल हर मिनट पूछे बिना प्रतिक्रिया कर सकें।** हर इवेंट ID के साथ बताता है कि क्या और कब बदला। इसमें कभी मैसेज का टेक्स्ट, कोई नाम या ऐसी कोई चीज़ नहीं होती जिसे आपको सँभालकर रखना पड़े; बाक़ी आपका सर्वर [एक्सेस की](./access-keys.md) से लाता है।

## पता जोड़ें

1. **खाता › दूसरे ऐप › वेबहुक** में **वेबहुक पता जोड़ें** चुनें।
2. पता पेस्ट करें और चाहें तो अपने लिए एक नोट।
3. वे इवेंट चुनें जिनके बारे में उसे सुनना है।
4. **पता जोड़ें** चुनें, फिर साइनिंग सीक्रेट (`whsec_…`) कॉपी करें।

पता जोड़ने के लिए पिछले 10 मिनट में साइन इन चाहिए, [दो-चरण साइन इन](./two-step-sign-in.md) चालू हो तो कोड के साथ। पता जुड़ने पर AChat आपको ईमेल करता है।

पता ऐसा होना चाहिए:

- `https://` से शुरू हो; AChat सादे http पर नहीं भेजता;
- स्टैंडर्ड पोर्ट (443) या 8443 इस्तेमाल करे;
- उसमें कोई नाम या पासवर्ड न हो; इसकी जगह हस्ताक्षर जाँचें;
- इंटरनेट पर पहुँचने लायक़ हो। निजी नेटवर्क, यही कंप्यूटर और AChat के अपने डोमेन मना कर दिए जाते हैं।

आपका प्लान तय करता है कि एक साथ कितने पते हो सकते हैं (Free पर डिफ़ॉल्ट 3; देखें [आपका प्लान क्या देता है](./index.md#what-your-plan-allows))।

## डिलीवरी कैसी दिखती है

JSON बॉडी और तीन हेडर वाला एक `POST`, `AChat-Webhooks/1.0` के रूप में भेजा गया:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` इवेंट है, `timestamp` यह कि वह कब हुआ, और `data` में नीचे दी ID और समय होते हैं। `webhook-id` इवेंट की ID है और हर दोबारा कोशिश में वही रहती है, इसलिए दोहराव पहचानने के लिए इसका इस्तेमाल करें।

## इवेंट

| इवेंट | कब | `data` |
|---|---|---|
| `profile.updated` | आपका यूज़रनेम, नाम, अवतार का रंग या फ़ोटो बदला | `id` (आपकी) |
| `status.posted` | आपने स्टेटस डाला | `id`, `created_at`, `expires_at` |
| `status.deleted` | आपका कोई स्टेटस हटाया गया | `id` |
| `block.added` | आपने किसी को ब्लॉक किया | `id` (उनकी), `created_at` |
| `block.removed` | आपने किसी को अनब्लॉक किया | `id` (उनकी) |
| `contact.added` | एक कॉन्टैक्ट जुड़ा | `id` (कॉन्टैक्ट की), `created_at` |
| `contact.removed` | एक कॉन्टैक्ट हटाया गया | `id` (कॉन्टैक्ट की) |
| `contact_request.received` | किसी ने आपको कॉन्टैक्ट अनुरोध भेजा | `id` (अनुरोध करने वाले की), `created_at` |
| `chat.joined` | आप किसी चैट या रूम में शामिल हुए | `id` (चैट की), `joined_at` |
| `chat.left` | आपने कोई चैट या रूम छोड़ा, या आपको हटाया गया | `id` (चैट की) |
| `message.created` | आप जिस खुले रूम या चैनल में हैं वहाँ मैसेज आया | `id`, `chat_id`, `created_at` |
| `webhook.test` | आपने **टेस्ट इवेंट भेजें** चुना | `message`: `"Test event"` |

`message.created` सिर्फ़ खुले रूम और चैनल के टेक्स्ट और लिंक मैसेज के लिए चलता है। निजी चैट, ग्रुप या पासवर्ड वाले रूम का मैसेज कभी इवेंट नहीं बनाता, क्योंकि AChat उसे नहीं पढ़ सकता। हर `id` [API](./api.md) में उसी ID वाले रिकॉर्ड से मेल खाती है: अनुमति वाली की से `/messages/{id}`, `/status/{id}` या `/contacts/{id}` लाएँ।

इवेंट तभी दर्ज होता है जब आपका कोई पता उसे सुन रहा हो। पहले पता जोड़ें; उसके बनने से पहले के बदलाव बाद में नहीं भेजे जाते।

## हस्ताक्षर जाँचें

हर डिलीवरी [Standard Webhooks](https://www.standardwebhooks.com) से हस्ताक्षरित होती है: `webhook-id`, एक बिंदु, `webhook-timestamp`, एक बिंदु और कच्ची बॉडी पर HMAC-SHA256, आपके सीक्रेट के बाइट से (`whsec_` के बाद वाला हिस्सा, base64 से डिकोड किया)। `webhook-signature` में स्पेस से अलग एक या ज़्यादा `v1,<base64>` मान होते हैं; इनमें से कोई एक मेल खाए तो डिलीवरी स्वीकार करें। जिसका टाइमस्टैम्प आपकी घड़ी से पाँच मिनट से ज़्यादा दूर हो, उसे मना करें।

**कच्ची** बॉडी ठीक वैसे ही जाँचें जैसे वह आई। JSON पार्स करके फिर से सीरियलाइज़ करने से बाइट बदल जाते हैं और मेल टूट जाता है।

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

Express के साथ, इस रूट पर बॉडी कच्ची लें:

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

Flask के साथ `request.get_data()` और `request.headers` दें। ख़ुद लिखना न चाहें, तो कोई भी Standard Webhooks लाइब्रेरी यही जाँच करती है।

## जल्दी जवाब दें

10 सेकंड के अंदर कोई भी `2xx` लौटाएँ और काम उसके बाद करें। AChat कोई रीडायरेक्ट फ़ॉलो नहीं करता। `410 Gone` AChat को बताता है कि पता तुरंत बंद कर दे; बाक़ी कुछ भी, या कोई जवाब नहीं, नाकामी गिना जाता है।

## दोबारा कोशिश

नाकाम डिलीवरी कुल 8 बार आज़माई जाती है: तुरंत, फिर हर पिछली कोशिश के 5 सेकंड, 5 मिनट, 30 मिनट, 2 घंटे, 5 घंटे, 10 घंटे और 10 घंटे बाद, पहली से आख़िरी तक एक दिन से थोड़ा ज़्यादा। हर कोशिश में वही `webhook-id` होती है।

हर पते के नीचे का **डिलीवरी लॉग** हर डिलीवरी दिखाता है: पहुँचा, नहीं भेजा, कोई जवाब नहीं, या आपके सर्वर का लौटाया स्टेटस, कोशिश की संख्या के साथ। **फिर भेजें** उसी ID से एक को दोबारा भेजता है। इवेंट और उनका लॉग 30 दिन रखे जाते हैं।

## रोकना, बंद होना और फिर चालू करना

- **रोकें** इवेंट तब तक छोड़ता है जब तक आप **फिर शुरू करें** न चुनें। रुके रहने के दौरान हुए इवेंट बाद में नहीं भेजे जाते।
- जो पता 5 दिन बिना रुके नाकाम रहा, वह **नाकाम होने के बाद बंद** हो जाता है, और AChat आपको पता, उसका आख़िरी जवाब और नाकाम होना कब शुरू हुआ, ईमेल करता है। जब तक आप **फिर चालू करें** न चुनें, कुछ नहीं भेजा जाता।
- **पता हटाएँ** भेजना तुरंत रोक देता है, और उसका डिलीवरी लॉग भी साथ जाता है।

## साइनिंग सीक्रेट

AChat पता जोड़ते समय सीक्रेट एक बार दिखाता है, और साइन इन के बाद 10 मिनट तक फिर से (दो-चरण साइन इन चालू हो तो कोड के साथ): **साइनिंग सीक्रेट दिखाएँ**। **सीक्रेट बदलें** नया सीक्रेट बनाता है, और 24 घंटे तक हर इवेंट पर दो हस्ताक्षर होते हैं, हर सीक्रेट से एक, ताकि आपका सर्वर कुछ छोड़े बिना बदल सके। ऊपर की जाँच दोनों में से कोई भी स्वीकार करती है।
