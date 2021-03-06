const { Scope, Project } = require('../models');
const userService = require('./user.service');

async function createScope(params, createdBy) {
  if (!params.projectId) { return null; }

  const project = Project.findByPk(params.projectId);
  if (project && userService.canEditProject(createdBy, project)) {
    return Scope.create({
      ...params,
      createdById: createdBy.id,
    });
  }
  return null;
}

async function deleteScope(scopeId, user) {
  const scope = await Scope.findByPk(scopeId);
  if (!scope) { return null; }

  const project = await scope.getProject();
  if (project && userService.canEditProject(user, project)) {
    await Scope.destroy({ where: { id: scopeId } });
    return scope;
  }
  return null;
}

async function updateScope(scopeId, user, updateValues) {
  const scope = await Scope.findByPk(scopeId);
  if (!scope) { return null; }

  const project = await scope.getProject();
  if (project && updateValues && userService.canEditProject(user, project)) {
    Object.keys(updateValues).forEach((field) => { scope[field] = updateValues[field]; });
    return scope.save();
  }
  return null;
}

module.exports = {
  createScope,
  deleteScope,
  updateScope,
};
