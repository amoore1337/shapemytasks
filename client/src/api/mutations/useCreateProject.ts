import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { CreateProject, CreateProjectVariables } from '@/api/mutations/types/CreateProject';
import { PROJECT_FRAGMENT } from '@/api/queries/useQueryProject';
import { addCacheItem } from '@/utils/cache';

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String $visibility: String) {
    createProject(title: $title, description: $description, visibility: $visibility) {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export default function useCreateProject(options?: Omit<MutationHookOptions<CreateProject, CreateProjectVariables>, 'update'>) {
  return useMutation(
    CREATE_PROJECT,
    { update: (cache, { data: result }) => addCacheItem<CreateProject>(cache, result, 'projects', 'createProject'), ...options },
  );
}
