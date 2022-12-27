import { Users } from '@prisma/client';
import { db } from '../db';
import { DbId, parsedId } from '../utils';

// A team member can only be removed by another user in the team
export async function removeUserFromTeam(userId: DbId, currentUser: Users) {
  if (!currentUser.teamId) {
    return null;
  }
  const team = await db.teams.findUnique({ where: { id: currentUser.teamId } });
  if (!team) {
    return null;
  }

  // Prisma doesn't consider the added teamId constraint as 'unique' so have to 'updateMany'...
  const updated = await db.users.updateMany({
    where: { id: parsedId(userId), teamId: team.id },
    data: { teamId: null },
  });
  if (updated.count < 1) {
    return null;
  }

  return team;
}
