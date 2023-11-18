const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const { Student } = require("../models/");
const bcrypt = require("bcrypt");
const { checkUniquenessBeforeUpdate } = require("../utils/check-uniqueness");
const validateId = require("../utils/validate-id");

const getStudent = (req, res) => {
  const { id } = req.params;
  validateId(id);
  const student = Student.findOne({ _id: id });
  if (!student) {
    throw new BadRequestError("Invalid Id");
  }
  res.status(StatusCodes.OK).json({
    message: "Admin Deleted Sucessfully",
    data: student,
  });
};

const getAllStudents = async (req, res) => {
  const students = await Student.find({});
  res.status(StatusCodes.OK).json({
    message: "All Student Received Sucessfully",
    data: students,
  });
};

const updateStudent = (req, res) => {
  res.send("update student information");
};
const deleteStudent = (req, res) => {
  res.send("Delete student");
};

module.exports = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
