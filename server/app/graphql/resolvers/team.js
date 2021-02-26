const { AuthenticationError } = require('apollo-server-express');
const { basicQueryAllResolver, basicFindByIdResolver } = require('../helpers');
const teamService = require('../../services/team.service');
const { Team } = require('../../models');

module.exports = {
  Mutation: {
    async createTeam(_, { name }, { user }) {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a team.');
      }

      return teamService.createTeam(name, user);
    },
  },

  Query: {
    ...basicQueryAllResolver(Team),
    ...basicFindByIdResolver(Team),
  },

  Team: {
    members(team) {
      return team.getMembers();
    },
  },
};
