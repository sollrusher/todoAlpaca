require('dotenv').config();
module.exports = {
        url: process.env.DATABASE_URL,
        dialect: "postgres",      
        ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }