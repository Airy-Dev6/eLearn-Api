const createError = require("http-errors");

const jwt = require("../lib/jwt");
const Users = require("../models/users.model");
const encription = require("../lib/encription");

async function create(email, plainPassword, role) {
  const user = await Users.findOne({ email });
  if (user) throw new createError(403, "invalid data");

  const password = encription.hash(plainPassword);
  const newUser = await Users.create({ email, password, role });

  return jwt.sign({ id: newUser._id, role: newUser.role });
}

async function login(email, password) {
  const user = await Users.findOne({ email });
  if (!user) throw new createError(403, "invalid data");

  const isValidPassword = encription.compare(password, user.password);
  if (!isValidPassword) throw new createError(403, "invalida data");

  return jwt.sign({ id: user._id, role: user.role });
}

module.exports = {
  create,
  login,
};
