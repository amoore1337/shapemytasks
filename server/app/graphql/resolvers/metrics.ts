import { withAuthRequired } from '../helpers';
import { findMetricsForUser } from '../../models/metrics';

export = {
  Query: {
    metrics: withAuthRequired((_, __, { user }) => findMetricsForUser(user)),
  },
};
