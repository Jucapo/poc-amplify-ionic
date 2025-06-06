import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',

  access: (allow) => ({
    /* público (guest + auth) */
    'public/prospects/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write']),
    ],

    /* protegido (solo usuarios autenticados) */
    'protected/*': [allow.authenticated.to(['read', 'write'])],

    /* privado (solo el dueño “identity”) */
    'private/*': [allow.entity('identity').to(['read', 'write', 'delete'])],
  }),
});
