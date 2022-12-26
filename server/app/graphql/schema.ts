import { GraphQLScalarType, Kind } from 'graphql';
import requireDir from 'require-dir';

import { getUserForJWT } from '../services/auth.service';

const appTypeDefs = requireDir('./typedefs');
const appResolvers = requireDir('./resolvers');

// ============================================================================================

const customScalarsTypeDef = `#graphql
  scalar Date
`;

const typeDefs = `#graphql
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

// Bleh, type defs for GraphQLScalarType is screwed up...
const dateScalar = new GraphQLScalarType<Date, number>({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return (value as Date).getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value as number); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to type expected by parseValue
      return parseInt(ast.value, 10) as any;
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

async function getUserForRequest(req: any) {
  if (req.cookies && req.cookies.t_id) {
    return getUserForJWT(req.cookies.t_id);
  }
  return null;
}

const context = async ({ req }: any) => ({
  user: await getUserForRequest(req),
});

// ============================================================================================

export = {
  typeDefs: [typeDefs, ...Object.values(appTypeDefs)],
  resolvers: [resolvers, ...Object.values(appResolvers)],
  context,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
};
