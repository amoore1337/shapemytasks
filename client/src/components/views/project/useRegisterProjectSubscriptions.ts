import { gql, useSubscription, StoreObject } from '@apollo/client';

import { Project_project as Project } from '@/api/queries/types/Project';
import { addCacheItem, removeCacheItem } from '@/utils/cache';

import { SCOPE_FRAGMENT } from './helpers';
import { ProjectScopeCreatedSubscription, ProjectScopeCreatedSubscriptionVariables } from './types/ProjectScopeCreatedSubscription';
import { ProjectScopeDeletedSubscription, ProjectScopeDeletedSubscriptionVariables } from './types/ProjectScopeDeletedSubscription';
import { ProjectScopeUpdatedSubscription, ProjectScopeUpdatedSubscriptionVariables } from './types/ProjectScopeUpdatedSubscription';

const NEW_SCOPE_SUBSCRIPTION = gql`
  subscription ProjectScopeCreatedSubscription($projectId: ID!) {
    scopeCreated(projectId: $projectId) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

const SCOPE_UPDATED_SUBSCRIPTION = gql`
  subscription ProjectScopeUpdatedSubscription($projectId: ID!) {
    scopeUpdated(projectId: $projectId) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

const SCOPE_DELETED_SUBSCRIPTION = gql`
  subscription ProjectScopeDeletedSubscription($projectId: ID!) {
    scopeDeleted(projectId: $projectId) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function useRegisterProjectSubscriptions(project: Project | null | undefined) {
  useSubscription<ProjectScopeCreatedSubscription, ProjectScopeCreatedSubscriptionVariables>(NEW_SCOPE_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!project) { return; }
      const { cache } = client;

      addCacheItem<ProjectScopeCreatedSubscription>(
        cache,
        subscriptionData.data,
        'scopes',
        'scopeCreated',
        project as unknown as StoreObject,
        SCOPE_FRAGMENT,
      );
    },
  });

  useSubscription<ProjectScopeUpdatedSubscription, ProjectScopeUpdatedSubscriptionVariables>(SCOPE_UPDATED_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
  });

  useSubscription<ProjectScopeDeletedSubscription, ProjectScopeDeletedSubscriptionVariables>(SCOPE_DELETED_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!project) { return; }
      const { cache } = client;

      removeCacheItem<ProjectScopeDeletedSubscription>(
        cache,
        subscriptionData.data,
        'scopes',
        'scopeDeleted',
        project as unknown as StoreObject,
      );
    },
  });
}
