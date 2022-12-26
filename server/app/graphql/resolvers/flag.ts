import { Flags } from '@prisma/client';
import { db } from '../../db';
import { createFlag, updateFlag, deleteFlag } from '../../services/flagM';
import { parsedId } from '../../services/utils';
import { IdParam, Response, withAuthRequired } from '../helpers';

interface CreateFlagParams {
  scopeId: string;
  message?: string;
}

interface UpdateFlagParams extends IdParam {
  message?: string;
}

export = {
  Mutation: {
    createFlag: withAuthRequired<null, CreateFlagParams, Response<Flags>>((_, params, { user }) =>
      createFlag(params, user)
    ),

    updateFlag: withAuthRequired<null, UpdateFlagParams, Response<Flags>>(
      (_, { id, ...updateValues }, { user }) => updateFlag(id, updateValues, user)
    ),

    deleteFlagById: withAuthRequired<null, IdParam, Response<Flags>>((_, { id }, { user }) =>
      deleteFlag(id, user)
    ),
  },

  Query: {
    // TODO: Add permission checks:
    flags: withAuthRequired(() => db.flags.findMany()),

    flag: withAuthRequired<null, IdParam, Response<Flags>>((_parent, { id }) =>
      db.flags.findUnique({ where: { id: parsedId(id) } })
    ),
  },

  Flag: {
    scope(flag: Flags) {
      return db.scopes.findUnique({ where: { id: flag.scopeId } });
    },

    createdBy(flag: Flags) {
      return db.users.findUnique({ where: { id: flag.createdById } });
    },
  },
};
