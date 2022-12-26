import { Projects, Users } from '@prisma/client';
import { db } from '../db';
import { isProjectVisible } from './project';
import { base26EncodeNum, randomStringGenerator } from '../utils';

export async function joinTeam(user: Users, joinCode: string) {
  if (user.teamId) {
    const existingTeam = await db.teams.findUnique({ where: { id: user.teamId } });
    if (existingTeam) {
      throw new Error('User already belongs to a team!');
    }
  }

  const team = await db.teams.findFirst({ where: { joinCode } });
  if (!team) {
    throw new Error('No team found for code!');
  }

  if (!isValidEmailDomain(team.restrictEmailDomain, user.email)) {
    throw new Error('You do not have the necessary permissions to join this team.');
  }

  const updatedUser = await db.users.update({ where: { id: user.id }, data: { teamId: team.id } });

  return updatedUser;
}

function isValidEmailDomain(requiredDomain: string | null, userEmail: string) {
  if (!requiredDomain) {
    return true;
  }
  const emailDomain = userEmail.split('@')[1];
  return emailDomain === requiredDomain;
}

export function canEditProject(user: Users | null, project: Projects | null) {
  if (!user || !project) {
    return false;
  }

  if (user.id === project.createdById) {
    return true;
  }

  // TODO: This can eventually be replaced by a permissions record lookup:
  if (user.teamId === project.teamId && isProjectVisible(project)) {
    return true;
  }

  return false;
}

interface TeamCreateParams {
  name: string;
  restrictEmailDomain?: string;
}

export async function createAndJoinTeam(user: Users, teamCreateParams: TeamCreateParams) {
  let updatedUser = user;

  await db.$transaction(async (tx) => {
    // Create team:
    const team = await tx.teams.create({
      data: {
        ...teamCreateParams,
      },
    });

    // Create join code:
    await tx.teams.update({
      where: { id: team.id },
      data: { joinCode: `${base26EncodeNum(team.id)}-${randomStringGenerator(4)}` },
    });

    // Make the user part of the new team:
    updatedUser = await tx.users.update({ where: { id: user.id }, data: { teamId: team.id } });

    // Move any projects they've created part of the team too:
    await tx.projects.updateMany({
      where: { createdById: user.id, teamId: null },
      data: { teamId: team.id },
    });
  });

  return updatedUser;
}
