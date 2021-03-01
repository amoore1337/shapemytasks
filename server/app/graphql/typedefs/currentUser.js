const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { User } = require('../../models');

module.exports = gql`
  ${typeDefForModel(User, 'CurrentUser')}

  extend type Query {
    currentUser: CurrentUser
  }

  extend type Mutation {
    createTeam(name: String!): CurrentUser
    joinTeam(joinCode: String!): CurrentUser
  }
`;
