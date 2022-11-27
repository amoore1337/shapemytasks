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

export type ScopeFragmentFragment = { __typename?: 'Scope', id: string, title?: string | null, progress: number, color: string, projectId?: string | null, position?: string | null, closedAt?: any | null, niceToHave?: boolean | null, createdAt: any, updatedAt: any, flag?: { __typename?: 'Flag', id: string, message?: string | null, createdBy?: { __typename?: 'User', id: string, name?: string | null, email: string } | null } | null } & { ' $fragmentName'?: 'ScopeFragmentFragment' };

export type ScopeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ScopeQuery = { __typename?: 'Query', scope?: (
    { __typename?: 'Scope' }
    & { ' $fragmentRefs'?: { 'ScopeFragmentFragment': ScopeFragmentFragment } }
  ) | null };

export type ScopesQueryVariables = Exact<{ [key: string]: never; }>;


export type ScopesQuery = { __typename?: 'Query', scopes?: Array<(
    { __typename?: 'Scope' }
    & { ' $fragmentRefs'?: { 'ScopeFragmentFragment': ScopeFragmentFragment } }
  ) | null> | null };

export const ScopeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScopeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Scope"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"niceToHave"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"flag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<ScopeFragmentFragment, unknown>;
export const ScopeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Scope"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scope"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ScopeQuery, ScopeQueryVariables>;
export const ScopesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Scopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScopeFragment"}}]}}]}},...ScopeFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ScopesQuery, ScopesQueryVariables>;