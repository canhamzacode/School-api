require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = 3000;
const connectDB = require("./db/connect");

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/admin", require("./routes/admin"));
app.use("/api/v1/teacher", require("./routes/teacher"));
app.use("/api/v1/student", require("./routes/student"));
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

server();
