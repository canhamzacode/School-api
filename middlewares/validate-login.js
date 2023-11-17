const { Student, Admin, Teacher } = require("../models");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcrypt");

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in any of the user models
    const student = await Student.findOne({ email });
    const admin = await Admin.findOne({ email });
    const teacher = await Teacher.findOne({ email });

    if (!student && !admin && !teacher) {
      throw new BadRequestError("Invalid Email or Password");
    }

    // Determine the user type based on which model found the email
    let userType;
    let user;

    if (student) {
      userType = "student";
      user = student;
    } else if (admin) {
      userType = "admin";
      user = admin;
    } else if (teacher) {
      userType = "teacher";
      user = teacher;
    }

    // Checking the hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid Email or Password");
    }

    // Attach user data to the request object
    req.user = { type: userType, data: user };
    next();
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error-handling middleware
  }
};

module.exports = validateLogin;
