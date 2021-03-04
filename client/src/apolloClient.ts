import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache({
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
  }),
});
