import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { UpdateProject, UpdateProjectVariables } from '@/api/mutations/types/UpdateProject';

const UPDATE_PROJECT = gql`
mutation UpdateProject($id: ID!, $title: String, $description: String) {
  updateProject(id: $id, title: $title, description: $description) {
    id
    title
    description
  }
}
`;

export default function useUpdateProject(options?: MutationHookOptions<UpdateProject, UpdateProjectVariables>) {
  return useMutation(UPDATE_PROJECT, options);
}
