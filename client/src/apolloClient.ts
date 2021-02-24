import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});
