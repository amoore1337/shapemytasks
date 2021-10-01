/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectFragment
// ====================================================

export interface ProjectFragment_scopes_flag_createdBy {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface ProjectFragment_scopes_flag {
  __typename: "Flag";
  id: string;
  message: string | null;
  createdBy: ProjectFragment_scopes_flag_createdBy | null;
}

export interface ProjectFragment_scopes {
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
  flag: ProjectFragment_scopes_flag | null;
}

export interface ProjectFragment {
  __typename: "Project";
  id: string;
  title: string | null;
  description: string | null;
  visibility: string | null;
  scopes: (ProjectFragment_scopes | null)[] | null;
}
