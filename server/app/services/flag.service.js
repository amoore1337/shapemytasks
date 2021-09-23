const { Scope, Flag } = require('../models');
const userService = require('./user.service');
const pubSub = require('../graphql/pubSub');

async function createFlag(params, createdBy) {
  if (!params.scopeId) { return null; }

  const scope = await Scope.findByPk(params.scopeId);
  if (scope && userService.canEditProject(createdBy, await scope.getProject())) {
    const flag = await Flag.create({
      ...params,
      createdById: createdBy.id,
    });

    pubSub.publish('SCOPE_UPDATED', { scopeUpdated: scope });

    return flag;
  }
  return null;
}

async function deleteFlag(flagId, user) {
  const flag = await Flag.findByPk(flagId);
  if (!flag) { return null; }

  const scope = await flag.getScope();
  if (scope && userService.canEditProject(user, await scope.getProject())) {
    await flag.destroy({ where: { id: flagId } });
    pubSub.publish('SCOPE_UPDATED', { scopeUpdated: scope });
    return flag;
  }
  return null;
}

async function updateFlag(flagId, user, updateValues) {
  const flag = await Flag.findByPk(flagId);
  if (!flag) { return null; }

  const scope = await flag.getScope();
  if (scope && updateValues && userService.canEditProject(user, await scope.getProject())) {
    Object.keys(updateValues).forEach((field) => { flag[field] = updateValues[field]; });

    await flag.save();
    pubSub.publish('SCOPE_UPDATED', { scopeUpdated: scope });

    return flag;
  }
  return null;
}

module.exports = {
  createFlag,
  deleteFlag,
  updateFlag,
};
