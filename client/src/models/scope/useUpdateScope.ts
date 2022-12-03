import { useMutation } from '@apollo/client';

import { UpdateScopeDocument } from '../__generated__/graphql';

export function useUpdateScope() {
  return useMutation(UpdateScopeDocument);
}
