---
sidebar_position: 3
title: "واجهة برمجة AChat"
description: "واجهة REST في AChat: عنوان URL الأساسي، وترويسة Authorization، وغلاف الرد، ورموز الأخطاء، والتقسيم إلى صفحات بالمؤشر والحدود، ثم كل مورد مع مثال curl يعمل، من ملفك الشخصي ومنشورات حالتك إلى رسائل الغرف المفتوحة."
keywords: [واجهة برمجة AChat, AChat REST API, achat_pat, OpenAPI في AChat, curl في AChat, واجهة الحالة, واجهة قائمة المحظورين]
last_update:
  date: 2026-11-27
  author: فريق AChat
---

# واجهة برمجة AChat

**أرسل [مفتاح وصول](./access-keys.md) بوصفه رمز Bearer إلى `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` فتحصل على JSON.** يمكن قراءة ملفك الشخصي وإعداداتك ومنشورات حالتك وقائمة المحظورين وتغييرها؛ أما جهات الاتصال والمحادثات ورسائل الغرف المفتوحة والمجتمعات والقنوات فللقراءة فقط. ولا يوجد في الواجهة أي شيء مشفّر من الطرف إلى الطرف إطلاقًا.

المرجع المقروء آليًا هو [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json) ‏(OpenAPI 3.1)، ومتاح أيضًا بصيغة [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md). ولا يحتاج أي منهما إلى مفتاح.

## العنوان الأساسي والمفتاح

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

يجيب `/token` عمّا هي بيانات الاعتماد وما الذي يحق لها فعله، وهي أسرع طريقة لفحص مفتاح جديد:

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

قيمة `kind` هي `pat` لمفتاح الوصول و`oauth` لتطبيق ربطته، مثل [مساعد](./assistants.md). وتقبل الواجهة كليهما.

## الغلاف

كل رد هو JSON بإحدى الصيغ الثلاث التالية.

| الرد | الصيغة |
|---|---|
| سجل واحد | `{ "data": { … } }` |
| قائمة | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| خطأ | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

يرد الحذف بـ `204` دون جسم. والحقل الذي لا يملك AChat له قيمة يعود بـ `null`.

## الأخطاء

| HTTP | `code` | متى |
|---|---|---|
| 400 | `invalid_request` | استعلام خاطئ، أو مؤشر خاطئ، أو جسم يخالف قواعد الحقول (يذكر `details.issues` كل حقل) |
| 401 | `invalid_token` | المفتاح مفقود أو خاطئ أو منتهٍ أو مُزال |
| 403 | `scope_required` | المفتاح يفتقر إلى الإذن؛ ويذكره `details.scope` |
| 404 | `not_found` | لا شيء على هذا العنوان لهذا المفتاح، بما في ذلك سجل شخص آخر |
| 405 | `method_not_allowed` | المورد لا يقبل هذه الطريقة، مثل POST إلى جهات الاتصال |
| 409 | `conflict` | رفضت قاعدة في AChat التغيير؛ وتقول الرسالة أيها بكلمات بسيطة |
| 413 | `payload_too_large` | الجسم كبير جدًا |
| 429 | `rate_limited` | طلبات كثيرة جدًا؛ راجع [الحدود](#limits) |
| 500 | `internal` | الخطأ منا. أرسل `correlation_id` إلى فريق AChat عبر [صفحة التواصل](https://achat.aoneahsan.com/ar/contact) |

الرسالة مكتوبة لإنسان ولا تحمل أبدًا تتبع مكدس أو SQL أو سرًا. ودون أي مفتاح:

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## الصفحات والترتيب والتصفية

تُرجع القوائم 20 سجلًا افتراضيًا و50 كحد أقصى (من `limit=1` إلى `limit=50`). وحين يوجد المزيد، يحمل `meta.next_cursor` مؤشرًا: أرسله مجددًا بوصفه `cursor` مع الاستعلام نفسه لتحصل على الصفحة التالية، وتوقف حين يصبح `null`. المؤشر مرتبط بالاستعلام الذي جاء منه؛ فإن غيّرت الترتيب أو أحد المرشحات رفضه AChat، فابدأ من جديد دونه.

يقبل `sort` القيم التي يذكرها كل مورد أدناه؛ و`-` في البداية تعني الأحدث أولًا. وتُكتب المرشحات بصيغة `field.op=value`:

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## الحدود {#limits}

يحق لكل مفتاح أو اتصال 120 طلبًا في الدقيقة. وفوق ذلك تحدد خطتك عدد الطلبات التي يحق للحساب كله إجراؤها يوميًا، محسوبة من منتصف الليل بتوقيت UTC عبر كل المفاتيح والمساعدين (5,000 في Free افتراضيًا؛ راجع [ما تسمح به خطتك](./index.md#what-your-plan-allows)). يحمل كل رد `ratelimit-limit` و`ratelimit-remaining` و`ratelimit-reset` (الثواني المتبقية حتى يُعاد ضبط أضيق الحدود)؛ ويضيف `429` الترويسة `retry-after` بالثواني. وتظل الطلبات تُحتسب أثناء رفضك، لذا تمهّل بدل الإعادة في حلقة.

## الملف الشخصي

ملفك الشخصي: سجل واحد، معرّفه `id` هو معرّفك. و`username` للقراءة فقط هنا، لأن اسم المستخدم الجديد يمر بمسار المطالبة في التطبيق. اقرأ بـ `profile:read`، وغيّر بـ `profile:write`.

| الحقل | النوع | ملاحظات |
|---|---|---|
| `id` | uuid | معرّفك |
| `username` | نص، حتى 24 | للقراءة فقط |
| `name` | نص، من 1 إلى 100 | الاسم الذي يراه الآخرون |
| `hue` | عدد صحيح من 0 إلى 359 | لون صورتك الرمزية حين لا توجد صورة |
| `created_at` | تاريخ ووقت | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

تُغيَّر صورتك في التطبيق، لا هنا.

## الإعدادات

إعداداتك: سجل واحد، على `/preferences`. اقرأ بـ `preferences:read`، وغيّر بـ `preferences:write`.

| الحقل | القيم |
|---|---|
| `presence_visibility` | `everyone` أو `contacts` أو `nobody`: من يرى إن كنت متصلًا |
| `read_receipts` | `true` أو `false` |
| `language` | `en` أو `zh-Hans` أو `hi` أو `es` أو `ar` أو `fr` أو `pt-BR` أو `ru` أو `ja` أو `ur` أو `de`، أو `null` حين لا تُحدد لغة |
| `notify_sounds` | `true` أو `false` |
| `notify_preview` | `name` أو `none`: هل يعرض الإشعار من كتب |
| `notify_mute_all` | `true` أو `false` |
| `show_mature` | للقراءة فقط: يتبع العمر الذي صرّحت به في التطبيق |
| `id`، `updated_at` | للقراءة فقط |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

معرّف `id` لسجل الإعدادات هو معرّفك نفسه، كمعرّف ملفك الشخصي و`user_id` الذي يُرجعه `/token`.

## منشورات الحالة

منشورات حالتك خلال آخر 24 ساعة. اقرأ بـ `status:read`؛ وانشر بـ `status:write`؛ واحذف بـ `status:delete`.

| الحقل | ملاحظات |
|---|---|
| `id`، `created_at`، `expires_at` | للقراءة فقط |
| `kind` | `text` أو `photo` أو `video`؛ للقراءة فقط |
| `text` | كلمات المنشور النصي، حتى 700 حرف؛ ويسري طول الحالة في خطتك |
| `bg_hue` | لون خلفية المنشور النصي، من 0 إلى 359؛ وإن أغفلته يُستخدم لون صورتك الرمزية |
| `caption` | تعليق الصورة أو الفيديو؛ للقراءة فقط |
| `audience_mode` | `contacts` أو `except` أو `only`؛ للقراءة فقط |
| `audience_count` | عدد من يصلهم المنشور؛ للقراءة فقط |

المرشحات: `kind.eq` و`created_at.gte` و`created_at.lt`. الترتيب: `-created_at` (الافتراضي) أو `created_at`.

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

تنشر الواجهة نصًا فقط؛ أما الصور والفيديوهات فتحتاج إلى الرفع من التطبيق. يذهب المنشور الجديد إلى الجمهور الذي تحدده إعدادات الحالة في تطبيقك، مع حد النشر الخاص بالتطبيق (30 في الساعة)، الذي يرد بـ `409` مع السبب عند بلوغه. والحالة ليست مشفّرة من الطرف إلى الطرف، لا في التطبيق ولا هنا.

## الأشخاص المحظورون

الأشخاص الذين حظرتهم، باسم المستخدم والاسم اللذين يعرضونهما. اقرأ بـ `blocks:read`؛ واحظر بـ `blocks:write`؛ وارفع الحظر بـ `blocks:delete`. و`id` هنا هو معرّف الشخص المحظور.

| الحقل | ملاحظات |
|---|---|
| `id` | معرّف الشخص المحظور |
| `username` | اسمه. لحظر شخص، أرسله |
| `name` | الاسم الذي يعرضه؛ للقراءة فقط |
| `created_at` | متى حظرته |

الترتيب: `-created_at` (الافتراضي) أو `created_at`.

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

يعمل الحظر كما في التطبيق: لا يعود الشخص قادرًا على مراسلتك أو رؤية حالتك، وينتهي الاتصال بينكما.

## جهات الاتصال

للقراءة فقط، بـ `contacts:read`. يحمل كل سجل اسم الشخص الآخر: `id` (معرّفه) و`username` و`name` و`hue` و`chat_id` (محادثتك المباشرة معه، أو `null`) و`created_at`. الترتيب: `-created_at` أو `created_at`.

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

طلبات الاتصال التي تنتظرك ليست موردًا؛ ويمكن لخادمك أن يعلم بها عبر [webhook](./webhooks.md) ‏`contact_request.received`.

## المحادثات

المحادثات التي تنتمي إليها، للقراءة فقط، بـ `chats:read`.

| الحقل | ملاحظات |
|---|---|
| `id`، `created_at` | |
| `kind` | `direct` أو `group` أو `anonymous_room` أو `channel` |
| `title`، `topic` | `null` حين لا يكون للمحادثة ذلك |
| `end_to_end` | `true` حين تكون الرسائل مشفّرة من الطرف إلى الطرف ولا تُقرأ هنا أبدًا |
| `has_password` | `true` للغرفة ذات كلمة المرور |
| `last_message_at`، `joined_at` | `null` حين لا يوجد |

المرشح: `kind.eq`. الترتيب: `-created_at` أو `created_at`.

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

تظهر المحادثة المباشرة أو المجموعة أو الغرفة ذات كلمة المرور في القائمة، باسمها ووقت آخر رسالة فيها، أما رسائلها فلا تظهر أبدًا.

## الرسائل {#messages}

الرسائل في الغرف المفتوحة والقنوات التي تنتمي إليها، كما كتبها الناس: للقراءة فقط، بـ `chats:read`. الغرف ذات كلمة المرور والمحادثات المباشرة والمجموعات ليست هنا، ولا رسائل العرض لمرة واحدة، ولا الرسائل التي أزالها مشرف، ولا المرفقات أو التفاعلات أو الاستطلاعات.

| الحقل | ملاحظات |
|---|---|
| `id`، `created_at` | |
| `chat_id` | الغرفة المفتوحة أو القناة |
| `kind` | `text` أو `link` |
| `body` | الرسالة كما كُتبت |
| `sender_name` | الاسم المعروض الذي أُرسلت به |
| `reply_to_id` | الرسالة التي ترد عليها، أو `null` |
| `edited_at` | `null` إن لم تُعدَّل قط |

المرشحات: `chat_id.eq` و`created_at.gte` و`created_at.lt`. الترتيب: `-created_at` أو `created_at`.

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## المجتمعات

المجتمعات التي أنت عضو فيها، للقراءة فقط، بـ `communities:read`: `id` و`name` و`about` و`topic` (`general` أو `tech` أو `gaming` أو `study` أو `creative` أو `support` أو `local` أو `random`) و`join_mode` (`open` أو `account`) و`member_count` و`role` الخاص بك (`owner` أو `admin` أو `member`) و`joined_at`. الترتيب: `name` (الافتراضي) أو `-joined_at`.

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## القنوات

القنوات التي تستطيع رؤيتها في مجتمعاتك، للقراءة فقط، بـ `communities:read`: `id` و`community_id` و`chat_id` (اقرأ رسائلها عبر [الرسائل](#messages)) و`name` و`topic` و`access` (`open` أو `private`) و`position`. المرشح: `community_id.eq`. الترتيب: `position`.

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## الحذف من تطبيق متصل

الحذف بمفتاح وصول يحدث فورًا ويرد بـ `204`. أما الحذف الذي يطلبه تطبيق ربطته فلا يحدث هكذا أبدًا: يرد بـ `202` وينتظرك.

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

تفتح الرابط، وترى ما سيذهب، وتقول نعم أو لا في AChat خلال 10 دقائق. راجع [الحذف ينتظرك](./assistants.md#deletes-wait-for-you).
