import { useQuery } from '@apollo/client';

import { ScopeDocument } from '../__generated__/graphql';

export default function useQueryScope(id: string) {
  return useQuery(ScopeDocument, { variables: { id } });
}
