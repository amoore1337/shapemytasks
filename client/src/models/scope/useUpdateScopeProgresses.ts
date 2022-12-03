import { useMutation } from '@apollo/client';

import { UpdateScopeProgressesDocument } from '../__generated__/graphql';

export function useUpdateScopeProgresses() {
  return useMutation(UpdateScopeProgressesDocument);
}
