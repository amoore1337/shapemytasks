/* eslint-disable import/no-extraneous-dependencies */
import {
  ApolloClient, HttpLink, split, InMemoryCache,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

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
// * A function that's called for each operation to execute4
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link: splitLink,
  cache,
});
