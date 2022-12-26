export = `#graphql
  type CurrentUser {
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
    currentUser: CurrentUser
  }

  extend type Mutation {
    createTeam(name: String!, restrictEmailDomain: String): CurrentUser
    joinTeam(joinCode: String!): CurrentUser
  }
`;
