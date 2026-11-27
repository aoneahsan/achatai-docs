---
sidebar_position: 17
title: Historial de dispositivo y ubicación
description: Algunos chats de AChat registran el historial de dispositivo y ubicación. Qué se registra, quién puede verlo, cuánto tiempo se guarda y cómo pregunta el chat antes de que entres.
keywords: [historial de ubicación del chat, registro de auditoría del chat, consentimiento de ubicación, ubicación en AChat]
last_update:
  date: 2026-09-28
  author: Equipo de AChat
---

# Historial de dispositivo y ubicación

**Un chat puede activar el historial de dispositivo y ubicación. Antes de que entres, muestra qué registra y quién puede verlo. Si dices que no, el chat sigue cerrado.** Tus otros chats no se ven afectados.

## Qué se registra

El chat registra una muestra cuando entras, cada 5 minutos mientras está abierto y cada vez que vuelves a él. Cada registro incluye:

- tu ubicación precisa, y la precisión que indica tu dispositivo
- la fecha y la hora
- un ID de dispositivo que solo se usa en ese chat
- tu navegador y sistema operativo, y tu idioma y zona horaria

El historial nunca muestra tu dirección IP ni un ID que te vincule entre chats. Es tu dispositivo el que informa de la ubicación, así que la posición real puede estar más lejos.

## Quién puede verlo

| Chat | Quién ve los registros |
|---|---|
| Chat público | Cualquiera que pueda abrir el chat, ahora o más adelante. Puede copiar lo que ve |
| Chat personal o grupo privado | Solo los miembros que introducen la **contraseña de auditoría** del chat. Los registros tienen cifrado de extremo a extremo; los administradores de AChat no pueden abrirlos |
| Sala con contraseña | Solo los miembros que introducen la contraseña de la sala, con el mismo cifrado de extremo a extremo |

Si todos en un chat olvidan su contraseña de auditoría, el historial de ubicación privado de ese chat se pierde para siempre.

## Cuánto tiempo se guarda

Mientras exista el chat. Los registros solo terminan cuando el chat se borra definitivamente de la Papelera o caduca. Desactivar el historial detiene los registros nuevos; no borra los anteriores.

## Edad

Estos chats son para personas que declaran tener al menos una edad mínima, que el chat muestra antes de que entres. AChat no comprueba la declaración.

## Límites

- Un chat con el historial de ubicación activado necesita conexión para abrirse.
- No se puede abrir dentro del [widget](/features/embeddable-widget) de otra web; ábrelo en AChat.
- Si tu navegador pausa la pestaña, el registro también se pausa, y el chat pide un registro nuevo cuando vuelves.
- Salir del chat detiene los registros nuevos. Los anteriores se quedan.
- Activar el historial cierra el chat para todos, tú incluido, hasta que cada persona acepte y comparta su ubicación.
