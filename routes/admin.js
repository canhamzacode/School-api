const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
  createNewTeacher,
} = require("../controller/teacher");

const {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student");

const {
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdmin,
} = require("../controller/admin");

const {
  validateAdminRegistration,
  validateTeacherRegistration,
} = require("../middlewares/validate-registration");

const {
  getAllClasses,
  addNewClass,
  deleteClass,
} = require("../controller/class");

const { getAllReults } = require("../controller/result");

router
  .route("/")
  .get(getAllAdmins)
  .post(validateAdminRegistration, createNewAdmin);
router.route("/:id").get(getAdmin).patch(updateAdmin).delete(deleteAdmin);

router.route("/student/results").get(getAllReults);
router.get("/students", getAllStudents);

router.route("/classes").get(getAllClasses);
router.route("/classes/:id").post(addNewClass).delete(deleteClass);

router
  .route("/students/:id")
  .get(getStudent)
  .patch(updateStudent)
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
