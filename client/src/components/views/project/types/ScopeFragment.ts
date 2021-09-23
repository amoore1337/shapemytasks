/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ScopeFragment
// ====================================================

export interface ScopeFragment_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ScopeFragment_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ScopeFragment_flag_createdBy | null;
}

export interface ScopeFragment {
  __typename: "Scope";
  id: string;
  title: string | null;
  progress: number;
  color: string;
  projectId: string | null;
  position: string | null;
  closedAt: any | null;
  createdAt: any;
  updatedAt: any;
  flag: ScopeFragment_flag | null;
}
