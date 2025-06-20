import type { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (event) => {
  const code = event.request.codeParameter;
  const name = event.request.userAttributes.fullname || event.userName;

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Restablece tu contraseña';
    event.response.emailMessage = `
      Hola ${name},<br/><br/>
      Tu código para restablecer la contraseña es: <strong>${code}</strong><br/><br/>
      Si no lo solicitaste, ignora este mensaje.
    `;
  }

  // (Opcional) si quieres sobreescribir también el admin-create-user desde aquí:
  if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    event.response.emailSubject = '¡Bienvenido a MiApp!';
    event.response.emailMessage = `
      ¡Hola ${name}!<br/><br/>
      Tu contraseña temporal es: <strong>${code}</strong><br/><br/>
      Cámbiala al iniciar sesión por primera vez.
    `;
  }

  return event;
};
