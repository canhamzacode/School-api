const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("Result", resultSchema);
