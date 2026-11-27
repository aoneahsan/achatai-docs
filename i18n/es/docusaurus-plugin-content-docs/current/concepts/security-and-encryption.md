---
sidebar_position: 2
title: Modelo de seguridad y cifrado
description: Qué cubre el cifrado de extremo a extremo de AChat y qué no, cómo encajan las claves, los dispositivos vinculados y la clave de recuperación, y los límites que ninguna app puede quitar.
keywords: [seguridad de AChat, modelo de cifrado de extremo a extremo, clave de recuperación, dispositivos vinculados, modelo de amenazas]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# Modelo de seguridad y cifrado

**AChat promete cifrado de extremo a extremo para chats personales, grupos privados y salas con contraseña. No lo promete para comunidades y sus canales, salas abiertas ni estados.**

## Qué significa aquí cifrado de extremo a extremo

- Los mensajes de esos chats solo se pueden leer en los dispositivos de las personas que están en ellos.
- AChat los guarda de una forma que ni sus servidores ni sus administradores pueden leer.
- AChat no guarda copia de las claves de tus mensajes, así que no puede leer ni recuperar tu historial.
- Las notificaciones push llevan el nombre del chat o de quien envía, nunca el texto del mensaje.
- La búsqueda solo mira los mensajes que ya están en tu dispositivo.
- Otras apps tampoco pueden leerlos. Una clave de acceso, un asistente de IA o un webhook ve el nombre y los miembros de un chat cifrado, nunca sus mensajes. Consulta [AChat para desarrolladores](/developers#what-other-apps-can-reach).

## Claves, dispositivos y recuperación

- **Los dispositivos vinculados** guardan cada uno tus claves. Aprobar un dispositivo le permite leer tus chats, con el historial, y enviar mensajes en tu nombre. Compara los códigos de seguridad para comprobar un vínculo.
- **Quitar un dispositivo** hace que dejen de llegarle mensajes nuevos y cierra su sesión. Lo que ya guardó se queda en él.
- **Los grupos reciben claves nuevas** cuando cambian sus miembros, así que quienes se fueron no pueden leer los mensajes nuevos.
- **La clave de recuperación** la guardas tú. Iniciar sesión con Google no basta para recuperar tu historial. Si pierdes la clave y todos tus dispositivos vinculados, nadie puede recuperarlo.

## Contraseñas de sala

Una sala con contraseña cifra sus mensajes en tu dispositivo usando esa contraseña. Demasiados intentos fallidos seguidos te hacen esperar antes de volver a probar. La contraseña que pones recibe consejos de seguridad comprobados en tu dispositivo.

## Historial de ubicación privado

En un chat personal, un grupo privado o una sala con contraseña, el [historial de dispositivo y ubicación](/features/location-history) tiene cifrado de extremo a extremo. Solo lo ven los miembros que escriben la contraseña de auditoría del chat (o la contraseña de la sala), y los administradores de AChat no pueden abrirlo.

## Lo que el cifrado no puede hacer

- **Quien lee un mensaje puede copiarlo.** La gente en un chat puede copiar, guardar o hacer captura de cualquier cosa, incluidos los mensajes temporales y de ver una vez mientras están abiertos. Borrarlos después no llega a esas copias.
- **Los chats abiertos son abiertos.** Cualquiera con el enlace de una sala abierta puede leerla. Las comunidades y sus canales no tienen cifrado de extremo a extremo.
- **Anónimo no es imposible de rastrear.** Tu dispositivo se conecta a los servidores de AChat como a cualquier sitio web, y los proveedores registran datos de conexión como tu dirección IP.
- **Un dispositivo perdido y desbloqueado es un riesgo.** Quien lo tenga puede abrir lo que hay guardado. [Privacidad en este dispositivo](/features/privacy-on-this-device) explica la pantalla de privacidad y Borrar de este dispositivo.
- **Lo que ya se vio no se puede recuperar.** Un cambio posterior de ajuste o de política no devuelve lo que se leyó, copió, guardó o exportó.

## Moderación y cifrado

Los moderadores de AChat ven un mensaje de un chat cifrado solo si alguien de ese chat lo denuncia y lo envía con la denuncia. Consulta [Supervisión de los admins](/concepts/admin-oversight).
