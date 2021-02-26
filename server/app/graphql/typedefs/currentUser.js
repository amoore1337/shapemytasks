const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { User } = require('../../models');

module.exports = gql`
  ${typeDefForModel(User, 'CurrentUser')}

  extend type Query {
    currentUser: CurrentUser
  }

  extend type Mutation {
    joinTeam(joinCode: String!): Team
  }
`;
