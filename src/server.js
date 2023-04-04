const express = require("express");
const cors = require("cors");

const coursesRouter = require("./routes/courses.router");
const responsesRouter = require("./routes/responses.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/responses", responsesRouter);
app.use("/auth", authRouter);

app.get("/", (request, response) => {
  response.json({
    message: "ok",
  });
});

module.exports = app;
