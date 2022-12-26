export = `#graphql
  type Heartbeat {
    authenticated: Boolean!
  }

  extend type Query {
    heartbeat: Heartbeat
  }
`;
