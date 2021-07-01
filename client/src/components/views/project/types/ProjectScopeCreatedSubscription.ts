/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeCreatedSubscription
// ====================================================

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
}

export interface ProjectScopeCreatedSubscription {
  scopeCreated: ProjectScopeCreatedSubscription_scopeCreated | null;
}

export interface ProjectScopeCreatedSubscriptionVariables {
  projectId: string;
}
