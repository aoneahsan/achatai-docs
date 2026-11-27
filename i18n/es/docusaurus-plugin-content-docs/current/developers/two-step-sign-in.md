---
sidebar_position: 6
title: "Inicio de sesión en dos pasos"
description: "Añade un código de seis dígitos de una app de autenticación después de iniciar sesión con Google en AChat. Cómo configurarlo, los diez códigos de recuperación, recordar un navegador 7 días, perder el teléfono y lo que el equipo de AChat puede y no puede hacer por ti."
keywords: [inicio de sesión en dos pasos de AChat, 2FA de AChat, app de autenticación, códigos de recuperación, recordar este navegador, perdí el teléfono AChat]
last_update:
  date: 2026-11-21
  author: Equipo de AChat
---

# Inicio de sesión en dos pasos

**Con el inicio de sesión en dos pasos activado, después de que Google te deje entrar, AChat te pide un código de seis dígitos de una app de tu teléfono.** Alguien que entre en tu cuenta de Google sigue sin poder abrir tu cuenta de AChat. Es opcional para todo el mundo y en todos los planes, y obligatorio para las cuentas que manejan las pantallas de admin de AChat.

Funciona con cualquier app de autenticación: Google Authenticator, Microsoft Authenticator, 1Password, Aegis y otras. Sigues iniciando sesión con Google primero; el código va después.

## Configurarlo

1. Abre **Cuenta › Seguridad** y elige **Configurar el inicio de sesión en dos pasos**.
2. En tu app de autenticación, añade una cuenta y escanea el código que muestra AChat. ¿No puedes escanearlo? Escribe la clave de configuración. La app llama a la cuenta AChat.
3. Escribe los seis dígitos que muestra la app, para demostrar que la app y AChat coinciden.
4. Guarda tus diez códigos de recuperación (abajo), marca la casilla y elige **Terminar**.

## Códigos de recuperación

Recibes diez códigos de recuperación, cada uno de diez letras y números. Son para el día en que pierdas el teléfono: uno de ellos te deja entrar en lugar del código, y cada uno funciona una vez.

- Guárdalos fuera del teléfono: en un gestor de contraseñas o impresos en casa. **Copiar los diez** y **Descargar como archivo** (`achat-recovery-codes.txt`) están en la misma pantalla.
- AChat los muestra una sola vez. Guarda una huella de un solo sentido de cada código, nunca el código.
- **Cuenta › Seguridad** muestra cuántos quedan. **Crear códigos de recuperación nuevos** sustituye el juego entero, y los antiguos dejan de funcionar en cuanto aparecen los nuevos. Crear códigos nuevos requiere el código de tu app y haber iniciado sesión en los últimos 10 minutos.

AChat te envía un correo cada vez que se usa un código de recuperación.

## Iniciar sesión

Después de Google, escribe el código que tu app muestra para AChat. Tras cinco códigos que no coinciden, AChat te hace esperar 10 minutos; un código de recuperación funciona al momento.

### Recordar este navegador

Marca **Recordar este navegador durante 7 días** en un ordenador o teléfono que solo uses tú, y ese navegador se salta el código durante 7 días. Los 7 días no vuelven a empezar cuando regresas.

Un navegador recordado sigue pidiendo el código antes de mostrar, crear o sustituir una [clave de acceso](./access-keys.md) o un secreto de webhook, y antes de cada pantalla de admin. **Cuenta › Seguridad › Navegadores que se saltan el código** muestra cada uno con su fecha de fin; puedes **Olvidar** uno u **Olvidar todos los navegadores**. Cerrar sesión olvida el navegador en el que estás.

## ¿Perdiste el teléfono?

1. Inicia sesión con Google, elige **Usar un código de recuperación** y escribe uno de los tuyos. El inicio de sesión en dos pasos sigue activado.
2. AChat te dice cuántos códigos quedan y te ofrece **Configurar el teléfono nuevo**. Hazlo enseguida, en los 10 minutos siguientes a ese inicio de sesión: escanea el código nuevo con el teléfono nuevo, escribe sus seis dígitos, y los códigos del teléfono perdido dejan de funcionar.

¿Todavía tienes el teléfono antiguo y solo quieres cambiar? Elige **Configurar un teléfono nuevo** en Cuenta › Seguridad, escribe un código del teléfono que usas ahora y luego escanea el código nuevo con el nuevo.

## Perdiste el teléfono y los códigos

Escribe al equipo de AChat desde la [página de contacto](https://achat.aoneahsan.com/es/contact), desde el correo de tu cuenta. Antes de cambiar nada, el equipo comprueba que eres tú con al menos dos de estas:

- escribiste desde el correo de tu cuenta;
- dijiste desde dónde sueles iniciar sesión;
- mencionaste algo del historial de tu cuenta.

Cuando las comprobaciones salen bien, el equipo desactiva el inicio de sesión en dos pasos de tu cuenta. Tus códigos de recuperación y navegadores recordados se van con él, y AChat te avisa por correo de que soporte lo desactivó. Inicia sesión con Google y vuelve a configurarlo.

Lo que el equipo **no puede** hacer:

- decirte un código, un código de recuperación o tu clave de configuración; AChat no los guarda de forma que alguien pueda leerlos;
- desactivarlo sin las comprobaciones de arriba;
- abrir tus chats con cifrado de extremo a extremo. Vuelven desde un dispositivo vinculado o tu [clave de recuperación](/features/devices-and-recovery), nunca desde soporte.

## Desactivarlo

**Desactivar el inicio de sesión en dos pasos** en Cuenta › Seguridad, con un código. Tu cuenta de Google pasa a ser lo único entre alguien y tu cuenta de AChat, los navegadores recordados se olvidan y tus códigos de recuperación dejan de funcionar. Las cuentas del personal lo mantienen activado.

## Inicios de sesión recientes

**Cuenta › Seguridad › Inicios de sesión recientes** muestra los diez últimos, del más reciente al más antiguo, con cómo pasó cada uno: Google y un código, Google en un navegador recordado, Google y un código de recuperación, o solo Google. Los lugares salen de la dirección de red, así que son aproximados. ¿No reconoces alguno? Elige **Cerrar la sesión en todos los demás sitios** y luego crea códigos de recuperación nuevos.
