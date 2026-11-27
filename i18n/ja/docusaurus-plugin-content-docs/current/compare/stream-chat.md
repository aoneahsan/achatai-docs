---
sidebar_position: 17
title: Stream Chat から AChat へ
description: Stream Chat は開発者が自分のアプリにチャットを組み込むためのもので、月間アクティブユーザー 1,000 人まで無料。AChat は開発者なしで貼るだけのスニペットです。2026-11-22 確認。
last_update:
  date: 2026-11-22
  author: AChat チーム
---

# Stream Chat から AChat へ

**Stream Chat は開発者がアプリに組み込むためのチャットで、月間アクティブユーザー 1,000 人まで無料です。** 開発者が自社製品にチャットを組み込み、すべての部分を管理したいなら、Stream は合った種類の道具です。AChat は逆の取引です。スニペットを貼れば動くチャットがあり、開発者は関わりません。

2026-11-22 確認。並べた比較は [AChat と Stream Chat](https://achat.aoneahsan.com/ja/compare/stream-chat) にあります。

## SDK が仕事に対して大きすぎたとき

チームが、結局 1 ページの公開ルーム 1 つのためにチャット SDK を採用することがあります。今がそうなら、スプリント 1 回分ではなく数分で済みます。

1. チャットが自社のユーザーやデータと結びついている場所には、Stream を残します。AChat のウィジェットは開発者向け SDK ではないので、自社のユーザーアカウントの上には載りません。
2. 公開ルームについては、[ウィジェットのページ](https://achat.aoneahsan.com/ja/widget)を開き、ルーム ID かコミュニティの公開チャンネルを選びます（[埋め込みウィジェット](/features/embeddable-widget)）。
3. レイアウトとオプションを選ぶと、ウィジェットのページがコードを書いてくれます。
4. スニペットをページのテンプレートにコピーします。
5. 誰かがルームを保持したら、表示を許可するドメインを最大 20 件まで登録できます。

## Stream の料金ページから

Stream の料金ページは、期限のない無料プランを明記しています。確認したページには、ページに置ける既製のチャットがあるか、自分のサーバーで運用できるかは書かれていなかったので、その行は省いています。

| 機能 | AChat | Stream Chat |
|---|---|---|
| 期限のない無料プラン | はい | はい（<a href="https://getstream.io/chat/pricing/" target="_blank" rel="noopener noreferrer nofollow">先方のページ</a>） |

AChat のウィジェットは既製のルームで、ホスト型のみです。開発者向け SDK ではなく、パスワードがなければページにいる誰でもルームを読めます。

| プラン | 料金 | 出典 |
|---|---|---|
| Build | 無料 | <a href="https://getstream.io/chat/pricing/" target="_blank" rel="noopener noreferrer nofollow">先方のページ</a> |
| Start | 月 $399（年払い） | <a href="https://getstream.io/chat/pricing/" target="_blank" rel="noopener noreferrer nofollow">先方のページ</a> |
| Start | 月 $499（月払い） | <a href="https://getstream.io/chat/pricing/" target="_blank" rel="noopener noreferrer nofollow">先方のページ</a> |
| Elevate | 月 $599（年払い） | <a href="https://getstream.io/chat/pricing/" target="_blank" rel="noopener noreferrer nofollow">先方のページ</a> |
| Elevate | 月 $675（月払い） | <a href="https://getstream.io/chat/pricing/" target="_blank" rel="noopener noreferrer nofollow">先方のページ</a> |

AChat の料金は[料金のページ](https://achat.aoneahsan.com/ja/pricing)にあります。Stream は <a href="https://getstream.io/chat/" target="_blank" rel="noopener noreferrer nofollow">Stream Chat のサイト</a> でご確認ください。
