import { withFilter } from 'graphql-subscriptions';
import { IdParam, Response, withAuthRequired } from '../helpers';
import {
  createScope,
  updateScope,
  deleteScope,
  updateScopePosition,
  batchUpdateScopeProgresses,
  findAllAuthorizedScopes,
  findAuthorizedScope,
} from '../../models/scope';
import { subscribeWithFilter, SubscriptionEvents } from '../pubSub';
import { db } from '../../db';
import { Scopes } from '@prisma/client';
import { parsedId } from '../../utils';

interface CreateScopeParams {
  title: string;
  projectId: string;
  description?: string;
  color?: string;
  progress?: number;
}

interface UpdateScopeParams extends Omit<CreateScopeParams, 'projectId'>, IdParam {}

interface BatchUpdateProgressParams {
  inputs: { id: string; progress: number }[];
}

interface UpdateScopePositionParams extends IdParam {
  targetIndex: number;
}

export = {
  Mutation: {
    createScope: withAuthRequired<null, CreateScopeParams, Response<Scopes>>(
      (_, params, { user }) => createScope(params, user)
    ),

    updateScope: withAuthRequired<null, UpdateScopeParams, Response<Scopes>>(
      (_, { id, ...updateValues }, { user }) => updateScope(id, user, updateValues)
    ),

    batchUpdateScopeProgress: withAuthRequired<null, BatchUpdateProgressParams, Response<Scopes[]>>(
      (_, { inputs }, { user }) => batchUpdateScopeProgresses(inputs, user)
    ),

    updateScopePosition: withAuthRequired<null, UpdateScopePositionParams, Response<Scopes>>(
      (_, { id, targetIndex }, { user }) => updateScopePosition(id, targetIndex, user)
    ),

    deleteScopeById: withAuthRequired<null, IdParam, Response<Scopes>>((_, { id }, { user }) =>
      deleteScope(id, user)
    ),
  },

  Subscription: {
    scopeCreated: {
      subscribe: withFilter(
        subscribeWithFilter([SubscriptionEvents.ScopeCreated]),
        ({ scopeCreated }, { projectId }) =>
          scopeCreated.projectId.toString() === projectId.toString()
      ),
    },

    scopeUpdated: {
      subscribe: withFilter(
        subscribeWithFilter([SubscriptionEvents.ScopeUpdated]),
        ({ scopeUpdated }, { projectId }) =>
          scopeUpdated.projectId.toString() === projectId.toString()
      ),
    },

    scopeBatchProgressUpdated: {
      subscribe: withFilter(
        subscribeWithFilter([SubscriptionEvents.ScopeBatchProgressUpdated]),
        ({ scopeBatchProgressUpdated }, { projectId }) =>
          scopeBatchProgressUpdated[0].projectId.toString() === projectId.toString()
      ),
    },

    scopeDeleted: {
      subscribe: withFilter(
        subscribeWithFilter([SubscriptionEvents.ScopeDeleted]),
        ({ scopeDeleted }, { projectId }) =>
          scopeDeleted.projectId.toString() === projectId.toString()
      ),
    },
  },

  Query: {
    scopes: withAuthRequired<null, null, Response<Scopes[]>>((_, __, { user }) =>
      findAllAuthorizedScopes(user)
    ),

    scope: withAuthRequired<null, IdParam, Response<Scopes>>((_, { id }, { user }) =>
      findAuthorizedScope(id, user)
    ),
  },

  Scope: {
    flag(scope: Scopes) {
      return db.flags.findFirst({ where: { scopeId: scope.id } });
    },

    project(scope: Scopes) {
      return db.projects.findUnique({ where: { id: scope.projectId! } });
    },

    creator(scope: Scopes) {
      if (scope.createdById) {
        return db.users.findUnique({ where: { id: scope.createdById } });
      }

      return null;
    },
  },
};
