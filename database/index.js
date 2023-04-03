const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString, { connectTimeoutMs: 2000, useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));
