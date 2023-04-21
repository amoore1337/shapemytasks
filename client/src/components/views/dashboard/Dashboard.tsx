import MetricsCard from './MetricsCard';
import TeamMembersCard from './TeamMembersCard';

export default function Dashboard() {
  return (
    <div className="grid grid-flow-col grid-cols-2 gap-4 p-8">
      <TeamMembersCard />
      <MetricsCard />
    </div>
  );
}
