// src/app/services/user-data.service.ts

import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';
import {
  CreateUserDataInput,
  UpdateUserDataInput,
  UserData,
} from '../../models/API';
import { AuthService } from './auth.service';

const client = generateClient<Schema>();

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private authService: AuthService) {}

  /** Crea o actualiza los datos de perfil “libres” del usuario */
  async saveUserData(userData: CreateUserDataInput): Promise<UserData> {
    // 1) Desestructura y elimina id si viniera
    //    (y también createdAt/updatedAt si tu tipo los incluye)
    const {
      id: _maybeId, // lo descartamos
      createdAt, // idem
      updatedAt, // idem
      ...cleanInput // aquí quedan sólo los campos válidos
    } = userData as any; // casteamos a any para evitar errores TS

    // 2) Llamamos al .create() sólo con cleanInput
    const { data, errors } = await client.models.UserData.create(cleanInput);

    if (errors?.length) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    return data! as UserData;
  }

  async updateUserData(
    id: string,
    input: UpdateUserDataInput,
  ): Promise<UserData> {
    // Validar existencia
    const existing = await client.models.UserData.get({ id });
    if (!existing.data) {
      throw new Error(`UserData con id ${id} no existe`);
    }

    // Fuerza campos requeridos
    const payload = {
      id,
      email: input.email ?? existing.data.email ?? '',
      firstName: input.firstName ?? existing.data.firstName ?? '',
      lastName: input.lastName ?? existing.data.lastName ?? '',
      phone: input.phone ?? existing.data.phone ?? '',
      address: input.address ?? existing.data.address ?? '',
      birthDate: input.birthDate ?? existing.data.birthDate ?? '',
      gender: input.gender ?? existing.data.gender ?? '',
      occupation: input.occupation ?? existing.data.occupation ?? '',
      createdAt: existing.data.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const { data, errors } = await client.models.UserData.update(payload);
    if (errors) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }
    return data! as UserData;
  }

  /**
   * Recupera los datos completos del usuario actual,
   * y añade el rol sacado de Cognito.
   */
  async getCompleteUserData(): Promise<{
    data: UserData;
    role: 'admin' | 'user';
  } | null> {
    const email = await this.authService.getCurrentUserEmail();
    if (!email) return null;

    // Buscamos por email
    const listResult = await client.models.UserData.list({
      filter: { email: { eq: email } },
    });

    let userData: UserData;
    if (listResult.data.length) {
      userData = listResult.data[0] as UserData;
    } else {
      // si no existe, lo creamos con valores vacíos
      userData = await this.saveUserData(this.createEmptyUserData(email));
    }

    // El rol ya no viene de BD sino de Cognito
    const role = await this.authService.getCurrentUserRole();
    return { data: userData, role };
  }

  /** Lista todos los registros de UserData (solo datos, sin rol) */
  async getAllUserData(): Promise<UserData[]> {
    const listResult = await client.models.UserData.list();
    return listResult.data as UserData[];
  }

  /** Helper para crear un UserData “vacío” */
  private createEmptyUserData(email: string): CreateUserDataInput {
    return {
      email,
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      birthDate: '',
      gender: '',
      occupation: '',
    };
  }
}
