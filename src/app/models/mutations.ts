/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProspect = /* GraphQL */ `mutation CreateProspect(
  $condition: ModelProspectConditionInput
  $input: CreateProspectInput!
) {
  createProspect(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateProspectMutationVariables,
  APITypes.CreateProspectMutation
>;
export const createUserData = /* GraphQL */ `mutation CreateUserData(
  $condition: ModelUserDataConditionInput
  $input: CreateUserDataInput!
) {
  createUserData(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserDataMutationVariables,
  APITypes.CreateUserDataMutation
>;
export const deleteProspect = /* GraphQL */ `mutation DeleteProspect(
  $condition: ModelProspectConditionInput
  $input: DeleteProspectInput!
) {
  deleteProspect(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteProspectMutationVariables,
  APITypes.DeleteProspectMutation
>;
export const deleteUserData = /* GraphQL */ `mutation DeleteUserData(
  $condition: ModelUserDataConditionInput
  $input: DeleteUserDataInput!
) {
  deleteUserData(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserDataMutationVariables,
  APITypes.DeleteUserDataMutation
>;
export const updateProspect = /* GraphQL */ `mutation UpdateProspect(
  $condition: ModelProspectConditionInput
  $input: UpdateProspectInput!
) {
  updateProspect(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateProspectMutationVariables,
  APITypes.UpdateProspectMutation
>;
export const updateUserData = /* GraphQL */ `mutation UpdateUserData(
  $condition: ModelUserDataConditionInput
  $input: UpdateUserDataInput!
) {
  updateUserData(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserDataMutationVariables,
  APITypes.UpdateUserDataMutation
>;
