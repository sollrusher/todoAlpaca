require('dotenv').config({ path: '../.env' });
module.exports = {
  db: {
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
