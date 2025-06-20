// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';
import { customMessage } from './custom-message/resource';

export const auth = defineAuth({
  // 1) Login sólo por e-mail
  loginWith: {
    email: {
      // a) Verificación de correo al registrarse
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Verifica tu correo',
      verificationEmailBody: (createCode) =>
        `Hola,\n\n` +
        `Usa este código para verificar tu correo: ${createCode()}\n\n` +
        `Si no lo solicitaste, ignora este mensaje.`,

      // b) Invitación (admin create user) con contraseña temporal
      userInvitation: {
        emailSubject: '¡Bienvenido a MiApp!',
        emailBody: (user, code) =>
          `¡Hola ${user()}!\n\n` +
          `Tu contraseña temporal es: ${code()}\n\n` +
          `Por favor, cámbiala en tu primer inicio de sesión.`,
      },
    },
  },

  // 2) Atributos de usuario obligatorios
  userAttributes: {
    email: { required: true },
  },

  // 3) Trigger Custom Message para “Forgot Password” y demás
  triggers: {
    customMessage,
  },
});
