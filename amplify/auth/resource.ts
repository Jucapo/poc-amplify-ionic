// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';
import { customMessage } from './custom-message/resource';

export const auth = defineAuth({
  loginWith: {
    email: {
      // 1. Verificación de cuenta al sign-up
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Verifica tu correo',
      verificationEmailBody: (createCode) =>
        `Hola,\n\nUsa este código para confirmar tu cuenta: ${createCode()}`,

      // 2. Invitación al crear usuario desde admin
      userInvitation: {
        emailSubject: 'Bienvenido a MiApp',
        emailBody: (user, code) =>
          `¡Hola ${user()}! Tu contraseña temporal es: ${code()}\n\n` +
          `Por favor, cámbiala en tu primer ingreso.`,
      },
    },
  },
  triggers: { customMessage },
  userAttributes: {
    email: { required: true },
  },
});
