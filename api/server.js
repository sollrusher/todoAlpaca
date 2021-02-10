const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config').database;
const newCard = require('./routes/cards/new-card.post');
const allCards = require('./routes/cards/cards.get');
const renameCard = require('./routes/cards/rename-card.put')
const deleteCard = require('./routes/cards/card.delete')
const toggleDone = require('./routes/cards/toggle-done-card.put')



const app = express();

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
  dialect: config.dialect,
  host: config.host,
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json({ extended: false });

app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);

app.use('/newcard', newCard);
app.use('/allcards', allCards);
app.use('/renamecard', renameCard);
app.use('/deletecard', deleteCard)
app.use('/toggledone', toggleDone)

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Сервер ожидает подключения...');
    });
  })