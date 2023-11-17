const { BadRequestError } = require("../errors");
const Student = require("../models/student");
const Admin = require("../models/admin");
const Teacher = require("../models/teacher");

const checkUniqueness = async (email) => {
  const studentWithEmail = await Student.findOne({ email });
  const adminWithEmail = await Admin.findOne({ email });
  const teacherWithEmail = await Teacher.findOne({ email });

  if (studentWithEmail || adminWithEmail || teacherWithEmail) {
    throw new BadRequestError("Email already in use");
  }
};

const validateStudentRegistration = async (req, res, next) => {
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
    role,
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

  try {
    await checkUniqueness(email);
    next();
  } catch (error) {
    next(error);
  }
};

const validateAdminRegistration = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body;
  if (!firstName || !lastName || !password || !email) {
    throw new BadRequestError("All fields are required");
  }

  try {
    await checkUniqueness(email);
    next();
  } catch (error) {
    next(error);
  }
};
const validateTeacherRegistration = async (req, res, next) => {
  const { firstName, lastName, email, _classId, password, phoneNumber } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !_classId ||
    !phoneNumber
  ) {
    throw new BadRequestError("All fields are required");
  }

  try {
    await checkUniqueness(email);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateStudentRegistration,
  validateAdminRegistration,
  validateTeacherRegistration,
};
