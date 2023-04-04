const mongoose = require("mongoose");

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

function connect() {
  return mongoose.connect(DB_URL);
}

module.exports = { connect };
