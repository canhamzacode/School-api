const { BadRequestError } = require("../errors");
const Student = require("../models/student");
const Admin = require("../models/admin");
const Teacher = require("../models/teacher");

const validateRegistration = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    address,
    password,
    sex,
    _classId,
    dateOfBirth,
    phoneNumber,
    role, // Assuming role is included in the registration payload
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !password ||
    !sex ||
    !_classId ||
    !dateOfBirth ||
    !phoneNumber ||
    !role
  ) {
    throw new BadRequestError("All fields must be provided");
  }

  // Check email uniqueness across all user types
  const studentWithEmail = await Student.findOne({ email });
  const adminWithEmail = await Admin.findOne({ email });
  const teacherWithEmail = await Teacher.findOne({ email });

  if (studentWithEmail || adminWithEmail || teacherWithEmail) {
    throw new BadRequestError("Email already in use");
  }

  next();
};

module.exports = validateRegistration;
