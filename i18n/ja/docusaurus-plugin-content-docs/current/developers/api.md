---
sidebar_position: 3
title: "AChat API"
description: "AChat の REST API：ベース URL、Authorization ヘッダー、応答の形、エラーコード、カーソルによるページ送りと制限、そしてプロフィールやステータスからオープンなルームのメッセージまで、すべてのリソースを動く curl の例とともに。"
keywords: [AChat API, AChat REST API, achat_pat, AChat OpenAPI, AChat curl, ステータス API, ブロックリスト API]
last_update:
  date: 2026-11-27
  author: AChat チーム
---

# AChat API

**[アクセスキー](./access-keys.md)を Bearer トークンとして `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1` に送れば、JSON が返ってきます。** プロフィール、設定、ステータス、ブロックリストは読み書きでき、連絡先、チャット、オープンなルームのメッセージ、コミュニティ、チャンネルは読むだけです。エンドツーエンド暗号化されたものは API には一切ありません。

機械向けのリファレンスは [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)（OpenAPI 3.1）で、[`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md) もあります。どちらもキーは不要です。

## ベース URL とキー

```bash
export ACHAT_API="https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1"
export ACHAT_KEY="achat_pat_…"   # from Account › Other apps

curl -s "$ACHAT_API/token" -H "Authorization: Bearer $ACHAT_KEY"
```

`/token` は、その資格情報が何で、何ができるかを答えます。新しいキーを確かめるいちばん早い方法です：

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

`kind` はアクセスキーなら `pat`、接続したアプリ（[アシスタント](./assistants.md)など）なら `oauth` です。API はどちらも受け付けます。

## 応答の形

すべての応答は次の 3 つの形のどれかの JSON です。

| 応答 | 形 |
|---|---|
| 1 件のレコード | `{ "data": { … } }` |
| 一覧 | `{ "data": [ … ], "meta": { "next_cursor": "…" or null, "limit": 20 } }` |
| エラー | `{ "error": { "code": "…", "message": "…", "details": { … }, "correlation_id": "req_…" } }` |

削除は本文なしの `204` を返します。AChat が値を持たないフィールドは `null` で返ります。

## エラー

| HTTP | `code` | いつ |
|---|---|---|
| 400 | `invalid_request` | 不正なクエリ、不正なカーソル、またはフィールドのルールに合わない本文（`details.issues` に各フィールド） |
| 401 | `invalid_token` | キーがない、間違っている、期限切れ、または削除済み |
| 403 | `scope_required` | キーに権限がない。`details.scope` にその名前 |
| 404 | `not_found` | このキーにはこのアドレスに何もない（ほかの人のレコードも含む） |
| 405 | `method_not_allowed` | リソースがこのメソッドを受け付けない（連絡先への POST など） |
| 409 | `conflict` | AChat のルールが変更を拒否した。どのルールかはメッセージがわかりやすく伝えます |
| 413 | `payload_too_large` | 本文が大きすぎる |
| 429 | `rate_limited` | リクエストが多すぎる。[制限](#limits)を参照 |
| 500 | `internal` | 私たちの問題です。`correlation_id` を[お問い合わせページ](https://achat.aoneahsan.com/ja/contact)から AChat チームに送ってください |

メッセージは人が読むために書かれていて、スタックトレース、SQL、シークレットを含むことはありません。キーがまったくない場合：

```json
{
  "error": {
    "code": "invalid_token",
    "message": "The credential is missing, invalid, expired or revoked.",
    "correlation_id": "req_011342b96e465843"
  }
}
```

## ページ、並べ替え、絞り込み

一覧は初期設定で 20 件、最大 50 件を返します（`limit=1` から `limit=50`）。まだあるときは `meta.next_cursor` にカーソルが入ります。同じクエリでそれを `cursor` として送り返せば次のページが得られ、`null` になったら終わりです。カーソルは元のクエリに結びついていて、並べ替えや絞り込みを変えると AChat は拒否するので、カーソルなしでやり直してください。

`sort` には各リソースが下に挙げる値が使えます。先頭の `-` は新しい順です。絞り込みは `field.op=value` と書きます：

```bash
curl -s "$ACHAT_API/status?kind.eq=text&created_at.gte=2026-11-21T00:00:00Z&sort=-created_at" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## 制限 {#limits}

キーや接続ごとに 1 分あたり 120 リクエストまでです。さらに、アカウント全体が 1 日に送れるリクエスト数をプランが決めます。UTC の午前 0 時から、すべてのキーとアシスタントを合わせて数えます（Free は初期設定で 5,000。[プランで使える量](./index.md#what-your-plan-allows)を参照）。すべての応答に `ratelimit-limit`、`ratelimit-remaining`、`ratelimit-reset`（いちばん厳しい制限がリセットされるまでの秒数）が付き、`429` には秒単位の `retry-after` が加わります。拒否されているあいだもリクエストは数えられるので、ループで再試行せず、間を空けてください。

## プロフィール

あなた自身のプロフィール：`id` があなた自身の ID である 1 件のレコードです。新しいユーザー名はアプリの取得手続きを通るので、ここでは `username` は読み取りのみです。`profile:read` で読み、`profile:write` で変更します。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | uuid | あなたの ID |
| `username` | 文字列、24 まで | 読み取りのみ |
| `name` | 文字列、1 から 100 | ほかの人に見える名前 |
| `hue` | 整数 0 から 359 | 写真がないときのアバターの色 |
| `created_at` | 日時 | |

```bash
# Read it (a list of one)
curl -s "$ACHAT_API/profile" -H "Authorization: Bearer $ACHAT_KEY"

# Change the name and colour
curl -s -X PATCH "$ACHAT_API/profile/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"name": "Mariam K.", "hue": 212}'
```

写真はここではなく、アプリで変更します。

## 設定

あなた自身の設定：`/preferences` にある 1 件のレコードです。`preferences:read` で読み、`preferences:write` で変更します。

| フィールド | 値 |
|---|---|
| `presence_visibility` | `everyone`、`contacts`、`nobody`：オンラインかどうかを見られる相手 |
| `read_receipts` | `true` か `false` |
| `language` | `en`、`zh-Hans`、`hi`、`es`、`ar`、`fr`、`pt-BR`、`ru`、`ja`、`ur`、`de`、未設定なら `null` |
| `notify_sounds` | `true` か `false` |
| `notify_preview` | `name` か `none`：通知に送り主を表示するか |
| `notify_mute_all` | `true` か `false` |
| `show_mature` | 読み取りのみ：アプリで申告した年齢に従います |
| `id`、`updated_at` | 読み取りのみ |

```bash
curl -s "$ACHAT_API/preferences" -H "Authorization: Bearer $ACHAT_KEY"

curl -s -X PATCH "$ACHAT_API/preferences/6f0d2a4e-1b7c-4e39-8d52-0a9c3f71b2e8" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"presence_visibility": "contacts", "read_receipts": false}'
```

設定レコードの `id` はあなた自身の ID で、プロフィールのものとも、`/token` が返す `user_id` とも同じです。

## ステータスの投稿

直近 24 時間のあなた自身のステータス。`status:read` で読み、`status:write` で投稿し、`status:delete` で削除します。

| フィールド | 説明 |
|---|---|
| `id`、`created_at`、`expires_at` | 読み取りのみ |
| `kind` | `text`、`photo`、`video`。読み取りのみ |
| `text` | テキスト投稿の言葉、700 文字まで。プランのステータスの長さが適用されます |
| `bg_hue` | テキスト投稿の背景色、0 から 359。省略するとアバターの色を使います |
| `caption` | 写真や動画の説明。読み取りのみ |
| `audience_mode` | `contacts`、`except`、`only`。読み取りのみ |
| `audience_count` | 投稿が届く人数。読み取りのみ |

絞り込み：`kind.eq`、`created_at.gte`、`created_at.lt`。並べ替え：`-created_at`（初期設定）か `created_at`。

```bash
# Post a text status
curl -s -X POST "$ACHAT_API/status" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Back online after the move. Same username.", "bg_hue": 160}'

# Delete one
curl -s -X DELETE "$ACHAT_API/status/STATUS_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

API で投稿できるのはテキストだけで、写真や動画にはアプリでのアップロードが必要です。新しい投稿はアプリのステータス設定にある公開範囲に届き、アプリ自体の投稿上限（1 時間に 30 件）が適用されます。上限に達すると理由付きで `409` を返します。ステータスは、アプリでもここでもエンドツーエンド暗号化されていません。

## ブロックした人

あなたがブロックした人を、その人が表示しているユーザー名と名前で並べます。`blocks:read` で読み、`blocks:write` でブロックし、`blocks:delete` で解除します。ここでの `id` はブロックした相手の ID です。

| フィールド | 説明 |
|---|---|
| `id` | ブロックした相手の ID |
| `username` | 相手のもの。ブロックするにはこれを送ります |
| `name` | 相手が表示している名前。読み取りのみ |
| `created_at` | ブロックした日時 |

並べ替え：`-created_at`（初期設定）か `created_at`。

```bash
# Block someone by username
curl -s -X POST "$ACHAT_API/blocks" \
  -H "Authorization: Bearer $ACHAT_KEY" -H "Content-Type: application/json" \
  -d '{"username": "night_owl_42"}'

# Unblock them
curl -s -X DELETE "$ACHAT_API/blocks/BLOCKED_PERSON_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

ブロックはアプリと同じように働きます。相手はあなたにメッセージを送ることも、ステータスを見ることもできなくなり、連絡先の関係も終わります。

## 連絡先

`contacts:read` による読み取りのみです。各レコードは相手の側から名付けられています：`id`（相手の ID）、`username`、`name`、`hue`、`chat_id`（相手との個人チャット、なければ `null`）、`created_at`。並べ替え：`-created_at` か `created_at`。

```bash
curl -s "$ACHAT_API/contacts?limit=50" -H "Authorization: Bearer $ACHAT_KEY"
```

あなたへの未処理の連絡先リクエストはリソースではありません。サーバーは `contact_request.received` の [Webhook](./webhooks.md) で知ることができます。

## チャット

参加しているチャット。`chats:read` による読み取りのみです。

| フィールド | 説明 |
|---|---|
| `id`、`created_at` | |
| `kind` | `direct`、`group`、`anonymous_room`、`channel` |
| `title`、`topic` | チャットにないときは `null` |
| `end_to_end` | メッセージがエンドツーエンド暗号化されていて、ここでは決して読めないとき `true` |
| `has_password` | パスワード付きのルームなら `true` |
| `last_message_at`、`joined_at` | ないときは `null` |

絞り込み：`kind.eq`。並べ替え：`-created_at` か `created_at`。

```bash
curl -s "$ACHAT_API/chats?kind.eq=anonymous_room" -H "Authorization: Bearer $ACHAT_KEY"
```

個人チャット、グループ、パスワード付きのルームは、名前と最後のメッセージの時刻とともに一覧に出ますが、メッセージが出ることはありません。

## メッセージ {#messages}

参加しているオープンなルームとチャンネルのメッセージを、書かれたとおりに。`chats:read` による読み取りのみです。パスワード付きのルーム、個人チャット、グループはここになく、1 回だけ表示のメッセージ、モデレーターが削除したメッセージ、添付ファイル、リアクション、投票もありません。

| フィールド | 説明 |
|---|---|
| `id`、`created_at` | |
| `chat_id` | オープンなルームかチャンネル |
| `kind` | `text` か `link` |
| `body` | 書かれたままのメッセージ |
| `sender_name` | 送られたときの表示名 |
| `reply_to_id` | 返信先のメッセージ、または `null` |
| `edited_at` | 一度も編集されていなければ `null` |

絞り込み：`chat_id.eq`、`created_at.gte`、`created_at.lt`。並べ替え：`-created_at` か `created_at`。

```bash
curl -s "$ACHAT_API/messages?chat_id.eq=CHAT_ID&created_at.gte=2026-11-21T00:00:00Z" \
  -H "Authorization: Bearer $ACHAT_KEY"
```

## コミュニティ

メンバーになっているコミュニティ。`communities:read` による読み取りのみです：`id`、`name`、`about`、`topic`（`general`、`tech`、`gaming`、`study`、`creative`、`support`、`local`、`random`）、`join_mode`（`open` か `account`）、`member_count`、あなたの `role`（`owner`、`admin`、`member`）、`joined_at`。並べ替え：`name`（初期設定）か `-joined_at`。

```bash
curl -s "$ACHAT_API/communities" -H "Authorization: Bearer $ACHAT_KEY"
```

## チャンネル

あなたのコミュニティで見られるチャンネル。`communities:read` による読み取りのみです：`id`、`community_id`、`chat_id`（メッセージは[メッセージ](#messages)で読みます）、`name`、`topic`、`access`（`open` か `private`）、`position`。絞り込み：`community_id.eq`。並べ替え：`position`。

```bash
curl -s "$ACHAT_API/channels?community_id.eq=COMMUNITY_ID" -H "Authorization: Bearer $ACHAT_KEY"
```

## 接続したアプリからの削除

アクセスキーによる削除はすぐに行われ、`204` を返します。接続したアプリが求めた削除はすぐには行われず、`202` を返してあなたを待ちます。

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://achat.aoneahsan.com/developers/confirm/…",
    "expires_at": "2026-11-21T10:24:00.000Z"
  }
}
```

リンクを開いて何が消えるかを見て、10 分以内に AChat で「はい」か「いいえ」を伝えます。[削除はあなたを待ちます](./assistants.md#deletes-wait-for-you)をご覧ください。
