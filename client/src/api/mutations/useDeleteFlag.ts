import { gql, useApolloClient, useMutation } from '@apollo/client';

import { DeleteFlag, DeleteFlagVariables } from '@/api/mutations/types/DeleteFlag';

const DELETE_FLAG = gql`
mutation DeleteFlag($id: ID!) {
  deleteFlagById(id: $id) {
    id
  }
}
`;

export default function useDeleteFlag() {
  const client = useApolloClient();

  return useMutation<DeleteFlag, DeleteFlagVariables>(
    DELETE_FLAG,
    {
      update: (cache, _, { variables }) => {
        const flagRef = `Flag:${variables?.id}`;
        const existingFlag = client.readFragment({
          id: flagRef,
          fragment: gql`
            fragment ExistingFlag on Flag {
              id
              scopeId
            }
          `,
        });

        if (existingFlag) {
          cache.modify({
            id: `Scope:${existingFlag.scopeId}`,
            fields: {
              flag: () => null,
            },
          });
        }
        cache.evict({ id: flagRef });
      },
    },
  );
}
