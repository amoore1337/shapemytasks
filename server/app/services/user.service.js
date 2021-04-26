const { Team } = require('../models');

async function joinTeam(user, joinCode) {
  if (await user.getTeam()) {
    throw new Error('User already belongs to team!');
  }

  const team = await Team.findOne({ where: { joinCode: joinCode.toLowerCase() } });
  if (!team) {
    throw new Error('No team found for code!');
  }

  if (team.restrictEmailDomain) {
    const emailDomain = user.email.split('@')[1];
    if (emailDomain !== team.restrictEmailDomain) {
      throw new Error('You do not have the necessary permissions to join this team.');
    }
  }

  user.teamId = team.id;
  await user.save();

  return team;
}

async function canEditProject(user, project) {
  if (!user) { return false; }
  if (project && user.id === project.createdById) {
    return true;
  }

  // TODO: This should be replaced by a permissions record lookup:
  if (project && user.teamId === project.teamId && project.isVisible()) {
    return true;
  }

  return false;
}

module.exports = {
  joinTeam,
  canEditProject,
};
