/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateFlag
// ====================================================

export interface CreateFlag_createFlag {
  __typename: "Flag";
  id: string;
  message: string | null;
  scopeId: number | null;
}

export interface CreateFlag {
  createFlag: CreateFlag_createFlag | null;
}

export interface CreateFlagVariables {
  scopeId: string;
  message?: string | null;
}
