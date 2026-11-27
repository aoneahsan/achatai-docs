---
sidebar_position: 4
title: Contraseñas y cifrado
description: 'Qué chats de AChat tienen cifrado de extremo a extremo, qué protege la contraseña de una sala, y los límites: las salas abiertas, las comunidades y los estados no tienen cifrado de extremo a extremo.'
keywords: ['chat con cifrado de extremo a extremo', 'contraseña de sala', 'chat de grupo cifrado', 'cifrado de AChat']
last_update:
  date: 2026-10-01
  author: Equipo de AChat
---

# Contraseñas y cifrado

**Los chats personales, los grupos privados y sus archivos tienen cifrado de extremo a extremo, así que cada mensaje solo se puede leer en los dispositivos de las personas que están en ellos.** Una sala con contraseña cifra sus mensajes en tu dispositivo, usando esa contraseña.

## Qué está cifrado

| Chat | ¿Cifrado de extremo a extremo? |
|---|---|
| Chats personales | Sí, con sus archivos |
| Grupos privados | Sí, con sus archivos |
| Salas anónimas con contraseña | Sí, cifradas con la contraseña de la sala |
| Salas anónimas abiertas | No. Cualquiera con el enlace puede leerlas |
| Comunidades y sus canales | No |
| Estados | No. Los servidores de AChat pueden leerlos; unas reglas de acceso limitan quién más ve cada uno |

AChat guarda los mensajes con cifrado de extremo a extremo de forma que ni sus servidores ni sus administradores pueden leerlos. AChat no guarda una copia de las claves de tus mensajes.

## Contraseñas de sala

- Todo el mundo necesita la contraseña para entrar en la sala y leerla.
- Envía la contraseña por separado del enlace.
- Demasiados intentos fallidos seguidos te hacen esperar unos minutos antes de volver a intentarlo.
- Las contraseñas nuevas muestran un indicador de seguridad. Se comprueba en tu dispositivo, y la contraseña no se envía a ningún sitio para comprobarla.

## Grupos y cambios de miembros

Cuando cambian los miembros de un grupo, el grupo recibe claves de seguridad nuevas, así que quienes se fueron no pueden leer los mensajes nuevos. Quienes se unen ven los mensajes enviados después de unirse; los anteriores no se comparten automáticamente.

## Comprobar un dispositivo vinculado

En **Cuenta**, luego **Dispositivos**, puedes comparar los códigos de seguridad entre dos de tus dispositivos. Si no coinciden, quita el dispositivo del que no te fíes. Consulta [Dispositivos y clave de recuperación](/features/devices-and-recovery).

## Los límites

- Cualquiera en un chat puede copiar, guardar o hacer una captura de un mensaje. El cifrado protege los mensajes por el camino y en el servidor, no después de que alguien los haya leído.
- La búsqueda solo mira los mensajes que ya están en tu dispositivo.
- Las notificaciones push nunca incluyen el texto del mensaje.
- Perder tu clave de recuperación y todos los dispositivos vinculados significa que tu historial no se puede restaurar, ni por ti ni por el equipo de AChat.

El modelo completo está en [Seguridad y cifrado](/concepts/security-and-encryption).
