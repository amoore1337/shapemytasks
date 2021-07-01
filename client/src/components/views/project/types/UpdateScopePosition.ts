/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScopePosition
// ====================================================

export interface UpdateScopePosition_updateScopePosition {
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

export interface UpdateScopePosition {
  updateScopePosition: UpdateScopePosition_updateScopePosition | null;
}

export interface UpdateScopePositionVariables {
  id: string;
  targetIndex: number;
}
