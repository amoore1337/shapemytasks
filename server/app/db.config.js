const { Sequelize } = require('sequelize');
const config = require('nconf');

const sequelize = new Sequelize(config.get('DB_URL'));

module.exports = {
  sequelize,
};
