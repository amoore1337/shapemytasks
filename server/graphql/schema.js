const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');

const { User } = require('../app/models');
const { verifyJWT } = require('../app/services/auth.service');

const models = {
  User,
};

// ============================================================================================

const customScalarsTypeDef = `
  scalar Date
`;

const uniqueColTypeMap = {
  id: 'ID',
};

const typeMap = {
  INTEGER: 'Int',
  STRING: 'String',
  DATE: 'Date',
};

function generateQueryForModels(models) {
  let queryTypes = '';
  for (const [key, Model] of Object.entries(models)) {
    const pluralName = Model.getTableName().toLowerCase();
    queryTypes += `${pluralName}: [${key}]\n`;
  }

  return `
    type Query {
      ${queryTypes}
    }
  `;
}

function generateTypeDefForModels(models) {
  let types = '';
  for (const [key, Model] of Object.entries(models)) {
    types += `${typeForModel(Model, key)}\n`;
  }
  return types;
}

function typeForModel(Model, modelName) {
  const attributes = Model.rawAttributes;

  let formattedAttributes = '';
  Object.keys(attributes).forEach((a) => {
    formattedAttributes += `${typeForAttribute(attributes[a])}\n`;
  });

  return `
    type ${modelName} {
      ${formattedAttributes}
    }
  `;
}

function typeForAttribute(attribute) {
  // If `allowNull` is null/undefined, then not required:
  const required = attribute.allowNull === false ? '!' : '';
  if (uniqueColTypeMap[attribute.fieldName]) {
    return `${attribute.fieldName}: ${uniqueColTypeMap[attribute.fieldName]}${required}`;
  }
  const fieldType = typeMap[attribute.type.key];
  return `${attribute.fieldName}: ${fieldType}${required}`;
}

const typeDefs = gql`
  ${customScalarsTypeDef}

  ${generateTypeDefForModels(models)}

  ${generateQueryForModels(models)}
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
    const pluralName = Model.getTableName().toLowerCase();
    resolvers[pluralName] = async (_, __, { user }) => {
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
  },
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
