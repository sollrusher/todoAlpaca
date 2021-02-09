const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config').database;
const newCard = require('./routes/new-cards');
const allCards = require('./routes/all-cards');
const toggleDone = require('./routes/toggle-done-cards')
const deleteCard = require('./routes/delete-card')


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

app.use('/newcard', newCard);
app.use('/allcards', allCards);
app.use('/toggledone', toggleDone);
app.use('/deletecard', deleteCard)

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Сервер ожидает подключения...');
    });
  })