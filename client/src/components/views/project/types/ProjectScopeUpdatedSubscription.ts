/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeUpdatedSubscription
// ====================================================

export interface ProjectScopeUpdatedSubscription_scopeUpdated {
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

export interface ProjectScopeUpdatedSubscription {
  scopeUpdated: ProjectScopeUpdatedSubscription_scopeUpdated | null;
}

export interface ProjectScopeUpdatedSubscriptionVariables {
  projectId: string;
}
