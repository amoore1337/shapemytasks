import { MutationHookOptions, useMutation } from '@apollo/client';

import { gql } from '@/apollo';
import { UpdateProjectMutation, UpdateProjectMutationVariables } from '@/models/types';

const UPDATE_PROJECT = gql(`
  mutation UpdateProject($id: ID!, $title: String, $description: String) {
    updateProject(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`);

export function useUpdateProject(options?: MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
  return useMutation(UPDATE_PROJECT, options);
}
