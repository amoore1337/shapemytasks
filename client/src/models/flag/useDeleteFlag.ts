import { useApolloClient, useMutation } from '@apollo/client';

import { gql } from '@/apollo';

const DELETE_FLAG = gql(`
  mutation DeleteFlag($id: ID!) {
    deleteFlagById(id: $id) {
      id
    }
  }
`);

export function useDeleteFlag() {
  const client = useApolloClient();

  return useMutation(DELETE_FLAG, {
    update: (cache, _, { variables }) => {
      const flagRef = `Flag:${variables?.id}`;
      const existingFlag = client.readFragment({
        id: flagRef,
        fragment: gql(`
            fragment ExistingFlag on Flag {
              id
              scopeId
            }
          `),
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
  });
}
