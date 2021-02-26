const { Team, sequelize } = require('../models');

async function createTeam(name, createdBy) {
  const transaction = await sequelize.transaction();
  try {
    const team = await Team.create({
      name,
      createdById: createdBy.id,
    });
    createdBy.teamId = team.id;
    await createdBy.save();
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return Team.create({
    name,
    createdById: createdBy.id,
  });
}

module.exports = {
  createTeam,
};
