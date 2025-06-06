import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../../amplify/data/resource';
import { AuthService } from './auth.service'; // ✔ ruta relativa correcta
import { CreateProspectInput, Prospect } from '../../models/API';

@Injectable({ providedIn: 'root' })
export class ProspectService {
  private client = generateClient<Schema>();

  constructor(private auth: AuthService) {}

  async createProspect(
    partial: Partial<CreateProspectInput>,
  ): Promise<Prospect> {
    const profile = await this.auth.getCurrentUserProfile();
    if (!profile?.id) throw new Error('Usuario no identificado');

    /* Null-safe: convertimos null ➜ undefined para respetar el tipo API */
    const sanitized: Partial<CreateProspectInput> = {};
    Object.entries(partial).forEach(([k, v]) => {
      (sanitized as any)[k] = v ?? undefined;
    });

    const input: CreateProspectInput = {
      ...sanitized,
      id: crypto.randomUUID(), // el campo es opcional
      userId: profile.id,
      registrationDate: new Date().toISOString(),
    } as CreateProspectInput;

    const { data, errors } = await this.client.models.Prospect.create(
      input as any,
    );
    if (errors?.length)
      throw new Error(errors.map((e) => e.message).join(', '));

    return data as Prospect;
  }
}
