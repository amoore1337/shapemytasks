/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BatchUpdateScopeProgressMap } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScopeProgresses
// ====================================================

export interface UpdateScopeProgresses_batchUpdateScopeProgress {
  __typename: "Scope";
  id: string;
  title: string | null;
  progress: number;
  color: string;
  projectId: string | null;
}

export interface UpdateScopeProgresses {
  batchUpdateScopeProgress: (UpdateScopeProgresses_batchUpdateScopeProgress | null)[] | null;
}

export interface UpdateScopeProgressesVariables {
  inputs: BatchUpdateScopeProgressMap[];
}
