require('dotenv').config({ path: '../.env' });
module.exports = {
  db: {
    use_env_variable: "DATABASE_URL",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
