const { BadRequestError } = require("../errors");
const { Student, Admin, Teacher, Class } = require("../models");

const checkUniqueness = async (email) => {
  const studentWithEmail = await Student.findOne({ email });
  const adminWithEmail = await Admin.findOne({ email });
  const teacherWithEmail = await Teacher.findOne({ email });

  if (studentWithEmail || adminWithEmail || teacherWithEmail) {
    throw new BadRequestError("Email already in use");
  }
};

const checkUniquenessBeforeUpdate = async (email, currentEmail) => {
  const studentWithEmail = await Student.findOne({ email });
  const adminWithEmail = await Admin.findOne({ email });
  const teacherWithEmail = await Teacher.findOne({ email });

  if (
    (studentWithEmail && studentWithEmail.email !== currentEmail) ||
    (adminWithEmail && adminWithEmail.email !== currentEmail) ||
    (teacherWithEmail && teacherWithEmail.email !== currentEmail)
  ) {
    throw new BadRequestError("Email already in use");
  }
};

const checkClassBeforeUpdate = async (name, currentName) => {
  const myClass = await Class.findOne({ name });
  if (myClass && myClass.name !== currentName) {
    throw new BadRequestError("This class name is already taken");
  }
};

module.exports = {
  checkUniqueness,
  checkUniquenessBeforeUpdate,
  checkClassBeforeUpdate,
};
