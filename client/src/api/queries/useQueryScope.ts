import { useQuery, gql } from '@apollo/client';

export const SCOPE_FRAGMENT = gql`
  fragment ScopeFragment on Scope {
    id
    title
    progress
    color
    projectId
    position
    closedAt
    niceToHave
    createdAt
    updatedAt
    flag {
      id
      message
      createdBy {
        id
        name
        email
      }
    }
  }
`;

export const SCOPE_QUERY = gql`
  query Scope($id: ID!) {
    scope(id: $id) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useQueryScope(id: string) {
  return useQuery(SCOPE_QUERY, { variables: { id } });
}
