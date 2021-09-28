import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { Project, ProjectVariables } from './types/Project';

export const SCOPE_FRAGMENT = gql`
  fragment ScopeFragment on Scope {
    id
    title
    progress
    color
    projectId
    position
    closedAt
    niceToHave
    createdAt
    updatedAt
    flag {
      id
      message
      createdBy {
        id
        name
        email
      }
    }
  }
`;

export const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    id
    title
    description
    visibility
    scopes {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

// Lighter-weight query useful for low-detail lists:
export const PROJECT_FRAGMENT_LITE = gql`
  fragment ProjectFragmentLite on Project {
    id
    title
    description
    visibility
  }
`;

export const PROJECT_QUERY = gql`
  query Project($id: ID!) {
    project(id: $id) {
      ...ProjectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`;

export default function useQueryProject(id: string, options?: Omit<QueryHookOptions<Project, ProjectVariables>, 'variables'>) {
  return useQuery(
    PROJECT_QUERY,
    { variables: { id }, ...options },
  );
}
