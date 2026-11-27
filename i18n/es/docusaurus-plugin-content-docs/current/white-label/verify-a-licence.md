---
sidebar_position: 5
title: "Verificar una licencia"
description: "Cómo comprobar, por clave de licencia o por dominio, si una copia de AChat que funciona con otro nombre tiene licencia, y qué significa cada respuesta."
keywords: [verificar licencia de AChat, comprobar licencia de marca blanca, comprobar clave de licencia]
last_update:
  date: 2026-11-13
  author: Equipo de AChat
---

# Verificar una licencia

**Cualquiera puede comprobar una copia de AChat que funciona con otro nombre.** Abre [Verificar una licencia](https://achat.aoneahsan.com/es/verify-license) y escribe la clave de licencia de la copia o su dominio. La verificación la hace nuestro servicio de licencias.

## Por dominio

Cada copia con licencia sirve un archivo de licencia en su propio dominio, bajo `/.well-known/`. La comprobación por dominio lee ese archivo y comprueba la clave que indica.

| Respuesta | Qué significa |
|---|---|
| Licencia activa | El archivo indica una licencia para este dominio, y está activa |
| Otro dominio | El archivo indica una licencia emitida para otro dominio |
| No es una licencia válida | El archivo indica una licencia que no existe |
| Sin archivo de licencia | El dominio no sirve ninguno |
| No respondió | No se pudo llegar al dominio |

## Por clave

La comprobación por clave responde si la licencia está activa, todavía en configuración o revocada, y muestra sus datos públicos: a quién se concedió, sus dominios, plataformas y fechas. Nunca muestra un correo ni un precio.

## Una copia cuya licencia no está activa

Muestra "Esta licencia no está activa" en lugar de la app, con un enlace a esta comprobación. No se borra nada de ella.
