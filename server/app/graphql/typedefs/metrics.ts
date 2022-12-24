export = `#graphql
  type Metrics {
    openProjects: Int!
    totalTasks: Int!
    inProgressTasks: Int!
    notStartedTasks: Int!
    closedTasks: Int!
  }

  extend type Query {
    metrics: Metrics
  }
`;
