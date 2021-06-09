const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { Scope } = require('../../models');

module.exports = gql`
  ${typeDefForModel(Scope)}

  extend type Query {
    scopes: [Scope]
    scope(id: ID!): Scope
  }

  input BatchUpdateScopeProgressMap {
    id: ID!
    progress: Float!
  }

  extend type Mutation {
    createScope(title: String!, description: String, color: String, progress: Float, projectId:ID!): Scope
    updateScope(id: ID!, title: String, description: String, color: String, progress: Float): Scope
    deleteScopeById(id: ID!): Scope
    batchUpdateScopeProgress(inputs: [BatchUpdateScopeProgressMap!]!): [Scope]
    updateScopePosition(id:ID!, targetIndex: Int!): Scope
  }

  extend type Subscription {
    scopeCreated(projectId:ID!): Scope
    scopeUpdated(projectId:ID!): Scope
    scopeDeleted(projectId:ID!): Scope
  }
`;
