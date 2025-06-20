//  /amplyfy/auth/cutom-message/handler.ts
import type { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (event) => {
  const rawCode = event.request.codeParameter; // e.g. "123456"
  const spacedCode = rawCode.split('').join(' '); // "1 2 3 4 5 6"
  const email = event.request.userAttributes.email; // correo del usuario

  // Bloque estilizado para recuperación de contraseña
  const recoveryCodeBlock = `
    <div style="
      display: inline-block;
      background-color: #fcfcfc;
      color: #000;
      padding: 16px 24px;
      border-radius: 6px;
      font-size: 1.5em;
      font-weight: bold;
      margin: 12px 0;
      letter-spacing: 0.5em;
    ">
      ${spacedCode}
    </div>
  `;

  // Bloque estilizado para contraseña temporal (admin create user)
  const inviteCodeBlock = `
    <div style="
      display: inline-block;
      background-color: #fcfcfc;
      color: #000;
      padding: 16px 24px;
      border-radius: 6px;
      font-size: 1.5em;
      font-weight: bold;
      margin: 12px 0;
      letter-spacing: normal;
    ">
      ${rawCode}
    </div>
  `;

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Restablece tu contraseña';
    event.response.emailMessage = `
      <p>Hola ${email},</p>
      <p>Para restablecer tu contraseña, utiliza este código:</p>
      ${recoveryCodeBlock}
      <p style="color: #555;">
        Si no lo solicitaste, ignora este correo.
      </p>
    `;
  }

  if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    event.response.emailSubject = '¡Bienvenido a ADN APP!';
    event.response.emailMessage = `
      <p>¡Hola ${email}!</p>
      <p>Tu contraseña temporal es:</p>
      ${inviteCodeBlock}
      <p style="color: #555;">
        Por favor, cámbiala en tu primer inicio de sesión.
      </p>
    `;
  }

  return event;
};
