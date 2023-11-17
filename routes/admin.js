const express = require("express");
const router = express.Router();
const {
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  viewAllStudentReults,
  updateStudentInformation,
  deleteStudent,
  getAllTeachers,
  getStudent,
  getTeacher,
  getAllStudents,
  getAllClasses,
  addNewClass,
} = require("../controller/admin");

router.get("/students", getAllStudents);
router.route("/classes").get(getAllClasses);
router.route("/classes/:id").post(addNewClass);
router
  .route("/students/:id")
  .get(getStudent)
  .patch(updateStudentInformation)
  .delete(deleteStudent);
router.route("/teachers").post(createNewTeacher).get(getAllTeachers);
router
  .route("/teachers/:id")
  .get(getTeacher)
  .patch(updateTeacher)
  .delete(deleteTeacher);

module.exports = router;
