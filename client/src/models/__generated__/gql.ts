/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  '\n  query DashboardMetrics {\n    metrics {\n      openProjects\n      totalTasks\n      inProgressTasks\n      notStartedTasks\n      closedTasks\n    }\n  }\n':
    types.DashboardMetricsDocument,
  '\n  query TeamMembers($id: ID!) {\n    team(id: $id) {\n      id\n      members {\n        id\n        name\n        email\n      }\n    }\n  }\n':
    types.TeamMembersDocument,
  '\n  query Project($id: ID!) {\n    project(id: $id) {\n      ...ProjectFragment\n      scopes {\n        ...ScopeFragment\n      }\n    }\n  }\n':
    types.ProjectDocument,
  'fragment CurrentUserFragment on CurrentUser {\n  id\n  email\n  name\n  avatarUrl\n  team {\n    id\n    name\n    joinCode\n  }\n}':
    types.CurrentUserFragmentFragmentDoc,
  '\n  query CurrentUser {\n    currentUser {\n      ...CurrentUserFragment\n    }\n  }\n':
    types.CurrentUserDocument,
  'fragment FlagFragment on Flag {\n  id\n  message\n  scopeId\n}': types.FlagFragmentFragmentDoc,
  '\n  mutation CreateFlag($scopeId: ID!, $message: String) {\n    createFlag(scopeId: $scopeId, message: $message) {\n      ...FlagFragment\n    }\n  }\n':
    types.CreateFlagDocument,
  '\n  mutation DeleteFlag($id: ID!) {\n    deleteFlagById(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteFlagDocument,
  '\n            fragment ExistingFlag on Flag {\n              id\n              scopeId\n            }\n          ':
    types.ExistingFlagFragmentDoc,
  'fragment ProjectFragment on Project {\n  id\n  title\n  description\n  visibility\n  createdAt\n  updatedAt\n}\n\nquery Projects {\n  projects {\n    ...ProjectFragment\n  }\n}':
    types.ProjectFragmentFragmentDoc,
  '\n  mutation CreateProject($title: String!, $description: String $visibility: String) {\n    createProject(title: $title, description: $description, visibility: $visibility) {\n      ...ProjectFragment\n    }\n  }\n':
    types.CreateProjectDocument,
  '\n  mutation DeleteProject($id: ID!) {\n    deleteProjectById(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteProjectDocument,
  '\n  subscription ProjectScopeCreatedSubscription($projectId: ID!) {\n    scopeCreated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n':
    types.ProjectScopeCreatedSubscriptionDocument,
  '\n  subscription ProjectScopeUpdatedSubscription($projectId: ID!) {\n    scopeUpdated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n':
    types.ProjectScopeUpdatedSubscriptionDocument,
  '\n  subscription ProjectScopeBatchProgressUpdatedSubscription($projectId: ID!) {\n    scopeBatchProgressUpdated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n':
    types.ProjectScopeBatchProgressUpdatedSubscriptionDocument,
  '\n  subscription ProjectScopeDeletedSubscription($projectId: ID!) {\n    scopeDeleted(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n':
    types.ProjectScopeDeletedSubscriptionDocument,
  '\n  mutation UpdateProject($id: ID!, $title: String, $description: String) {\n    updateProject(id: $id, title: $title, description: $description) {\n      id\n      title\n      description\n    }\n  }\n':
    types.UpdateProjectDocument,
  'fragment ScopeFragment on Scope {\n  id\n  title\n  progress\n  color\n  projectId\n  position\n  closedAt\n  niceToHave\n  createdAt\n  updatedAt\n  flag {\n    id\n    message\n    createdBy {\n      id\n      name\n      email\n      updatedAt\n      createdAt\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation CreateScope($title: String!, $description: String, $color: String, $projectId: ID!) {\n  createScope(\n    title: $title\n    description: $description\n    color: $color\n    projectId: $projectId\n  ) {\n    ...ScopeFragment\n  }\n}\n\nmutation UpdateScope($id: ID!, $title: String, $description: String, $niceToHave: Boolean, $color: String) {\n  updateScope(\n    id: $id\n    title: $title\n    description: $description\n    niceToHave: $niceToHave\n    color: $color\n  ) {\n    ...ScopeFragment\n  }\n}\n\nmutation DeleteScope($id: ID!) {\n  deleteScopeById(id: $id) {\n    id\n  }\n}\n\nmutation UpdateScopePosition($id: ID!, $targetIndex: Int!) {\n  updateScopePosition(id: $id, targetIndex: $targetIndex) {\n    ...ScopeFragment\n  }\n}\n\nmutation UpdateScopeProgress($id: ID!, $progress: Float) {\n  updateScope(id: $id, progress: $progress) {\n    id\n    title\n    description\n    progress\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateScopeProgresses($inputs: [BatchUpdateScopeProgressMap!]!) {\n  batchUpdateScopeProgress(inputs: $inputs) {\n    ...ScopeFragment\n  }\n}':
    types.ScopeFragmentFragmentDoc,
  '\n  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {\n    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {\n      id\n      email\n      name\n      avatarUrl\n\n      team {\n        id\n        name\n        joinCode\n      }\n    }\n\n    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {\n      id\n      email\n      name\n      avatarUrl\n\n      team {\n        id\n        name\n        joinCode\n      }\n    }\n  }\n':
    types.JoinTeamDocument,
  '\n  mutation RemoveFromTeam($userId: ID!) {\n    removeUserFromTeam(userId: $userId) {\n      id\n    }\n  }\n':
    types.RemoveFromTeamDocument,
  '\n  query Heartbeat {\n    heartbeat {\n      authenticated\n    }\n  }\n':
    types.HeartbeatDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query DashboardMetrics {\n    metrics {\n      openProjects\n      totalTasks\n      inProgressTasks\n      notStartedTasks\n      closedTasks\n    }\n  }\n'
): typeof documents['\n  query DashboardMetrics {\n    metrics {\n      openProjects\n      totalTasks\n      inProgressTasks\n      notStartedTasks\n      closedTasks\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query TeamMembers($id: ID!) {\n    team(id: $id) {\n      id\n      members {\n        id\n        name\n        email\n      }\n    }\n  }\n'
): typeof documents['\n  query TeamMembers($id: ID!) {\n    team(id: $id) {\n      id\n      members {\n        id\n        name\n        email\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Project($id: ID!) {\n    project(id: $id) {\n      ...ProjectFragment\n      scopes {\n        ...ScopeFragment\n      }\n    }\n  }\n'
): typeof documents['\n  query Project($id: ID!) {\n    project(id: $id) {\n      ...ProjectFragment\n      scopes {\n        ...ScopeFragment\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment CurrentUserFragment on CurrentUser {\n  id\n  email\n  name\n  avatarUrl\n  team {\n    id\n    name\n    joinCode\n  }\n}'
): typeof documents['fragment CurrentUserFragment on CurrentUser {\n  id\n  email\n  name\n  avatarUrl\n  team {\n    id\n    name\n    joinCode\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query CurrentUser {\n    currentUser {\n      ...CurrentUserFragment\n    }\n  }\n'
): typeof documents['\n  query CurrentUser {\n    currentUser {\n      ...CurrentUserFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment FlagFragment on Flag {\n  id\n  message\n  scopeId\n}'
): typeof documents['fragment FlagFragment on Flag {\n  id\n  message\n  scopeId\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateFlag($scopeId: ID!, $message: String) {\n    createFlag(scopeId: $scopeId, message: $message) {\n      ...FlagFragment\n    }\n  }\n'
): typeof documents['\n  mutation CreateFlag($scopeId: ID!, $message: String) {\n    createFlag(scopeId: $scopeId, message: $message) {\n      ...FlagFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteFlag($id: ID!) {\n    deleteFlagById(id: $id) {\n      id\n    }\n  }\n'
): typeof documents['\n  mutation DeleteFlag($id: ID!) {\n    deleteFlagById(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n            fragment ExistingFlag on Flag {\n              id\n              scopeId\n            }\n          '
): typeof documents['\n            fragment ExistingFlag on Flag {\n              id\n              scopeId\n            }\n          '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment ProjectFragment on Project {\n  id\n  title\n  description\n  visibility\n  createdAt\n  updatedAt\n}\n\nquery Projects {\n  projects {\n    ...ProjectFragment\n  }\n}'
): typeof documents['fragment ProjectFragment on Project {\n  id\n  title\n  description\n  visibility\n  createdAt\n  updatedAt\n}\n\nquery Projects {\n  projects {\n    ...ProjectFragment\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateProject($title: String!, $description: String $visibility: String) {\n    createProject(title: $title, description: $description, visibility: $visibility) {\n      ...ProjectFragment\n    }\n  }\n'
): typeof documents['\n  mutation CreateProject($title: String!, $description: String $visibility: String) {\n    createProject(title: $title, description: $description, visibility: $visibility) {\n      ...ProjectFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteProject($id: ID!) {\n    deleteProjectById(id: $id) {\n      id\n    }\n  }\n'
): typeof documents['\n  mutation DeleteProject($id: ID!) {\n    deleteProjectById(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription ProjectScopeCreatedSubscription($projectId: ID!) {\n    scopeCreated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'
): typeof documents['\n  subscription ProjectScopeCreatedSubscription($projectId: ID!) {\n    scopeCreated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription ProjectScopeUpdatedSubscription($projectId: ID!) {\n    scopeUpdated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'
): typeof documents['\n  subscription ProjectScopeUpdatedSubscription($projectId: ID!) {\n    scopeUpdated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription ProjectScopeBatchProgressUpdatedSubscription($projectId: ID!) {\n    scopeBatchProgressUpdated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'
): typeof documents['\n  subscription ProjectScopeBatchProgressUpdatedSubscription($projectId: ID!) {\n    scopeBatchProgressUpdated(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription ProjectScopeDeletedSubscription($projectId: ID!) {\n    scopeDeleted(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'
): typeof documents['\n  subscription ProjectScopeDeletedSubscription($projectId: ID!) {\n    scopeDeleted(projectId: $projectId) {\n      ...ScopeFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateProject($id: ID!, $title: String, $description: String) {\n    updateProject(id: $id, title: $title, description: $description) {\n      id\n      title\n      description\n    }\n  }\n'
): typeof documents['\n  mutation UpdateProject($id: ID!, $title: String, $description: String) {\n    updateProject(id: $id, title: $title, description: $description) {\n      id\n      title\n      description\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment ScopeFragment on Scope {\n  id\n  title\n  progress\n  color\n  projectId\n  position\n  closedAt\n  niceToHave\n  createdAt\n  updatedAt\n  flag {\n    id\n    message\n    createdBy {\n      id\n      name\n      email\n      updatedAt\n      createdAt\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation CreateScope($title: String!, $description: String, $color: String, $projectId: ID!) {\n  createScope(\n    title: $title\n    description: $description\n    color: $color\n    projectId: $projectId\n  ) {\n    ...ScopeFragment\n  }\n}\n\nmutation UpdateScope($id: ID!, $title: String, $description: String, $niceToHave: Boolean, $color: String) {\n  updateScope(\n    id: $id\n    title: $title\n    description: $description\n    niceToHave: $niceToHave\n    color: $color\n  ) {\n    ...ScopeFragment\n  }\n}\n\nmutation DeleteScope($id: ID!) {\n  deleteScopeById(id: $id) {\n    id\n  }\n}\n\nmutation UpdateScopePosition($id: ID!, $targetIndex: Int!) {\n  updateScopePosition(id: $id, targetIndex: $targetIndex) {\n    ...ScopeFragment\n  }\n}\n\nmutation UpdateScopeProgress($id: ID!, $progress: Float) {\n  updateScope(id: $id, progress: $progress) {\n    id\n    title\n    description\n    progress\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateScopeProgresses($inputs: [BatchUpdateScopeProgressMap!]!) {\n  batchUpdateScopeProgress(inputs: $inputs) {\n    ...ScopeFragment\n  }\n}'
): typeof documents['fragment ScopeFragment on Scope {\n  id\n  title\n  progress\n  color\n  projectId\n  position\n  closedAt\n  niceToHave\n  createdAt\n  updatedAt\n  flag {\n    id\n    message\n    createdBy {\n      id\n      name\n      email\n      updatedAt\n      createdAt\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation CreateScope($title: String!, $description: String, $color: String, $projectId: ID!) {\n  createScope(\n    title: $title\n    description: $description\n    color: $color\n    projectId: $projectId\n  ) {\n    ...ScopeFragment\n  }\n}\n\nmutation UpdateScope($id: ID!, $title: String, $description: String, $niceToHave: Boolean, $color: String) {\n  updateScope(\n    id: $id\n    title: $title\n    description: $description\n    niceToHave: $niceToHave\n    color: $color\n  ) {\n    ...ScopeFragment\n  }\n}\n\nmutation DeleteScope($id: ID!) {\n  deleteScopeById(id: $id) {\n    id\n  }\n}\n\nmutation UpdateScopePosition($id: ID!, $targetIndex: Int!) {\n  updateScopePosition(id: $id, targetIndex: $targetIndex) {\n    ...ScopeFragment\n  }\n}\n\nmutation UpdateScopeProgress($id: ID!, $progress: Float) {\n  updateScope(id: $id, progress: $progress) {\n    id\n    title\n    description\n    progress\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateScopeProgresses($inputs: [BatchUpdateScopeProgressMap!]!) {\n  batchUpdateScopeProgress(inputs: $inputs) {\n    ...ScopeFragment\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {\n    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {\n      id\n      email\n      name\n      avatarUrl\n\n      team {\n        id\n        name\n        joinCode\n      }\n    }\n\n    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {\n      id\n      email\n      name\n      avatarUrl\n\n      team {\n        id\n        name\n        joinCode\n      }\n    }\n  }\n'
): typeof documents['\n  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {\n    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {\n      id\n      email\n      name\n      avatarUrl\n\n      team {\n        id\n        name\n        joinCode\n      }\n    }\n\n    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {\n      id\n      email\n      name\n      avatarUrl\n\n      team {\n        id\n        name\n        joinCode\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation RemoveFromTeam($userId: ID!) {\n    removeUserFromTeam(userId: $userId) {\n      id\n    }\n  }\n'
): typeof documents['\n  mutation RemoveFromTeam($userId: ID!) {\n    removeUserFromTeam(userId: $userId) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Heartbeat {\n    heartbeat {\n      authenticated\n    }\n  }\n'
): typeof documents['\n  query Heartbeat {\n    heartbeat {\n      authenticated\n    }\n  }\n'];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 **/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
