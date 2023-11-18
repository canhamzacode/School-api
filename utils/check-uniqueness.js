const { BadRequestError } = require("../errors");
const { Student, Admin, Teacher } = require("../models");

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

module.exports = { checkUniqueness, checkUniquenessBeforeUpdate };
