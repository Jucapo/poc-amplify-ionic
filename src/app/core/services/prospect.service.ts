// src/app/core/services/prospect.service.ts

import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { UserDataService } from './user-data.service';
import type { Prospect } from '../../models/API';

@Injectable({ providedIn: 'root' })
export class ProspectService {
  private client = generateClient<Schema>();

  constructor(private uds: UserDataService) {}

  /** Crea un prospecto asociado al UserData.id del usuario logueado */
  async createProspect(
    partial: Partial<import('../../models/API').CreateProspectInput>,
  ): Promise<Prospect> {
    // 1) Obtener el UserData completo
    const complete = await this.uds.getCompleteUserData();
    if (!complete) throw new Error('No se pudieron cargar datos de usuario');
    const userId = complete.data.id;
    if (!userId) throw new Error('Usuario sin identificador');

    // 2) Desestructura TODOS los campos posibles
    const {
      macroRegion,
      region,
      agency,
      companyName,
      companyAddress,
      department,
      municipality,
      locationType,
      legalForm,
      economicSector,
      yearsInOperation,
      companySize,
      annualRevenue,
      requestedFinancingLast3Years,
      financingTypeUsed,
      hadFinancingDifficulties,
      mainDifficultyReason,
      needsFinancingCurrently,
      financingPurpose,
      amountNeeded,
      favorableTerms,
      mainChallenges,
      interestedFinancialAdvice,
      interestedSpecializedPrograms,
      businessImages,
      locationCoordinates,
    } = partial;

    // 3) Valida los obligatorios (todos deben ser string no-null ni undefined)
    const missing: string[] = [];
    if (!macroRegion) missing.push('macroRegion');
    if (!region) missing.push('region');
    if (!companyName) missing.push('companyName');
    if (!companyAddress) missing.push('companyAddress');
    if (!department) missing.push('department');
    if (!municipality) missing.push('municipality');
    if (!locationType) missing.push('locationType');
    if (!legalForm) missing.push('legalForm');
    if (!economicSector) missing.push('economicSector');
    if (!yearsInOperation) missing.push('yearsInOperation');
    if (!companySize) missing.push('companySize');
    if (!annualRevenue) missing.push('annualRevenue');
    if (!requestedFinancingLast3Years)
      missing.push('requestedFinancingLast3Years');
    if (!hadFinancingDifficulties) missing.push('hadFinancingDifficulties');
    if (!needsFinancingCurrently) missing.push('needsFinancingCurrently');
    if (!interestedFinancialAdvice) missing.push('interestedFinancialAdvice');
    if (!interestedSpecializedPrograms)
      missing.push('interestedSpecializedPrograms');

    if (missing.length) {
      throw new Error(`Faltan campos obligatorios: ${missing.join(', ')}`);
    }

    // 4) Haz variables locales con “!” para convencer a TS de que son strings
    const _macroRegion = macroRegion!;
    const _region = region!;
    const _companyName = companyName!;
    const _companyAddress = companyAddress!;
    const _department = department!;
    const _municipality = municipality!;
    const _locationType = locationType!;
    const _legalForm = legalForm!;
    const _economicSector = economicSector!;
    const _yearsInOperation = yearsInOperation!;
    const _companySize = companySize!;
    const _annualRevenue = annualRevenue!;
    const _requestedFinancingLast3Years = requestedFinancingLast3Years!;
    const _hadFinancingDifficulties = hadFinancingDifficulties!;
    const _needsFinancingCurrently = needsFinancingCurrently!;
    const _interestedFinancialAdvice = interestedFinancialAdvice!;
    const _interestedSpecializedPrograms = interestedSpecializedPrograms!;

    // 5) Construye el objeto que tu Data Client espera
    const modelInput = {
      // campos del sistema
      id: crypto.randomUUID(),
      userId,
      registrationDate: new Date().toISOString(),

      // campos obligatorios
      macroRegion: _macroRegion,
      region: _region,
      companyName: _companyName,
      companyAddress: _companyAddress,
      department: _department,
      municipality: _municipality,
      locationType: _locationType,
      legalForm: _legalForm,
      economicSector: _economicSector,
      yearsInOperation: _yearsInOperation,
      companySize: _companySize,
      annualRevenue: _annualRevenue,
      requestedFinancingLast3Years: _requestedFinancingLast3Years,
      hadFinancingDifficulties: _hadFinancingDifficulties,
      needsFinancingCurrently: _needsFinancingCurrently,
      interestedFinancialAdvice: _interestedFinancialAdvice,
      interestedSpecializedPrograms: _interestedSpecializedPrograms,

      // campos opcionales (pueden quedar undefined)
      agency,
      financingTypeUsed,
      mainDifficultyReason,
      financingPurpose,
      amountNeeded,
      favorableTerms,
      mainChallenges,
      businessImages,
      locationCoordinates,
    };

    // 6) Llamada al servicio Data Gen-2
    const { data, errors } = await this.client.models.Prospect.create(
      modelInput as any,
    );
    if (errors?.length) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }
    return data as Prospect;
  }
}
