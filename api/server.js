require('dotenv').config();
const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const klawSync = require('klaw-sync');
const path = require('path');

const authUser = require('./routes/users/auth-user.get');
const newUser = require('./routes/users/new-user.post');

const app = express();

const sequelize = new Sequelize(
  process.env.dbName,
  process.env.user,
  process.env.password,
  {
    dialect: process.env.dialect,
    host: process.env.host,
  }
);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json({ extended: false });

app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);

async function useControllers() {
  const paths = klawSync(`${__dirname}/routes/cards`, { nodir: true });
  let controllersCount = 0;
  paths.forEach((file) => {
    if (
      path.basename(file.path)[0] === '_' ||
      path.basename(file.path)[0] === '.'
    )
      return;
    app.use('/', require(file.path));
    controllersCount++;
  });

  console.info(`Total controllers: ${controllersCount}`);
}
useControllers();
app.use('/authuser', authUser);
app.use('/newuser', newUser);

app.listen(5000, () => {
  console.log('Сервер ожидает подключения...');
});
