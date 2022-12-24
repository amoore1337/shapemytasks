const { rejectUnauthenticated } = require('../helpers');
const {
  findAllAuthorizedProjectsForUser,
  findAuthorizedProject,
  createProject,
  updateProject,
  deleteAuthorizedProject,
} = require('../../services/projectM.ts');
const { db } = require('../../db.ts');

module.exports = {
  Mutation: {
    async createProject(_, createParams, { user }) {
      rejectUnauthenticated(user);

      return createProject(user, createParams);
    },

    updateProject(_, { id, ...updateValues }, { user }) {
      rejectUnauthenticated(user);

      return updateProject(id, user, updateValues);
    },

    deleteProjectById(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return deleteAuthorizedProject(user, id);
    },
  },

  Query: {
    async projects(_, __, { user }) {
      rejectUnauthenticated(user);

      return findAllAuthorizedProjectsForUser(user);
    },

    async project(_, { id }, { user }) {
      rejectUnauthenticated(user);

      return findAuthorizedProject(id, user);
    },
  },

  Project: {
    async team(project) {
      return db.teams.findUnique({ where: { id: project.teamId } });
    },

    async owner(project) {
      return db.users.findUnique({ where: { id: project.createdById } });
    },

    async scopes(project) {
      return db.scopes.findMany({ where: { projectId: project.id }, orderBy: [{ id: 'asc' }] });
    },
  },
};
