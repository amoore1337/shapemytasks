const config = require('nconf');
const path = require('path');

// Load Environment variables from .env file
require('dotenv').config({ path: path.resolve(process.cwd(), './config/.env') });

// Consolidate all config values
config.use('memory');
config.argv();
config.env();

require('./app/app')();
