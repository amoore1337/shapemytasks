/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteFlag
// ====================================================

export interface DeleteFlag_deleteFlagById {
  __typename: "Flag";
  id: string;
}

export interface DeleteFlag {
  deleteFlagById: DeleteFlag_deleteFlagById | null;
}

export interface DeleteFlagVariables {
  id: string;
}
