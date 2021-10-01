import { useQuery, gql } from '@apollo/client';

import { SCOPE_FRAGMENT } from '@/api/queries/useQueryScope';

export const SCOPES_QUERY = gql`
  query Scopes {
    scopes {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useQueryScopes() {
  return useQuery(SCOPES_QUERY);
}
