import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { JoinTeamMutation, JoinTeamMutationVariables } from '@/models/types';

const CREATE_OR_JOIN_TEAM = gql(`
  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {
    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {
      id
      email
      name
      avatarUrl

      team {
        id
        name
        joinCode
      }
    }

    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {
      id
      email
      name
      avatarUrl

      team {
        id
        name
        joinCode
      }
    }
  }
`);

export function useCreateOrJoinTeam(options?: MutationHookOptions<JoinTeamMutation, JoinTeamMutationVariables>) {
  return useMutation(CREATE_OR_JOIN_TEAM, options);
}
