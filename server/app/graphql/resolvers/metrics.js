const { rejectUnauthenticated } = require('../helpers');
const metricsService = require('../../services/metrics.service');

module.exports = {
  Query: {
    metrics: (_, __, { user }) => {
      rejectUnauthenticated(user);

      return metricsService.getMetricsForUser(user);
    },
  },
};
