/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scopes
// ====================================================

export interface Scopes_scopes_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface Scopes_scopes_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: Scopes_scopes_flag_createdBy | null;
}

export interface Scopes_scopes {
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
  flag: Scopes_scopes_flag | null;
}

export interface Scopes {
  scopes: (Scopes_scopes | null)[] | null;
}
