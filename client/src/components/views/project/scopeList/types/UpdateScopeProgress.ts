/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScopeProgress
// ====================================================

export interface UpdateScopeProgress_updateScope {
  __typename: "Scope";
  id: string;
  title: string | null;
  description: string | null;
  progress: number;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateScopeProgress {
  updateScope: UpdateScopeProgress_updateScope | null;
}

export interface UpdateScopeProgressVariables {
  id: string;
  progress?: number | null;
}
