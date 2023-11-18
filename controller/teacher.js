const Class = require("../models/class");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const { Teacher } = require("../models/");
const bcrypt = require("bcrypt");
const { checkUniquenessBeforeUpdate } = require("../utils/check-uniqueness");
const validateId = require("../utils/validate-id");

const createNewTeacher = async (req, res) => {
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
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find({});
  res
    .status(StatusCodes.OK)
    .json({ message: "All Teachers Received Sucessfully", data: teachers });
};

const getTeacher = async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const teacher = await Teacher.findOne({ _id: id });
  if (!teacher) {
    throw new NotFoundError("No such user found");
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "Teacher Received Sucessfully", data: teacher });
};

const updateTeacher = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  validateId(id);
  const currentTeacher = await Teacher.findById(id);
  if (!currentTeacher) {
    throw new NotFoundError("No such user found");
  }
  if (updateData && updateData.email) {
    await checkUniquenessBeforeUpdate(updateData.email, currentTeacher.email);
  }
  const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedTeacher) {
    throw new NotFoundError("No such user found");
  }
  res.status(StatusCodes.OK).json({
    message: "Teacher updated successfully",
    data: updatedTeacher,
  });
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  validateId(id);
  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) {
    throw new NotFoundError("No such user found");
  }

  res.status(StatusCodes.OK).json({
    message: "Teacher Deleted Successfully",
    data: teacher,
  });
};

module.exports = {
  createNewTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
};
