import config from 'nconf';
import path from 'path';
import fs from 'fs';

// Load Environment variables from .env file
const dotEnvPath = path.resolve(process.cwd(), './config/.env');
if (fs.existsSync(dotEnvPath)) {
  require('dotenv').config({ path: dotEnvPath });
}

// Consolidate all config values
config.use('memory');
config.argv();
config.env();

require('./app/app')();
