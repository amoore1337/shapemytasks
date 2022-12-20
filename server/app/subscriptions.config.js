const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { getUserForJWT } = require('./services/auth.service');
const { getCookie } = require('./services/util.service');

async function getUserForConnection(websocket) {
  if (websocket.upgradeReq && websocket.upgradeReq.headers) {
    const token = getCookie(websocket.upgradeReq.headers.cookie, 't_id');
    return {
      user: await getUserForJWT(token),
    };
  }
  return false;
}

module.exports = (schema, httpServer, path) =>
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(_, websocket) {
        return getUserForConnection(websocket);
      },
    },
    {
      server: httpServer,
      path,
    }
  );
