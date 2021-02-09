const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');

const config = require('./config').database;

const app = express();

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
  dialect: config.dialect,
  host: config.host,
});

// app.use(cors());



sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Сервер ожидает подключения...');
    });
  })