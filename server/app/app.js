const express = require('express');
const bodyParser = require('body-parser');
const config = require('nconf');

const SERVER_PORT = config.get('SERVER_PORT') || 3000;
const SERVER_HOST = config.get('SERVER_HOST');

let app;
module.exports = async (callback) => {
  app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: '*/*' }));

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

  const { sequelize } = require('./db');
  await waitForDb(sequelize);

  await sequelize.sync();

  server(app).listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
    if (callback) { callback(); }
  });
};

function server(app) {
  // 'Dev' mode needs to use https throughout for simplicity
  // with proxies to dev servers.
  if (config.get('NODE_ENV') !== 'dev') {
    return app;
  }

  const { readFileSync } = require('fs');
  const creds = {
    key: readFileSync(config.get('SSL_KEY_FILE')),
    cert: readFileSync(config.get('SSL_CRT_FILE')),
  };
  console.log('setting up https');
  return require('https').createServer(creds, app);
}

async function waitForDb(sequelize) {
  const dbReady = (wait) => new Promise((resolve) => {
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

  if (await dbReady()) { return; }

  let ready = false;
  while (!ready) {
    // eslint-disable-next-line no-await-in-loop
    ready = await dbReady(500);
  }
}
