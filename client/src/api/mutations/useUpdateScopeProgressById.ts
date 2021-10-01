import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { UpdateScopeProgress, UpdateScopeProgressVariables } from '@/api/mutations/types/UpdateScopeProgress';

const UPDATE_SCOPE_PROGRESS = gql`
  mutation UpdateScopeProgress($id: ID!, $progress: Float) {
    updateScope(id: $id, progress: $progress) {
      id
      title
      description
      progress
      createdAt
      updatedAt
    }
  }
`;

export default function useUpdateScopeProgressById(options?: MutationHookOptions<UpdateScopeProgress, UpdateScopeProgressVariables>) {
  return useMutation<UpdateScopeProgress, UpdateScopeProgressVariables>(UPDATE_SCOPE_PROGRESS, options);
}
