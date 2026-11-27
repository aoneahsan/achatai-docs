---
sidebar_position: 18
title: 从 Sendbird 搬到 AChat
description: Sendbird 是按月活跃用户计价的应用内聊天，有免费试用，没有免费套餐。什么时候页面上一个免费的 AChat 房间就够了。核对于 2026-11-22。
last_update:
  date: 2026-11-22
  author: AChat 团队
---

# 从 Sendbird 搬到 AChat

**Sendbird 是按月活跃用户计价的应用内聊天，有免费试用。** 如果聊天是你自己产品的一部分，而且你有预算，Sendbird 就是为此而做的。AChat 适合更小的需求：页面上的一个房间，而且你不想一开始就付费。

最后核对于 2026-11-22。完整对比见 [AChat 与 Sendbird](https://achat.aoneahsan.com/zh-Hans/compare/sendbird)。

## 在试用变成账单之前

Sendbird 的套餐从每月 $349（按年计费）起。如果你的试用表明你需要的只是一个让访客交谈的地方，先试试这个。

1. 写下当初试用是为了什么。如果是你自己已登录用户之间的消息，就继续评估 Sendbird；AChat 的小组件不是做这个的 SDK。
2. 如果是一个公开房间，就用 AChat 的免费套餐在[小组件页面](https://achat.aoneahsan.com/zh-Hans/widget)上做一个（[可嵌入小组件](/features/embeddable-widget)）。
3. 把代码贴到试用时聊天所在的位置。
4. 如果访客应该能保留房间，就打开 **提供登录**。登录会在新标签页中打开，聊天本身从不需要登录。
5. 如果房间只该留给你邀请的人，就加个密码。

## 按 Sendbird 价格页面的说法

他们的价格页面说没有不设截止日期的免费套餐。我们查看的页面没有说明 Sendbird 是否提供可直接加到页面的现成聊天，或能在自己服务器上运行的版本，所以这两行没有列出。

| 功能 | AChat | Sendbird |
|---|---|---|
| 没有截止日期的免费套餐 | 是 | 否（<a href="https://sendbird.com/pricing/chat" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a>） |

AChat 只提供托管版本，它的小组件是现成的房间，不是 SDK，也不是客服收件箱。

| 套餐 | 价格 | 来源 |
|---|---|---|
| Starter | 每月 $349，按年计费 | <a href="https://sendbird.com/pricing/chat" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a> |
| Starter | 每月 $399，按月计费 | <a href="https://sendbird.com/pricing/chat" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a> |
| Pro | 每月 $499，按年计费 | <a href="https://sendbird.com/pricing/chat" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a> |
| Pro | 每月 $599，按月计费 | <a href="https://sendbird.com/pricing/chat" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a> |

AChat 的套餐和价格：[价格页面](https://achat.aoneahsan.com/zh-Hans/pricing)。Sendbird 的在 <a href="https://sendbird.com" target="_blank" rel="noopener noreferrer nofollow">Sendbird 网站</a>。
