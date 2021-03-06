const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { Scope } = require('../../models');

module.exports = gql`
  ${typeDefForModel(Scope)}

  extend type Query {
    scopes: [Scope]
    scope(id: ID!): Scope
  }

  extend type Mutation {
    createScope(title: String!, description: String, color: String, progress: Int, projectId:ID!): Scope
    updateScope(id: ID!, title: String, description: String, color: String, progress: Int): Scope
    deleteScopeById(id: ID!): Scope
  }
`;
