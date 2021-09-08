const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');
const requireDir = require('require-dir');

const { User } = require('../models');
const { verifyJWT } = require('../services/auth.service');
const { getCookie } = require('../services/util.service');

const appTypeDefs = requireDir('./typedefs');
const appResolvers = requireDir('./resolvers');

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

  type Subscription {
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

async function getUserForToken(token) {
  let user;
  if (token) {
    try {
      const { userId } = verifyJWT(token);
      user = await User.findByPk(userId);
    } catch (error) {
      // Just don't return a user for now?
    }
  }
  return user;
}

async function getUserForConnection(connection) {
  if (connection.upgradeReq && connection.upgradeReq.headers) {
    const token = getCookie(connection.upgradeReq.headers.cookie, 't_id');
    return getUserForToken(token);
  }
  return null;
}

async function getUserForRequest(req) {
  if (req.cookies && req.cookies.t_id) {
    return getUserForToken(req.cookies.t_id);
  }
  return null;
}

const context = async ({ req, connection }) => ({
  user: connection ? await getUserForConnection(connection) : await getUserForRequest(req),
});

// ============================================================================================

const subscriptions = {
  path: '/api/subscriptions',
  // onConnect: () => {},
  // onDisconnect: () => {},
};

// ============================================================================================

module.exports = {
  typeDefs: [
    typeDefs,
    ...Object.values(appTypeDefs),
  ],
  resolvers: [
    resolvers,
    ...Object.values(appResolvers),
  ],
  context,
  subscriptions,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
};
