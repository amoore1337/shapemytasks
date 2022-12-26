import { withAuthRequired } from '../helpers';
import { findMetricsForUser } from '../../services/metricsM';

export = {
  Query: {
    metrics: withAuthRequired((_, __, { user }) => findMetricsForUser(user)),
  },
};
