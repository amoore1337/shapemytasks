import { IdParam, Response, withAuthRequired } from '../helpers';
import {
  findAllAuthorizedProjectsForUser,
  findAuthorizedProject,
  createProject,
  updateProject,
  deleteAuthorizedProject,
} from '../../services/projectM';
import { db } from '../../db';
import { Projects } from '@prisma/client';

interface CreateProjectParams {
  title: string;
  description?: string;
  visibility?: string;
}

interface UpdateProjectParams extends CreateProjectParams, IdParam {}

module.exports = {
  Mutation: {
    createProject: withAuthRequired<null, CreateProjectParams, Response<Projects>>(
      (_, createParams, { user }) => createProject(user, createParams)
    ),

    updateProject: withAuthRequired<null, UpdateProjectParams, Response<Projects>>(
      (_, { id, ...updateParams }, { user }) => updateProject(id, user, updateParams)
    ),

    deleteProjectById: withAuthRequired<null, IdParam, Response<Projects>>((_, { id }, { user }) =>
      deleteAuthorizedProject(user, id)
    ),
  },

  Query: {
    projects: withAuthRequired<null, null, Response<Projects[]>>((_, __, { user }) =>
      findAllAuthorizedProjectsForUser(user)
    ),

    project: withAuthRequired<null, IdParam, Response<Projects>>((_, { id }, { user }) =>
      findAuthorizedProject(id, user)
    ),
  },

  Project: {
    async team(project: Projects) {
      if (!project.teamId) {
        return null;
      }
      return db.teams.findUnique({ where: { id: project.teamId } });
    },

    async owner(project: Projects) {
      return db.users.findUnique({ where: { id: project.createdById! } });
    },

    async scopes(project: Projects) {
      return db.scopes.findMany({ where: { projectId: project.id }, orderBy: [{ id: 'asc' }] });
    },
  },
};
