// amplify/data/resource.ts

import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  UserData: a
    .model({
      id: a.id().required(),
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      phone: a.string().required(),
      address: a.string().required(),
      birthDate: a.string().required(),
      gender: a.string().required(),
      occupation: a.string().required(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  // =============================================================
  // MODEL: Prospect (todos los campos en inglés, sin usar int() ni list())
  // =============================================================
  Prospect: a
    .model({
      id: a.id().required(),
      userId: a.string().required(), // email o sub de Cognito que crea el prospect
      registrationDate: a.datetime().required(), // guardamos fecha/hora en ISO
      businessImages: a.json(), // guardamos un array JSON de URLs (S3)
      macroRegion: a.string().required(), // ejemplo: "North", "South", etc.
      region: a.string().required(), // sub-región dentro de la macro región
      agency: a.string(), // agencia (texto libre)
      companyName: a.string().required(), // nombre de la empresa prospecto
      companyAddress: a.string().required(), // dirección física
      department: a.string().required(), // departamento de Guatemala
      municipality: a.string().required(), // municipio de Guatemala
      locationType: a.string().required(), // "Urban" o "Rural"
      legalForm: a.string().required(), // "Corporation", "Sole Proprietor", etc.
      economicSector: a.string().required(), // "Manufacturing", "Services", etc.
      yearsInOperation: a.string().required(), // antes un número, lo guardamos como string
      companySize: a.string().required(), // "Micro", "Small", "Medium", "Large"
      annualRevenue: a.string().required(), // rango de facturación anual (texto)
      requestedFinancingLast3Years: a.string().required(), // "Yes" o "No"
      financingTypeUsed: a.string(), // Si respondió "Yes", tipo de financiamiento
      hadFinancingDifficulties: a.string().required(), // "Yes" o "No"
      mainDifficultyReason: a.string(), // razón principal si tuvo dificultades
      needsFinancingCurrently: a.string().required(), // "Yes" o "No"
      financingPurpose: a.string(), // para qué usaría el financiamiento
      amountNeeded: a.string(), // rango de monto aproximado (texto)
      favorableTerms: a.string(), // condiciones de financiamiento favorables
      mainChallenges: a.string(), // principales desafíos de la empresa
      interestedFinancialAdvice: a.string().required(), // "Yes" o "No"
      interestedSpecializedPrograms: a.string().required(), // "Yes" o "No"
      locationCoordinates: a.string(), // lat/long o JSON con ubicación
      createdAt: a.datetime(), // generado automáticamente
      updatedAt: a.datetime(), // generado automáticamente
    })
    .authorization((allow) => [
      // El owner (userId) puede leer/actualizar/borrar su propio prospect
      allow.ownerDefinedIn('userId').to(['read', 'update', 'delete']),
      // Cualquier usuario autenticado puede crear y leer sus propios prospectos
      allow.authenticated().to(['create', 'read']),
      // El grupo "admin" puede CRUD completo sobre cualquier prospect
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
