/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinTeam
// ====================================================

export interface JoinTeam_createTeam {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface JoinTeam_joinTeam {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface JoinTeam {
  createTeam: JoinTeam_createTeam | null;
  joinTeam: JoinTeam_joinTeam | null;
}

export interface JoinTeamVariables {
  name: string;
  joinCode: string;
  joinTeam: boolean;
}
