const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { User } = require('../../models');

module.exports = gql`
  ${typeDefForModel(User)}

  extend type Query {
    users: [User]
    user(id: ID!): User
  }
`;
