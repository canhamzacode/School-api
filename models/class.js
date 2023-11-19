const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      unique: true,
    },

    numberOfStudents: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
