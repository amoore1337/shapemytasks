import express, { Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from 'nconf';
import passport from 'passport';
import { ApolloServer, ApolloServerPlugin, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { makeExecutableSchema } from '@graphql-tools/schema';
import graphqlConfig from './graphql/schema';
import createSubscriptionServer from './subscriptions.config';
import './passport.config';

const SERVER_PORT = config.get('SERVER_PORT') || 3000;
const SERVER_HOST = config.get('SERVER_HOST');

let app;
export = async (callback: () => void) => {
  app = express();

  app.use(passport.initialize());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: '*/*' }));

  app.use(cookieParser());

  require('./routes/index')(app);

  // Basic Error handler
  app.use((err: any, _: any, res: Response, next: any) => {
    res.status(err.statusCode || 500);
    const errorJson = {
      message: err.message,
    };

    res.json(errorJson);
    next(err);
  });

  await waitForDb();

  const httpServer = require('http').createServer(app);

  const { typeDefs, resolvers, context, ...graphConfig } = graphqlConfig;

  const graphqlPath = '/api/graphql';
  const subscriptionPath = '/api/subscriptions';

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionServer = createSubscriptionServer(schema, httpServer, subscriptionPath);

  const apolloPlugins: ApolloServerPlugin<BaseContext>[] = [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await subscriptionServer.dispose();
          },
        };
      },
    },
  ];

  if (config.get('NODE_ENV') === 'prod') {
    apolloPlugins.push(ApolloServerPluginLandingPageDisabled());
  }

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    ...graphConfig,
    plugins: apolloPlugins,
  });

  await apollo.start();

  app.use(graphqlPath, expressMiddleware(apollo, { context }));

  httpServer.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(
      `Server running in ${config.get(
        'NODE_ENV'
      )} mode on port ${SERVER_PORT} - GraphQL: ${graphqlPath} - Subscriptions: ${subscriptionPath}`
    );
    if (callback) {
      callback();
    }
  });
};

async function waitForDb() {
  const dbReady = (wait?: number): Promise<boolean> =>
    new Promise((resolve) => {
      setTimeout(async () => {
        try {
          console.log('Trying to connect to db...');
          resolve(true);
        } catch (error) {
          resolve(false);
        }
      }, wait);
    });

  if (await dbReady()) {
    return;
  }

  let ready = false;
  while (!ready) {
    ready = await dbReady(500);
  }
}
