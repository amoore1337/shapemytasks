/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScope
// ====================================================

export interface UpdateScope_updateScope {
  __typename: "Scope";
  id: string;
  title: string | null;
  description: string | null;
}

export interface UpdateScope {
  updateScope: UpdateScope_updateScope | null;
}

export interface UpdateScopeVariables {
  id: string;
  title?: string | null;
  description?: string | null;
}
