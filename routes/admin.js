const express = require("express");
const router = express.Router();
const {
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  getAllStudentReults,
  updateStudentInformation,
  deleteStudent,
  getAllTeachers,
  getStudent,
  getTeacher,
  getAllStudents,
  getAllClasses,
  addNewClass,
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin");
const {
  validateAdminRegistration,
  validateTeacherRegistration,
} = require("../middlewares/validate-registration");

router.route("/").post(validateAdminRegistration, createNewAdmin);
router.route("/:id").patch(updateAdmin).delete(updateAdmin, deleteAdmin);

router.route("/student/results").get(getAllStudentReults);
router.get("/students", getAllStudents);

router.route("/classes").get(getAllClasses);
router.route("/classes/:id").post(addNewClass);

router
  .route("/students/:id")
  .get(getStudent)
  .patch(updateStudentInformation)
  .delete(deleteStudent);

router
  .route("/teachers")
  .post(validateTeacherRegistration, createNewTeacher)
  .get(getAllTeachers);
router
  .route("/teachers/:id")
  .get(getTeacher)
  .patch(updateTeacher)
  .delete(deleteTeacher);

module.exports = router;
