---
sidebar_position: 7
title: "Registro de cambios para desarrolladores"
description: "Cambios en la API de AChat, la conexión con asistentes, los webhooks y el inicio de sesión en dos pasos, del más nuevo al más antiguo, desde la plataforma abierta del 2026-11-21."
keywords: [registro de cambios de la API de AChat, cambios para desarrolladores de AChat, cambios en el MCP de AChat]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# Registro de cambios para desarrolladores

Cambios en la API, la conexión con asistentes, los webhooks y el inicio de sesión en dos pasos, del más nuevo al más antiguo. La API es `v1`.

## La plataforma abierta (2026-11-21)

- **[La API de AChat](./api.md)** en `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1`, con [claves de acceso](./access-keys.md) (`achat_pat_…`) creadas en Cuenta › Otras apps. Tu perfil, tus ajustes, tus estados (texto) y tu lista de bloqueados se pueden leer y cambiar; los contactos, los chats, los mensajes de salas abiertas, las comunidades y los canales son de solo lectura. Hay un documento OpenAPI 3.1 en `/openapi.json`.
- **[Conexión con asistentes](./assistants.md)** en `https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp` para Claude, ChatGPT, Claude Code y Cursor. Apruebas cada uno en AChat, y un borrado hecho por un asistente espera tu sí en `/developers/confirm`.
- **[Webhooks](./webhooks.md)** para once eventos, firmados con Standard Webhooks, que llevan solo IDs y horas.
- **[Inicio de sesión en dos pasos](./two-step-sign-in.md)** con una app de autenticación, diez códigos de recuperación y la opción de recordar el navegador 7 días. Obligatorio para las cuentas que manejan las pantallas de admin de AChat.
- Los chats con cifrado de extremo a extremo quedan fuera de todo esto: las apps externas ven el nombre y los miembros de un chat, nunca sus mensajes.
- Sin feed de calendario: AChat no tiene nada con fecha que poner en uno.
