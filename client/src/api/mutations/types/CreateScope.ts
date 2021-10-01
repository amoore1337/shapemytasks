/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateScope
// ====================================================

export interface CreateScope_createScope_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface CreateScope_createScope_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: CreateScope_createScope_flag_createdBy | null;
}

export interface CreateScope_createScope {
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
  flag: CreateScope_createScope_flag | null;
}

export interface CreateScope {
  createScope: CreateScope_createScope | null;
}

export interface CreateScopeVariables {
  title: string;
  description?: string | null;
  color?: string | null;
  projectId: string;
}
