const Class = require("../models/class");
const { StatusCodes } = require("http-status-codes");
const createNewTeacher = (req, res) => {
  res.send("Create Teacher");
};
const updateTeacher = (req, res) => {
  res.send("Update Teacher");
};
const deleteTeacher = (req, res) => {
  res.send("Delete Teacher");
};
const viewAllStudentReults = (req, res) => {
  res.send("View all student result");
};
const updateStudentInformation = (req, res) => {
  res.send("update student information");
};
const deleteStudent = (req, res) => {
  res.send("Delete student");
};
const getAllTeachers = (req, res) => {
  res.send("Get All Teachers");
};

const getStudent = (req, res) => {
  res.send("Get a student");
};
const getTeacher = (req, res) => {
  res.send("Get a Teacher");
};
const getAllStudents = (req, res) => {
  res.send("Get All Students");
};
const getAllClasses = async (req, res) => {
  try {
    const allClass = await Class.find({});
    if (!allClass) {
      return [];
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: "Sucessfully retrieved all class ", allClass });
  } catch (error) {}
};
const addNewClass = (req, res) => {
  res.send("Get All Students");
};
module.exports = {
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  viewAllStudentReults,
  updateStudentInformation,
  deleteStudent,
  getAllTeachers,
  getStudent,
  getTeacher,
  getAllStudents,
  getAllClasses,
  addNewClass,
};
