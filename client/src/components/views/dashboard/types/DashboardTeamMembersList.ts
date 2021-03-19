/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardTeamMembersList
// ====================================================

export interface DashboardTeamMembersList_currentUser_team_members {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface DashboardTeamMembersList_currentUser_team {
  __typename: "Team";
  id: string;
  members: (DashboardTeamMembersList_currentUser_team_members | null)[] | null;
}

export interface DashboardTeamMembersList_currentUser {
  __typename: "CurrentUser";
  id: string;
  team: DashboardTeamMembersList_currentUser_team | null;
}

export interface DashboardTeamMembersList {
  currentUser: DashboardTeamMembersList_currentUser | null;
}
