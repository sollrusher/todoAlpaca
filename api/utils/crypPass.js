const bcrypt = require('bcryptjs');

function cryptPass(password) {
  console.log(password)
  return bcrypt.hashSync(password, 10);
}

module.exports = cryptPass;