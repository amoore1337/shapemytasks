import { useMutation, gql } from '@apollo/client';

import { UpdateScope, UpdateScopeVariables } from '@/api/mutations/types/UpdateScope';
import { SCOPE_FRAGMENT } from '@/api/queries/useQueryScope';

const UPDATE_SCOPE = gql`
  mutation UpdateScope($id: ID!, $title: String, $description: String, $niceToHave: Boolean, $color: String) {
    updateScope(id: $id, title: $title, description: $description, niceToHave: $niceToHave color: $color) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useUpdateScope() {
  return useMutation<UpdateScope, UpdateScopeVariables>(UPDATE_SCOPE);
}
