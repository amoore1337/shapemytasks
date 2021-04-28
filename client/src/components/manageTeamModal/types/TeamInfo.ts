/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamInfo
// ====================================================

export interface TeamInfo_team {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface TeamInfo {
  __typename: "CurrentUser";
  id: string;
  team: TeamInfo_team | null;
}
