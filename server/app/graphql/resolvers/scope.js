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
  },

  Query: {
    ...basicQueryAllResolver(Scope),
    ...basicFindByIdResolver(Scope),
  },
};
