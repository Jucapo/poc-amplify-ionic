/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProspect = /* GraphQL */ `query GetProspect($id: ID!) {
  getProspect(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProspectQueryVariables,
  APITypes.GetProspectQuery
>;
export const getUserData = /* GraphQL */ `query GetUserData($id: ID!) {
  getUserData(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserDataQueryVariables,
  APITypes.GetUserDataQuery
>;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    createdAt
    email
    id
    role
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listProspects = /* GraphQL */ `query ListProspects(
  $filter: ModelProspectFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProspects(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProspectsQueryVariables,
  APITypes.ListProspectsQuery
>;
export const listUserData = /* GraphQL */ `query ListUserData(
  $filter: ModelUserDataFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserData(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserDataQueryVariables,
  APITypes.ListUserDataQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserProfiles(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      id
      role
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
