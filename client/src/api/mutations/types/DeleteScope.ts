/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteScope
// ====================================================

export interface DeleteScope_deleteScopeById {
  __typename: "Scope";
  id: string;
}

export interface DeleteScope {
  deleteScopeById: DeleteScope_deleteScopeById | null;
}

export interface DeleteScopeVariables {
  id: string;
}
