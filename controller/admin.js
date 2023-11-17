const Class = require("../models/class");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/");
const { Admin, Teacher } = require("../models/");
const bcrypt = require("bcrypt");

// Teachers
const createNewTeacher = async (req, res) => {
  try {
    const data = req.body;
    const hashedPass = await bcrypt.hash(data.password, 10);
    const teacher = await Teacher.create({ ...data, password: hashedPass });
    if (!teacher) {
      throw new Error("Something went wrong");
    }
    res.status(StatusCodes.CREATED).json({
      message: "User Created successfully",
      data: teacher,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getAllTeachers = (req, res) => {
  res.send("Get All Teachers");
};

const getTeacher = (req, res) => {
  res.send("Get a Teacher");
};

const updateTeacher = async (req, res) => {
  res.send("Update Teacher");
};

const deleteTeacher = (req, res) => {
  res.send("Delete Teacher");
};

// admin
const createNewAdmin = async (req, res) => {
  try {
    const data = req.body;
    const hashedPass = await bcrypt.hash(data.password, 10);
    const admin = await Admin.create({ ...data, password: hashedPass });

    if (!admin) {
      throw new Error("Something went wrong");
    }
    res.status(StatusCodes.CREATED).json({
      message: "User Created successfully",
      data: admin,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const updateAdmin = (req, res) => {
  res.send("Create new admin");
};

const deleteAdmin = (req, res) => {
  res.send("Create new admin");
};

// Students

const updateStudentInformation = (req, res) => {
  res.send("update student information");
};
const deleteStudent = (req, res) => {
  res.send("Delete student");
};

const getStudent = (req, res) => {
  res.send("Get a student");
};

const getAllStudents = (req, res) => {
  res.send("Get All Students");
};

// Student Result
const getAllStudentReults = (req, res) => {
  res.send("View all student result");
};

// classes
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

const deleteClass = (req, res) => {
  res.send("Delete class");
};

module.exports = {
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  getAllStudentReults,
  updateStudentInformation,
  deleteStudent,
  getAllTeachers,
  getStudent,
  getTeacher,
  getAllStudents,
  getAllClasses,
  addNewClass,
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
};
