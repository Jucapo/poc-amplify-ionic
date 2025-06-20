// amplify/auth/custom-message/handler.ts

import type { CustomMessageTriggerHandler } from 'aws-lambda';

/**
 * Devuelve un bloque <div> estilizado con el código, ya sea espaciado o normal.
 */
const codeContainer = (code: string, spaced: boolean) => {
  const display = spaced ? code.split('').join(' ') : code;
  return `
    <div style="
      display: inline-block;
      background-color: #fcfcfc;
      color: #000;
      padding: 16px 24px;
      border-radius: 6px;
      font-size: 1.5em;
      font-weight: bold;
      margin: 12px 0;
      letter-spacing: ${spaced ? '0.5em' : 'normal'};
    ">
      ${display}
    </div>
  `;
};

export const handler: CustomMessageTriggerHandler = async (event) => {
  const code = event.request.codeParameter; // el código numérico
  const email = event.request.userAttributes.email; // el correo del usuario

  let subject = '';
  let message = '';

  switch (event.triggerSource) {
    // ─── Self sign-up / verifica email / reenvío de código ───
    case 'CustomMessage_SignUp':
    case 'CustomMessage_VerifyUserAttribute':
    case 'CustomMessage_ResendCode':
      subject = 'Verifica tu correo (test triggers)';
      message = `
        <p>Hola ${email},</p>
        <p>Para verificar tu cuenta, utiliza este código: (test triggers)</p>
        ${codeContainer(code, true)}
        <p style="color: #555555;">
          Si no lo solicitaste, ignora este mensaje.
        </p>
      `;
      break;

    // ─── Forgot password ───
    case 'CustomMessage_ForgotPassword':
      subject = 'Restablece tu contraseña (test triggers)';
      message = `
        <p>Hola ${email},</p>
        <p>Para restablecer tu contraseña, utiliza este código: (test triggers)</p>
        ${codeContainer(code, true)}
        <p style="color: #555555;">
          Si no lo solicitaste, ignora este mensaje.
        </p>
      `;
      break;

    // ─── Admin create user / invitación ───
    case 'CustomMessage_AdminCreateUser':
      subject = '¡Bienvenido a MiApp! (test triggers)';
      message = `
        <p>¡Hola ${email}!</p>
        <p>Tu contraseña temporal es:</p>
        ${codeContainer(code, false)}
        <p style="color: #555555;">
          Por favor, cámbiala en tu primer inicio de sesión. (test triggers)
        </p>
      `;
      break;

    default:
      // Para cualquier otro trigger (p.ej. UpdateUserAttribute) no modificamos nada
      return event;
  }

  // Asignamos el subject y body que construimos
  event.response.emailSubject = subject;
  event.response.emailMessage = message;
  return event;
};
