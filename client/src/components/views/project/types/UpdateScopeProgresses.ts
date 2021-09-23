/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BatchUpdateScopeProgressMap } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScopeProgresses
// ====================================================

export interface UpdateScopeProgresses_batchUpdateScopeProgress_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface UpdateScopeProgresses_batchUpdateScopeProgress_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: UpdateScopeProgresses_batchUpdateScopeProgress_flag_createdBy | null;
}

export interface UpdateScopeProgresses_batchUpdateScopeProgress {
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
  flag: UpdateScopeProgresses_batchUpdateScopeProgress_flag | null;
}

export interface UpdateScopeProgresses {
  batchUpdateScopeProgress: (UpdateScopeProgresses_batchUpdateScopeProgress | null)[] | null;
}

export interface UpdateScopeProgressesVariables {
  inputs: BatchUpdateScopeProgressMap[];
}
