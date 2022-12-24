import { Users } from '@prisma/client';
import { db } from '../db';
import { findAllAuthorizedProjectsForUser } from './projectM';

export async function findMetricsForUser(user: Users | null) {
  if (!user) {
    return null;
  }

  const projects = await findAllAuthorizedProjectsForUser(user);

  const scopes = await db.scopes.findMany({
    where: { projectId: { in: projects.map((p) => p.id) } },
  });

  const inProgressCount = scopes.filter((t) => t.progress > 0 && t.progress < 100).length;
  const notStartedCount = scopes.filter((t) => t.progress === 0).length;
  const closedCount = scopes.filter((t) => t.progress === 100).length;

  return {
    openProjects: projects.length,
    totalTasks: scopes.length,
    inProgressTasks: inProgressCount,
    notStartedTasks: notStartedCount,
    closedTasks: closedCount,
  };
}
