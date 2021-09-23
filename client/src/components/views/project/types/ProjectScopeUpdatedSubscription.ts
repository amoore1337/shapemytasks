/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeUpdatedSubscription
// ====================================================

export interface ProjectScopeUpdatedSubscription_scopeUpdated_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ProjectScopeUpdatedSubscription_scopeUpdated_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ProjectScopeUpdatedSubscription_scopeUpdated_flag_createdBy | null;
}

export interface ProjectScopeUpdatedSubscription_scopeUpdated {
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
  flag: ProjectScopeUpdatedSubscription_scopeUpdated_flag | null;
}

export interface ProjectScopeUpdatedSubscription {
  scopeUpdated: ProjectScopeUpdatedSubscription_scopeUpdated | null;
}

export interface ProjectScopeUpdatedSubscriptionVariables {
  projectId: string;
}
