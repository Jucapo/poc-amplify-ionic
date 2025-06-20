import type { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (event) => {
  // Código original de Cognito (p.ej. "123456")
  const rawCode = event.request.codeParameter;
  // Separa cada dígito con un espacio: "1 2 3 4 5 6"
  const spacedCode = rawCode.split('').join(' ');
  // Obtiene el email del usuario
  const email = event.request.userAttributes.email;

  // Bloque HTML común para mostrar el código
  const codeBlock = `
    <div style="
      display: inline-block;
      background-color: #fcfcfc;
      padding: 16px 24px;
      border-radius: 6px;
      font-size: 1.5em;
      font-weight: bold;
      margin: 12px 0;
      letter-spacing: 0.1em;
    ">
      ${spacedCode}
    </div>
  `;

  // 1) Flujo "Olvidé mi contraseña"
  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Restablece tu contraseña';
    event.response.emailMessage = `
      <p>Hola ${email},</p>
      <p>Para restablecer tu contraseña, utiliza el siguiente código:</p>
      ${codeBlock}
      <p style="color: #555;">
        Si no lo solicitaste, puedes ignorar este correo.
      </p>
    `;
  }

  // 2) Flujo "AdminCreateUser" (contraseña temporal)
  if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    event.response.emailSubject = '¡Bienvenido a MiApp!';
    event.response.emailMessage = `
      <p>¡Hola ${email}!</p>
      <p>Tu contraseña temporal es:</p>
      ${codeBlock}
      <p style="color: #555;">
        Por favor, cámbiala en tu primer inicio de sesión.
      </p>
    `;
  }

  return event;
};
