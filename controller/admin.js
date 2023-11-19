const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const { Admin, Student } = require("../models/");
const bcrypt = require("bcrypt");
const { checkUniquenessBeforeUpdate } = require("../utils/check-uniqueness");
const validateId = require("../utils/validate-id");

// admin
const createNewAdmin = async (req, res) => {
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
};

const getAllAdmins = async (req, res) => {
  const allAdmin = await Admin.find({});
  res.status(StatusCodes.OK).json({
    message: "All Admin Received Sucessfully",
    data: allAdmin,
  });
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  await validateId(id);
  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) {
    throw new BadRequestError("Invalid Id");
  }
  res.status(StatusCodes.OK).json({
    message: "Admin Deleted Sucessfully",
    data: admin,
  });
};

const updateAdmin = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  await validateId(id);
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new NotFoundError("No such user found");
  }
  if (updateData && updateData.email) {
    await checkUniquenessBeforeUpdate(updateData.email, currentTeacher.email);
  }
  const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedAdmin) {
    throw new NotFoundError("No such user found");
  }

  res.status(StatusCodes.OK).json({
    message: "Teacher updated successfully",
    data: updatedAdmin,
  });
};

const getAdmin = async (req, res) => {
  const { id } = req.params;
  await validateId(id);
  const admin = await Admin.findOne({ _id: id });
  res.status(StatusCodes.OK).json({
    message: "Admin Received Sucessfully",
    data: admin,
  });
};

module.exports = {
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdmin,
};
