const scopeService = require('../../services/scope.service');
const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { rejectUnauthenticated } = require('../helpers');
const { Scope } = require('../../models');

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

    deleteScopeById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return scopeService.deleteScope(id, user);
    },
  },

  Query: {
    ...basicQueryAllResolver(Scope),
    ...basicFindByIdResolver(Scope),
  },
};
