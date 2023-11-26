const { BadRequestError } = require("../errors");
const { checkUniqueness } = require("../utils/check-uniqueness");

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
    !phoneNumber
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
