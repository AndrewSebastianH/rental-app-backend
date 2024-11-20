const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = new Sequelize(
  process.env.DB_NAME,
  "root",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

module.exports = database;
