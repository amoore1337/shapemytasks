/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllProjects
// ====================================================

export interface AllProjects_projects {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  visibility: string | null;
}

export interface AllProjects {
  projects: (AllProjects_projects | null)[] | null;
}
