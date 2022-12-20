const { withFilter } = require('graphql-subscriptions');
const scopeService = require('../../services/scope.service');
const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { rejectUnauthenticated } = require('../helpers');
const { Scope } = require('../../models');
const pubSub = require('../pubSub');

module.exports = {
  Mutation: {
    createScope(_, params, { user }) {
      rejectUnauthenticated(user);

      return scopeService.createScope(params, user);
    },

    updateScope(_, { id, ...updateValues }, { user }) {
      rejectUnauthenticated(user);

      return scopeService.updateScope(id, user, updateValues);
    },

    batchUpdateScopeProgress(_, { inputs }, { user }) {
      rejectUnauthenticated(user);

      return scopeService.updateScopeProgresses(inputs, user);
    },

    updateScopePosition(_, { id, targetIndex }, { user }) {
      rejectUnauthenticated(user);

      return scopeService.updateScopePosition(id, targetIndex, user);
    },

    deleteScopeById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return scopeService.deleteScope(id, user);
    },
  },

  Subscription: {
    scopeCreated: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(['SCOPE_CREATED']),
        ({ scopeCreated }, { projectId }) =>
          scopeCreated.dataValues.projectId.toString() === projectId.toString()
      ),
    },

    scopeUpdated: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(['SCOPE_UPDATED']),
        ({ scopeUpdated }, { projectId }) =>
          // ({ scopeUpdated, currentUser }, { projectId }, { user }) => (
          // currentUser.id !== user.id &&
          scopeUpdated.dataValues.projectId.toString() === projectId.toString()
      ),
    },

    scopeBatchProgressUpdated: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(['SCOPE_BATCH_PROGRESS_UPDATED']),
        ({ scopeBatchProgressUpdated }, { projectId }) =>
          scopeBatchProgressUpdated[0].dataValues.projectId.toString() === projectId.toString()
      ),
    },

    scopeDeleted: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(['SCOPE_DELETED']),
        ({ scopeDeleted }, { projectId }) =>
          scopeDeleted.dataValues.projectId.toString() === projectId.toString()
      ),
    },
  },

  Query: {
    ...basicQueryAllResolver(Scope),
    ...basicFindByIdResolver(Scope),
  },

  Scope: {
    flag(scope) {
      return scope.getFlag();
    },
  },
};
