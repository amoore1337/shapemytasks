/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScope
// ====================================================

export interface UpdateScope_updateScope_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface UpdateScope_updateScope_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: UpdateScope_updateScope_flag_createdBy | null;
}

export interface UpdateScope_updateScope {
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
  flag: UpdateScope_updateScope_flag | null;
}

export interface UpdateScope {
  updateScope: UpdateScope_updateScope | null;
}

export interface UpdateScopeVariables {
  id: string;
  title?: string | null;
  description?: string | null;
  niceToHave?: boolean | null;
}
