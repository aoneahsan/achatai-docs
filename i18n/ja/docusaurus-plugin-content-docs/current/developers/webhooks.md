---
sidebar_position: 5
title: "Webhook"
description: "AChat の Webhook：https のアドレスを追加し、イベントを選び、各配信の Standard Webhooks 署名を Node か Python で検証します。すべてのイベントとペイロード、再試行の予定、一時停止、アドレスがオフになる条件。"
keywords: [AChat Webhook, Standard Webhooks, Webhook の署名, webhook-signature の検証, HMAC-SHA256, 連絡先リクエストの Webhook]
last_update:
  date: 2026-11-21
  author: AChat チーム
---

# Webhook

**アカウントで何か変わると、AChat はあなたのサーバーに短い署名付きのメッセージを送ります。ツールは毎分問い合わせなくても反応できます。** 各イベントは何がいつ変わったかを ID で伝えます。メッセージの本文、名前など、守る必要のあるものは決して運びません。残りは、あなたのサーバーが[アクセスキー](./access-keys.md)で取りにいきます。

## アドレスを追加する

1. **アカウント › ほかのアプリ › Webhook** で **Webhook のアドレスを追加** を選びます。
2. アドレスを貼り付け、必要なら自分用のメモも書きます。
3. 受け取るイベントを選びます。
4. **アドレスを追加** を選び、署名用シークレット（`whsec_…`）をコピーします。

アドレスの追加には 10 分以内のログインが必要で、[2 段階ログイン](./two-step-sign-in.md)がオンならコードも必要です。アドレスが追加されると AChat からメールが届きます。

アドレスの条件：

- `https://` で始まること。AChat は平文の http では送りません。
- 標準ポート（443）か 8443 を使うこと。
- 名前やパスワードを含まないこと。代わりに署名を確認してください。
- インターネットから届くこと。プライベートネットワーク、このコンピューター、AChat 自身のドメインは拒否されます。

同時に持てるアドレスの数はプランで決まります（Free は初期設定で 3 つ。[プランで使える量](./index.md#what-your-plan-allows)を参照）。

## 配信の中身

JSON の本文と 3 つのヘッダーを持つ `POST` で、`AChat-Webhooks/1.0` として送られます：

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` はイベント、`timestamp` は起きた時刻、`data` には下に挙げた ID と時刻が入ります。`webhook-id` はイベントの ID で、再試行しても変わらないので、重複の見分けに使えます。

## イベント

| イベント | いつ | `data` |
|---|---|---|
| `profile.updated` | ユーザー名、名前、アバターの色、写真が変わった | `id`（あなたの） |
| `status.posted` | ステータスを投稿した | `id`、`created_at`、`expires_at` |
| `status.deleted` | あなたのステータスが削除された | `id` |
| `block.added` | 誰かをブロックした | `id`（相手の）、`created_at` |
| `block.removed` | 誰かのブロックを解除した | `id`（相手の） |
| `contact.added` | 連絡先が追加された | `id`（連絡先の）、`created_at` |
| `contact.removed` | 連絡先が削除された | `id`（連絡先の） |
| `contact_request.received` | 誰かから連絡先リクエストが届いた | `id`（リクエストした人）、`created_at` |
| `chat.joined` | チャットやルームに参加した | `id`（チャットの）、`joined_at` |
| `chat.left` | チャットやルームを出た、または外された | `id`（チャットの） |
| `message.created` | 参加しているオープンなルームやチャンネルにメッセージが届いた | `id`、`chat_id`、`created_at` |
| `webhook.test` | **テストイベントを送る** を選んだ | `message`：`"Test event"` |

`message.created` はオープンなルームとチャンネルのテキストとリンクのメッセージだけが対象です。個人チャット、グループ、パスワード付きのルームのメッセージは、AChat が読めないのでイベントになりません。各 `id` は [API](./api.md) の同じ ID のレコードに対応します。権限を持つキーで `/messages/{id}`、`/status/{id}`、`/contacts/{id}` を取得してください。

イベントが記録されるのは、あなたのアドレスのどれかが待ち受けているあいだだけです。先にアドレスを追加してください。アドレスができる前の変更があとから送られることはありません。

## 署名を検証する

すべての配信は [Standard Webhooks](https://www.standardwebhooks.com) で署名されています。`webhook-id`、ドット、`webhook-timestamp`、ドット、生の本文に対する HMAC-SHA256 で、鍵はシークレットのバイト列（`whsec_` 以降を base64 デコードしたもの）です。`webhook-signature` にはスペース区切りで 1 つ以上の `v1,<base64>` が入っていて、どれか 1 つが一致すれば受け入れます。タイムスタンプがあなたの時計と 5 分以上ずれているものは拒否してください。

**生の** 本文を、届いたとおりに検証します。JSON を解析してから直列化し直すとバイトが変わり、一致しなくなります。

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

Express では、このルートで本文を生のまま受け取ります：

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

Flask では `request.get_data()` と `request.headers` を渡します。自分で書きたくなければ、Standard Webhooks のライブラリならどれでも同じ確認ができます。

## すばやく応答する

10 秒以内に何らかの `2xx` を返し、処理はそのあとで行ってください。AChat はリダイレクトをたどりません。`410 Gone` を返すと AChat はそのアドレスをすぐオフにします。それ以外の応答や無応答は失敗として数えます。

## 再試行

失敗した配信は合計 8 回試みます。すぐに 1 回、そのあと前回から 5 秒、5 分、30 分、2 時間、5 時間、10 時間、10 時間後で、最初から最後まで 1 日と少しです。どの試みも同じ `webhook-id` を持ちます。

アドレスごとの **送信記録** には、すべての配信が試行回数とともに表示されます：送信済み、未送信、応答なし、またはサーバーが返したステータス。**もう一度送る** で同じ ID のまま再送します。イベントとその記録は 30 日間保存されます。

## 一時停止、オフ、オンに戻す

- **一時停止** すると、**再開** を選ぶまでイベントを飛ばします。停止中に起きたイベントはあとから送られません。
- 途切れずに 5 日間失敗し続けたアドレスは **失敗が続いたためオフ** になり、AChat がアドレス、最後の応答、失敗し始めた時刻をメールでお知らせします。**オンに戻す** を選ぶまで何も送られません。
- **アドレスを削除** するとすぐに送信が止まり、送信記録も一緒に消えます。

## 署名用シークレット

シークレットはアドレスを追加したときに 1 回表示され、ログイン後 10 分間（2 段階ログインがオンならコード付き）も **署名用シークレットを表示** で見られます。**シークレットを作り直す** と新しいシークレットができ、24 時間はどのイベントにもそれぞれのシークレットによる 2 つの署名が付くので、サーバーは取りこぼさずに切り替えられます。上の検証コードはどちらも受け入れます。
