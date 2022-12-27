import { Scopes, Users } from '@prisma/client';
import { db } from '../db';
import { publishEvent, SubscriptionEvents } from '../graphql/pubSub';
import { midString } from '../midString';
import { canEditProject } from './user';
import { findAllAuthorizedProjectsForUser } from './project';
import { DbId, parsedId } from '../utils';

interface ScopeCreateParams {
  title: string;
  projectId: DbId;
  description?: string;
  color?: string;
  progress?: number;
  niceToHave?: boolean;
}

export async function findAllAuthorizedScopesByUser(user: Users) {
  const projects = await findAllAuthorizedProjectsForUser(user);

  return db.scopes.findMany({
    where: { createdById: user.id, projectId: { in: projects.map((p) => p.id) } },
  });
}

export async function findAllAuthorizedScopes(user: Users) {
  const projects = await findAllAuthorizedProjectsForUser(user);

  return db.scopes.findMany({
    where: { projectId: { in: projects.map((p) => p.id) } },
  });
}

export async function findAuthorizedScope(scopeId: DbId, user: Users) {
  if (!user.teamId) {
    const scope: Scopes = await db.$queryRaw`
      SELECT "Scopes".* FROM "Scopes"
      INNER JOIN (
        SELECT id FROM "Projects"
        WHERE ("Projects"."createdById" = ${user.id} AND "Projects"."teamId" = null)
      ) projects ON "Scopes"."projectId" = projects.id
      WHERE "Scopes".id = ${parsedId(scopeId)}
    `;

    return scope;
  }

  const scope: Scopes = await db.$queryRaw`
    SELECT "Scopes".* FROM "Scopes"
    INNER JOIN (
      SELECT id FROM "Projects"
      WHERE ("Projects"."createdById" = ${user.id} AND "Projects"."teamId" = ${user.teamId})
      OR ("Projects"."teamId" = ${user.teamId} AND "Projects".visibility = 'visible')
    ) projects ON "Scopes"."projectId" = projects.id
    WHERE "Scopes".id = ${parsedId(scopeId)}
  `;

  return scope;
}

export async function createScope({ projectId, ...params }: ScopeCreateParams, user: Users) {
  if (!projectId) {
    return null;
  }

  // TODO: Permission checking is getting redundant.
  // Maybe need to find some way to move into middleware.
  const project = await db.projects.findUnique({ where: { id: parsedId(projectId) } });
  if (project && canEditProject(user, project)) {
    // TODO: Update collation on table so ordering by position works by default
    const lastScope: Scopes = await db.$queryRaw`
      SELECT * from "Scopes" WHERE "projectId" = ${project.id}
      ORDER BY position COLLATE "C" asc LIMIT 1;
    `;

    const scope = await db.scopes.create({
      data: {
        ...params,
        projectId: project.id,
        position: midString(lastScope?.position ?? '', ''),
        createdById: user.id,
      },
    });

    publishEvent({ type: SubscriptionEvents.ScopeCreated, data: { scopeCreated: scope } });

    return scope;
  }

  return null;
}

interface ScopeUpdateParams {
  title?: string;
  description?: string;
  color?: string;
  progress?: number;
  niceToHave?: boolean;
}

export async function updateScope(scopeId: DbId, user: Users, params: ScopeUpdateParams) {
  const updateVals: ScopeUpdateParams & { closedAt?: Date | null } = { ...params };
  if (!updateVals.title) {
    // If title is supplied but empty, ignore it.
    delete updateVals.title;
  }

  const hasProgress = typeof updateVals.progress !== 'undefined' && updateVals.progress !== null;
  if (hasProgress && updateVals.progress! > 99) {
    updateVals.closedAt = new Date();
  } else if (hasProgress && updateVals.progress! < 99) {
    updateVals.closedAt = null;
  }

  const scope = await db.scopes.findUnique({
    where: { id: parsedId(scopeId) },
    include: { project: true },
  });

  if (!scope || !scope.project) {
    return null;
  }

  if (Object.keys(updateVals).length && canEditProject(user, scope.project)) {
    const scopeUpdated = await db.scopes.update({
      where: { id: scope.id },
      data: { ...updateVals },
    });

    publishEvent({ type: SubscriptionEvents.ScopeUpdated, data: { scopeUpdated } });

    return scopeUpdated;
  }

  return null;
}

export async function deleteScope(scopeId: DbId, user: Users) {
  const scope = await db.scopes.findUnique({
    where: { id: parsedId(scopeId) },
    include: { project: true },
  });

  if (!scope || !scope.project) {
    return null;
  }

  if (canEditProject(user, scope.project)) {
    await db.scopes.delete({ where: { id: scope.id } });
    publishEvent({ type: SubscriptionEvents.ScopeDeleted, data: { scopeDeleted: scope } });

    return scope;
  }

  return null;
}

interface BatchUpdateScopeProgressMap {
  id: DbId;
  progress: number;
}

export async function batchUpdateScopeProgresses(
  updates: BatchUpdateScopeProgressMap[],
  user: Users
) {
  if (!updates.length) {
    return null;
  }

  const scopes = await db.scopes.findMany({
    where: { id: { in: updates.map((u) => parsedId(u.id)) } },
  });
  const uniqueProjectIds = new Set(scopes.map((s) => s.projectId!));
  if (uniqueProjectIds.size !== 1) {
    return new Error('All scopes must belong to the same project');
  }

  const project = await db.projects.findUnique({
    where: { id: uniqueProjectIds.values().next().value },
  });

  const results: Promise<Scopes>[] = [];
  if (project && canEditProject(user, project)) {
    for (const scope of scopes) {
      // Meh, typing is just annoying here. Fix later...
      const update: any = { ...updates.find(({ id }) => id.toString() === scope.id.toString()) };
      if (!update) {
        continue;
      }
      delete update.id;

      if (update.progress > 99) {
        update.closedAt = new Date();
      } else {
        update.closedAt = null;
      }
      results.push(db.scopes.update({ where: { id: scope.id }, data: update }));
    }

    const updatedScopes = await Promise.all(results);
    publishEvent({
      type: SubscriptionEvents.ScopeBatchProgressUpdated,
      data: { scopeBatchProgressUpdated: updatedScopes },
    });

    return updatedScopes;
  }

  return null;
}

export async function updateScopePosition(scopeId: DbId, targetIndex: number, user: Users) {
  const scope = await db.scopes.findUnique({
    where: { id: parsedId(scopeId) },
    include: { project: true },
  });
  if (!scope) {
    return new Error('Scope not found');
  }

  if (scope.project && canEditProject(user, scope.project)) {
    const scopes: Scopes[] = await db.$queryRaw`
      SELECT * from "Scopes" WHERE "projectId" = ${scope.project.id}
      ORDER BY position COLLATE "C" asc;
    `;

    const fromIndex = scopes.findIndex((s) => s.id === scope.id);
    const scopeAtIndex = scopes[targetIndex];
    if (!scopeAtIndex) {
      return new Error('Invalid target index');
    }

    let abovePos: string;
    let belowPos: string;
    if (fromIndex < targetIndex) {
      abovePos = scopeAtIndex.position!;
      belowPos = scopes[targetIndex + 1] ? scopes[targetIndex + 1].position! : '';
    } else {
      abovePos = scopes[targetIndex - 1] ? scopes[targetIndex - 1].position! : '';
      belowPos = scopeAtIndex.position!;
    }

    const position = midString(abovePos, belowPos);
    const scopeUpdated = await db.scopes.update({ where: { id: scope.id }, data: { position } });

    publishEvent({ type: SubscriptionEvents.ScopeUpdated, data: { scopeUpdated } });

    return scopeUpdated;
  }

  return null;
}
