/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type BatchUpdateScopeProgressMap = {
  id: Scalars['ID'];
  progress: Scalars['Float'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  ownsTeam?: Maybe<Team>;
  projects?: Maybe<Array<Maybe<Project>>>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['Date'];
};

export type Flag = {
  __typename?: 'Flag';
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  scope?: Maybe<Scope>;
  scopeId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Date'];
};

export type Heartbeat = {
  __typename?: 'Heartbeat';
  authenticated: Scalars['Boolean'];
};

export type Metrics = {
  __typename?: 'Metrics';
  closedTasks: Scalars['Int'];
  inProgressTasks: Scalars['Int'];
  notStartedTasks: Scalars['Int'];
  openProjects: Scalars['Int'];
  totalTasks: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  batchUpdateScopeProgress?: Maybe<Array<Maybe<Scope>>>;
  createFlag?: Maybe<Flag>;
  createProject?: Maybe<Project>;
  createScope?: Maybe<Scope>;
  createTeam?: Maybe<CurrentUser>;
  deleteFlagById?: Maybe<Flag>;
  deleteProjectById?: Maybe<Project>;
  deleteScopeById?: Maybe<Scope>;
  joinTeam?: Maybe<CurrentUser>;
  root?: Maybe<Scalars['String']>;
  updateFlag?: Maybe<Flag>;
  updateProject?: Maybe<Project>;
  updateScope?: Maybe<Scope>;
  updateScopePosition?: Maybe<Scope>;
};


export type MutationBatchUpdateScopeProgressArgs = {
  inputs: Array<BatchUpdateScopeProgressMap>;
};


export type MutationCreateFlagArgs = {
  message?: InputMaybe<Scalars['String']>;
  scopeId: Scalars['ID'];
};


export type MutationCreateProjectArgs = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  visibility?: InputMaybe<Scalars['String']>;
};


export type MutationCreateScopeArgs = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  progress?: InputMaybe<Scalars['Float']>;
  projectId: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
  restrictEmailDomain?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteFlagByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteScopeByIdArgs = {
  id: Scalars['ID'];
};


export type MutationJoinTeamArgs = {
  joinCode: Scalars['String'];
};


export type MutationUpdateFlagArgs = {
  id: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateScopeArgs = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  niceToHave?: InputMaybe<Scalars['Boolean']>;
  progress?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateScopePositionArgs = {
  id: Scalars['ID'];
  targetIndex: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Date'];
  createdById?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  owner?: Maybe<User>;
  scopes?: Maybe<Array<Maybe<Scope>>>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  visibility?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<CurrentUser>;
  flag?: Maybe<Flag>;
  flags?: Maybe<Array<Maybe<Flag>>>;
  heartbeat?: Maybe<Heartbeat>;
  metrics?: Maybe<Metrics>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  root?: Maybe<Scalars['String']>;
  scope?: Maybe<Scope>;
  scopes?: Maybe<Array<Maybe<Scope>>>;
  team?: Maybe<Team>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryFlagArgs = {
  id: Scalars['ID'];
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryScopeArgs = {
  id: Scalars['ID'];
};


export type QueryTeamArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Scope = {
  __typename?: 'Scope';
  closedAt?: Maybe<Scalars['Date']>;
  color: Scalars['String'];
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  flag?: Maybe<Flag>;
  id: Scalars['ID'];
  niceToHave?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['String']>;
  progress: Scalars['Float'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type Subscription = {
  __typename?: 'Subscription';
  root?: Maybe<Scalars['String']>;
  scopeBatchProgressUpdated?: Maybe<Array<Maybe<Scope>>>;
  scopeCreated?: Maybe<Scope>;
  scopeDeleted?: Maybe<Scope>;
  scopeUpdated?: Maybe<Scope>;
};


export type SubscriptionScopeBatchProgressUpdatedArgs = {
  projectId: Scalars['ID'];
};


export type SubscriptionScopeCreatedArgs = {
  projectId: Scalars['ID'];
};


export type SubscriptionScopeDeletedArgs = {
  projectId: Scalars['ID'];
};


export type SubscriptionScopeUpdatedArgs = {
  projectId: Scalars['ID'];
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['Date'];
  createdById?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  joinCode?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']>;
  restrictEmailDomain?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  ownsTeam?: Maybe<Team>;
  projects?: Maybe<Array<Maybe<Project>>>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['Date'];
};

export type DashboardMetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardMetricsQuery = { __typename?: 'Query', metrics?: { __typename?: 'Metrics', openProjects: number, totalTasks: number, inProgressTasks: number, notStartedTasks: number, closedTasks: number } | null };

export type TeamMembersQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamMembersQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, members?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string } | null> | null } | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, title?: string | null, description?: string | null, visibility?: string | null, createdAt: any, updatedAt: any, scopes?: Array<{ __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null> | null } | null };

export type CurrentUserFragmentFragment = { __typename?: 'CurrentUser', id: string, email: string, name?: string | null, avatarUrl?: string | null, team?: { __typename?: 'Team', id: string, name?: string | null, joinCode?: string | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'CurrentUser', id: string, email: string, name?: string | null, avatarUrl?: string | null, team?: { __typename?: 'Team', id: string, name?: string | null, joinCode?: string | null } | null } | null };

export type FlagFragmentFragment = { __typename?: 'Flag', id: string, message?: string | null, scopeId?: number | null };

export type CreateFlagMutationVariables = Exact<{
  scopeId: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
}>;


export type CreateFlagMutation = { __typename?: 'Mutation', createFlag?: { __typename?: 'Flag', id: string, message?: string | null, scopeId?: number | null } | null };

export type DeleteFlagMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteFlagMutation = { __typename?: 'Mutation', deleteFlagById?: { __typename?: 'Flag', id: string } | null };

export type ExistingFlagFragment = { __typename?: 'Flag', id: string, scopeId?: number | null };

export type ProjectFragmentFragment = { __typename?: 'Project', id: string, title?: string | null, description?: string | null, visibility?: string | null, createdAt: any, updatedAt: any };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, title?: string | null, description?: string | null, visibility?: string | null, createdAt: any, updatedAt: any } | null> | null };

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, title?: string | null, description?: string | null, visibility?: string | null, createdAt: any, updatedAt: any } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProjectById?: { __typename?: 'Project', id: string } | null };

export type ProjectScopeCreatedSubscriptionSubscriptionVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ProjectScopeCreatedSubscriptionSubscription = { __typename?: 'Subscription', scopeCreated?: { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null };

export type ProjectScopeUpdatedSubscriptionSubscriptionVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ProjectScopeUpdatedSubscriptionSubscription = { __typename?: 'Subscription', scopeUpdated?: { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null };

export type ProjectScopeBatchProgressUpdatedSubscriptionSubscriptionVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ProjectScopeBatchProgressUpdatedSubscriptionSubscription = { __typename?: 'Subscription', scopeBatchProgressUpdated?: Array<{ __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null> | null };

export type ProjectScopeDeletedSubscriptionSubscriptionVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ProjectScopeDeletedSubscriptionSubscription = { __typename?: 'Subscription', scopeDeleted?: { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, title?: string | null, description?: string | null } | null };

export type ScopeFragmentFragment = { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null };

export type CreateScopeMutationVariables = Exact<{
  title: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
}>;


export type CreateScopeMutation = { __typename?: 'Mutation', createScope?: { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null };

export type UpdateScopeMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  niceToHave?: InputMaybe<Scalars['Boolean']>;
  color?: InputMaybe<Scalars['String']>;
}>;


export type UpdateScopeMutation = { __typename?: 'Mutation', updateScope?: { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null };

export type DeleteScopeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteScopeMutation = { __typename?: 'Mutation', deleteScopeById?: { __typename?: 'Scope', id: string } | null };

export type UpdateScopePositionMutationVariables = Exact<{
  id: Scalars['ID'];
  targetIndex: Scalars['Int'];
}>;


export type UpdateScopePositionMutation = { __typename?: 'Mutation', updateScopePosition?: { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null };

export type UpdateScopeProgressMutationVariables = Exact<{
  id: Scalars['ID'];
  progress?: InputMaybe<Scalars['Float']>;
}>;


export type UpdateScopeProgressMutation = { __typename?: 'Mutation', updateScope?: { __typename?: 'Scope', id: string, title?: string | null, description?: string | null, progress: number, createdAt: any, updatedAt: any } | null };

export type UpdateScopeProgressesMutationVariables = Exact<{
  inputs: Array<BatchUpdateScopeProgressMap> | BatchUpdateScopeProgressMap;
}>;


export type UpdateScopeProgressesMutation = { __typename?: 'Mutation', batchUpdateScopeProgress?: Array<{ __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdAt: any, updatedAt: any, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string, updatedAt: any, createdAt: any } | null } | null } | null> | null };

export type JoinTeamMutationVariables = Exact<{
  name: Scalars['String'];
  joinCode: Scalars['String'];
  joinTeam: Scalars['Boolean'];
  restrictEmailDomain?: InputMaybe<Scalars['String']>;
}>;


export type JoinTeamMutation = { __typename?: 'Mutation', createTeam?: { __typename?: 'CurrentUser', id: string, email: string, name?: string | null, avatarUrl?: string | null, team?: { __typename?: 'Team', id: string, name?: string | null, joinCode?: string | null } | null } | null, joinTeam?: { __typename?: 'CurrentUser', id: string, email: string, name?: string | null, avatarUrl?: string | null, team?: { __typename?: 'Team', id: string, name?: string | null, joinCode?: string | null } | null } | null };

export type HeartbeatQueryVariables = Exact<{ [key: string]: never; }>;


export type HeartbeatQuery = { __typename?: 'Query', heartbeat?: { __typename?: 'Heartbeat', authenticated: boolean } | null };

export const CurrentUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CurrentUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"joinCode"}}]}}]}}]} as unknown as DocumentNode<CurrentUserFragmentFragment, unknown>;
export const FlagFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FlagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Flag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"scopeId"}}]}}]} as unknown as DocumentNode<FlagFragmentFragment, unknown>;
export const ExistingFlagFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExistingFlag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Flag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"scopeId"}}]}}]} as unknown as DocumentNode<ExistingFlagFragment, unknown>;
export const ProjectFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ProjectFragmentFragment, unknown>;
export const ScopeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScopeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Scope"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"niceToHave"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"flag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ScopeFragmentFragment, unknown>;
export const DashboardMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardMetrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openProjects"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressTasks"}},{"kind":"Field","name":{"kind":"Name","value":"notStartedTasks"}},{"kind":"Field","name":{"kind":"Name","value":"closedTasks"}}]}}]}}]} as unknown as DocumentNode<DashboardMetricsQuery, DashboardMetricsQueryVariables>;
export const TeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<TeamMembersQuery, TeamMembersQueryVariables>;
export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}},{"kind":"Field","name":{"kind":"Name","value":"scopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}}]}},...ProjectFragmentFragmentDoc.definitions,...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentUserFragment"}}]}}]}},...CurrentUserFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const CreateFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scopeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFlag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scopeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scopeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FlagFragment"}}]}}]}},...FlagFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CreateFlagMutation, CreateFlagMutationVariables>;
export const DeleteFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFlagById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteFlagMutation, DeleteFlagMutationVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}},...ProjectFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"visibility"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}},...ProjectFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProjectById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const ProjectScopeCreatedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ProjectScopeCreatedSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopeCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ProjectScopeCreatedSubscriptionSubscription, ProjectScopeCreatedSubscriptionSubscriptionVariables>;
export const ProjectScopeUpdatedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ProjectScopeUpdatedSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopeUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ProjectScopeUpdatedSubscriptionSubscription, ProjectScopeUpdatedSubscriptionSubscriptionVariables>;
export const ProjectScopeBatchProgressUpdatedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ProjectScopeBatchProgressUpdatedSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopeBatchProgressUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ProjectScopeBatchProgressUpdatedSubscriptionSubscription, ProjectScopeBatchProgressUpdatedSubscriptionSubscriptionVariables>;
export const ProjectScopeDeletedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ProjectScopeDeletedSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopeDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ProjectScopeDeletedSubscriptionSubscription, ProjectScopeDeletedSubscriptionSubscriptionVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const CreateScopeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScope"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScope"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CreateScopeMutation, CreateScopeMutationVariables>;
export const UpdateScopeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScope"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"niceToHave"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScope"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"niceToHave"},"value":{"kind":"Variable","name":{"kind":"Name","value":"niceToHave"}}},{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateScopeMutation, UpdateScopeMutationVariables>;
export const DeleteScopeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteScope"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteScopeById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteScopeMutation, DeleteScopeMutationVariables>;
export const UpdateScopePositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScopePosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScopePosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetIndex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateScopePositionMutation, UpdateScopePositionMutationVariables>;
export const UpdateScopeProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScopeProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"progress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScope"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"progress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"progress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateScopeProgressMutation, UpdateScopeProgressMutationVariables>;
export const UpdateScopeProgressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScopeProgresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchUpdateScopeProgressMap"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchUpdateScopeProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateScopeProgressesMutation, UpdateScopeProgressesMutationVariables>;
export const JoinTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTeam"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"restrictEmailDomain"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"restrictEmailDomain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"restrictEmailDomain"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTeam"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"joinTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"joinCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinCode"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTeam"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentUserFragment"}}]}}]}},...CurrentUserFragmentFragmentDoc.definitions]} as unknown as DocumentNode<JoinTeamMutation, JoinTeamMutationVariables>;
export const HeartbeatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Heartbeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heartbeat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticated"}}]}}]}}]} as unknown as DocumentNode<HeartbeatQuery, HeartbeatQueryVariables>;