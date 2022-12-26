import { findAllAuthorizedProjectsForUser } from '../../services/projectM';
import { db } from '../../db';
import { Users } from '@prisma/client';
import { GraphContext, IdParam, Response, withAuthRequired } from '../helpers';
import { parsedId } from '../../services/utils';

export = {
  Query: {
    users: withAuthRequired<null, null, Response<Users[]>>((_, __, { user }) => {
      if (!user.teamId) {
        return [user];
      }

      return db.users.findMany({ where: { teamId: user.teamId } });
    }),

    user: withAuthRequired<null, IdParam, Response<Users>>((_, { id }, { user }) => {
      if (!user.teamId) {
        return id === user.id.toString() ? user : null;
      }

      return db.users.findFirst({ where: { id: parsedId(id), teamId: user.teamId } });
    }),
  },

  User: {
    async team(user: Users) {
      if (user.teamId) {
        return db.teams.findUnique({ where: { id: user.teamId } });
      }
      return null;
    },
    projects(_: null, __: null, { user }: GraphContext) {
      return findAllAuthorizedProjectsForUser(user);
    },
  },
};
