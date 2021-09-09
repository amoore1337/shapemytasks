const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { getUserForJWT } = require('./services/auth.service');
const { getCookie } = require('./services/util.service');

async function getUserForConnection(connection) {
  if (connection.upgradeReq && connection.upgradeReq.headers) {
    const token = getCookie(connection.upgradeReq.headers.cookie, 't_id');
    return getUserForJWT(token);
  }
  return null;
}

module.exports = (schema, httpServer, path) => (
  SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(
      connection,
    ) {
      return getUserForConnection(connection);
    },
  }, {
    server: httpServer,
    path,
  })
);
