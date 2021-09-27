const Sequelize = require('sequelize');

require('dotenv').config();

const db = new Sequelize(
  'messenger',
  process.env.userDB,
  process.env.passwordDB,
  {
    logging: false,
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

module.exports = db;

// https://sequelize.org/master/manual/getting-started.html
