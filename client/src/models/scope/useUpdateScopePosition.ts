import { useMutation } from '@apollo/client';

import { UpdateScopePositionDocument } from '../__generated__/graphql';

export function useUpdateScopePosition() {
  return useMutation(UpdateScopePositionDocument);
}
