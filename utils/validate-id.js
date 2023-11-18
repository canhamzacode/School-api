const { BadRequestError } = require("../errors");
const { Student, Admin, Teacher } = require("../models");

const validateId = async (id) => {
  if (!id) {
    throw new BadRequestError("Id must Be Provided");
  }
};

module.exports = validateId;
