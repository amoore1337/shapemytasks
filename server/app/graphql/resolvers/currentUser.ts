import { createAndJoinTeam, joinTeam } from '../../services/userM';
import { findAllAuthorizedProjectsForUser } from '../../services/projectM';
import { findAllAuthorizedScopesByUser } from '../../services/scopeM';
import { rejectUnauthenticated } from '../helpers';
import { db } from '../../db';

export = {
  Mutation: {
    async createTeam(_: any, params: any, { user }: any) {
      rejectUnauthenticated(user);

      await createAndJoinTeam(user, params);
      return user.reload();
    },

    async joinTeam(_: any, { joinCode }: any, { user }: any) {
      rejectUnauthenticated(user);

      return joinTeam(user, joinCode);
    },
  },

  Query: {
    currentUser: (_: any, __: any, { user }: any) => user,
  },

  CurrentUser: {
    async team(currentUser: any) {
      if (currentUser.teamId) {
        return db.teams.findUnique({ where: { id: currentUser.teamId } });
      }
      return null;
    },

    projects(_: any, __: any, { user }: any) {
      return findAllAuthorizedProjectsForUser(user);
    },

    scopes(_: any, __: any, { user }: any) {
      return findAllAuthorizedScopesByUser(user);
    },
  },
};
