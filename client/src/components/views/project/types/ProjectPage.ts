/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectPage
// ====================================================

export interface ProjectPage_project_scopes_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ProjectPage_project_scopes_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ProjectPage_project_scopes_flag_createdBy | null;
}

export interface ProjectPage_project_scopes {
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
  flag: ProjectPage_project_scopes_flag | null;
}

export interface ProjectPage_project {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  scopes: (ProjectPage_project_scopes | null)[] | null;
}

export interface ProjectPage {
  project: ProjectPage_project | null;
}

export interface ProjectPageVariables {
  id: string;
}
