const { gql } = require('apollo-server-express');

module.exports = gql`
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
