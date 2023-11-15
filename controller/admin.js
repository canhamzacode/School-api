const createNewTeacher = (req, res) => {
  res.send("Create Teacher");
};
const updateTeacher = (req, res) => {
  res.send("Update Teacher");
};
const deleteTeacher = (req, res) => {
  res.send("Delete Teacher");
};
const viewAllStudentReults = (req, res) => {
  res.send("View all student result");
};
const updateStudentInformation = (req, res) => {
  res.send("update student information");
};
const deleteStudent = (req, res) => {
  res.send("Delete student");
};
const getAllTeachers = (req, res) => {
  res.send("Get All Teachers");
};

module.exports = {
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  viewAllStudentReults,
  updateStudentInformation,
  deleteStudent,
  getAllTeachers,
};
