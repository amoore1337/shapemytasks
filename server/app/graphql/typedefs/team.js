const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { Team } = require('../../models');

module.exports = gql`
  ${typeDefForModel(Team)}

  extend type Query {
    teams: [Team]
    team(id: Int!): Team
  }

  extend type Mutation {
    createTeam(name: String!): Team
  }
`;
