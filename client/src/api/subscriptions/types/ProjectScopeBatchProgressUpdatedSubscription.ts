/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ProjectScopeBatchProgressUpdatedSubscription
// ====================================================

export interface ProjectScopeBatchProgressUpdatedSubscription_scopeBatchProgressUpdated_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ProjectScopeBatchProgressUpdatedSubscription_scopeBatchProgressUpdated_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ProjectScopeBatchProgressUpdatedSubscription_scopeBatchProgressUpdated_flag_createdBy | null;
}

export interface ProjectScopeBatchProgressUpdatedSubscription_scopeBatchProgressUpdated {
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
  flag: ProjectScopeBatchProgressUpdatedSubscription_scopeBatchProgressUpdated_flag | null;
}

export interface ProjectScopeBatchProgressUpdatedSubscription {
  scopeBatchProgressUpdated: (ProjectScopeBatchProgressUpdatedSubscription_scopeBatchProgressUpdated | null)[] | null;
}

export interface ProjectScopeBatchProgressUpdatedSubscriptionVariables {
  projectId: string;
}
