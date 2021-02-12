const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const newCard = require('./routes/cards/card.post');
const allCards = require('./routes/cards/cards.get');
const renameCard = require('./routes/cards/card.put')
const deleteCard = require('./routes/cards/card.delete')
const toggleDone = require('./routes/cards/toggle-done-card.put')

const app = express();

const sequelize = new Sequelize(process.env.dbName, process.env.user, process.env.password, {
  dialect: process.env.dialect,
  host: process.env.host,
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json({ extended: false });



app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);

const klawSync = require('klaw-sync');
const path = require('path')
async function useControllers() {
    const paths = klawSync(`${__dirname}/routes/cards`, {nodir: true});
    let controllersCount = 0;
    paths.forEach((file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/', require(file.path));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};
useControllers()
// app.use('/newcard', newCard);
// app.use('/allcards', allCards);
// app.use('/renamecard', renameCard);
// app.use('/deletecard', deleteCard)
// app.use('/toggledone', toggleDone)


sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Сервер ожидает подключения...');
    });
  })