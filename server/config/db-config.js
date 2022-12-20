const config = require('nconf');
const path = require('path');
const { URL } = require('url');

// Load Environment variables from .env file
require('dotenv').config({ path: path.resolve(process.cwd(), './config/.env') });

// Consolidate all config values
config.use('memory');
config.argv();
config.env();

const dbSettings = configValuesFromConnectionString(config.get('DB_URL'));

function configValuesFromConnectionString(dbString) {
  if (!dbString) {
    return null;
  }

  const dbUrl = new URL(dbString);
  return {
    dialect: 'postgres',
    username: dbUrl.username,
    password: dbUrl.password,
    host: dbUrl.hostname,
    port: dbUrl.port,
    database: dbUrl.pathname.split('/')[1],
  };
}

module.exports = {
  dev: dbSettings,
  prod: dbSettings,
};
