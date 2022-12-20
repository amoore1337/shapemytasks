const { Team, Project, sequelize } = require('../models');

async function createTeam(name, restrictEmailDomain, createdBy) {
  const transaction = await sequelize.transaction();
  let team;
  try {
    team = await Team.create({
      name,
      restrictEmailDomain,
      createdById: createdBy.id,
    });

    // Make the user part of the new team:
    createdBy.teamId = team.id;
    await createdBy.save();

    // Move any projects they've created part of the team too:
    await Project.update(
      { teamId: team.id },
      {
        where: {
          createdById: createdBy.id,
          teamId: null,
        },
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return team;
}

module.exports = {
  createTeam,
};
