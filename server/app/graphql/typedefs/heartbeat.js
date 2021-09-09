const { gql } = require('apollo-server-express');

module.exports = gql`
  type Heartbeat {
    authenticated: Boolean!
  }

  extend type Query {
    heartbeat: Heartbeat
  }
`;
