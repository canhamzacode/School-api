const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
