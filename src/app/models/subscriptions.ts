/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProspect = /* GraphQL */ `subscription OnCreateProspect(
  $filter: ModelSubscriptionProspectFilterInput
  $userId: String
) {
  onCreateProspect(filter: $filter, userId: $userId) {
    agency
    amountNeeded
    annualRevenue
    businessImages
    companyAddress
    companyName
    companySize
    createdAt
    department
    economicSector
    favorableTerms
    financingPurpose
    financingTypeUsed
    hadFinancingDifficulties
    id
    interestedFinancialAdvice
    interestedSpecializedPrograms
    legalForm
    locationCoordinates
    locationType
    macroRegion
    mainChallenges
    mainDifficultyReason
    municipality
    needsFinancingCurrently
    region
    registrationDate
    requestedFinancingLast3Years
    updatedAt
    userId
    yearsInOperation
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProspectSubscriptionVariables,
  APITypes.OnCreateProspectSubscription
>;
export const onCreateUserData = /* GraphQL */ `subscription OnCreateUserData($filter: ModelSubscriptionUserDataFilterInput) {
  onCreateUserData(filter: $filter) {
    address
    birthDate
    createdAt
    email
    firstName
    gender
    id
    lastName
    occupation
    phone
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserDataSubscriptionVariables,
  APITypes.OnCreateUserDataSubscription
>;
export const onDeleteProspect = /* GraphQL */ `subscription OnDeleteProspect(
  $filter: ModelSubscriptionProspectFilterInput
  $userId: String
) {
  onDeleteProspect(filter: $filter, userId: $userId) {
    agency
    amountNeeded
    annualRevenue
    businessImages
    companyAddress
    companyName
    companySize
    createdAt
    department
    economicSector
    favorableTerms
    financingPurpose
    financingTypeUsed
    hadFinancingDifficulties
    id
    interestedFinancialAdvice
    interestedSpecializedPrograms
    legalForm
    locationCoordinates
    locationType
    macroRegion
    mainChallenges
    mainDifficultyReason
    municipality
    needsFinancingCurrently
    region
    registrationDate
    requestedFinancingLast3Years
    updatedAt
    userId
    yearsInOperation
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProspectSubscriptionVariables,
  APITypes.OnDeleteProspectSubscription
>;
export const onDeleteUserData = /* GraphQL */ `subscription OnDeleteUserData($filter: ModelSubscriptionUserDataFilterInput) {
  onDeleteUserData(filter: $filter) {
    address
    birthDate
    createdAt
    email
    firstName
    gender
    id
    lastName
    occupation
    phone
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserDataSubscriptionVariables,
  APITypes.OnDeleteUserDataSubscription
>;
export const onUpdateProspect = /* GraphQL */ `subscription OnUpdateProspect(
  $filter: ModelSubscriptionProspectFilterInput
  $userId: String
) {
  onUpdateProspect(filter: $filter, userId: $userId) {
    agency
    amountNeeded
    annualRevenue
    businessImages
    companyAddress
    companyName
    companySize
    createdAt
    department
    economicSector
    favorableTerms
    financingPurpose
    financingTypeUsed
    hadFinancingDifficulties
    id
    interestedFinancialAdvice
    interestedSpecializedPrograms
    legalForm
    locationCoordinates
    locationType
    macroRegion
    mainChallenges
    mainDifficultyReason
    municipality
    needsFinancingCurrently
    region
    registrationDate
    requestedFinancingLast3Years
    updatedAt
    userId
    yearsInOperation
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProspectSubscriptionVariables,
  APITypes.OnUpdateProspectSubscription
>;
export const onUpdateUserData = /* GraphQL */ `subscription OnUpdateUserData($filter: ModelSubscriptionUserDataFilterInput) {
  onUpdateUserData(filter: $filter) {
    address
    birthDate
    createdAt
    email
    firstName
    gender
    id
    lastName
    occupation
    phone
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserDataSubscriptionVariables,
  APITypes.OnUpdateUserDataSubscription
>;
