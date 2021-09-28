import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { DeleteProject, DeleteProjectVariables } from '@/api/mutations/types/DeleteProject';
import { removeCacheItem } from '@/utils/cache';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProjectById(id: $id) {
      id
    }
  }
`;

export default function useDeleteProject(options?: Omit<MutationHookOptions<DeleteProject, DeleteProjectVariables>, 'update'>) {
  return useMutation(
    DELETE_PROJECT,
    {
      update: (cache, { data: result }) => (removeCacheItem<DeleteProject>(cache, result, 'projects', 'deleteProjectById')),
      ...options,
    },
  );
}
