import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { UpdateScopePosition, UpdateScopePositionVariables } from '@/api/mutations/types/UpdateScopePosition';

import { SCOPE_FRAGMENT } from '../queries/useQueryScope';

const UPDATE_SCOPE_POSITION = gql`
  mutation UpdateScopePosition($id: ID!, $targetIndex: Int!) {
    updateScopePosition(id: $id, targetIndex: $targetIndex) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useUpdateScopePosition(options?: MutationHookOptions<UpdateScopePosition, UpdateScopePositionVariables>) {
  return useMutation<UpdateScopePosition, UpdateScopePositionVariables>(UPDATE_SCOPE_POSITION, options);
}
