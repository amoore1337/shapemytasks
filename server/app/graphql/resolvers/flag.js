const flagService = require('../../services/flag.service');
const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { rejectUnauthenticated } = require('../helpers');
const { Flag } = require('../../models');

module.exports = {
  Mutation: {
    createFlag(_, params, { user }) {
      rejectUnauthenticated(user);

      return flagService.createFlag(params, user);
    },

    updateFlag(_, { id, ...updateValues }, { user }) {
      rejectUnauthenticated(user);

      return flagService.updateFlag(id, user, updateValues);
    },

    deleteFlagById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return flagService.deleteFlag(id, user);
    },
  },

  Query: {
    ...basicQueryAllResolver(Flag),
    ...basicFindByIdResolver(Flag),
  },

  Flag: {
    scope(flag) {
      return flag.getScope();
    },

    createdBy(flag) {
      return flag.getCreatedBy();
    },
  },
};
