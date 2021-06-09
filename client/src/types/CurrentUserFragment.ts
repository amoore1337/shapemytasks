/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CurrentUserFragment
// ====================================================

export interface CurrentUserFragment_team {
  __typename: "Team";
  id: string;
  name: string | null;
  joinCode: string | null;
}

export interface CurrentUserFragment {
  __typename: "CurrentUser";
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  team: CurrentUserFragment_team | null;
}
