import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { JoinTeamMutation, JoinTeamMutationVariables } from '@/models/types';

const CREATE_OR_JOIN_TEAM = gql(`
  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {
    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {
      ...CurrentUserFragment
    }

    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {
      ...CurrentUserFragment
    }
  }
`);

export function useCreateOrJoinTeam(options?: MutationHookOptions<JoinTeamMutation, JoinTeamMutationVariables>) {
  return useMutation(CREATE_OR_JOIN_TEAM, options);
}
