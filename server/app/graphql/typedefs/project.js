const { gql } = require('apollo-server-express');
const { typeDefForModel } = require('../helpers');
const { Project } = require('../../models');

module.exports = gql`
  ${typeDefForModel(Project)}

  extend type Query {
    projects: [Project]
    project(id: ID!): Project
  }

  extend type Mutation {
    createProject(title: String!, description: String, visibility: String): Project
    updateProject(id: ID!, title: String, description: String, visibility: String): Project
    deleteProjectById(id: ID!): Project
  }
`;
