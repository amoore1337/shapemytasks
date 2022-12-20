import { useSubscription, StoreObject } from '@apollo/client';

import { gql } from '@/apollo';
import { Project, ScopeFragmentFragmentDoc } from '@/models/types';
import { addCacheItem, removeCacheItem } from '@/utils/cache';

const NEW_SCOPE_SUBSCRIPTION = gql(`
  subscription ProjectScopeCreatedSubscription($projectId: ID!) {
    scopeCreated(projectId: $projectId) {
      ...ScopeFragment
    }
  }
`);

const SCOPE_UPDATED_SUBSCRIPTION = gql(`
  subscription ProjectScopeUpdatedSubscription($projectId: ID!) {
    scopeUpdated(projectId: $projectId) {
      ...ScopeFragment
    }
  }
`);

const SCOPE_BATCH_PROGRESS_UPDATED_SUBSCRIPTION = gql(`
  subscription ProjectScopeBatchProgressUpdatedSubscription($projectId: ID!) {
    scopeBatchProgressUpdated(projectId: $projectId) {
      ...ScopeFragment
    }
  }
`);

const SCOPE_DELETED_SUBSCRIPTION = gql(`
  subscription ProjectScopeDeletedSubscription($projectId: ID!) {
    scopeDeleted(projectId: $projectId) {
      ...ScopeFragment
    }
  }
`);

export function useRegisterProjectSubscriptions(project: Project | null | undefined) {
  useSubscription(NEW_SCOPE_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
    onData: ({ client, data }) => {
      if (!project) {
        return;
      }
      const { cache } = client;

      addCacheItem(
        cache,
        data.data,
        'scopes',
        'scopeCreated',
        project as unknown as StoreObject,
        ScopeFragmentFragmentDoc
      );
    },
  });

  useSubscription(SCOPE_UPDATED_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
  });

  useSubscription(SCOPE_BATCH_PROGRESS_UPDATED_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
  });

  useSubscription(SCOPE_DELETED_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
    onData: ({ client, data }) => {
      if (!project) {
        return;
      }
      const { cache } = client;

      removeCacheItem(
        cache,
        data.data,
        'scopes',
        'scopeDeleted',
        project as unknown as StoreObject
      );
    },
  });
}
