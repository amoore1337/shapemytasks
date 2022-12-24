export = `#graphql
  type User {
    id: ID!
    name: String
    email: String!
    avatarUrl: String
    createdAt: Date!
    updatedAt: Date!
    teamId: ID
    team: Team
    scopes: [Scope]
    projects: [Project]
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }
`;
