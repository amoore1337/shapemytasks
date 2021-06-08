const { Scope, Project } = require('../models');
const userService = require('./user.service');
const { midString } = require('./position.service');
const pubSub = require('../graphql/pubSub');

async function createScope(params, createdBy) {
  if (!params.projectId) { return null; }

  const project = await Project.findByPk(params.projectId);
  if (project && userService.canEditProject(createdBy, project)) {
    const lastScope = await Scope.findOne({
      where: {
        projectId: project.id,
      },
      order: [['position', 'DESC']],
    });

    const lastPosition = lastScope && lastScope.position;
    const scope = await Scope.create({
      ...params,
      position: midString(lastPosition || '', ''),
      createdById: createdBy.id,
    });

    pubSub.publish('SCOPE_CREATED', { scopeCreated: scope });

    return scope;
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

    await scope.save();
    pubSub.publish('SCOPE_UPDATED', { scopeUpdated: scope });

    return scope;
  }
  return null;
}

async function updateScopeProgresses(updatesMap, user) {
  if (!updatesMap.length) { return null; }

  const scope = await Scope.findByPk(updatesMap[0].id);
  if (!scope) { return null; }

  const project = await scope.getProject();
  if (!project || !userService.canEditProject(user, project)) {
    return null;
  }

  const scopes = await Scope.findAll({
    where: {
      id: updatesMap.map((s) => s.id),
    },
    order: [['id', 'ASC']],
  });

  const outOfProjectScopes = scopes.filter((s) => s.projectId !== project.id);
  if (outOfProjectScopes.length) {
    return new Error('All scopes must belong to the same project');
  }

  const results = [];
  for (const s of scopes) {
    const update = updatesMap.find(({ id }) => id === s.id.toString());
    if (update) {
      s.progress = update.progress;
      pubSub.publish('SCOPE_UPDATED', { scopeUpdated: s });
      results.push(s.save());
    }
  }

  await Promise.all(results);

  return scopes;
}

// TODO: 3 db reads + 1 write. This can be optimized better but we'll
// wait and see if that's needed.
async function updateScopePosition(scopeId, targetIndex, user) {
  const scope = await Scope.findByPk(scopeId);
  if (!scope) { return new Error('Scope not found'); }

  const project = await scope.getProject();
  if (!project || !userService.canEditProject(user, project)) {
    return new Error('User cannot access project');
  }

  const scopes = await project.getScopes({ order: [['position', 'ASC']] });

  const fromIndex = scopes.findIndex(({ dataValues }) => dataValues.id === parseInt(scopeId, 10));
  const scopeAtIndex = scopes[targetIndex];
  if (!scopeAtIndex) { return new Error('Invalid target index'); }

  let abovePos; let belowPos;
  if (fromIndex < targetIndex) {
    abovePos = scopeAtIndex.position;
    belowPos = scopes[targetIndex + 1] ? scopes[targetIndex + 1].position : '';
  } else {
    abovePos = scopes[targetIndex - 1] ? scopes[targetIndex - 1].position : '';
    belowPos = scopeAtIndex.position;
  }

  scope.position = midString(abovePos, belowPos);
  await scope.save();
  pubSub.publish('SCOPE_UPDATED', { scopeUpdated: scope });

  return scope;
}

module.exports = {
  createScope,
  deleteScope,
  updateScope,
  updateScopeProgresses,
  updateScopePosition,
};
