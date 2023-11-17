const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const Class = require("./models/class");
require("dotenv").config();

const classesData = [
  {
    name: "JSS 1",
    numberOfStudents: 0,
  },
  {
    name: "JSS 2",
    numberOfStudents: 0,
  },
  {
    name: "JSS 3",
    numberOfStudents: 0,
  },
  {
    name: "SSS 1",
    numberOfStudents: 0,
  },
  {
    name: "SSS 2",
    numberOfStudents: 0,
  },
  {
    name: "SSS 3",
    numberOfStudents: 0,
  },
];

async function populateClasses() {
  try {
    connectDB(process.env.MONGO_URI);
    await Class.insertMany(classesData);

    console.log("Classes populated successfully");
  } catch (error) {
    console.error("Error populating classes:", error);
  } finally {
    console.log("Sucessful");
  }
}

populateClasses();
