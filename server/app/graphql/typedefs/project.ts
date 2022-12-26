module.exports = `#graphql
  type Project {
    id: ID!
    title: String!
    description: String
    createdById: ID
    visibility: String!
    teamId: ID
    createdAt: Date!
    updatedAt: Date!
    owner: User
    team: Team
    scopes: [Scope]
  }

  extend type Query {
    projects: [Project]
    project(id: ID!): Project
  }

  extend type Mutation {
    createProject(title: String!, description: String, visibility: String): Project
    updateProject(id: ID!, title: String, description: String, visibility: String): Project
    deleteProjectById(id: ID!): Project
  }
`;
