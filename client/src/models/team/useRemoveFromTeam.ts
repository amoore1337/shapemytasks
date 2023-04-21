import { useCallback } from 'react';

import type { MutationHookOptions, MutationResult } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { gql } from '@/apollo';
import type { RemoveFromTeamMutation, RemoveFromTeamMutationVariables, User } from '@/models/types';

export const REMOVE_FROM_TEAM = gql(`
  mutation RemoveFromTeam($userId: ID!) {
    removeUserFromTeam(userId: $userId) {
      id
    }
  }
`);

export function useRemoveUserFromTeam(
  options?: Omit<
    MutationHookOptions<RemoveFromTeamMutation, RemoveFromTeamMutationVariables>,
    'update'
  >
): [(userId: string) => Promise<void>, MutationResult<RemoveFromTeamMutation>] {
  const [removeUser, ...rest] = useMutation(REMOVE_FROM_TEAM, {
    ...options,
  });

  const handleRemoveUser = useCallback(
    async (userId: string) => {
      removeUser({
        variables: { userId },
        update(cache, { data: result }) {
          if (!result?.removeUserFromTeam) {
            return;
          }
          cache.modify({
            id: cache.identify(result.removeUserFromTeam),
            fields: {
              members(existingRefs: User[], { readField }) {
                if (!existingRefs) {
                  return existingRefs;
                }
                return existingRefs.filter((ref) => readField('id', ref) !== userId);
              },
            },
          });
        },
      });
    },
    [removeUser]
  );

  return [handleRemoveUser, ...rest];
}
