/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveProject
// ====================================================

export interface SaveProject_createProject {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
}

export interface SaveProject {
  createProject: SaveProject_createProject | null;
}

export interface SaveProjectVariables {
  title: string;
  description?: string | null;
}
