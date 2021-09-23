const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { Flag } = require('../../models');

module.exports = gql`
  ${typeDefForModel(Flag)}

  extend type Query {
    flags: [Flag]
    flag(id: ID!): Flag
  }

  extend type Mutation {
    createFlag(message: String, scopeId:ID!): Flag
    updateFlag(id: ID!, message: String): Flag
    deleteFlagById(id: ID!): Flag
  }
`;
