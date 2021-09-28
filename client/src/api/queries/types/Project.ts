/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Project
// ====================================================

export interface Project_project_scopes_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface Project_project_scopes_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: Project_project_scopes_flag_createdBy | null;
}

export interface Project_project_scopes {
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
  flag: Project_project_scopes_flag | null;
}

export interface Project_project {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  visibility: string | null;
  scopes: (Project_project_scopes | null)[] | null;
}

export interface Project {
  project: Project_project | null;
}

export interface ProjectVariables {
  id: string;
}
