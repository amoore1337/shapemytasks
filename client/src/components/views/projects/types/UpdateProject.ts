/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProject
// ====================================================

export interface UpdateProject_updateProject {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
}

export interface UpdateProject {
  updateProject: UpdateProject_updateProject | null;
}

export interface UpdateProjectVariables {
  id: string;
  title?: string | null;
  description?: string | null;
}
