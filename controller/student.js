const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/");
const { Student } = require("../models/");
const validateId = require("../utils/validate-id");
const { checkUniquenessBeforeUpdate } = require("../utils/check-uniqueness");

const getStudent = async (req, res) => {
  const { id } = req.params;
  await validateId(id);

  const student = await Student.findOne({ _id: id });

  if (!student) {
    throw new BadRequestError("Invalid Id");
  }

  res.status(StatusCodes.OK).json({
    message: "Student Received Successfully",
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

const updateStudent = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  await validateId(id);
  const student = await Student.findById(id);
  if (!student) {
    throw new BadRequestError("No Student with the provided Id");
  }
  if (updateData && updateData.email) {
    await checkUniquenessBeforeUpdate(updateData.email, student.email);
  }
  const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedStudent) {
    throw new BadRequestError("Failed to Update");
  }
  res.status(StatusCodes.OK).json({
    message: "Student Updated Sucessfully",
    data: updatedStudent,
  });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  await validateId(id);
  const teacher = await Student.findByIdAndDelete(id);
  if (!teacher) {
    throw new NotFoundError("No such user found");
  }

  res.status(StatusCodes.OK).json({
    message: "Teacher Deleted Successfully",
    data: teacher,
  });
};

module.exports = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
