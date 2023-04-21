import type { MutationHookOptions} from '@apollo/client';
import { useMutation } from '@apollo/client';

import { gql } from '@/apollo';
import type { DeleteProjectMutation, DeleteProjectMutationVariables } from '@/models/types';
import { removeCacheItem } from '@/utils/cache';

export const DELETE_PROJECT = gql(`
  mutation DeleteProject($id: ID!) {
    deleteProjectById(id: $id) {
      id
    }
  }
`);

export function useDeleteProject(
  options?: Omit<
    MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>,
    'update'
  >
) {
  return useMutation(DELETE_PROJECT, {
    update: (cache, { data: result }) =>
      removeCacheItem(cache, result, 'projects', 'deleteProjectById'),
    ...options,
  });
}
