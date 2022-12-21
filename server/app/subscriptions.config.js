const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { getUserForJWT } = require('./services/auth.service');
const { getCookie } = require('./services/util.service');

async function getUserForConnection(request) {
  if (request?.headers?.cookie) {
    const token = getCookie(request.headers.cookie, 't_id');
    return {
      user: await getUserForJWT(token),
    };
  }
  return false;
}

module.exports = (schema, httpServer, path) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path,
  });

  const serverCleanup = useServer(
    {
      schema,
      context: (ctx) => getUserForConnection(ctx.extra.request),
    },
    wsServer
  );

  return serverCleanup;
};
