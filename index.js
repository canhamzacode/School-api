require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/portal", require("./routes/portal"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

server();
