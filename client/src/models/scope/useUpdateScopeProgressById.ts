import { useMutation } from '@apollo/client';

import { UpdateScopeProgressDocument } from '../__generated__/graphql';

export function useUpdateScopeProgressById() {
  return useMutation(UpdateScopeProgressDocument);
}
