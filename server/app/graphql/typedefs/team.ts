export = `#graphql
  type Team {
    id: ID!
    name: String!
    createdById: ID
    createdAt: Date!
    updatedAt: Date!
    joinCode: String
    restrictedEmailDomain: String
    projects: [Project]
    members: [User]
  }

  extend type Query {
    team(id: ID!): Team
  }
`;
