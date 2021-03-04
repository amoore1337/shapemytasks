/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectDetails
// ====================================================

export interface ProjectDetails_project {
  __typename: "Project";
  title: string | null;
  description: string | null;
}

export interface ProjectDetails {
  project: ProjectDetails_project | null;
}

export interface ProjectDetailsVariables {
  id: string;
}
