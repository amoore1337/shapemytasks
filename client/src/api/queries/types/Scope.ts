/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scope
// ====================================================

export interface Scope_scope_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface Scope_scope_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: Scope_scope_flag_createdBy | null;
}

export interface Scope_scope {
  __typename: "Scope";
  id: string;
  title: string | null;
  progress: number;
  color: string;
  projectId: string | null;
  position: string | null;
  closedAt: any | null;
  niceToHave: boolean | null;
  createdAt: any;
  updatedAt: any;
  flag: Scope_scope_flag | null;
}

export interface Scope {
  scope: Scope_scope | null;
}

export interface ScopeVariables {
  id: string;
}
