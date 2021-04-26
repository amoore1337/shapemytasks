/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: JumpToProjectOptions
// ====================================================

export interface JumpToProjectOptions_projects {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  visibility: string | null;
}

export interface JumpToProjectOptions {
  projects: (JumpToProjectOptions_projects | null)[] | null;
}
