const express = require("express");
const router = express.Router();
const {
  getStudentInfo,
  getStudentResult,
  updateStudentInfo,
} = require("../controller/student");

router.route("/student/result/:id").get(getStudentResult);
router.route("/student/:id").get(getStudentInfo).patch(updateStudentInfo);

module.exports = router;
