const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');

const { User } = require('../models');
const { verifyJWT } = require('../services/auth.service');

const currentUserTypeDefs = require('./typedefs/currentUser');
const userTypeDefs = require('./typedefs/user');
const teamTypeDefs = require('./typedefs/team');

const currentUserResolvers = require('./resolvers/currentUser');
const userResolvers = require('./resolvers/user');
const teamResolvers = require('./resolvers/team');

// ============================================================================================

const customScalarsTypeDef = `
  scalar Date
`;

const typeDefs = gql`
  ${customScalarsTypeDef}

  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

// ============================================================================================

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to type expected by parseValue
      return parseInt(ast.value, 10);
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const schalars = {
  Date: dateScalar,
};

// ============================================================================================

const resolvers = {
  ...schalars,
};

// ============================================================================================

async function getUserForRequest(req) {
  let user;
  if (req.cookies && req.cookies.t_id) {
    const { userId } = verifyJWT(req.cookies.t_id);
    user = await User.findByPk(userId);
  }
  return user;
}

const context = async ({ req }) => ({
  user: await getUserForRequest(req),
});

// ============================================================================================

module.exports = {
  typeDefs: [
    typeDefs,
    currentUserTypeDefs,
    teamTypeDefs,
    userTypeDefs,
  ],
  resolvers: [
    resolvers,
    currentUserResolvers,
    teamResolvers,
    userResolvers,
  ],
  context,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
};
