const { rejectUnauthenticated } = require('../helpers');
const { findMetricsForUser } = require('../../services/metricsM.ts');

module.exports = {
  Query: {
    metrics: (_, __, { user }) => {
      rejectUnauthenticated(user);

      return findMetricsForUser(user);
    },
  },
};
