const { createFlag, updateFlag, deleteFlag } = require('../../services/flagM.ts');
const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const { rejectUnauthenticated } = require('../helpers');
const { Flag } = require('../../models');

module.exports = {
  Mutation: {
    createFlag(_, params, { user }) {
      rejectUnauthenticated(user);

      return createFlag(params, user);
    },

    updateFlag(_, { id, ...updateValues }, { user }) {
      rejectUnauthenticated(user);

      return updateFlag(id, updateValues, user);
    },

    deleteFlagById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return deleteFlag(id, user);
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
