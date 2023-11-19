const { default: mongoose } = require("mongoose");
const { BadRequestError } = require("../errors");

const validateId = async (id) => {
  if (!id) {
    throw new BadRequestError("Id must Be Provided");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID format");
  }
};

module.exports = validateId;
