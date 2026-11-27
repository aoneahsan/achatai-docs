---
sidebar_position: 19
title: 从 TalkJS 搬到 AChat
description: TalkJS 是与你自己的用户账号绑定的现成聊天界面，开发模式下免费。AChat 用免费套餐上线，面向无需账号的访客。核对于 2026-11-22。
last_update:
  date: 2026-11-22
  author: AChat 团队
---

# 从 TalkJS 搬到 AChat

**TalkJS 是可以加到你产品里的现成聊天界面，在开发模式下免费使用。** 当聊天属于你自己的产品内部、并与你自己的用户账号绑定时，TalkJS 更贴合。AChat 用免费套餐就能上线，使用它的访客根本不需要账号。

核对于 2026-11-22。对比页面是 [AChat 与 TalkJS](https://achat.aoneahsan.com/zh-Hans/compare/talkjs)。

## 从开发模式到上线的房间

在开发模式下搭建时，TalkJS 是免费的。如果你做的原型是一个公开房间，而不是用户之间的聊天，AChat 可以用免费套餐把它上线。

1. 看看你的原型依赖什么。和你的用户 ID 绑定的对话留在 TalkJS，因为 AChat 的小组件不是开发者 SDK，也不认识你的用户。
2. 对于开放房间，在[小组件页面](https://achat.aoneahsan.com/zh-Hans/widget)上选一个房间 ID（[可嵌入小组件](/features/embeddable-widget)）。访客用显示名称加入。
3. 选 **嵌在页面中** 放在原来 TalkJS 聊天的位置，或选 **聊天按钮** 做成角落面板。
4. 把代码复制到页面里。
5. 用账号保留这个房间，然后列出允许显示它的网站。

## 对比

| 功能 | AChat | TalkJS |
|---|---|---|
| 没有截止日期的免费套餐 | 是 | 部分（<a href="https://talkjs.com/pricing/" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a>） |
| 可直接加到页面的现成聊天 | 是 | 是（<a href="https://talkjs.com/pricing/" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a>） |
| 可在自己的服务器上运行 | 否 | 我们查看的页面上没有说明 |

AChat 小组件显示一个匿名房间或开放的社区频道。它不是开发者 SDK，除非设了密码，页面上的任何人都能读这个房间。

| 套餐 | 价格 | 来源 |
|---|---|---|
| Basic | 每月 $279 | <a href="https://talkjs.com/pricing/" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a> |
| Growth | 每月 $569 | <a href="https://talkjs.com/pricing/" target="_blank" rel="noopener noreferrer nofollow">他们的页面</a> |

AChat 的套餐和价格：[价格页面](https://achat.aoneahsan.com/zh-Hans/pricing)。要核对 TalkJS，请打开 <a href="https://talkjs.com" target="_blank" rel="noopener noreferrer nofollow">TalkJS 网站</a>。
