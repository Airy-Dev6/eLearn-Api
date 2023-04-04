require("dotenv").config();
const db = require("./src/lib/db");
const server = require("./src/server");

db.connect()
  .then(() => {
    console.info("DB: OK");
    server.listen(8080, () => {
      console.info("SERVER: OK");
    });
  })
  .catch((error) => {
    console.error("DB: ERROR: ", error);
  });
