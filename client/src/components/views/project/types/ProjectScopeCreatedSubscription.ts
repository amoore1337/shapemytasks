/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeCreatedSubscription
// ====================================================

export interface ProjectScopeCreatedSubscription_scopeCreated_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ProjectScopeCreatedSubscription_scopeCreated_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ProjectScopeCreatedSubscription_scopeCreated_flag_createdBy | null;
}

export interface ProjectScopeCreatedSubscription_scopeCreated {
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
  flag: ProjectScopeCreatedSubscription_scopeCreated_flag | null;
}

export interface ProjectScopeCreatedSubscription {
  scopeCreated: ProjectScopeCreatedSubscription_scopeCreated | null;
}

export interface ProjectScopeCreatedSubscriptionVariables {
  projectId: string;
}
