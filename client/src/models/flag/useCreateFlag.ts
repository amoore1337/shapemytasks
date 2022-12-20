import { useMutation } from '@apollo/client';

import { gql } from '@/apollo';

const CREATE_FLAG = gql(`
  mutation CreateFlag($scopeId: ID!, $message: String) {
    createFlag(scopeId: $scopeId, message: $message) {
      ...FlagFragment
    }
  }
`);

export function useCreateFlag() {
  return useMutation(CREATE_FLAG, {
    update: (cache, { data: result }) => {
      cache.modify({
        id: `Scope:${result?.createFlag?.scopeId}`,
        fields: {
          flag: () => `Flag:${result?.createFlag?.id}`,
        },
      });
    },
  });
}
