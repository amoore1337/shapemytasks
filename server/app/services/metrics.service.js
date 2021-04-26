const { Scope } = require('../models');
const projectService = require('./project.service');

async function getMetricsForUser(user) {
  if (!user) { return null; }
  const projects = await projectService.findAllProjectsForUser(user);

  const { count, rows: tasks } = await Scope.findAndCountAll({
    where: { projectId: projects.map((p) => p.id) },
  });

  const inProgressCount = tasks.filter((t) => t.progress > 0 && t.progress < 100).length;
  const notStartedCount = tasks.filter((t) => t.progress === 0).length;
  const closedCount = tasks.filter((t) => t.progress === 100).length;
  return {
    openProjects: projects.length,
    totalTasks: count,
    inProgressTasks: inProgressCount,
    notStartedTasks: notStartedCount,
    closedTasks: closedCount,
  };
}

module.exports = {
  getMetricsForUser,
};
