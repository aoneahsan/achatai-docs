---
sidebar_position: 5
title: "Webhooks"
description: "Webhooks في AChat: أضف عنوان https، واختر الأحداث، وتحقق من توقيع Standard Webhooks لكل تسليم في Node أو Python. كل حدث وبياناته، وجدول إعادة المحاولة، والإيقاف المؤقت، وما يوقف العنوان."
keywords: [webhooks في AChat, Standard Webhooks, توقيع webhook, التحقق من webhook-signature, HMAC-SHA256, webhook طلب اتصال]
last_update:
  date: 2026-11-21
  author: فريق AChat
---

# Webhooks

**يرسل AChat رسالة قصيرة موقّعة إلى خادمك حين يتغير شيء في حسابك، كي تتفاعل أدواتك دون أن تسأل كل دقيقة.** يقول كل حدث ما الذي تغيّر ومتى، مع المعرّفات. ولا يحمل أبدًا نص رسالة أو اسمًا أو أي شيء آخر عليك حمايته؛ ويجلب خادمك الباقي بـ[مفتاح وصول](./access-keys.md).

## إضافة عنوان

1. ضمن **الحساب › تطبيقات أخرى › Webhooks**، اختر **إضافة عنوان webhook**.
2. الصق العنوان، وإن شئت ملاحظة لنفسك.
3. اختر الأحداث التي يجب أن يُبلَّغ بها.
4. اختر **إضافة العنوان**، ثم انسخ سرّ التوقيع (`whsec_…`).

تتطلب إضافة عنوان تسجيل دخول خلال آخر 10 دقائق، مع الرمز حين يكون [تسجيل الدخول بخطوتين](./two-step-sign-in.md) مفعّلًا. ويرسل لك AChat بريدًا حين يُضاف عنوان.

يجب أن يكون العنوان:

- يبدأ بـ `https://`؛ لا يرسل AChat عبر http العادي؛
- يستخدم المنفذ القياسي (443) أو 8443؛
- خاليًا من اسم أو كلمة مرور؛ تحقق من التوقيع بدلًا من ذلك؛
- قابلًا للوصول عبر الإنترنت. تُرفض الشبكات الخاصة وهذا الحاسوب ونطاقات AChat نفسه.

تحدد خطتك عدد العناوين التي يمكنك امتلاكها في آن واحد (3 في Free افتراضيًا؛ راجع [ما تسمح به خطتك](./index.md#what-your-plan-allows)).

## كيف يبدو التسليم

طلب `POST` بجسم JSON وثلاث ترويسات، يُرسل باسم `AChat-Webhooks/1.0`:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` هو الحدث، و`timestamp` وقت وقوعه، و`data` يحمل المعرّفات والأوقات المذكورة أدناه. و`webhook-id` معرّف الحدث ويبقى كما هو في كل إعادة محاولة، فاستخدمه لاكتشاف التكرار.

## الأحداث

| الحدث | متى | `data` |
|---|---|---|
| `profile.updated` | تغيّر اسم المستخدم أو الاسم أو لون الصورة الرمزية أو الصورة | `id` (معرّفك) |
| `status.posted` | نشرت حالة | `id`، `created_at`، `expires_at` |
| `status.deleted` | حُذفت حالة لك | `id` |
| `block.added` | حظرت شخصًا | `id` (معرّفه)، `created_at` |
| `block.removed` | رفعت الحظر عن شخص | `id` (معرّفه) |
| `contact.added` | أُضيفت جهة اتصال | `id` (معرّف جهة الاتصال)، `created_at` |
| `contact.removed` | أُزيلت جهة اتصال | `id` (معرّف جهة الاتصال) |
| `contact_request.received` | أرسل إليك أحدهم طلب اتصال | `id` (صاحب الطلب)، `created_at` |
| `chat.joined` | انضممت إلى محادثة أو غرفة | `id` (معرّف المحادثة)، `joined_at` |
| `chat.left` | غادرت محادثة أو غرفة، أو أُزلت منها | `id` (معرّف المحادثة) |
| `message.created` | وصلت رسالة في غرفة مفتوحة أو قناة أنت فيها | `id`، `chat_id`، `created_at` |
| `webhook.test` | اخترت **إرسال حدث تجريبي** | `message`: `"Test event"` |

لا يُطلَق `message.created` إلا لرسائل النص والروابط في الغرف المفتوحة والقنوات. ولا تُنشئ الرسالة في محادثة مباشرة أو مجموعة أو غرفة ذات كلمة مرور حدثًا أبدًا، لأن AChat لا يستطيع قراءتها. ويطابق كل `id` السجل ذا المعرّف نفسه في [واجهة البرمجة](./api.md): اجلب `/messages/{id}` أو `/status/{id}` أو `/contacts/{id}` بمفتاح يملك الإذن.

لا يُسجَّل الحدث إلا ما دام أحد عناوينك يستمع إليه. أضف العنوان أولًا؛ فالتغييرات التي سبقت وجوده لا تُرسل لاحقًا.

## التحقق من التوقيع

كل تسليم موقّع وفق [Standard Webhooks](https://www.standardwebhooks.com): HMAC-SHA256 على `webhook-id` ثم نقطة ثم `webhook-timestamp` ثم نقطة ثم الجسم الخام، بمفتاح هو بايتات سرّك (الجزء بعد `whsec_` بعد فك ترميز base64). يحمل `webhook-signature` قيمة أو أكثر من نوع `v1,<base64>` مفصولة بمسافات؛ اقبل التسليم إن طابقت أي واحدة منها. وارفض كل ما يبعد طابعه الزمني أكثر من خمس دقائق عن ساعتك.

تحقق من الجسم **الخام** كما وصل تمامًا. فتحليل JSON ثم إعادة تسلسله يغيّر البايتات ويفسد المطابقة.

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

مع Express، استقبل الجسم خامًا على هذا المسار:

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

مع Flask، مرّر `request.get_data()` و`request.headers`. وأي مكتبة Standard Webhooks تجري الفحص نفسه إن فضّلت ألا تكتبه.

## أجب بسرعة

أجب بأي `2xx` خلال 10 ثوانٍ وأنجز العمل بعد ذلك. لا يتبع AChat عمليات إعادة التوجيه. ويطلب `410 Gone` من AChat إيقاف العنوان فورًا؛ وأي رد آخر، أو عدم الرد، يُعدّ فشلًا.

## إعادة المحاولة

يُحاوَل التسليم الفاشل 8 مرات إجمالًا: فورًا، ثم بعد 5 ثوانٍ و5 دقائق و30 دقيقة وساعتين و5 ساعات و10 ساعات و10 ساعات من كل محاولة سابقة، أي ما يزيد قليلًا على يوم من الأولى إلى الأخيرة. وتحمل كل محاولة `webhook-id` نفسه.

يعرض **سجل التسليم** تحت كل عنوان كل تسليم: تم التسليم، أو لم يُرسل، أو لا رد، أو الحالة التي ردّ بها خادمك، مع رقم المحاولة. ويعيد **إرسال مجددًا** إرسال تسليم بالمعرّف نفسه. وتُحفظ الأحداث وسجلها 30 يومًا.

## الإيقاف المؤقت والإيقاف وإعادة التشغيل

- **الإيقاف المؤقت** يتخطى الأحداث حتى تختار **استئناف**. والأحداث التي تقع أثناء الإيقاف لا تُرسل لاحقًا.
- العنوان الذي فشل دون انقطاع 5 أيام يصبح **أُوقف بعد الفشل**، ويرسل لك AChat بالبريد العنوان وآخر رد له ومتى بدأ الفشل. ولا يُرسل شيء حتى تختار **إعادة التشغيل**.
- **إزالة العنوان** توقف الإرسال فورًا، ويذهب سجل التسليم معه.

## سرّ التوقيع

يعرض AChat السرّ مرة عند إضافة العنوان، ثم مجددًا خلال 10 دقائق بعد تسجيل الدخول (مع الرمز حين يكون تسجيل الدخول بخطوتين مفعّلًا): **عرض سر التوقيع**. ويُنشئ **استبدال السر** سرًا جديدًا، ولمدة 24 ساعة يحمل كل حدث توقيعين، واحدًا من كل سر، كي ينتقل خادمك دون أن يفوته شيء. وتقبل عمليات التحقق أعلاه أيًا منهما.
