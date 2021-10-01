import { useMutation, gql } from '@apollo/client';

import { CreateFlag, CreateFlagVariables } from '@/api/mutations/types/CreateFlag';

const CREATE_FLAG = gql`
mutation CreateFlag($scopeId: ID!, $message: String) {
  createFlag(scopeId: $scopeId, message: $message) {
    id
    message
    scopeId
  }
}
`;

export default function useCreateFlag() {
  return useMutation<CreateFlag, CreateFlagVariables>(
    CREATE_FLAG,
  );
}
