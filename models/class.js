const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
    },

    numberOfStudents: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
