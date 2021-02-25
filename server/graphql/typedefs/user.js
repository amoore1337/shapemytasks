const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { User } = require('../../app/models');

module.exports = gql`
  ${typeDefForModel(User, 'User')}

  extend type Query {
    users: [User]
  }
`;
