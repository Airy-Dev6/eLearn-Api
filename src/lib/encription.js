const bcrypt = require("bcrypt");

function hash(plainText) {
  return bcrypt.hashSync(plainText, 10);
}

function compare(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = {
  hash,
  compare,
};
