import type { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (event) => {
  const code = event.request.codeParameter;
  const email = event.request.userAttributes.email;

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Restablece tu contraseña';
    event.response.emailMessage = `
      <p>Hola ${email},</p>

      <p>Para restablecer tu contraseña, utiliza el siguiente código:</p>

      <div style="
        display: inline-block;
        background-color: #f5f5dc;
        padding: 16px 24px;
        border-radius: 6px;
        font-size: 1.5em;
        font-weight: bold;
        margin: 12px 0;
      ">
        ${code}
      </div>

      <p style="color: #555;">
        Si no lo solicitaste, puedes ignorar este correo.
      </p>
    `;
  }

  if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    event.response.emailSubject = '¡Bienvenido a MiApp!';
    event.response.emailMessage = `
      <p>¡Hola ${email}!</p>

      <p>Tu contraseña temporal es:</p>

      <div style="
        display: inline-block;
        background-color: #f5f5dc;
        padding: 16px 24px;
        border-radius: 6px;
        font-size: 1.5em;
        font-weight: bold;
        margin: 12px 0;
      ">
        ${code}
      </div>

      <p style="color: #555;">
        Por favor, cámbiala en tu primer inicio de sesión.
      </p>
    `;
  }

  return event;
};
