import { useMutation } from '@apollo/client';

import { addCacheItem } from '@/utils/cache';

import { CreateScopeDocument } from '../__generated__/graphql';

export function useCreateScope(projectId?: string) {
  return useMutation(
    CreateScopeDocument,
    { update: (cache, { data: result }) => projectId && addCacheItem(cache, result, 'scopes', 'createScope', `Project:${projectId}`) },
  );
}
