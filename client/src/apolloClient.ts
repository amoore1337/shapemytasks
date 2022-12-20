/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient, HttpLink, split, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLError } from 'graphql';

const GRAPH_ERROR_MAP = {
  GRAPHQL_PARSE_FAILED: 'GRAPHQL_PARSE_FAILED',
  GRAPHQL_VALIDATION_FAILED: 'GRAPHQL_VALIDATION_FAILED',
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        project(_, { args, toReference }) {
          return toReference({
            __typename: 'Project',
            id: args?.id,
          });
        },
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: '/api/graphql',
});

const wsLink = new WebSocketLink({
  uri: `wss://${window.location.host}/api/subscriptions`,
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, response }) => {
  if (graphQLErrors && anyWithError(graphQLErrors, GRAPH_ERROR_MAP.UNAUTHENTICATED)) {
    // We're apparently logged out, tell the App.
    document.dispatchEvent(new Event('logout'));
    if (response?.errors) {
      (response.errors as any) = filterErrorsByCode(
        response.errors,
        GRAPH_ERROR_MAP.UNAUTHENTICATED
      );
    }
  }
});

function anyWithError(graphQLErrors: Readonly<GraphQLError[]>, code: string) {
  return graphQLErrors.some((error) => error.extensions?.code === code);
}

function filterErrorsByCode(graphQLErrors: Readonly<GraphQLError[]>, code: string) {
  return graphQLErrors.filter((error) => error.extensions?.code !== code);
}

export default new ApolloClient({
  link: from([errorLink, splitLink]),
  cache,
});
