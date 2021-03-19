import React from 'react';

import MetricsCard from './MetricsCard';
import TeamMembersCard from './TeamMembersCard';

export default function Home() {
  return (
    <div className="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 p-8">
      <TeamMembersCard />
      <MetricsCard />
    </div>
  );
}
