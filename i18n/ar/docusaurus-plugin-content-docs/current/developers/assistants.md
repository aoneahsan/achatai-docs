---
sidebar_position: 4
title: "ربط Claude أو ChatGPT أو Claude Code أو Cursor"
description: "اربط مساعد ذكاء اصطناعي بحسابك في AChat عبر عنوان MCP الخاص بـ AChat. الإعداد لـ Claude وChatGPT وClaude Code وCursor، وما توافق عليه، ولماذا ينتظر الحذف موافقتك دائمًا، وكيف تفصل الاتصال."
keywords: [MCP في AChat, ربط Claude بـ AChat, موصّل AChat لـ ChatGPT, Claude Code MCP, Cursor MCP, تطبيق دردشة مع مساعد ذكاء اصطناعي]
last_update:
  date: 2026-11-21
  author: فريق AChat
---

# ربط Claude أو ChatGPT أو Claude Code أو Cursor

**الصق عنوان المساعد الخاص بـ AChat في مساعدك، ووافق عليه في AChat، فيستطيع قراءة حسابك وتغيير ما يخصك.** لا يرى إلا ما تحدده عند الموافقة. ولا يستطيع أبدًا قراءة رسالة مشفّرة من الطرف إلى الطرف، ولا حذف أي شيء دون أن تقول نعم في AChat.

عنوان المساعد الخاص بـ AChat:

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

إنه خادم MCP بعيد عبر Streamable HTTP. وتجده أيضًا، مع زر **نسخ**، ضمن **الحساب › تطبيقات أخرى › ربط مساعد**.

## Claude

1. في Claude، افتح **Settings** ثم **Connectors**.
2. اختر **Add custom connector** والصق عنوان AChat.
3. يفتح Claude تطبيق AChat. راجع ما يطلبه ووافق.

## ChatGPT

1. في ChatGPT، افتح **Settings** ثم **Apps and Connectors**، وفعّل وضع المطوّر.
2. اختر **Create**، وسمّه AChat، والصق العنوان.
3. يفتح ChatGPT تطبيق AChat. راجع ما يطلبه ووافق.

## Claude Code

1. في الطرفية، شغّل:

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. شغّل `/mcp` في Claude Code واختر **achat**.
3. يفتح متصفحك AChat. راجع ما يطلبه ووافق.

## Cursor

1. في Cursor، افتح **Settings** ثم **MCP** ثم **Add new MCP server**.
2. الصق هذا في `mcp.json`:

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. يفتح Cursor تطبيق AChat. راجع ما يطلبه ووافق.

تعمل عملاء MCP الأخرى التي تدعم OAuth بالطريقة نفسها: يجيب العنوان العميلَ الذي لا يحمل رمزًا بمكان تسجيل الدخول، ويسجّل العميل نفسه.

## ما توافق عليه

تذكر صفحة الموافقة في AChat اسم التطبيق، والعنوان الذي يعيدك إليه، وكل إذن يطلبه، بخيارات القراءة والتغيير والحذف نفسها الموجودة في [مفتاح الوصول](./access-keys.md#permissions). تبقى البيانات المشتركة للقراءة فقط مهما طُلب، ويُحذف من الطلب أي إذن لا يقدّمه AChat. ولا يُشارَك شيء حتى تختار **موافقة**.

- تطبيق «سجّل نفسه في AChat»: لم يتحقق AChat ممن يديره، فاقرأ ما يطلبه.
- إن كان الاتصال قادرًا على التغيير، تتطلب الموافقة تسجيل دخول خلال آخر 10 دقائق، والرمز أيضًا حين يكون [تسجيل الدخول بخطوتين](./two-step-sign-in.md) مفعّلًا.
- يمكنك تسمية الاتصال، لتميّز بين اتصالين لاحقًا.

يرسل لك AChat بريدًا حين يُربط تطبيق. وتحدد خطتك عدد ما يمكن ربطه في آن واحد (3 في Free افتراضيًا؛ راجع [ما تسمح به خطتك](./index.md#what-your-plan-allows)). وتُحسب استدعاءات المساعد ضمن حصة الطلبات اليومية نفسها التي للواجهة.

## ما يستطيع المساعد فعله

تحتاج كل أداة إلى الإذن المذكور بجانبها، ولا تعرض قائمة أدوات المساعد إلا الأدوات التي تسمح بها موافقتك الآن.

| الأدوات | الإذن |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

الحقول هي حقول الواجهة نفسها؛ راجع [واجهة برمجة AChat](./api.md). تُرجع القوائم حتى 50 سجلًا في كل استدعاء، مع مؤشر للصفحة التالية. ولا تأتي الرسائل إلا من الغرف المفتوحة والقنوات. والمحادثة المباشرة أو المجموعة أو الغرفة ذات كلمة المرور تُظهر اسمها وأعضاءها، ولا تُظهر أبدًا ما قيل فيها.

## الحذف ينتظرك {#deletes-wait-for-you}

المساعد لا يحذف أبدًا. حين تطلب منه إزالة منشور حالة أو رفع الحظر عن أحد، يستدعي `prepare_delete_status` أو `prepare_delete_blocks`، فيرد AChat برابط إلى `https://achat.aoneahsan.com/developers/confirm/…`.

1. افتح الرابط. يعرض AChat ما طلبه المساعد وما يذهب معه.
2. اختر **حذفه** (أو **رفع الحظر**)، أو **الإبقاء عليه**. أنت في AChat لا في المساعد، لذا لا يستطيع الضغط على هذه الأزرار.
3. لا يعرف المساعد إلا أن الطلب انتهى.

ينتهي الطلب بعد 10 دقائق، ولا يُحذف شيء. يتطلب التأكيد تسجيل دخول خلال آخر 10 دقائق، مع الرمز إن كان تسجيل الدخول بخطوتين مفعّلًا. وتُسرد عمليات الحذف المنتظرة ضمن **الحساب › تطبيقات أخرى › التطبيقات المتصلة**. أما [مفتاح الوصول](./access-keys.md) الذي يملك إذن الحذف فيحذف فورًا، لأنك أنت من يشغّله.

## فصل الاتصال

ضمن **الحساب › تطبيقات أخرى › التطبيقات المتصلة**، اختر **إزالة** على الاتصال. يفقد الوصول فورًا، بما في ذلك أي طلب في منتصفه. ولاستخدامه مجددًا، اربطه من جديد. و**إعادة تسمية** تغيّر الاسم الذي تراه فقط.

## ما لا يصل إليه المساعدون

- الرسائل في المحادثات المباشرة والمجموعات والغرف ذات كلمة المرور، التي لا يستطيع AChat نفسه قراءتها.
- مفاتيح أجهزتك، ومفتاح الاسترداد، ورموز الخطوتين، ومفاتيح الوصول، وأسرار الـ webhooks.
- صورتك ومرفقاتك وتفاعلاتك واستطلاعاتك.
- أي شيء يخص حسابًا آخر.

النص الذي يقرؤه المساعد من AChat (منشور حالة، رسالة في غرفة مفتوحة) يُعاد إليه بوصفه بيانات. تعامل مع كلمات الآخرين على أنها كلماتهم، لا على أنها تعليمات لمساعدك.
