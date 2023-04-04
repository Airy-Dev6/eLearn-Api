const { Router } = require("express");

const Users = require("../usecases/users.usecase");

const router = new Router();

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await Users.login(email, password);

    response.json({
      message: "user logged in",
      token,
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error,
    });
  }
});

router.post("/signup", async (request, response) => {
  try {
    const { email, password, role } = request.body;
    const token = await Users.create(email, password, role);

    response.json({
      message: "user signed up",
      token,
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error,
    });
  }
});

module.exports = router;
