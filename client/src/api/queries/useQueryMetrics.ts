import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { DashboardMetrics } from '@/api/queries/types/DashboardMetrics';

const FETCH_METRICS = gql`
  query DashboardMetrics {
    metrics {
      openProjects
      totalTasks
      inProgressTasks
      notStartedTasks
      closedTasks
    }
  }
`;

export default function useQueryMetrics(options?: QueryHookOptions<DashboardMetrics>) {
  return useQuery<DashboardMetrics>(FETCH_METRICS, options);
}
