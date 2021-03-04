/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteProject
// ====================================================

export interface DeleteProject_deleteProjectById {
  __typename: "Project";
  id: string;
}

export interface DeleteProject {
  deleteProjectById: DeleteProject_deleteProjectById | null;
}

export interface DeleteProjectVariables {
  id: string;
}
