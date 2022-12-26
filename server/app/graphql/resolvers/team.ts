import { Teams } from '@prisma/client';
import { db } from '../../db';
import { parsedId } from '../../services/utils';
import { IdParam, Response, withAuthRequired } from '../helpers';

export = {
  Query: {
    team: withAuthRequired<null, IdParam, Response<Teams>>((_, { id }) =>
      db.teams.findUnique({ where: { id: parsedId(id) } })
    ),
  },

  Team: {
    members(team: Teams) {
      return db.users.findMany({ where: { teamId: team.id } });
    },
  },
};
