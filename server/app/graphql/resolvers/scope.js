const { withFilter } = require('graphql-subscriptions');
const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { rejectUnauthenticated } = require('../helpers');
const { Scope } = require('../../models');
const {
  createScope,
  updateScope,
  deleteScope,
  updateScopePosition,
  batchUpdateScopeProgresses,
} = require('../../services/scopeM.ts');
const { subscribeWithFilter } = require('../pubSub.ts');
const { db } = require('../../db.ts');

module.exports = {
  Mutation: {
    createScope(_, params, { user }) {
      rejectUnauthenticated(user);

      return createScope(params, user);
    },

    updateScope(_, { id, ...updateValues }, { user }) {
      rejectUnauthenticated(user);

      return updateScope(id, user, updateValues);
    },

    batchUpdateScopeProgress(_, { inputs }, { user }) {
      rejectUnauthenticated(user);

      return batchUpdateScopeProgresses(inputs, user);
    },

    updateScopePosition(_, { id, targetIndex }, { user }) {
      rejectUnauthenticated(user);

      return updateScopePosition(id, targetIndex, user);
    },

    deleteScopeById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return deleteScope(id, user);
    },
  },

  Subscription: {
    scopeCreated: {
      subscribe: withFilter(
        subscribeWithFilter(['SCOPE_CREATED']),
        ({ scopeCreated }, { projectId }) =>
          scopeCreated.projectId.toString() === projectId.toString()
      ),
    },

    scopeUpdated: {
      subscribe: withFilter(
        subscribeWithFilter(['SCOPE_UPDATED']),
        ({ scopeUpdated }, { projectId }) =>
          scopeUpdated.projectId.toString() === projectId.toString()
      ),
    },

    scopeBatchProgressUpdated: {
      subscribe: withFilter(
        subscribeWithFilter(['SCOPE_BATCH_PROGRESS_UPDATED']),
        ({ scopeBatchProgressUpdated }, { projectId }) =>
          scopeBatchProgressUpdated[0].projectId.toString() === projectId.toString()
      ),
    },

    scopeDeleted: {
      subscribe: withFilter(
        subscribeWithFilter(['SCOPE_DELETED']),
        ({ scopeDeleted }, { projectId }) =>
          scopeDeleted.projectId.toString() === projectId.toString()
      ),
    },
  },

  Query: {
    ...basicQueryAllResolver(Scope),
    ...basicFindByIdResolver(Scope),
  },

  Scope: {
    flag(scope) {
      return db.flags.findFirst({ where: { scopeId: scope.id } });
    },

    project(scope) {
      return db.project.findUnique({ where: { id: scope.projectId } });
    },

    creator(scope) {
      if (scope.createdById) {
        return db.users.findUnique({ where: { id: scope.createdById } });
      }

      return null;
    },
  },
};
