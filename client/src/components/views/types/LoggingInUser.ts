/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoggingInUser
// ====================================================

export interface LoggingInUser_currentUser_team {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface LoggingInUser_currentUser {
  __typename: "CurrentUser";
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  team: LoggingInUser_currentUser_team | null;
}

export interface LoggingInUser {
  currentUser: LoggingInUser_currentUser | null;
}
