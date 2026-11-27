---
sidebar_position: 4
title: "Conectar Claude, ChatGPT, Claude Code o Cursor"
description: "Conecta un asistente de IA a tu cuenta de AChat mediante la dirección MCP de AChat. Configuración para Claude, ChatGPT, Claude Code y Cursor, lo que apruebas, por qué un borrado siempre espera tu sí y cómo desconectar."
keywords: [MCP de AChat, conectar Claude a AChat, conector de AChat para ChatGPT, Claude Code MCP, Cursor MCP, app de chat con asistente de IA]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# Conectar Claude, ChatGPT, Claude Code o Cursor

**Pega la dirección de asistente de AChat en tu asistente, apruébalo en AChat y podrá leer tu cuenta y cambiar lo que es tuyo.** Solo ve lo que marques al aprobarlo. Nunca puede leer un mensaje con cifrado de extremo a extremo, y nunca puede borrar nada sin que digas que sí en AChat.

Dirección de asistente de AChat:

```text
https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
```

Es un servidor MCP remoto sobre Streamable HTTP. También la encontrarás, con un botón **Copiar**, en **Cuenta › Otras apps › Conectar un asistente**.

## Claude

1. En Claude, abre **Settings** y luego **Connectors**.
2. Elige **Add custom connector** y pega la dirección de AChat.
3. Claude abre AChat. Revisa lo que pide y apruébalo.

## ChatGPT

1. En ChatGPT, abre **Settings** y luego **Apps and Connectors**, y activa el modo desarrollador.
2. Elige **Create**, llámalo AChat y pega la dirección.
3. ChatGPT abre AChat. Revisa lo que pide y apruébalo.

## Claude Code

1. En una terminal, ejecuta:

   ```bash
   claude mcp add --transport http achat https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp
   ```

2. Ejecuta `/mcp` en Claude Code y elige **achat**.
3. Tu navegador abre AChat. Revisa lo que pide y apruébalo.

## Cursor

1. En Cursor, abre **Settings**, luego **MCP** y luego **Add new MCP server**.
2. Pega esto en `mcp.json`:

   ```json
   { "mcpServers": { "achat": { "url": "https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/mcp" } } }
   ```

3. Cursor abre AChat. Revisa lo que pide y apruébalo.

Otros clientes MCP compatibles con OAuth funcionan igual: a un cliente sin token, la dirección le responde dónde iniciar sesión, y el cliente se registra solo.

## Lo que apruebas

La página de consentimiento de AChat nombra la app, la dirección a la que te devuelve y cada permiso que pide, con las mismas casillas Leer, Cambiar y Borrar que una [clave de acceso](./access-keys.md#permissions). Los datos compartidos siguen siendo de solo lectura pida lo que pida, y un permiso que AChat no ofrece se quita de la solicitud. No se comparte nada hasta que eliges **Aprobar**.

- Una app que «se registró sola en AChat»: AChat no ha comprobado quién la gestiona, así que lee lo que pide.
- Si la conexión puede cambiar cosas, aprobarla requiere haber iniciado sesión en los últimos 10 minutos, y también el código cuando el [inicio de sesión en dos pasos](./two-step-sign-in.md) está activado.
- Puedes ponerle un nombre a la conexión, para distinguir dos después.

AChat te envía un correo cuando se conecta una app. Tu plan fija cuántas puede haber conectadas a la vez (3 en Free de forma predeterminada; consulta [lo que permite tu plan](./index.md#what-your-plan-allows)). Las llamadas del asistente cuentan en la misma cuota diaria de solicitudes que la API.

## Lo que puede hacer un asistente

Cada herramienta necesita el permiso que tiene al lado, y la lista de herramientas del asistente muestra solo las que tu aprobación permite ahora mismo.

| Herramientas | Permiso |
|---|---|
| `list_profile`, `get_profile`, `update_profile` | `profile:read`, `profile:write` |
| `list_preferences`, `get_preferences`, `update_preferences` | `preferences:read`, `preferences:write` |
| `list_status`, `get_status`, `create_status`, `prepare_delete_status` | `status:read`, `status:write`, `status:delete` |
| `list_blocks`, `get_blocks`, `create_blocks`, `prepare_delete_blocks` | `blocks:read`, `blocks:write`, `blocks:delete` |
| `list_contacts`, `get_contacts` | `contacts:read` |
| `list_chats`, `get_chats`, `list_messages`, `get_messages` | `chats:read` |
| `list_communities`, `get_communities`, `list_channels`, `get_channels` | `communities:read` |

Los campos son los de la API; consulta [La API de AChat](./api.md). Las listas devuelven hasta 50 registros por llamada, con un cursor para la página siguiente. Los mensajes solo vienen de salas abiertas y canales. Un chat directo, un grupo o una sala con contraseña muestran su nombre y sus miembros, nunca lo que se dijo.

## Los borrados te esperan {#deletes-wait-for-you}

Un asistente nunca borra. Cuando le pides quitar un estado o desbloquear a alguien, llama a `prepare_delete_status` o `prepare_delete_blocks`, y AChat responde con un enlace a `https://achat.aoneahsan.com/developers/confirm/…`.

1. Abre el enlace. AChat muestra lo que pidió el asistente y lo que se va con ello.
2. Elige **Borrarlo** (o **Desbloquear**), o **Conservarlo**. Estás en AChat, no en el asistente, así que no puede pulsar estos botones.
3. El asistente solo se entera de que la solicitud terminó.

La solicitud caduca a los 10 minutos y no se borra nada. Confirmar requiere haber iniciado sesión en los últimos 10 minutos, con el código si el inicio de sesión en dos pasos está activado. Los borrados que siguen esperando aparecen en **Cuenta › Otras apps › Apps conectadas**. Una [clave de acceso](./access-keys.md) con permiso de Borrar borra al momento, porque eres tú quien la ejecuta.

## Desconectar

En **Cuenta › Otras apps › Apps conectadas**, elige **Quitar** en la conexión. Pierde el acceso al instante, incluida cualquier solicitud a medias. Para volver a usarla, conéctala de nuevo. **Cambiar nombre** solo cambia el nombre que ves.

## Lo que no alcanzan los asistentes

- Los mensajes de chats directos, grupos y salas con contraseña, que ni el propio AChat puede leer.
- Las claves de tus dispositivos, tu clave de recuperación, tus códigos de dos pasos, tus claves de acceso y tus secretos de webhook.
- Tu foto, adjuntos, reacciones y encuestas.
- Cualquier cosa de otra cuenta.

El texto que un asistente lee de AChat (un estado, un mensaje de una sala abierta) se le devuelve como datos. Trata las palabras escritas por otras personas como palabras suyas, no como instrucciones para tu asistente.
