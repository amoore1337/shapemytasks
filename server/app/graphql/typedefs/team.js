const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { Team } = require('../../models');

module.exports = gql`
  ${typeDefForModel(Team)}

  extend type Query {
    team(id: ID!): Team
  }
`;
