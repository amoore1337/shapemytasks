import { Projects, Users } from '@prisma/client';
import { db } from '../db';
import { canEditProject } from './userM';
import { parsedId } from './utils';

export async function findAllAuthorizedProjectsForUser(user: Users | undefined | null) {
  if (!user) {
    return [];
  }

  return db.projects.findMany({
    where: {
      OR: [
        { createdById: user.id, teamId: user.teamId },
        { teamId: user.teamId, visibility: 'visible' },
      ],
    },
  });
}

export async function findAuthorizedProject(
  projectId: number | string,
  user: Users | undefined | null
) {
  if (!user) {
    return null;
  }

  return db.projects.findFirst({
    where: {
      id: parsedId(projectId),
      OR: [
        { createdById: user.id, teamId: user.teamId },
        { teamId: user.teamId, visibility: 'visible' },
      ],
    },
  });
}

export function isProjectVisible(project: Projects) {
  return project.visibility === 'visible';
}

interface CreateProjectParams {
  title: string;
  description?: string;
  visibility?: string;
}

export async function createProject(user: Users, createParams: CreateProjectParams) {
  return db.projects.create({ data: { ...createParams, createdById: user.id } });
}

interface UpdateProjectParams {
  title?: string;
  description?: string;
  visibility?: string;
}

export async function updateProject(
  projectId: string | number,
  user: Users,
  updateValues: UpdateProjectParams
) {
  const project = await db.projects.findUnique({ where: { id: parsedId(projectId) } });
  if (project && updateValues && canEditProject(user, project)) {
    return db.projects.update({ where: { id: project.id }, data: updateValues });
  }

  return null;
}

export async function deleteAuthorizedProject(user: Users, projectId: string | number) {
  const project = await db.projects.findUnique({ where: { id: parsedId(projectId) } });
  if (project && canEditProject(user, project)) {
    return db.projects.delete({ where: { id: project.id } });
  }
  return null;
}
