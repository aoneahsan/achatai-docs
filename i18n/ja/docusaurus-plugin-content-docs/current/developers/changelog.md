---
sidebar_position: 7
title: "開発者向けの変更履歴"
description: "AChat の API、アシスタント接続、Webhook、2 段階ログインの変更を新しい順に。2026-11-21 のオープンプラットフォームから。"
keywords: [AChat API の変更履歴, AChat 開発者向けの変更, AChat MCP の変更]
last_update:
  date: 2026-11-21
  author: AChat チーム
---

# 開発者向けの変更履歴

API、アシスタント接続、Webhook、2 段階ログインの変更を新しい順に載せています。API は `v1` です。

## オープンプラットフォーム（2026-11-21）

- **[AChat API](./api.md)** は `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` にあり、アカウント › ほかのアプリ で作る[アクセスキー](./access-keys.md)（`achat_pat_…`）を使います。プロフィール、設定、ステータスの投稿（テキスト）、ブロックリストは読み書きでき、連絡先、チャット、オープンなルームのメッセージ、コミュニティ、チャンネルは読むだけです。OpenAPI 3.1 のドキュメントは `/openapi.json` にあります。
- **[アシスタント接続](./assistants.md)** は `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp` にあり、Claude、ChatGPT、Claude Code、Cursor 向けです。それぞれ AChat であなたが承認し、アシスタントによる削除は `/developers/confirm` であなたが承認するまで待ちます。
- **[Webhook](./webhooks.md)** は 11 種類のイベントに対応し、Standard Webhooks で署名され、ID と時刻だけを運びます。
- **[2 段階ログイン](./two-step-sign-in.md)** は認証アプリ、10 個の復元コード、任意の 7 日間のブラウザ記憶つき。AChat の管理画面を動かすアカウントには必須です。
- エンドツーエンド暗号化されたチャットはすべての対象外です。外部のアプリに見えるのはチャットの名前とメンバーだけで、メッセージは見えません。
- カレンダーフィードはありません。AChat にはカレンダーに入れる日付つきのものがないからです。
