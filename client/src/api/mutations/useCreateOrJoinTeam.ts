import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { CURRENT_USER_FRAGMENT } from '@/api/queries/useLazyQueryCurrentUser';

import { JoinTeam, JoinTeamVariables } from './types/JoinTeam';

const CREATE_OR_JOIN_TEAM = gql`
  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {
    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {
      ...CurrentUserFragment
    }

    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {
      ...CurrentUserFragment
    }
  }

  ${CURRENT_USER_FRAGMENT}
`;

export default function useCreateOrJoinTeam(options?: MutationHookOptions<JoinTeam, JoinTeamVariables>) {
  return useMutation<JoinTeam, JoinTeamVariables>(CREATE_OR_JOIN_TEAM, options);
}
