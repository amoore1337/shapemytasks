import { Users } from '@prisma/client';
import { db } from '../db';
import { publishEvent, SubscriptionEvents } from '../graphql/pubSub';
import { canEditProject } from './user';
import { DbId, parsedId } from '../utils';

interface CreateFlagParams {
  message?: string;
  scopeId: DbId;
}

export async function createFlag({ scopeId, ...params }: CreateFlagParams, createdBy: Users) {
  if (!scopeId) {
    return null;
  }

  const scope = await db.scopes.findUnique({
    where: { id: parsedId(scopeId) },
    include: { project: true },
  });

  if (scope && canEditProject(createdBy, scope.project!)) {
    const flag = await db.flags.create({
      data: {
        ...params,
        scopeId: parsedId(scopeId),
        createdById: createdBy.id,
      },
    });

    publishEvent({ type: SubscriptionEvents.ScopeUpdated, data: { scopeUpdated: scope } });

    return flag;
  }
  return null;
}

interface UpdateFlagParams {
  message?: string;
}

export async function updateFlag(flagId: DbId, params: UpdateFlagParams, user: Users) {
  const flag = await db.flags.findUnique({ where: { id: parsedId(flagId) } });
  if (!flag || !Object.keys(params).length) {
    return null;
  }

  const scope = await db.scopes.findUnique({
    where: { id: flag.scopeId },
    include: { project: true },
  });

  if (scope && canEditProject(user, scope.project!)) {
    const updatedFlag = await db.flags.update({
      where: { id: flag.id },
      data: {
        ...params,
        createdById: user.id, // Hmm, this is weird.
      },
    });
    return updatedFlag;
  }

  return null;
}

export async function deleteFlag(flagId: DbId, user: Users) {
  const flag = await db.flags.findUnique({ where: { id: parsedId(flagId) } });
  if (!flag) {
    return null;
  }

  const scope = await db.scopes.findUnique({
    where: { id: flag.scopeId },
    include: { project: true },
  });

  if (scope && canEditProject(user, scope.project!)) {
    const updatedFlag = await db.flags.delete({ where: { id: flag.id } });
    return flag; // Want to return null but need to see if that'll break something
  }

  return null;
}
