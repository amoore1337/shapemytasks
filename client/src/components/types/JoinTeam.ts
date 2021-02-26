/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinTeam
// ====================================================

export interface JoinTeam_joinTeam {
  __typename: "Team";
  id: string;
}

export interface JoinTeam {
  joinTeam: JoinTeam_joinTeam | null;
}

export interface JoinTeamVariables {
  joinCode: string;
}
