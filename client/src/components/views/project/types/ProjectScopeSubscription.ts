/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeSubscription
// ====================================================

export interface ProjectScopeSubscription_scopeCreated {
  __typename: "Scope";
  id: string;
  title: string | null;
  progress: number;
  color: string;
  projectId: string | null;
  position: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface ProjectScopeSubscription {
  scopeCreated: ProjectScopeSubscription_scopeCreated | null;
}

export interface ProjectScopeSubscriptionVariables {
  projectId: string;
}
