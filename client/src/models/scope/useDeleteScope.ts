import { useMutation } from '@apollo/client';

import { removeCacheItem } from '@/utils/cache';

import { DeleteScopeDocument } from '../__generated__/graphql';

export function useDeleteScope(projectId?: string | null) {
  return useMutation(
    DeleteScopeDocument,
    {
      update: (cache, { data: result }) => (
        projectId && removeCacheItem(cache, result, 'scopes', 'deleteScopeById', `Project:${projectId}`)
      ),
    },
  );
}
