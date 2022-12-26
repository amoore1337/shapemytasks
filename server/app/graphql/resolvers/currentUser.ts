import { createAndJoinTeam, joinTeam } from '../../services/userM';
import { findAllAuthorizedProjectsForUser } from '../../services/projectM';
import { findAllAuthorizedScopesByUser } from '../../services/scopeM';
import { AuthenticatedGraphContext, GraphContext, Response, withAuthRequired } from '../helpers';
import { db } from '../../db';
import { Users } from '@prisma/client';

interface CreateTeamParams {
  name: string;
  restrictedEmailDomain?: string;
}

interface JoinTeamParams {
  joinCode: string;
}

export = {
  Mutation: {
    createTeam: withAuthRequired<null, CreateTeamParams, Response<Users>>((_, params, { user }) =>
      createAndJoinTeam(user, params)
    ),

    joinTeam: withAuthRequired<null, JoinTeamParams, Response<Users>>((_, { joinCode }, { user }) =>
      joinTeam(user, joinCode)
    ),
  },

  Query: {
    currentUser: (_: null, __: null, { user }: GraphContext) => user,
  },

  CurrentUser: {
    async team(currentUser: Users) {
      if (currentUser.teamId) {
        return db.teams.findUnique({ where: { id: currentUser.teamId } });
      }
      return null;
    },

    projects(_: Users, __: null, { user }: AuthenticatedGraphContext) {
      return findAllAuthorizedProjectsForUser(user);
    },

    scopes(_: null, __: null, { user }: AuthenticatedGraphContext) {
      return findAllAuthorizedScopesByUser(user);
    },
  },
};
