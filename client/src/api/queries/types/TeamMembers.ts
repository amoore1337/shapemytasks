/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamMembers
// ====================================================

export interface TeamMembers_team_members {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface TeamMembers_team {
  __typename: "Team";
  id: string;
  members: (TeamMembers_team_members | null)[] | null;
}

export interface TeamMembers {
  team: TeamMembers_team | null;
}

export interface TeamMembersVariables {
  id: string;
}
