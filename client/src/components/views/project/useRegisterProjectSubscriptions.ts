import { gql, useSubscription, StoreObject } from '@apollo/client';

import { addCacheItem } from '@/utils/cache';

import { SCOPE_FRAGMENT } from './helpers';
import { ProjectPage_project as Project } from './types/ProjectPage';
import { ProjectScopeSubscription, ProjectScopeSubscriptionVariables } from './types/ProjectScopeSubscription';
import { ProjectScopeUpdatedSubscription, ProjectScopeUpdatedSubscriptionVariables } from './types/ProjectScopeUpdatedSubscription';

const NEW_SCOPE_SUBSCRIPTION = gql`
  subscription ProjectScopeSubscription($projectId: ID!) {
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

export default function useRegisterProjectSubscriptions(project: Project | null | undefined) {
  useSubscription<ProjectScopeSubscription, ProjectScopeSubscriptionVariables>(NEW_SCOPE_SUBSCRIPTION, {
    variables: { projectId: project?.id! },
    skip: !project?.id,
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!project) { return; }
      const { cache } = client;

      addCacheItem<ProjectScopeSubscription>(
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
}
