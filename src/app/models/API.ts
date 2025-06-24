/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Prospect = {
  __typename: "Prospect",
  agency?: string | null,
  amountNeeded?: string | null,
  annualRevenue: string,
  businessImages?: string | null,
  companyAddress: string,
  companyName: string,
  companySize: string,
  createdAt?: string | null,
  department: string,
  economicSector: string,
  favorableTerms?: string | null,
  financingPurpose?: string | null,
  financingTypeUsed?: string | null,
  hadFinancingDifficulties: string,
  id: string,
  interestedFinancialAdvice: string,
  interestedSpecializedPrograms: string,
  legalForm: string,
  locationCoordinates?: string | null,
  locationType: string,
  macroRegion: string,
  mainChallenges?: string | null,
  mainDifficultyReason?: string | null,
  municipality: string,
  needsFinancingCurrently: string,
  region: string,
  registrationDate: string,
  requestedFinancingLast3Years: string,
  updatedAt?: string | null,
  userId: string,
  yearsInOperation: string,
};

export type UserData = {
  __typename: "UserData",
  address: string,
  birthDate: string,
  createdAt?: string | null,
  email: string,
  firstName: string,
  gender: string,
  id: string,
  lastName: string,
  occupation: string,
  phone: string,
  updatedAt?: string | null,
};

export type ModelProspectFilterInput = {
  agency?: ModelStringInput | null,
  amountNeeded?: ModelStringInput | null,
  and?: Array< ModelProspectFilterInput | null > | null,
  annualRevenue?: ModelStringInput | null,
  businessImages?: ModelStringInput | null,
  companyAddress?: ModelStringInput | null,
  companyName?: ModelStringInput | null,
  companySize?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  department?: ModelStringInput | null,
  economicSector?: ModelStringInput | null,
  favorableTerms?: ModelStringInput | null,
  financingPurpose?: ModelStringInput | null,
  financingTypeUsed?: ModelStringInput | null,
  hadFinancingDifficulties?: ModelStringInput | null,
  id?: ModelIDInput | null,
  interestedFinancialAdvice?: ModelStringInput | null,
  interestedSpecializedPrograms?: ModelStringInput | null,
  legalForm?: ModelStringInput | null,
  locationCoordinates?: ModelStringInput | null,
  locationType?: ModelStringInput | null,
  macroRegion?: ModelStringInput | null,
  mainChallenges?: ModelStringInput | null,
  mainDifficultyReason?: ModelStringInput | null,
  municipality?: ModelStringInput | null,
  needsFinancingCurrently?: ModelStringInput | null,
  not?: ModelProspectFilterInput | null,
  or?: Array< ModelProspectFilterInput | null > | null,
  region?: ModelStringInput | null,
  registrationDate?: ModelStringInput | null,
  requestedFinancingLast3Years?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  yearsInOperation?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelProspectConnection = {
  __typename: "ModelProspectConnection",
  items:  Array<Prospect | null >,
  nextToken?: string | null,
};

export type ModelUserDataFilterInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelUserDataFilterInput | null > | null,
  birthDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserDataFilterInput | null,
  occupation?: ModelStringInput | null,
  or?: Array< ModelUserDataFilterInput | null > | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserDataConnection = {
  __typename: "ModelUserDataConnection",
  items:  Array<UserData | null >,
  nextToken?: string | null,
};

export type ModelProspectConditionInput = {
  agency?: ModelStringInput | null,
  amountNeeded?: ModelStringInput | null,
  and?: Array< ModelProspectConditionInput | null > | null,
  annualRevenue?: ModelStringInput | null,
  businessImages?: ModelStringInput | null,
  companyAddress?: ModelStringInput | null,
  companyName?: ModelStringInput | null,
  companySize?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  department?: ModelStringInput | null,
  economicSector?: ModelStringInput | null,
  favorableTerms?: ModelStringInput | null,
  financingPurpose?: ModelStringInput | null,
  financingTypeUsed?: ModelStringInput | null,
  hadFinancingDifficulties?: ModelStringInput | null,
  interestedFinancialAdvice?: ModelStringInput | null,
  interestedSpecializedPrograms?: ModelStringInput | null,
  legalForm?: ModelStringInput | null,
  locationCoordinates?: ModelStringInput | null,
  locationType?: ModelStringInput | null,
  macroRegion?: ModelStringInput | null,
  mainChallenges?: ModelStringInput | null,
  mainDifficultyReason?: ModelStringInput | null,
  municipality?: ModelStringInput | null,
  needsFinancingCurrently?: ModelStringInput | null,
  not?: ModelProspectConditionInput | null,
  or?: Array< ModelProspectConditionInput | null > | null,
  region?: ModelStringInput | null,
  registrationDate?: ModelStringInput | null,
  requestedFinancingLast3Years?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  yearsInOperation?: ModelStringInput | null,
};

export type CreateProspectInput = {
  agency?: string | null,
  amountNeeded?: string | null,
  annualRevenue: string,
  businessImages?: string | null,
  companyAddress: string,
  companyName: string,
  companySize: string,
  createdAt?: string | null,
  department: string,
  economicSector: string,
  favorableTerms?: string | null,
  financingPurpose?: string | null,
  financingTypeUsed?: string | null,
  hadFinancingDifficulties: string,
  id?: string | null,
  interestedFinancialAdvice: string,
  interestedSpecializedPrograms: string,
  legalForm: string,
  locationCoordinates?: string | null,
  locationType: string,
  macroRegion: string,
  mainChallenges?: string | null,
  mainDifficultyReason?: string | null,
  municipality: string,
  needsFinancingCurrently: string,
  region: string,
  registrationDate: string,
  requestedFinancingLast3Years: string,
  updatedAt?: string | null,
  userId: string,
  yearsInOperation: string,
};

export type ModelUserDataConditionInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelUserDataConditionInput | null > | null,
  birthDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserDataConditionInput | null,
  occupation?: ModelStringInput | null,
  or?: Array< ModelUserDataConditionInput | null > | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserDataInput = {
  address: string,
  birthDate: string,
  createdAt?: string | null,
  email: string,
  firstName: string,
  gender: string,
  id?: string | null,
  lastName: string,
  occupation: string,
  phone: string,
  updatedAt?: string | null,
};

export type DeleteProspectInput = {
  id: string,
};

export type DeleteUserDataInput = {
  id: string,
};

export type UpdateProspectInput = {
  agency?: string | null,
  amountNeeded?: string | null,
  annualRevenue?: string | null,
  businessImages?: string | null,
  companyAddress?: string | null,
  companyName?: string | null,
  companySize?: string | null,
  createdAt?: string | null,
  department?: string | null,
  economicSector?: string | null,
  favorableTerms?: string | null,
  financingPurpose?: string | null,
  financingTypeUsed?: string | null,
  hadFinancingDifficulties?: string | null,
  id: string,
  interestedFinancialAdvice?: string | null,
  interestedSpecializedPrograms?: string | null,
  legalForm?: string | null,
  locationCoordinates?: string | null,
  locationType?: string | null,
  macroRegion?: string | null,
  mainChallenges?: string | null,
  mainDifficultyReason?: string | null,
  municipality?: string | null,
  needsFinancingCurrently?: string | null,
  region?: string | null,
  registrationDate?: string | null,
  requestedFinancingLast3Years?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
  yearsInOperation?: string | null,
};

export type UpdateUserDataInput = {
  address?: string | null,
  birthDate?: string | null,
  createdAt?: string | null,
  email?: string | null,
  firstName?: string | null,
  gender?: string | null,
  id: string,
  lastName?: string | null,
  occupation?: string | null,
  phone?: string | null,
  updatedAt?: string | null,
};

export type ModelSubscriptionProspectFilterInput = {
  agency?: ModelSubscriptionStringInput | null,
  amountNeeded?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProspectFilterInput | null > | null,
  annualRevenue?: ModelSubscriptionStringInput | null,
  businessImages?: ModelSubscriptionStringInput | null,
  companyAddress?: ModelSubscriptionStringInput | null,
  companyName?: ModelSubscriptionStringInput | null,
  companySize?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  department?: ModelSubscriptionStringInput | null,
  economicSector?: ModelSubscriptionStringInput | null,
  favorableTerms?: ModelSubscriptionStringInput | null,
  financingPurpose?: ModelSubscriptionStringInput | null,
  financingTypeUsed?: ModelSubscriptionStringInput | null,
  hadFinancingDifficulties?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  interestedFinancialAdvice?: ModelSubscriptionStringInput | null,
  interestedSpecializedPrograms?: ModelSubscriptionStringInput | null,
  legalForm?: ModelSubscriptionStringInput | null,
  locationCoordinates?: ModelSubscriptionStringInput | null,
  locationType?: ModelSubscriptionStringInput | null,
  macroRegion?: ModelSubscriptionStringInput | null,
  mainChallenges?: ModelSubscriptionStringInput | null,
  mainDifficultyReason?: ModelSubscriptionStringInput | null,
  municipality?: ModelSubscriptionStringInput | null,
  needsFinancingCurrently?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionProspectFilterInput | null > | null,
  region?: ModelSubscriptionStringInput | null,
  registrationDate?: ModelSubscriptionStringInput | null,
  requestedFinancingLast3Years?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelStringInput | null,
  yearsInOperation?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserDataFilterInput = {
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserDataFilterInput | null > | null,
  birthDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  occupation?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserDataFilterInput | null > | null,
  phone?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetProspectQueryVariables = {
  id: string,
};

export type GetProspectQuery = {
  getProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type GetUserDataQueryVariables = {
  id: string,
};

export type GetUserDataQuery = {
  getUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type ListProspectsQueryVariables = {
  filter?: ModelProspectFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProspectsQuery = {
  listProspects?:  {
    __typename: "ModelProspectConnection",
    items:  Array< {
      __typename: "Prospect",
      agency?: string | null,
      amountNeeded?: string | null,
      annualRevenue: string,
      businessImages?: string | null,
      companyAddress: string,
      companyName: string,
      companySize: string,
      createdAt?: string | null,
      department: string,
      economicSector: string,
      favorableTerms?: string | null,
      financingPurpose?: string | null,
      financingTypeUsed?: string | null,
      hadFinancingDifficulties: string,
      id: string,
      interestedFinancialAdvice: string,
      interestedSpecializedPrograms: string,
      legalForm: string,
      locationCoordinates?: string | null,
      locationType: string,
      macroRegion: string,
      mainChallenges?: string | null,
      mainDifficultyReason?: string | null,
      municipality: string,
      needsFinancingCurrently: string,
      region: string,
      registrationDate: string,
      requestedFinancingLast3Years: string,
      updatedAt?: string | null,
      userId: string,
      yearsInOperation: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserDataQueryVariables = {
  filter?: ModelUserDataFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserDataQuery = {
  listUserData?:  {
    __typename: "ModelUserDataConnection",
    items:  Array< {
      __typename: "UserData",
      address: string,
      birthDate: string,
      createdAt?: string | null,
      email: string,
      firstName: string,
      gender: string,
      id: string,
      lastName: string,
      occupation: string,
      phone: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateProspectMutationVariables = {
  condition?: ModelProspectConditionInput | null,
  input: CreateProspectInput,
};

export type CreateProspectMutation = {
  createProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type CreateUserDataMutationVariables = {
  condition?: ModelUserDataConditionInput | null,
  input: CreateUserDataInput,
};

export type CreateUserDataMutation = {
  createUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteProspectMutationVariables = {
  condition?: ModelProspectConditionInput | null,
  input: DeleteProspectInput,
};

export type DeleteProspectMutation = {
  deleteProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type DeleteUserDataMutationVariables = {
  condition?: ModelUserDataConditionInput | null,
  input: DeleteUserDataInput,
};

export type DeleteUserDataMutation = {
  deleteUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateProspectMutationVariables = {
  condition?: ModelProspectConditionInput | null,
  input: UpdateProspectInput,
};

export type UpdateProspectMutation = {
  updateProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type UpdateUserDataMutationVariables = {
  condition?: ModelUserDataConditionInput | null,
  input: UpdateUserDataInput,
};

export type UpdateUserDataMutation = {
  updateUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateProspectSubscriptionVariables = {
  filter?: ModelSubscriptionProspectFilterInput | null,
  userId?: string | null,
};

export type OnCreateProspectSubscription = {
  onCreateProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type OnCreateUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnCreateUserDataSubscription = {
  onCreateUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteProspectSubscriptionVariables = {
  filter?: ModelSubscriptionProspectFilterInput | null,
  userId?: string | null,
};

export type OnDeleteProspectSubscription = {
  onDeleteProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type OnDeleteUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnDeleteUserDataSubscription = {
  onDeleteUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateProspectSubscriptionVariables = {
  filter?: ModelSubscriptionProspectFilterInput | null,
  userId?: string | null,
};

export type OnUpdateProspectSubscription = {
  onUpdateProspect?:  {
    __typename: "Prospect",
    agency?: string | null,
    amountNeeded?: string | null,
    annualRevenue: string,
    businessImages?: string | null,
    companyAddress: string,
    companyName: string,
    companySize: string,
    createdAt?: string | null,
    department: string,
    economicSector: string,
    favorableTerms?: string | null,
    financingPurpose?: string | null,
    financingTypeUsed?: string | null,
    hadFinancingDifficulties: string,
    id: string,
    interestedFinancialAdvice: string,
    interestedSpecializedPrograms: string,
    legalForm: string,
    locationCoordinates?: string | null,
    locationType: string,
    macroRegion: string,
    mainChallenges?: string | null,
    mainDifficultyReason?: string | null,
    municipality: string,
    needsFinancingCurrently: string,
    region: string,
    registrationDate: string,
    requestedFinancingLast3Years: string,
    updatedAt?: string | null,
    userId: string,
    yearsInOperation: string,
  } | null,
};

export type OnUpdateUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnUpdateUserDataSubscription = {
  onUpdateUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};
