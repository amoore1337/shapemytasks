import React from 'react';

import { Typography } from '@mui/material';

import useQueryMetrics from '@/api/queries/useQueryMetrics';
import LoadingIndicator from '@/components/LoadingIndicator';

export default function MetricsCard() {
  const { loading, data } = useQueryMetrics({ fetchPolicy: 'cache-and-network' });

  const metrics = data?.metrics;

  return (
    <section className="p-4 bg-white shadow rounded text-gray-800">
      <Typography variant="h6" component="h2">Metrics</Typography>
      {loading ? <LoadingIndicator /> : (
        <ul>
          <li>
            <span className="font-bold mr-2">Open Projects:</span>
            {metrics?.openProjects || 0}
          </li>
          <li>
            <span className="font-bold mr-2">Total Tasks:</span>
            {metrics?.totalTasks || 0}
          </li>
          <li>
            <span className="font-bold mr-2">In Progress Tasks:</span>
            {metrics?.inProgressTasks || 0}
          </li>
          <li>
            <span className="font-bold mr-2">Not Started Tasks:</span>
            {metrics?.notStartedTasks || 0}
          </li>
          <li>
            <span className="font-bold mr-2">Done Tasks:</span>
            {metrics?.closedTasks || 0}
          </li>
        </ul>
      )}
    </section>
  );
}
