import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { getUserForJWT } from './services/auth.service';
import { getCookie } from './services/utils';
import { IncomingMessage } from 'http';
import { GraphQLSchema } from 'graphql';
import { Server } from 'https';

async function getUserForConnection(request: IncomingMessage) {
  if (request?.headers?.cookie) {
    const token = getCookie(request.headers.cookie, 't_id');
    return {
      user: await getUserForJWT(token),
    };
  }
  return false;
}

export = (schema: GraphQLSchema, httpServer: Server, path: string) => {
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
