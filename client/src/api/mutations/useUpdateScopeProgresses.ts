import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { UpdateScopeProgresses, UpdateScopeProgressesVariables } from '@/api/mutations/types/UpdateScopeProgresses';

import { SCOPE_FRAGMENT } from '../queries/useQueryScope';

const UPDATE_SCOPE_PROGRESSES = gql`
  mutation UpdateScopeProgresses($inputs: [BatchUpdateScopeProgressMap!]!) {
    batchUpdateScopeProgress(inputs: $inputs) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useUpdateScopeProgresses(options?: MutationHookOptions<UpdateScopeProgresses, UpdateScopeProgressesVariables>) {
  return useMutation<UpdateScopeProgresses, UpdateScopeProgressesVariables>(UPDATE_SCOPE_PROGRESSES, options);
}
