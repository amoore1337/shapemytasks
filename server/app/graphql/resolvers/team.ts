import { Teams } from '@prisma/client';
import { db } from '../../db';
import { removeUserFromTeam } from '../../models/team';
import { parsedId } from '../../utils';
import { IdParam, Response, withAuthRequired } from '../helpers';

export = {
  Query: {
    team: withAuthRequired<null, IdParam, Response<Teams>>((_, { id }) =>
      db.teams.findUnique({ where: { id: parsedId(id) } })
    ),
  },

  Mutation: {
    removeUserFromTeam: withAuthRequired<null, { userId: string }, Response<Teams>>(
      (_, { userId }, { user }) => removeUserFromTeam(userId, user)
    ),
  },

  Team: {
    members(team: Teams) {
      return db.users.findMany({ where: { teamId: team.id } });
    },
  },
};
