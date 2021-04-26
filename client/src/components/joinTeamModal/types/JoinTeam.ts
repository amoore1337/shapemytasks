/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinTeam
// ====================================================

export interface JoinTeam_createTeam_team {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface JoinTeam_createTeam {
  __typename: "CurrentUser";
  id: string;
  team: JoinTeam_createTeam_team | null;
}

export interface JoinTeam_joinTeam_team {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface JoinTeam_joinTeam {
  __typename: "CurrentUser";
  id: string;
  team: JoinTeam_joinTeam_team | null;
}

export interface JoinTeam {
  createTeam: JoinTeam_createTeam | null;
  joinTeam: JoinTeam_joinTeam | null;
}

export interface JoinTeamVariables {
  name: string;
  joinCode: string;
  joinTeam: boolean;
  restrictEmailDomain?: string | null;
}
