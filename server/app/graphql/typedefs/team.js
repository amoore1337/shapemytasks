const { typeDefForModel } = require('../helpers');
const { Team } = require('../../models');

module.exports = `#graphql
  ${typeDefForModel(Team)}

  extend type Query {
    team(id: ID!): Team
  }
`;
