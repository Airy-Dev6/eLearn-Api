const createHttpError = require("http-errors");
const jwt = require("../lib/jwt");
const Users = require("../models/users.model");

function auth(allowedRoles = []) {
  return async function (request, response, next) {
    try {
      let { authorization = "" } = request.headers;
      authorization = authorization.replace("Bearer", "");
      authorization = authorization.trim();

      const { id: userId, role } = jwt.verify(authorization);

      if (!allowedRoles.includes(role)) {
        throw new createHttpError(401, "role not authorized");
      }

      const user = await Users.findById(userId);

      request.user = user;
      next();
    } catch (error) {
      response.status(error.status || 401);
      response.json({ message: error.message || "unauthorized" });
    }
  };
}

module.exports = auth;
