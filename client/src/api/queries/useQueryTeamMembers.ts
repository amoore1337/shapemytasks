import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { TeamMembers, TeamMembersVariables } from '@/api/queries/types/TeamMembers';

const FETCH_TEAM_MEMBERS = gql`
  query TeamMembers($id: ID!) {
    team(id: $id) {
      id
      members {
        id
        name
        email
      }
    }
  }
`;

export default function useQueryTeamMembers(teamId: string, options?: Omit<QueryHookOptions<TeamMembers, TeamMembersVariables>, 'variables'>) {
  return useQuery<TeamMembers, TeamMembersVariables>(FETCH_TEAM_MEMBERS, { variables: { id: teamId, ...options } });
}
