/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryEditScope
// ====================================================

export interface QueryEditScope_scope {
  __typename: "Scope";
  id: string;
  title: string | null;
}

export interface QueryEditScope {
  scope: QueryEditScope_scope | null;
}

export interface QueryEditScopeVariables {
  id: string;
}
