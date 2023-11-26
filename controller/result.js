const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { Result, Student } = require("../models/");
const validateId = require("../utils/validate-id");

const getAllResults = async (req, res) => {
  const { id } = req.params;
  await validateId(id);

  const checkStudent = await Student.findOne({ _id: id });
  if (!checkStudent) {
    throw new BadRequestError("Student doesn't exist");
  }

  const results = await Result.find({ student: id });

  const response = results.map((result) => {
    const { _id, email, subject, score, student } = result;
    return {
      id: _id,
      subject,
      score,
      studentId: student,
    };
  });

  res.status(StatusCodes.OK).json({
    message: "Result Received successfully",
    data: response,
  });
};

const addResult = async (req, res) => {
  const { id } = req.params;
  const { subject, score } = req.body;
  if (!subject || !score) {
    throw new BadRequestError("All fields are required");
  }
  await validateId(id);
  const student = await Student.findOne({ _id: id });
  if (!student) {
    throw new BadRequestError("Student doesn't exist");
  }
  const studentResult = await Result.create({
    student: id,
    subject,
    score,
  });
  res.status(StatusCodes.CREATED).json({
    message: "Student Result Added Sucessfully",
    data: { student, score },
  });
};

const updateResult = async (req, res) => {
  const { id } = req.params;
  const { subject, score } = req.body;

  try {
    await validateId(id);

    const student = await Student.findOne({ _id: id });
    if (!student) {
      throw new BadRequestError("Student doesn't exist");
    }

    const result = await Result.findOneAndUpdate(
      { student: id, subject },
      { score },
      { new: true }
    );

    if (!result) {
      throw new BadRequestError("Result not found for the given subject");
    }

    const response = {
      id: result._id,
      subject: result.subject,
      score: result.score,
      studentId: result.student,
    };

    res.status(StatusCodes.OK).json({
      message: "Result Updated Successfully",
      data: response,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Failed to update result",
      error: error.message,
    });
  }
};

const deleteResult = async (req, res) => {
  const { id } = req.params;
  const { subject } = req.body;

  await validateId(id);

  const student = await Student.findOne({ _id: id });
  if (!student) {
    throw new BadRequestError("Student doesn't exist");
  }

  const result = await Result.findOneAndDelete({ student: id, subject });

  if (!result) {
    throw new BadRequestError("Result not found for the given subject");
  }

  const response = {
    id: result._id,
    subject: result.subject,
    score: result.score,
    studentId: result.student,
  };

  res.status(StatusCodes.OK).json({
    message: "Result Deleted Successfully",
    data: response,
  });
};

module.exports = {
  getAllResults,
  addResult,
  updateResult,
  deleteResult,
};
