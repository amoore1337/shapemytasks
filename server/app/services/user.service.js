const { Team } = require('../models');

async function joinTeam(user, joinCode) {
  if (await user.getTeam()) {
    throw new Error('User already belongs to team!');
  }

  const team = await Team.findOne({ where: { joinCode: joinCode.toLowerCase() } });
  if (!team) {
    throw new Error('No team found for code!');
  }

  user.teamId = team.id;
  await user.save();

  return team;
}

module.exports = {
  joinTeam,
};
