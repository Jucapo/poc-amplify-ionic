// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      // 1) Verificación de correo al registrarse
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Restablecer contraseña',
      verificationEmailBody: (createCode) => `
        <p>Hola,</p>
        <p>Para restablecer tu contraseña, utiliza este código:</p>
        <div style="
          display: inline-block;
          background-color: #fcfcfc;
          padding: 16px 24px;
          border-radius: 6px;
          font-size: 1.5em;
          font-weight: bold;
          margin: 12px 0;
          letter-spacing: 0.5em;
        ">
          ${createCode()}
        </div>
        <p style="color: #555555;">
          Si no lo solicitaste, ignora este mensaje.
        </p>
      `,

      // 2) Invitación (admin create user) — código sin separación
      userInvitation: {
        emailSubject: '¡Bienvenido a ADN APP!',
        emailBody: (user, code) => `
          <p>¡Hola ${user()}!</p>
          <p>Tu contraseña temporal es:</p>
          <div style="
            display: inline-block;
            background-color: #fcfcfc;
            padding: 16px 24px;
            border-radius: 6px;
            font-size: 1.5em;
            font-weight: bold;
            margin: 12px 0;
            letter-spacing: normal;
          ">
            ${code()}
          </div>
          <p style="color: #555555;">
            Por favor, cámbiala en tu primer inicio de sesión.
          </p>
        `,
      },
    },
  },

  // Solo email como atributo obligatorio
  userAttributes: {
    email: { required: true },
  },
});
