import { gql, useMutation } from '@apollo/client';

import { DeleteScope, DeleteScopeVariables } from '@/api/mutations/types/DeleteScope';
import { removeCacheItem } from '@/utils/cache';

const DELETE_SCOPE = gql`
mutation DeleteScope($id: ID!) {
  deleteScopeById(id: $id) {
    id
  }
}
`;

export default function useDeleteScope(projectId?: string | null) {
  return useMutation<DeleteScope, DeleteScopeVariables>(
    DELETE_SCOPE,
    {
      update: (cache, { data: result }) => (
        projectId && removeCacheItem<DeleteScope>(cache, result, 'scopes', 'deleteScopeById', `Project:${projectId}`)
      ),
    },
  );
}
