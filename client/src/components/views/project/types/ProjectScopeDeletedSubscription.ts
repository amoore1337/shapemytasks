/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeDeletedSubscription
// ====================================================

export interface ProjectScopeDeletedSubscription_scopeDeleted_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ProjectScopeDeletedSubscription_scopeDeleted_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ProjectScopeDeletedSubscription_scopeDeleted_flag_createdBy | null;
}

export interface ProjectScopeDeletedSubscription_scopeDeleted {
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
  flag: ProjectScopeDeletedSubscription_scopeDeleted_flag | null;
}

export interface ProjectScopeDeletedSubscription {
  scopeDeleted: ProjectScopeDeletedSubscription_scopeDeleted | null;
}

export interface ProjectScopeDeletedSubscriptionVariables {
  projectId: string;
}
