const { typeDefForModel } = require('../helpers');
const { User } = require('../../models');

module.exports = `#graphql
  ${typeDefForModel(User)}

  extend type Query {
    users: [User]
    user(id: ID!): User
  }
`;
