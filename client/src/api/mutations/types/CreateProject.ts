/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProject
// ====================================================

export interface CreateProject_createProject_scopes_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface CreateProject_createProject_scopes_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: CreateProject_createProject_scopes_flag_createdBy | null;
}

export interface CreateProject_createProject_scopes {
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
  flag: CreateProject_createProject_scopes_flag | null;
}

export interface CreateProject_createProject {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  visibility: string | null;
  scopes: (CreateProject_createProject_scopes | null)[] | null;
}

export interface CreateProject {
  createProject: CreateProject_createProject | null;
}

export interface CreateProjectVariables {
  title: string;
  description?: string | null;
  visibility?: string | null;
}
