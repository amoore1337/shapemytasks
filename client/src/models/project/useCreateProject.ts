import { gql } from '@/apollo';
import type { CreateProjectMutation, CreateProjectMutationVariables } from '@/models/types';
import { addCacheItem } from '@/utils/cache';
import type { MutationHookOptions } from '@apollo/client';
import { useMutation } from '@apollo/client';

export const CREATE_PROJECT = gql(`
  mutation CreateProject($title: String!, $description: String $visibility: String) {
    createProject(title: $title, description: $description, visibility: $visibility) {
      ...ProjectFragment
    }
  }
`);

export function useCreateProject(
  options?: Omit<
    MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
    'update'
  >
) {
  return useMutation(CREATE_PROJECT, {
    update: (cache, { data: result }) => addCacheItem(cache, result, 'projects', 'createProject'),
    ...options,
  });
}
