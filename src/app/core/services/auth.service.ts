// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import {
  fetchAuthSession,
  fetchUserAttributes,
  signOut as amplifySignOut,
} from 'aws-amplify/auth'; // v6 Gen-2 modular
import { generateClient } from 'aws-amplify/data'; // cliente GraphQL Gen-2
import type { Schema } from '../../../../amplify/data/resource';
import { Router } from '@angular/router';
import {
  CognitoIdentityProviderClient,
  AdminListGroupsForUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import amplifyOutputs from '../../../../amplify_outputs.json';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private client = generateClient<Schema>();
  private readonly DEFAULT_ROLE: 'user' = 'user';
  private readonly ADMIN_GROUP = 'admin';

  // Region y poolId desde tu JSON de sandbox
  private readonly REGION = amplifyOutputs.auth.aws_region;
  private readonly USER_POOL = amplifyOutputs.auth.user_pool_id;

  // Cliente admin de Cognito (requiere cognito-idp:AdminListGroupsForUser)
  private cognitoClient = new CognitoIdentityProviderClient({
    region: this.REGION,
    credentials: async () => {
      // fetchAuthSession devuelve { tokens, credentials, identityId, userSub }
      const { credentials } = await fetchAuthSession();
      if (!credentials) {
        throw new Error('No se pudieron obtener credenciales AWS');
      }
      return {
        accessKeyId: credentials.accessKeyId!,
        secretAccessKey: credentials.secretAccessKey!,
        sessionToken: credentials.sessionToken!,
      };
    },
  });

  constructor(private router: Router) {}

  /** Devuelve 'admin' o 'user' leyendo su JWT actual */
  async getCurrentUserRole(): Promise<'admin' | 'user'> {
    try {
      const { tokens } = await fetchAuthSession();
      const raw = tokens?.accessToken.payload['cognito:groups'];
      const groups = Array.isArray(raw) ? (raw as string[]) : [];
      return groups.includes(this.ADMIN_GROUP) ? 'admin' : this.DEFAULT_ROLE;
    } catch (e) {
      console.error('Error obteniendo rol actual:', e);
      return this.DEFAULT_ROLE;
    }
  }

  /** Extrae el email del usuario logueado */
  async getCurrentUserEmail(): Promise<string | null> {
    try {
      const attrs = await fetchUserAttributes();
      // fetchUserAttributes en v6 retorna un objeto { [key]: value }
      return (attrs as any).email ?? null;
    } catch {
      return null;
    }
  }

  /** Cierra sesión y redirige a /sign-in */
  async signOut(): Promise<void> {
    await amplifySignOut();
    this.router.navigate(['/sign-in']);
  }

  /**
   * Para el Admin Dashboard: consulta AdminListGroupsForUser
   * y devuelve 'admin' o 'user' para cualquier email.
   */
  async getUserRoleByEmail(email: string): Promise<'admin' | 'user'> {
    try {
      const cmd = new AdminListGroupsForUserCommand({
        UserPoolId: this.USER_POOL,
        Username: email,
      });
      const res = await this.cognitoClient.send(cmd);
      const groups = res.Groups?.map((g) => g.GroupName) || [];
      return groups.includes(this.ADMIN_GROUP) ? 'admin' : this.DEFAULT_ROLE;
    } catch (e) {
      console.error('Error listando grupos para', email, e);
      return this.DEFAULT_ROLE;
    }
  }
}
