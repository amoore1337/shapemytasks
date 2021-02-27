const { AuthenticationError } = require('apollo-server-express');
const { basicFindByIdResolver } = require('../helpers');
const projectService = require('../../services/project.service');
const { Project } = require('../../models');

module.exports = {
  Mutation: {
    async createProject(_, { title, description, visibility }, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a team.');
      }

      return projectService.createProject(title, description, visibility, user);
    },
  },

  Query: {
    ...basicFindByIdResolver(Project),

    projects(_, __, { user }) {
      return projectService.findAllProjectsForUser(user);
    },

    project(_, { id }, { user }) {
      return projectService.findProjectForUser(id, user);
    },
  },

  Project: {
    team(project) {
      return project.getTeam();
    },

    owner(project) {
      return project.getOwner();
    },
  },
};
