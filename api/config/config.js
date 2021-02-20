require('dotenv').config({ path: '../.env' });
module.exports = {
    development: {
      username: "danila",
      password: "qwerty",
      database: "todo",
      host: "127.0.0.1",
      dialect: "postgres",
      DATABASE_URL: process.env.DATABASE_URL,      
    },
    test: {
      username: "danila",
      password: "qwerty",
      database: "todo",
      host: "127.0.0.1",
      dialect: "postgres",
      DATABASE_URL: process.env.DATABASE_URL,      
    },
    production: {
      DATABASE_URL: process.env.DATABASE_URL,            
    }
  }