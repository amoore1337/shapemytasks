/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_team {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface CurrentUser_currentUser {
  __typename: "CurrentUser";
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  team: CurrentUser_currentUser_team | null;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser | null;
}
