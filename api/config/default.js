require('dotenv').config({ path: '../.env' });
module.exports = {
    db: {      
        dialect: "postgres",
        databaseUrl: process.env.DATABASE_URL,        
    },
}