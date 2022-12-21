import userService from './user.service';
import { Users } from '@prisma/client';
import pubSub from '../graphql/pubSub';
import { db } from '../db';

interface CreateFlagParams {
  message: string;
  scopeId: number;
}

export async function createFlag(params: CreateFlagParams, createdBy: Users) {
  if (!params.scopeId) {
    return null;
  }

  const scope = await db.scopes.findUnique({
    where: { id: params.scopeId },
    include: { project: true },
  });
  if (scope && (await userService.canEditProject(createdBy, scope.project!))) {
    const flag = await db.flags.create({
      data: {
        ...params,
        createdById: createdBy.id,
      },
    });

    pubSub.publish('SCOPE_UPDATED', { scopeUpdated: scope });

    return flag;
  }
  return null;
}
