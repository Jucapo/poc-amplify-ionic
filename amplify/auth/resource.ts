// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';
import { customMessage } from './custom-message/resource';

export const auth = defineAuth({
  loginWith: { email: true },
  userAttributes: { email: { required: true } },
  triggers: { customMessage },
});
