/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Projects
// ====================================================

export interface Projects_projects {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  visibility: string | null;
}

export interface Projects {
  projects: (Projects_projects | null)[] | null;
}
