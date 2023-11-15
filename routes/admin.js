const express = require("express");
const router = express.Router();
const {
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  viewAllStudents,
  updateStudentInformation,
  deleteStudent,
  getAllTeachers,
} = require("../controller/admin");

// router.route("/students").post(viewAllStudents);
router.route("/teachers").post(createNewTeacher).get(getAllTeachers);
router.route("/teachers/:id").patch(updateTeacher).delete(deleteTeacher);

module.exports = router;
