---
sidebar_position: 5
title: "Webhooks"
description: "Webhooks de AChat: añade una dirección https, elige eventos y verifica la firma Standard Webhooks de cada entrega en Node o Python. Todos los eventos y sus datos, el calendario de reintentos, la pausa y lo que desactiva una dirección."
keywords: [webhooks de AChat, Standard Webhooks, firma de webhook, verificar webhook-signature, HMAC-SHA256, webhook de solicitud de contacto]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# Webhooks

**AChat envía un mensaje breve y firmado a tu propio servidor cuando algo cambia en tu cuenta, para que tus herramientas reaccionen sin preguntar cada minuto.** Cada evento dice qué cambió y cuándo, con IDs. Nunca lleva el texto de un mensaje, un nombre ni nada que tuvieras que proteger; tu servidor obtiene el resto con una [clave de acceso](./access-keys.md).

## Añadir una dirección

1. En **Cuenta › Otras apps › Webhooks**, elige **Añadir una dirección de webhook**.
2. Pega la dirección y, si quieres, una nota para ti.
3. Elige los eventos de los que debe enterarse.
4. Elige **Añadir dirección** y copia el secreto de firma (`whsec_…`).

Añadir una dirección requiere haber iniciado sesión en los últimos 10 minutos, con el código si el [inicio de sesión en dos pasos](./two-step-sign-in.md) está activado. AChat te envía un correo cuando se añade una dirección.

La dirección debe:

- empezar por `https://`; AChat no envía por http sin cifrar;
- usar el puerto estándar (443) o el 8443;
- no llevar nombre ni contraseña; comprueba la firma en su lugar;
- ser accesible desde internet. Se rechazan las redes privadas, este equipo y los dominios del propio AChat.

Tu plan fija cuántas direcciones puedes tener a la vez (3 en Free de forma predeterminada; consulta [lo que permite tu plan](./index.md#what-your-plan-allows)).

## Cómo es una entrega

Un `POST` con cuerpo JSON y tres cabeceras, enviado como `AChat-Webhooks/1.0`:

```http
POST /hooks/achat HTTP/1.1
Content-Type: application/json
webhook-id: msg_4f1c0e9a2b7d4e6f8a1b3c5d7e9f0a12
webhook-timestamp: 1795252018
webhook-signature: v1,nTT91qcpymGUsm8mf2biKHcRldxftN3Jyd3ZkufNi1g=

{"type":"status.posted","timestamp":"2026-11-21T09:06:58.104Z","data":{"id":"0b6f2c1e-7d1a-4c55-9a3e-2f0c8e4b9d10","created_at":"2026-11-21T09:06:58.104Z","expires_at":"2026-11-22T09:06:58.104Z"}}
```

`type` es el evento, `timestamp` es cuándo ocurrió y `data` contiene los IDs y horas que se indican abajo. `webhook-id` es el ID del evento y no cambia en ningún reintento, así que úsalo para detectar una repetición.

## Eventos

| Evento | Cuándo | `data` |
|---|---|---|
| `profile.updated` | Cambiaron tu nombre de usuario, nombre, color del avatar o foto | `id` (el tuyo) |
| `status.posted` | Publicaste un estado | `id`, `created_at`, `expires_at` |
| `status.deleted` | Se borró un estado tuyo | `id` |
| `block.added` | Bloqueaste a alguien | `id` (el suyo), `created_at` |
| `block.removed` | Desbloqueaste a alguien | `id` (el suyo) |
| `contact.added` | Se añadió un contacto | `id` (el del contacto), `created_at` |
| `contact.removed` | Se quitó un contacto | `id` (el del contacto) |
| `contact_request.received` | Alguien te envió una solicitud de contacto | `id` (quien la pide), `created_at` |
| `chat.joined` | Entraste en un chat o una sala | `id` (el del chat), `joined_at` |
| `chat.left` | Saliste de un chat o una sala, o te quitaron | `id` (el del chat) |
| `message.created` | Llegó un mensaje a una sala abierta o un canal en el que estás | `id`, `chat_id`, `created_at` |
| `webhook.test` | Elegiste **Enviar un evento de prueba** | `message`: `"Test event"` |

`message.created` solo se dispara con mensajes de texto y enlaces en salas abiertas y canales. Un mensaje en un chat directo, un grupo o una sala con contraseña nunca genera un evento, porque AChat no puede leerlo. Cada `id` coincide con el registro del mismo ID en la [API](./api.md): obtén `/messages/{id}`, `/status/{id}` o `/contacts/{id}` con una clave que tenga el permiso.

Un evento solo se registra mientras alguna de tus direcciones lo escucha. Añade primero la dirección; los cambios hechos antes de que existiera no se envían después.

## Verificar la firma

Cada entrega va firmada con [Standard Webhooks](https://www.standardwebhooks.com): HMAC-SHA256 sobre `webhook-id`, un punto, `webhook-timestamp`, un punto y el cuerpo en bruto, con los bytes de tu secreto como clave (la parte tras `whsec_`, decodificada de base64). `webhook-signature` contiene uno o más valores `v1,<base64>` separados por espacios; acepta la entrega si coincide cualquiera. Rechaza todo lo que tenga una marca de tiempo a más de cinco minutos de tu reloj.

Comprueba el cuerpo **en bruto** tal y como llegó. Analizar el JSON y volver a serializarlo cambia los bytes y rompe la coincidencia.

### Node

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyAchatWebhook(secret, headers, rawBody) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signatures.split(' ').some((entry) => {
    const [version, value] = entry.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

Con Express, recibe el cuerpo en bruto en esta ruta:

```js
import express from 'express';

const app = express();

app.post('/hooks/achat', express.raw({ type: 'application/json' }), (req, res) => {
  const raw = req.body.toString('utf8');
  if (!verifyAchatWebhook(process.env.ACHAT_WEBHOOK_SECRET, req.headers, raw)) {
    return res.status(401).end();
  }
  const event = JSON.parse(raw);
  // event.type, event.data.id …
  res.status(204).end();
});
```

### Python

```python
import base64
import hashlib
import hmac
import time


def verify_achat_webhook(secret: str, headers, raw_body: bytes) -> bool:
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not (msg_id and timestamp and signatures):
        return False
    if abs(time.time() - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()

    for entry in signatures.split(" "):
        version, _, value = entry.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

Con Flask, pasa `request.get_data()` y `request.headers`. Cualquier biblioteca de Standard Webhooks hace la misma comprobación si prefieres no escribirla.

## Responde rápido

Responde con cualquier `2xx` en menos de 10 segundos y haz el trabajo después. AChat no sigue redirecciones. Un `410 Gone` le dice a AChat que desactive la dirección al instante; cualquier otra cosa, o ninguna respuesta, cuenta como fallo.

## Reintentos

Una entrega fallida se intenta 8 veces en total: al momento y luego 5 segundos, 5 minutos, 30 minutos, 2 horas, 5 horas, 10 horas y 10 horas después de cada intento anterior, algo más de un día del primero al último. Cada intento lleva el mismo `webhook-id`.

El **Registro de entregas** de cada dirección muestra cada entrega: Entregado, No enviado, Sin respuesta, o el estado que respondió tu servidor, con el número de intento. **Enviar de nuevo** reenvía una con el mismo ID. Los eventos y su registro se guardan 30 días.

## Pausar, desactivar y volver a activar

- **Pausar** se salta los eventos hasta que eliges **Reanudar**. Los eventos que ocurren durante la pausa no se envían después.
- Una dirección que ha fallado sin parar durante 5 días queda **Desactivado tras fallar**, y AChat te envía por correo la dirección, su última respuesta y cuándo empezó a fallar. No se envía nada hasta que eliges **Volver a activar**.
- **Quitar dirección** deja de enviar al instante, y su registro de entregas se va con ella.

## El secreto de firma

AChat muestra el secreto una vez al añadir la dirección, y de nuevo durante 10 minutos tras iniciar sesión (con el código si el inicio de sesión en dos pasos está activado): **Mostrar el secreto de firma**. **Sustituir el secreto** crea uno nuevo, y durante 24 horas cada evento lleva dos firmas, una de cada secreto, para que tu servidor cambie sin perderse nada. Las comprobaciones de arriba ya aceptan cualquiera de las dos.
