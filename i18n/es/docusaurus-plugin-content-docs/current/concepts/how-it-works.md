---
sidebar_position: 1
title: Cómo funciona AChat
description: Las dos identidades en AChat —una cuenta y un nombre visible anónimo—, qué tipos de chat existen, dónde viven los mensajes y cuánto se guarda cada cosa.
keywords: [cómo funciona AChat, chat anónimo o con cuenta, tiempo de guardado de chats, búsqueda en el dispositivo, mensajes sin conexión]
last_update:
  date: 2026-11-27
  author: Equipo de AChat
---

# Cómo funciona AChat

**En AChat hay dos formas de estar en un chat: una cuenta (inicio de sesión con Google y un nombre de usuario) o, en las salas anónimas, un nombre visible sin cuenta.** Las dos nunca se vinculan: si además tienes cuenta, AChat no conecta con ella tus mensajes anónimos.

## Tipos de chat

| Chat | Quién está | Necesita cuenta | Cifrado de extremo a extremo |
|---|---|---|---|
| Chat personal | Tú y un contacto | Sí | Sí |
| Grupo privado | Contactos que invitas, o personas que aprueba un admin | Sí | Sí |
| Sala anónima | Cualquiera con el enlace (y la contraseña, si hay) | No | Solo con contraseña |
| Canal de comunidad | Miembros de la comunidad | Depende de la comunidad | No |
| Estado | Tus contactos aceptados | Sí | No |

## Dónde viven los mensajes

- **En los servidores de AChat:** los mensajes de cada chat, para que cada dispositivo pueda traerlos. Los mensajes con cifrado de extremo a extremo se guardan de una forma que ni los servidores ni los administradores de AChat pueden leer.
- **En tus dispositivos:** los chats y archivos que abriste, para que carguen rápido y se abran sin conexión, más una bandeja de salida con los mensajes que esperan enviarse. La búsqueda funciona aquí, sobre lo que tiene el dispositivo.
- **Tus claves:** en tus dispositivos vinculados, y recuperables con tu clave de recuperación. AChat no guarda copia.

## Cuánto dura cada cosa

| Qué | Cuánto |
|---|---|
| Chats personales y grupos | Hasta que alguien los borre, salvo que el chat use mensajes temporales (1 minuto, 1 hora o 1 día) |
| Mensajes de salas anónimas | Un número fijo de días después de enviar cada uno (10 de forma predeterminada), o hasta la fecha de guardado si alguien guarda la sala |
| Papelera | Un número fijo de días (30 de forma predeterminada), nunca más que el historial del propio chat |
| Estados | 24 horas |
| Historial de ubicación | Hasta que el chat se borre para siempre de la Papelera o caduque |

La [página de privacidad](https://achat.aoneahsan.com/es/privacy) lista todo lo demás, y [Datos, privacidad y eliminación](/concepts/data-privacy-and-deletion) lo resume.

## Cómo se envía un mensaje

1. Lo escribes. Primero entra en la bandeja de salida, así que sobrevive a una caída de conexión o a recargar la página.
2. AChat lo envía y reintenta hasta que lo aceptan, sin enviarlo dos veces.
3. La etiqueta de debajo pasa de **Enviando** (o **Esperando para enviar** sin conexión) a **Enviado** cuando ya llegó.

## Plataformas

El mismo AChat funciona en el navegador y en Android, en once idiomas. No hay llamadas de voz ni de video.
