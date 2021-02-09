const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config').database;
const newcard = require('./routes/new-cards');
const allcards = require('./routes/all-cards');
const toggledone = require('./routes/toggle-done-cards')

const app = express();

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
  dialect: config.dialect,
  host: config.host,
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json({ extended: false });

// app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);

app.use('/newcard', newcard);
app.use('/allcards', allcards);
app.use('/toggledone', toggledone)

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Сервер ожидает подключения...');
    });
  })