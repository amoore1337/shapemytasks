import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';

import { gql } from '@/apollo';
import LoadingIndicator from '@/components/LoadingIndicator';

const METRICS_QUERY = gql(`
  query DashboardMetrics {
    metrics {
      openProjects
      totalTasks
      inProgressTasks
      notStartedTasks
      closedTasks
    }
  }
`);

export default function MetricsCard() {
  const { loading, data } = useQuery(METRICS_QUERY, { fetchPolicy: 'cache-and-network' });

  const metrics = data?.metrics;

  return (
    <section className="rounded bg-white p-4 text-gray-800 shadow">
      <Typography variant="h6" component="h2">
        Metrics
      </Typography>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ul>
          <li>
            <span className="mr-2 font-bold">Open Projects:</span>
            {metrics?.openProjects || 0}
          </li>
          <li>
            <span className="mr-2 font-bold">Total Tasks:</span>
            {metrics?.totalTasks || 0}
          </li>
          <li>
            <span className="mr-2 font-bold">In Progress Tasks:</span>
            {metrics?.inProgressTasks || 0}
          </li>
          <li>
            <span className="mr-2 font-bold">Not Started Tasks:</span>
            {metrics?.notStartedTasks || 0}
          </li>
          <li>
            <span className="mr-2 font-bold">Done Tasks:</span>
            {metrics?.closedTasks || 0}
          </li>
        </ul>
      )}
    </section>
  );
}
