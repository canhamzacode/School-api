const { BadRequestError, INTERNAL_SERVER_ERROR } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { Student, Class } = require("../models/");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    if (!req.user || !req.user.data) {
      throw new INTERNAL_SERVER_ERROR("User data not found");
    }

    const { password, ...userData } = req.user;
    const {
      userType,
      data: { email },
    } = req.user;

    const token = jwt.sign({ email, userType }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(StatusCodes.OK).json({ token, data: userData });
  } catch (error) {
    console.error(error);
    throw new INTERNAL_SERVER_ERROR("Something went wrong ");
  }
};

const signupController = async (req, res) => {
  try {
    const data = req.body;

    // Find the corresponding class
    const currentClass = await Class.findOne({ _id: data._classId });

    // Check if the class exists
    if (!currentClass) {
      throw new BadRequestError("No such class found");
    }

    // Update the numberOfStudents field by incrementing it
    await Class.updateOne(
      { _id: data._classId },
      { $inc: { numberOfStudents: 1 } }
    );

    const hashedPass = await bcrypt.hash(data.password, 10);
    // Create a new student
    const user = await Student.create({ ...data, password: hashedPass });

    if (!user) {
      throw new Error("Something went wrong");
    }

    res.status(StatusCodes.CREATED).json({
      message: "User Created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { loginController, signupController };
