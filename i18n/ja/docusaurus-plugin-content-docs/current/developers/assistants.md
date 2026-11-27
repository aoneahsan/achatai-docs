---
sidebar_position: 4
title: "Claude、ChatGPT、Claude Code、Cursor を接続"
description: "AChat の MCP アドレスを通じて AI アシスタントを AChat アカウントに接続します。Claude、ChatGPT、Claude Code、Cursor の設定、承認する内容、削除がいつもあなたの承認を待つ理由、接続の解除。"
keywords: [AChat MCP, Claude を AChat に接続, AChat ChatGPT コネクタ, Claude Code MCP, Cursor MCP, AI アシスタント チャットアプリ]
last_update:
  date: 2026-11-21
  author: AChat チーム
---

# Claude、ChatGPT、Claude Code、Cursor を接続

**AChat のアシスタント用アドレスをアシスタントに貼り付け、AChat で承認すれば、アカウントを読んだり、あなたのものを変えたりできるようになります。** 見えるのは承認時にチェックしたものだけです。エンドツーエンド暗号化されたメッセージは決して読めず、AChat であなたが「はい」と言わないかぎり何も削除できません。

AChat のアシスタント用アドレス：

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

Streamable HTTP のリモート MCP サーバーです。**アカウント › ほかのアプリ › アシスタントを接続** にも、**コピー** ボタン付きで載っています。

## Claude

1. Claude で **Settings**、次に **Connectors** を開きます。
2. **Add custom connector** を選び、AChat のアドレスを貼り付けます。
3. Claude が AChat を開きます。求められている内容を確認して承認します。

## ChatGPT

1. ChatGPT で **Settings**、次に **Apps and Connectors** を開き、開発者モードをオンにします。
2. **Create** を選び、名前を AChat にしてアドレスを貼り付けます。
3. ChatGPT が AChat を開きます。求められている内容を確認して承認します。

## Claude Code

1. ターミナルで次を実行します：

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. Claude Code で `/mcp` を実行し、**achat** を選びます。
3. ブラウザで AChat が開きます。求められている内容を確認して承認します。

## Cursor

1. Cursor で **Settings**、**MCP**、**Add new MCP server** の順に開きます。
2. `mcp.json` に次を貼り付けます：

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor が AChat を開きます。求められている内容を確認して承認します。

OAuth に対応するほかの MCP クライアントも同じです。トークンを持たないクライアントにはアドレスがログイン先を返し、クライアントが自分で登録します。

## 承認する内容

AChat の同意ページには、アプリの名前、あなたを戻すアドレス、求めている権限がそれぞれ、[アクセスキー](./access-keys.md#permissions)と同じ読み取り、変更、削除のチェックで示されます。何を求められても共有データは読み取りのみで、AChat が提供しない権限はリクエストから外されます。**承認** を選ぶまで、何も共有されません。

- 「AChat に自分で登録した」アプリは、運営者を AChat が確認していません。何を求めているかよく読んでください。
- 変更ができる接続なら、承認には 10 分以内のログインが必要で、[2 段階ログイン](./two-step-sign-in.md)がオンならコードも必要です。
- 接続に名前を付けられるので、あとで 2 つを見分けられます。

アプリが接続されると AChat からメールが届きます。同時に接続できる数はプランで決まります（Free は初期設定で 3 つ。[プランで使える量](./index.md#what-your-plan-allows)を参照）。アシスタントの呼び出しは API と同じ 1 日のリクエスト量に数えられます。

## アシスタントにできること

それぞれのツールには横に書いた権限が必要で、アシスタントのツール一覧には、今の承認で使えるツールだけが表示されます。

| ツール | 権限 |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

フィールドは API と同じです。[AChat API](./api.md) をご覧ください。一覧は 1 回の呼び出しで最大 50 件を返し、次のページ用のカーソルが付きます。メッセージはオープンなルームとチャンネルからだけです。個人チャット、グループ、パスワード付きのルームは名前とメンバーが見えるだけで、話した内容は見えません。

## 削除はあなたを待ちます {#deletes-wait-for-you}

アシスタントが削除することはありません。ステータスの投稿を消したり誰かのブロックを解除したりを頼むと、`prepare_delete_status` か `prepare_delete_blocks` を呼び出し、AChat は `https://achat.aoneahsan.com/developers/confirm/…` へのリンクを返します。

1. リンクを開きます。アシスタントが何を求めたか、それに伴って何が消えるかを AChat が表示します。
2. **削除する**（または **ブロックを解除**）か **残す** を選びます。ここは AChat の中で、アシスタントの中ではないので、アシスタントにはこのボタンを押せません。
3. アシスタントにわかるのは、リクエストが終わったことだけです。

リクエストは 10 分で期限が切れ、何も削除されません。確認には 10 分以内のログインが必要で、2 段階ログインがオンならコードも必要です。待っている削除は **アカウント › ほかのアプリ › 接続中のアプリ** に並びます。削除の権限を持つ[アクセスキー](./access-keys.md)はすぐに削除します。動かしているのはあなた自身だからです。

## 接続を解除する

**アカウント › ほかのアプリ › 接続中のアプリ** で、その接続の **削除** を選びます。進行中のリクエストも含めて、すぐにアクセスできなくなります。また使うには、もう一度接続してください。**名前を変更** は見える名前を変えるだけです。

## アシスタントが届かないもの

- 個人チャット、グループ、パスワード付きのルームのメッセージ。AChat 自体も読めません。
- 端末の鍵、復元キー、2 段階のコード、アクセスキー、Webhook のシークレット。
- 写真、添付ファイル、リアクション、投票。
- ほかのアカウントのものすべて。

アシスタントが AChat から読む文章（ステータスの投稿、オープンなルームのメッセージ）は、データとして渡されます。ほかの人が書いた言葉はその人の言葉であって、あなたのアシスタントへの指示ではありません。
