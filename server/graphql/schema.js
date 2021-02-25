const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');
const { readdirSync } = require('fs');
const { resolve } = require('path');

const allModels = require('../app/models');
const { verifyJWT } = require('../app/services/auth.service');
const { typeDefForModel } = require('./helpers');
const customDefs = require('./custom-defs');

const modelFiles = readdirSync(resolve(__dirname, '../app/models')).filter((f) => f.indexOf('index') < 0);
const modelNames = modelFiles.map((f) => {
  const key = f.split('.js')[0];
  return key.charAt(0).toUpperCase() + key.slice(1);
});

const models = {};
modelNames.forEach((model) => { models[model] = allModels[model]; });

// ============================================================================================

const customScalarsTypeDef = `
  scalar Date
`;

function generateQueryAllForModels(models) {
  let queryTypes = '';
  for (const [key, Model] of Object.entries(models)) {
    const pluralName = Model.getTableName().toLowerCase();
    queryTypes += `${pluralName}: [${key}]\n`;
  }

  return queryTypes;
}

function generateTypeDefForModels(models) {
  let types = '';
  for (const [key, Model] of Object.entries(models)) {
    types += `${typeDefForModel(Model, key)}\n`;
  }
  return types;
}

const typeDefs = gql`
  ${customScalarsTypeDef}

  ${generateTypeDefForModels(models)}

  ${customDefs.typeDefs}

  type Query {
    ${generateQueryAllForModels(models)}

    ${customDefs.queries}
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

function queryAllResolvers(queryAllModels) {
  const resolvers = {};
  Object.values(queryAllModels).forEach((Model) => {
    const tableName = Model.getTableName();
    const pluralName = tableName.charAt(0).toLowerCase() + tableName.slice(1);
    resolvers[pluralName] = (parent, args, { user }, info) => {
      console.log('parent: ', parent);
      console.log('args: ', args);
      console.log('info: ', info);
      if (!user) { return null; }
      return Model.findAll();
    };
  });
  return resolvers;
}

const resolvers = {
  ...schalars,
  Query: {
    ...queryAllResolvers(models),
    ...customDefs.resolvers,
  },
};

// ============================================================================================

async function getUserForRequest(req) {
  let user;
  if (req.cookies && req.cookies.t_id) {
    const { userId } = verifyJWT(req.cookies.t_id);
    user = await models.User.findByPk(userId);
  }
  return user;
}

const context = async ({ req }) => ({
  models,
  user: await getUserForRequest(req),
});

// ============================================================================================

module.exports = {
  typeDefs,
  resolvers,
  context,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
};
