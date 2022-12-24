export = `#graphql
  type Flag {
    id: ID!
    message: String
    scopeId: ID!
    createdAt: Date!
    updatedAt: Date!
    createdBy: User
    scope: Scope
  }

  extend type Query {
    flags: [Flag]
    flag(id: ID!): Flag
  }

  extend type Mutation {
    createFlag(message: String, scopeId: ID!): Flag
    updateFlag(id: ID!, message: String): Flag
    deleteFlagById(id: ID!): Flag
  }
`;
