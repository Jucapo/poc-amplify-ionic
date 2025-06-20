import type { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (event) => {
  const code = event.request.codeParameter;
  // opción A: usas el userName del evento
  const username = event.userName;

  // opción B: usas usernameParameter dentro de request
  // const username = event.request.usernameParameter;

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Restablece tu contraseña';
    event.response.emailMessage =
      `Hola ${username},\n\n` +
      `Tu código para restablecer la contraseña es: ${code}\n\n` +
      `Si no lo solicitaste, ignora este correo.`;
  }

  if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    event.response.emailSubject = 'Bienvenido a MiApp';
    event.response.emailMessage =
      `¡Hola ${username}!\n\n` +
      `Tu contraseña temporal es: ${code}\n\n` +
      `Por favor, cámbiala en tu primer inicio de sesión.`;
  }

  return event;
};
