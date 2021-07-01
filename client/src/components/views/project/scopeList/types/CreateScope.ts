/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateScope
// ====================================================

export interface CreateScope_createScope {
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
