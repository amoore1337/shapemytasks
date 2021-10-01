/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScopePosition
// ====================================================

export interface UpdateScopePosition_updateScopePosition_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface UpdateScopePosition_updateScopePosition_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: UpdateScopePosition_updateScopePosition_flag_createdBy | null;
}

export interface UpdateScopePosition_updateScopePosition {
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
  flag: UpdateScopePosition_updateScopePosition_flag | null;
}

export interface UpdateScopePosition {
  updateScopePosition: UpdateScopePosition_updateScopePosition | null;
}

export interface UpdateScopePositionVariables {
  id: string;
  targetIndex: number;
}
