import { useMutation, gql } from '@apollo/client';

import { CreateScope, CreateScopeVariables } from '@/api/mutations/types/CreateScope';
import { SCOPE_FRAGMENT } from '@/api/queries/useQueryScope';
import { addCacheItem } from '@/utils/cache';

const CREATE_SCOPE = gql`
  mutation CreateScope($title: String!, $description: String, $color: String, $projectId: ID!) {
    createScope(title: $title, description: $description, color: $color, projectId: $projectId) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useCreateScope(projectId?: string) {
  return useMutation<CreateScope, CreateScopeVariables>(
    CREATE_SCOPE,
    { update: (cache, { data: result }) => projectId && addCacheItem<CreateScope>(cache, result, 'scopes', 'createScope', `Project:${projectId}`) },
  );
}
