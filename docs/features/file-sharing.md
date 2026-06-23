---
sidebar_position: 3
title: File sharing
description: Share files in AChat up to 10 MB each and 100 MB per chat, stored on FilesHub, with image previews, a lightbox, and a multi-file upload queue.
keywords: [anonymous file sharing, share files in chat, temporary file sharing, FilesHub, ephemeral file upload]
last_update:
  date: 2026-06-23
  author: Ahsan Mahmood
---

# File sharing

**AChat lets you share files inside any chat — up to 10 MB per file and 100 MB total per chat — with image previews, a full-screen lightbox, and a multi-file upload queue.** Files follow the same 10-day auto-delete lifecycle as messages.

## Limits

| Limit | Value |
|---|---|
| Max size per file | 10 MB |
| Max total per chat | 100 MB |
| Storage backend | FilesHub (public visibility) |
| Lifetime | Auto-deletes ~10 days after upload |

When a chat reaches the 100 MB cap, new uploads are blocked until older files expire.

## How uploading works

- **Attach or drag in** one or more files. AChat queues them and uploads them to FilesHub.
- **Images** get an inline preview and open in a **lightbox** when tapped.
- **In threads**, you can attach files to a reply, not just the top-level conversation.
- A small **upload queue** UI shows progress for multiple files at once.

## Where the bytes live

Files are stored on **FilesHub**, AChat's free-tier file backend, with public visibility (so previews load without an API key in the browser). AChat stores a reference to the file on the message/file document in Firestore.

## Privacy & honest limits

- **File bytes are not encrypted at rest.** On passworded chats, AChat encrypts the file's URL and metadata, but the contents on FilesHub are not encrypted. Do not upload anything you would not want a holder of the raw URL to see.
- **Open chats expose files to anyone with the chat ID.**
- **Cleanup is lazy.** Firestore TTL removes the file *document* on schedule; the FilesHub object is cleaned up lazily when the chat is next loaded, so a file in a room nobody revisits can linger past the nominal window.

## Related

- [Passwords & encryption](/features/passwords-and-encryption)
- [Data, privacy & deletion](/concepts/data-privacy-and-deletion)
