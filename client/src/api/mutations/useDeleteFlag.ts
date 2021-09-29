import { gql, useMutation } from '@apollo/client';

import { DeleteFlag, DeleteFlagVariables } from '@/api/mutations/types/DeleteFlag';

const DELETE_FLAG = gql`
mutation DeleteFlag($id: ID!) {
  deleteFlagById(id: $id) {
    id
  }
}
`;

export default function useDeleteFlag() {
  return useMutation<DeleteFlag, DeleteFlagVariables>(DELETE_FLAG);
}
