/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTeam
// ====================================================

export interface CreateTeam_createTeam {
  __typename: "Team";
  id: string;
  name: string | null;
}

export interface CreateTeam {
  createTeam: CreateTeam_createTeam | null;
}

export interface CreateTeamVariables {
  name: string;
}
