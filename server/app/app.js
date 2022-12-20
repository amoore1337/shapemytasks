const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('nconf');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const graphqlConfig = require('./graphql/schema');
const createSubscriptionServer = require('./subscriptions.config');
require('./passport.config');

const SERVER_PORT = config.get('SERVER_PORT') || 3000;
const SERVER_HOST = config.get('SERVER_HOST');

let app;
module.exports = async (callback) => {
  app = express();

  app.use(passport.initialize());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: '*/*' }));

  app.use(cookieParser());

  require('./routes/index')(app);

  // Basic Error handler
  app.use((err, _, res, next) => {
    res.status(err.statusCode || 500);
    const errorJson = {
      message: err.message,
    };

    res.json(errorJson);
    next(err);
  });

  const { sequelize } = require('./db.config');
  await waitForDb(sequelize);

  await sequelize.sync();

  const httpServer = require('http').createServer(app);

  const { typeDefs, resolvers, ...graphConfig } = graphqlConfig;

  const graphqlPath = '/api/graphql';
  const subscriptionPath = '/api/subscriptions';

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionServer = createSubscriptionServer(schema, httpServer, subscriptionPath);

  const apollo = new ApolloServer({
    schema,
    ...graphConfig,
    playground: config.get('NODE_ENV') === 'dev',
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apollo.start();

  apollo.applyMiddleware({ app, path: graphqlPath });

  httpServer.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(
      `Server running in ${config.get('NODE_ENV')} mode on port ${SERVER_PORT} - GraphQL: ${
        apollo.graphqlPath
      } - Subscriptions: ${subscriptionPath}`
    );
    if (callback) {
      callback();
    }
  });
};

async function waitForDb(sequelize) {
  const dbReady = (wait) =>
    new Promise((resolve) => {
      setTimeout(async () => {
        try {
          console.log('Trying to connect to db...');
          await sequelize.authenticate();
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
    // eslint-disable-next-line no-await-in-loop
    ready = await dbReady(500);
  }
}
