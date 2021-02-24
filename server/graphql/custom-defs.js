const { typeDefForModel } = require('./helpers');
const { User } = require('../app/models');

// ============================================================================================

const currentUserTypeDef = typeDefForModel(User, 'User').replace('type User', 'type CurrentUser');

const typeDefs = `
  ${currentUserTypeDef}
`;

// ============================================================================================

const currentUserQuery = 'currentUser: CurrentUser';

const queries = `
  ${currentUserQuery}
`;

// ============================================================================================

const resolvers = {};

resolvers.currentUser = (_, __, { user }) => user;

// ============================================================================================

module.exports = {
  typeDefs,
  queries,
  resolvers,
};
