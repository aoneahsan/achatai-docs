---
sidebar_position: 95
title: Registro de cambios
description: 'El historial de versiones de AChat: la reconstrucción que añade chats personales, grupos, comunidades y estados, y las versiones anteriores del chat anónimo.'
keywords: ['registro de cambios de AChat', 'notas de versión', 'historial de versiones']
last_update:
  date: 2026-11-27
  author: Equipo de AChat
---

# Registro de cambios

Las [notas de versión](https://achat.aoneahsan.com/es/feed) de la app son la referencia, con la fecha en que salió cada cambio. Las entradas más antiguas de aquí describen AChat tal como era entonces.

## Once idiomas (2026-11-27)

- **Seis idiomas más:** chino, hindi, portugués (Brasil), ruso, japonés y urdu se suman al inglés, español, francés, alemán y árabe, en la app, sus páginas públicas, sus correos y esta documentación. El urdu se lee de derecha a izquierda, en nastaliq.
- **Cada página pública tiene su propia dirección en cada idioma**, como `/ja/about`, y el idioma elegido se mantiene en la siguiente visita.
- **Traducir** en **Ayuda con el borrador** ofrece los once.

## Otras apps, asistentes e inicio de sesión en dos pasos (2026-11-21)

- **Accede a tu propia cuenta desde fuera de AChat:** una API con claves de acceso, una conexión para Claude, ChatGPT, Claude Code y Cursor, y webhooks firmados, todo en Cuenta › Otras apps. Tu perfil, tus ajustes, tus estados y tu lista de bloqueados se pueden cambiar; los contactos, los chats y las comunidades son de solo lectura. Consulta [AChat para desarrolladores](./developers/index.md).
- **Los chats con cifrado de extremo a extremo quedan fuera:** las apps externas ven el nombre y los miembros de un chat, nunca sus mensajes. Un borrado hecho por un asistente espera tu sí en AChat.
- **Inicio de sesión en dos pasos:** un código de una app de autenticación después de Google, diez códigos de recuperación y la opción de recordar el navegador 7 días. Consulta [Inicio de sesión en dos pasos](./developers/two-step-sign-in.md).

## Pagos de marca blanca y la regalía de la compra (2026-11-14)

- **Las licencias, compras y renovaciones se pagan por transferencia bancaria de Wise.** El equipo de AChat confirma la transferencia y luego la clave de licencia llega por correo.
- **La compra ahora lleva una regalía:** el 7% de los ingresos brutos de AChat, pagado cada trimestre con un informe de ingresos, mientras genere ingresos. Consulta [Preguntas sobre la marca blanca](./white-label/faq.md).

## Licencias de marca blanca y compra del código (2026-11-13)

- **Usa AChat con tu propio nombre:** el equipo de AChat lo aloja en tu dominio con tu nombre, logotipo y colores, en la web y en Android, con iOS bajo pedido. Consulta [Marca blanca y licencias](./white-label/index.md).
- **O cómpralo de una vez:** el código fuente de todos los repositorios que generan la app web y la de Android, tras lo cual AChat deja de venderse.
- **Comprueba la licencia de cualquier copia** por clave o por dominio en [Verificar una licencia](https://achat.aoneahsan.com/es/verify-license).

## Archivar mensajes y respuestas (2026-10-30)

- **Archiva un mensaje o una respuesta** desde su menú. El tuyo queda oculto para todos hasta que lo desarchives; el de otra persona, solo para ti. Un mensaje principal se lleva su hilo, salvo las respuestas de otras personas a tu mensaje, que se quedan bajo «Mensaje archivado».
- **Selecciona** varios mensajes, respuestas o chats y archívalos o desarchívalos a la vez. La barra dice quién deja de verlos antes de que pulses «Archivar».
- **Chats archivados**, **Mensajes archivados** y **Respuestas archivadas** tienen cada uno su vista. Archivar no fija una caducidad propia, y solo tú puedes desarchivar lo que archivaste. Consulta [Gestionar mensajes](./features/manage-messages.md#archive-and-private-archive).

## Reconstrucción (2026-10-03)

AChat se reconstruyó desde cero. Se puso en marcha en achat.aoneahsan.com el 2026-10-03.

- **Chats personales y contactos:** añade a gente por nombre de usuario, enlace de invitación o código QR, con solicitudes de mensaje, bloqueos, estado en línea y confirmaciones de lectura. Los chats personales y los grupos privados tienen cifrado de extremo a extremo.
- **Dispositivos vinculados y una clave de recuperación** llevan tu historial a cada dispositivo que apruebas, y te lo devuelven si los pierdes todos. Aprobar un vínculo trae el historial consigo.
- **Grupos** con roles y enlaces de invitación, que se pueden leer (solo lectura) después de salir; **comunidades** con canales, hilos, marca para adultos, denuncias, expulsiones y un historial de moderación.
- **Estados** para tus contactos, que desaparecen a las 24 horas.
- **Las salas anónimas** siguen funcionando, enlaces antiguos incluidos, con contraseñas, salas conservadas y un archivo privado. Los mensajes y archivos anteriores de las salas con contraseña siguen siendo legibles.
- **Mensajes:** editar, reenviar, fijar, encuestas que puedes cerrar, mensajes temporales por chat, ver una vez, Vaciar para mí / Vaciar para todos y una Papelera por chat.
- **Escritura:** borradores, spoilers, matemáticas, menciones, stickers, imágenes pegadas, notas de voz, dictado, traducción en el dispositivo y lectura en voz alta.
- **Privacidad en este dispositivo:** pantalla de privacidad, título de pestaña neutro, limpieza del portapapeles y Borrar de este dispositivo.
- **Historial de dispositivo y ubicación**, opcional por chat, con consentimiento antes de entrar.
- **Planes:** Free, Pro y Team / Family, pagados en el propio pago de AChat, más invitaciones.
- **Pago con tarjeta**, cuando está disponible: una suscripción mensual o anual hecha en la página de Polar, gestionada en Tu suscripción, dentro de Cuenta. La transferencia bancaria sigue disponible.
- **Cinco idiomas:** inglés, español, francés, alemán y árabe.
- **Panel de admin** que muestra los detalles de los chats pero nunca los mensajes, con un registro de acciones que nadie puede editar, concesiones de Conservar para siempre y límites de búsqueda fijados por el admin.
- **Sin conexión:** una bandeja de salida que envía en orden cuando vuelves.
- **Búsqueda** en tu dispositivo, sobre un número fijo de chats y mensajes.

No incluido: llamadas de voz y vídeo.

## Corrección del borrado en hilos (2026-08-05)

- Borra una respuesta de un hilo por sí sola, o borra el mensaje donde empieza un hilo para mandarlo a la Papelera junto con todas sus respuestas.

## 0.4.0: primera versión en Google Play (2026-07-24)

- El chat anónimo sin registro como app de Android.
- Los chats largos cargan primero los mensajes más nuevos, con **Cargar anteriores**.
- Analíticas e informes de errores que nunca reciben IDs de chat, mensajes, contraseñas ni archivos.
- Correos de cuenta opcionales, una página de contacto y notificaciones push si las activas.

## 0.3.0: gestionar, buscar y bloquear (2026-06)

- Búsqueda en el dispositivo en los chats que habías abierto.
- Una Papelera por chat, un archivo privado para quienes iniciaban sesión y reenvío.
- Añadir más tarde una contraseña a un chat abierto; los mensajes anteriores se quedaban como se enviaron.
- Un rol de administrador con registro de acciones.

## 0.2.0: preparación para Play Store (2026-06)

- Eliminación de la cuenta en la app, además de privacidad, términos y declaraciones de la tienda.

## Antes (2026-05)

- **Espacios:** hilos, chats de grupo privados, comunidades públicas y el widget para insertar.
- **Conservar chats:** inicio de sesión opcional con Google para conservar un chat más allá de sus 10 días.
- **Editor y temas:** reacciones, encuestas, fijados, paleta de comandos, edición de mensajes, menciones, exportación y el personalizador de tema.
- **Primera versión:** chats anónimos por ID, cifrado opcional con contraseña, subida de archivos y borrado automático a los 10 días.
