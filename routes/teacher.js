const express = require("express");
const router = express.Router();
const {
  addStudentResult,
  getStudentResult,
  updateStudentResult,
} = require("../controller/teacher");

// router.route("/students").post(viewAllStudents);
router
  .route("/studnet/result/:id")
  .get(getStudentResult)
  .put(addStudentResult)
  .patch(updateStudentResult);

module.exports = router;
