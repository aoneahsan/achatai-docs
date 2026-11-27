---
sidebar_position: 1
title: "AChat para desarrolladores"
description: "Accede a tu propia cuenta de AChat desde un script, un asistente de IA o tu servidor: una API con claves de acceso, una conexión de asistente para Claude y ChatGPT, webhooks firmados e inicio de sesión en dos pasos. Los chats cifrados nunca salen de AChat."
keywords: [API de AChat, MCP de AChat, webhooks de AChat, clave de acceso, conectar Claude a AChat, inicio de sesión en dos pasos de AChat]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# AChat para desarrolladores

**Se puede acceder a tu cuenta de AChat desde fuera de la app, tú mismo y con tus condiciones.** Un script puede publicar un estado o mantener al día tu lista de bloqueados, Claude puede decirte qué salas abiertas tuvieron mensajes nuevos, y tu servidor puede enterarse en el momento en que alguien te envía una solicitud de contacto. Todos los planes lo tienen, Free incluido, y cada vía llega a una sola cuenta: la tuya.

## ¿Cuál necesitas?

| Quieres | Usa |
|---|---|
| Que un script o servicio tuyo lea o cambie tu cuenta | Una [clave de acceso](./access-keys.md) y la [API](./api.md) |
| Que Claude, ChatGPT, Claude Code o Cursor trabajen con tu cuenta | Una [conexión de asistente](./assistants.md) |
| Que tu servidor se entere cuando algo cambia, sin preguntar cada minuto | [Webhooks](./webhooks.md) |
| Un código después de iniciar sesión con Google, para que una cuenta de Google robada no baste | [Inicio de sesión en dos pasos](./two-step-sign-in.md) |

Los cuatro están en la app: claves, apps conectadas y webhooks en **Cuenta › Otras apps**, el inicio de sesión en dos pasos en **Cuenta › Seguridad**.

## A qué pueden llegar otras apps {#what-other-apps-can-reach}

Una app solo entra con una clave que creaste o una conexión que aprobaste. En ambos casos se cumplen tres reglas.

| | Qué | Desde fuera de AChat |
|---|---|---|
| **Lo tuyo** | Tu perfil, tus ajustes, tus estados y tu lista de bloqueados | Leer y cambiar. Borrar es un permiso aparte, desactivado salvo que lo marques |
| **Compartido con otras personas** | Contactos, chats, mensajes en salas abiertas, comunidades y canales | Solo lectura. Ninguna app puede publicar, quitar ni invitar ahí |
| **Con cifrado de extremo a extremo** | Chats directos, grupos y salas con contraseña | Nunca. Una app ve el nombre del chat y que estás en él, nunca sus mensajes |

La última regla no es un ajuste. Los mensajes de tus chats directos, grupos y salas con contraseña están cerrados en tus dispositivos y los servidores de AChat no pueden leerlos, así que ninguna clave ni asistente puede. Lo mismo vale para las claves de tus dispositivos, tu clave de recuperación y tus códigos de dos pasos. Consulta [Seguridad y cifrado](/concepts/security-and-encryption).

## Lo que permite tu plan {#what-your-plan-allows}

| | Free | Pro | Team / Family |
|---|---|---|---|
| Claves de acceso a la vez | 5 | 25 | 50 |
| Solicitudes a la API y a asistentes al día | 5000 | 50.000 | 100.000 |
| Direcciones de webhook a la vez | 3 | 20 | 40 |
| Conexiones de asistente a la vez | 3 | 10 | 25 |

Estos son los valores predeterminados de hoy. El equipo de AChat fija las cifras de cada plan, así que **Cuenta › Otras apps › Uso según tu plan** muestra lo que te aplica, con el recuento de hoy. Las solicitudes se cuentan desde la medianoche UTC, sumando todas las claves y asistentes de la cuenta. Cada clave o conexión también está limitada a 120 solicitudes por minuto, en todos los planes, para que un script desbocado se detenga antes de gastarse el día.

## No hay feed de calendario

AChat no guarda nada con fecha que deba ir en un calendario, así que no hay feed de calendario al que suscribirse.

## Para máquinas

- OpenAPI 3.1: [`openapi.json`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.json)
- La misma referencia en Markdown: [`openapi.md`](https://vhkerwyxmhaxfyjbvsha.supabase.co/functions/v1/api/v1/openapi.md)
- Qué cambió, y cuándo: [Registro de cambios para desarrolladores](./changelog.md)
