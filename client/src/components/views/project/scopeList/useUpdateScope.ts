import { useMutation, gql } from '@apollo/client';

import { SCOPE_FRAGMENT } from '../helpers';

import { UpdateScope, UpdateScopeVariables } from './types/UpdateScope';

const UPDATE_SCOPE = gql`
  mutation UpdateScope($id: ID!, $title: String, $description: String, $niceToHave: Boolean) {
    updateScope(id: $id, title: $title, description: $description, niceToHave: $niceToHave) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useUpdateScope() {
  return useMutation<UpdateScope, UpdateScopeVariables>(UPDATE_SCOPE);
}
