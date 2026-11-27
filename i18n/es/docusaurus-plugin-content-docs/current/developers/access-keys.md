---
sidebar_position: 2
title: "Claves de acceso"
description: "Crea una clave de acceso de AChat en Cuenta › Otras apps, elige qué puede leer, cambiar o borrar, y cuándo deja de funcionar. Cuándo se puede volver a mostrar una clave, cómo sustituirla sin cortes y cómo quitarla."
keywords: [clave de acceso de AChat, achat_pat, clave de API, token de acceso personal, permisos de la clave, rotar clave]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# Claves de acceso

**Una clave de acceso deja que un script o servicio tuyo lea o cambie tu cuenta a través de la [API de AChat](./api.md).** Empieza por `achat_pat_`, actúa como tú y solo puede hacer lo que marcaste al crearla. Trata cada una como una contraseña.

## Crear una clave

1. Abre **Cuenta › Otras apps** y elige **Crear una clave de acceso**.
2. Ponle un nombre que reconozcas, como «Servidor de casa».
3. Marca lo que puede hacer (consulta [Permisos](#permissions)).
4. Elige cuándo deja de funcionar: 30, 90 o 365 días, o **Nunca**.
5. Elige **Crear clave**, cópiala y ponla donde se vaya a usar.

Crear una clave requiere haber iniciado sesión en los últimos 10 minutos. Con el [inicio de sesión en dos pasos](./two-step-sign-in.md) activado, ese inicio de sesión tiene que haber incluido el código; un navegador que se saltó el código porque le pediste que te recordara no cuenta. Si ha pasado más tiempo, AChat te pide que vuelvas a iniciar sesión y te devuelve directamente.

AChat te envía un correo cada vez que se crea una clave.

## Permisos {#permissions}

Cada tipo de dato tiene hasta tres casillas: **Leer**, **Cambiar** y **Borrar**. Cambiar incluye Leer. Borrar no incluye nada más y nunca se marca por ti.

| Dato | Leer | Cambiar | Borrar |
|---|---|---|---|
| Perfil: nombre de usuario, el nombre que ven los demás, color del avatar | `profile:read` | `profile:write` (nombre y color) | — |
| Ajustes: quién te ve en línea, confirmaciones de lectura, idioma, notificaciones | `preferences:read` | `preferences:write` | — |
| Estados | `status:read` | `status:write` (nuevos estados de texto) | `status:delete` |
| Personas bloqueadas | `blocks:read` | `blocks:write` (bloquear a alguien) | `blocks:delete` (desbloquear) |
| Contactos | `contacts:read` | — | — |
| Chats, y mensajes de salas abiertas y canales | `chats:read` | — | — |
| Comunidades y sus canales | `communities:read` | — | — |

Los contactos, los chats y las comunidades tienen otras personas, así que son de solo lectura marques lo que marques. Los chats directos, los grupos y las salas con contraseña muestran su nombre y sus miembros; sus mensajes nunca salen de AChat.

## Cuándo deja de funcionar una clave

- **30, 90 o 365 días** para cualquier clave.
- **Nunca**, solo para una clave que únicamente lee. Una clave que puede cambiar o borrar siempre caduca, y 365 días es lo máximo.

La fila de la clave en Otras apps muestra la fecha en que deja de funcionar y cuándo se usó por última vez.

## Volver a mostrar una clave

AChat puede volver a mostrar una clave durante 10 minutos después de iniciar sesión, con el código si el inicio de sesión en dos pasos está activado. Pasado ese tiempo, elige **Vuelve a iniciar sesión para mostrarla**. AChat muestra claves como mucho 10 veces por hora por cuenta. AChat solo guarda una copia sellada y una huella de un solo sentido, nunca la clave en texto plano.

## Sustituir una clave

**Sustituir** te da una clave nueva con el mismo nombre y los mismos permisos. La antigua sigue funcionando 24 horas, para que hagas el cambio sin cortes. Una clave que tenía fecha de fin recibe una nueva de 90 días; una clave de solo lectura con Nunca sigue sin caducar. Sustituir requiere el mismo inicio de sesión reciente que crear una clave, y AChat te envía un correo al respecto.

## Quitar una clave

**Quitar** detiene la clave al instante: todo lo que aún la use se rechaza desde su siguiente solicitud. No se puede deshacer, pero puedes crear una clave nueva.

## Cuántas claves

Tu plan fija cuántas claves puedes tener a la vez (5 en Free de forma predeterminada; la tabla completa está en [AChat para desarrolladores](./index.md#what-your-plan-allows)). Cuando estén todas en uso, quita una para crear otra.

## Quién no puede crear claves

Las sesiones de salas anónimas nunca son cuentas, así que no pueden crear claves, conectar apps ni añadir direcciones de webhook. A una cuenta suspendida, o cuya eliminación se ha pedido, se le rechazan todas las claves y conexiones.
