require('dotenv').config();
const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const klawSync = require('klaw-sync');
const path = require('path');
const pg = require('pg');
pg.defaults.ssl = true;


const app = express();
const sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: 'postgres',
  }
);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json({ extended: false });

app.use(cors());
app.use(urlencodedParser);
app.use(jsonParser);

async function useControllers() {
  const paths = klawSync(`${__dirname}/routes`, { nodir: true });
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

app.use(express.static(path.join(__dirname, "..", "build")));
app.use('/static', express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT||5000, () => {
  console.log('Сервер ожидает подключения...');
});
