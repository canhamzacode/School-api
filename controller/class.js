const { BadRequestError, NotFoundError } = require("../errors");
const { Class, Student } = require("../models/");
const { StatusCodes } = require("http-status-codes");
const validateId = require("../utils/validate-id");
const { checkClassBeforeUpdate } = require("../utils/check-uniqueness");
// const checkClassBeforeUpdate =

const getAllClasses = async (req, res) => {
  const allClass = await Class.find({});
  res
    .status(StatusCodes.OK)
    .json({ message: "Sucessfully retrieved all class ", allClass });
};

const addNewClass = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError("Name must be provided");
  }
  if (name.length <= 3) {
    throw new BadRequestError("Name must be more than 3 character");
  }
  const checkUniqueness = await Class.findOne({ name });
  if (checkUniqueness) {
    throw new BadRequestError("Provided name already in use");
  }
  const newClass = await Class.create({ name });

  if (!newClass) {
    throw new Error("Something went wrong");
  }
  res.status(StatusCodes.CREATED).json({
    message: "NewClass Created successfully",
    data: newClass,
  });
};

const updateClass = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  await validateId(id);

  const currentClass = await Class.findById(id);
  if (!currentClass) {
    throw new BadRequestError("Invalid Id");
  }
  if (updateData && updateData.name) {
    await checkClassBeforeUpdate(updateData.name, currentClass.name);
    if (updateData.length < 3) {
      throw new BadRequestError("Name must be more than 3 character");
    }
  }

  const updatedClass = await Class.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedClass) {
    throw new BadRequestError("Failed to Update");
  }
  res.status(StatusCodes.OK).json({
    message: "Class Updated Sucessfully",
    data: updatedClass,
  });
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  await validateId(id);
  const checkId = await Class.findOne({ _id: id });
  if (!checkId) {
    throw new NotFoundError("No such class found");
  }
  const deletedClass = await Class.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json({
    message: "Class deleted successfully",
    data: deletedClass,
  });
};

const getAClass = async (req, res) => {
  const { id } = req.params;
  await validateId(id);
  const myClass = await Class.findOne({ _id: id });
  if (!myClass) {
    throw new NotFoundError("No such user found");
  }
  res.status(StatusCodes.OK).json({
    message: "Teacher Received Sucessfully",
    data: myClass,
  });
};

const getAllStudentsInAClass = async (req, res) => {
  const { id } = req.params;
  await validateId(id);

  const validateClass = await Class.findById(id);
  if (!validateClass) {
    throw new NotFoundError("No such class exist");
  }
  const students = await Student.find({ class_id: id });

  if (!students) {
    throw new BadRequestError("No Student with that class");
  }
  res.status(StatusCodes.OK).json({
    message: `All Students in ${validateClass.name} Received Sucessfully`,
    data: students,
  });
};

module.exports = {
  getAllClasses,
  addNewClass,
  deleteClass,
  updateClass,
  getAllStudentsInAClass,
  getAClass,
};
