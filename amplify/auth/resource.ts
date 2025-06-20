import { defineAuth } from '@aws-amplify/backend';
import { customMessage } from './custom-message/resource';

export const auth = defineAuth({
  // Autenticación sólo por email, sin plantillas en línea
  loginWith: {
    email: true,
  },

  // Sólo email como atributo obligatorio
  userAttributes: {
    email: { required: true },
  },

  triggers: {
    customMessage,
  },
});
