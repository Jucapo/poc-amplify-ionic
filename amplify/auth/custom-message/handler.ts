import type { CustomMessageTriggerHandler } from 'aws-lambda';

// Helper para renderizar el bloque de código
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
  const code = event.request.codeParameter;
  const email = event.request.userAttributes.email;

  let subject = '';
  let message = '';

  switch (event.triggerSource) {
    // === Verificación de email (sign-up) ===
    case 'CustomMessage_SignUp':
      subject = 'Verifica tu correo';
      message = `
        <p>Hola ${email},</p>
        <p>Para verificar tu cuenta, utiliza este código:</p>
        ${codeContainer(code, true)}
        <p style="color: #555;">
          Si no lo solicitaste, ignora este mensaje.
        </p>
      `;
      break;

    // === Recuperación de contraseña ===
    case 'CustomMessage_ForgotPassword':
      subject = 'Restablece tu contraseña';
      message = `
        <p>Hola ${email},</p>
        <p>Para restablecer tu contraseña, utiliza este código:</p>
        ${codeContainer(code, true)}
        <p style="color: #555;">
          Si no lo solicitaste, ignora este correo.
        </p>
      `;
      break;

    // === Invitación / contraseña temporal (admin create user) ===
    case 'CustomMessage_AdminCreateUser':
      subject = '¡Bienvenido a MiApp!';
      message = `
        <p>¡Hola ${email}!</p>
        <p>Tu contraseña temporal es:</p>
        ${codeContainer(code, false)}
        <p style="color: #555;">
          Por favor, cámbiala en tu primer inicio de sesión.
        </p>
      `;
      break;

    default:
      // Para otros disparadores de CustomMessage, no tocamos nada
      return event;
  }

  event.response.emailSubject = subject;
  event.response.emailMessage = message;
  return event;
};
