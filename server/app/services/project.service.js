const { Project, sequelize, Sequelize } = require('../models');
const userService = require('./user.service');

async function createProject(title, description, visibility, createdBy) {
  const transaction = await sequelize.transaction();

  let project;
  try {
    project = await Project.create({
      title,
      description,
      visibility,
      teamId: createdBy.teamId ? createdBy.teamId : null,
      createdById: createdBy.id,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return project;
}

async function findAllProjectsForUser(user) {
  return Project.findAll({
    where: {
      [Sequelize.Op.or]: [
        { createdById: user.id, teamId: user.teamId },
        { teamId: user.teamId, visibility: 'visible' },
      ],
    },
  });
}

async function findProjectForUser(projectId, user) {
  const project = await Project.findOne({
    where: {
      id: projectId,
      teamId: user.teamId,
    },
  });

  if (!project) { return null; }

  if (project.createdById === user.id) {
    return project;
  }

  const team = await project.getTeam();
  if (team && team.visibility === 'visible') {
    return project;
  }

  return null;
}

async function deleteProject(projectId, user) {
  const project = await Project.findByPk(projectId);
  if (project && userService.canEditProject(user, project)) {
    await Project.destroy({ where: { id: projectId } });
    return project;
  }
  return null;
}

async function updateProject(projectId, user, updateValues) {
  const project = await Project.findByPk(projectId);
  if (project && updateValues && userService.canEditProject(user, project)) {
    Object.keys(updateValues).forEach((field) => { project[field] = updateValues[field]; });
    return project.save();
  }
  return null;
}

module.exports = {
  createProject,
  findAllProjectsForUser,
  findProjectForUser,
  deleteProject,
  updateProject,
};
