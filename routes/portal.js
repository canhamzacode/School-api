const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const applyRoute = (path, controllers, middleware) => {
  const route = router.route(path);

  if (middleware) {
    route.all(middleware);
  }

  if (controllers.get) {
    route.get(controllers.get);
  }

  if (controllers.post) {
    route.post(controllers.post);
  }

  if (controllers.patch) {
    route.patch(controllers.patch);
  }

  if (controllers.delete) {
    route.delete(controllers.delete);
  }
};

// Middleware for admin routes
const adminMiddleware = verifyToken(["admin"]);

// Middleware for teacher routes
const teacherMiddleware = verifyToken(["teacher"]);

// Middleware for student routes
const studentMiddleware = verifyToken(["student"]);

// Import your controllers and validation middlewares
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

// Admin Controllers
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
  updateClass,
  getAllStudentsInAClass,
  getAClass,
} = require("../controller/class");

const {
  getAllResults,
  addResult,
  updateResult,
  deleteResult,
} = require("../controller/result");

// Apply routes using applyRoute function
applyRoute(
  "/students/:id",
  {
    get: getStudent,
    patch: updateStudent,
    delete: deleteStudent,
  },
  studentMiddleware
);

applyRoute(
  "/teachers/:id",
  {
    get: getTeacher,
    patch: updateTeacher,
    delete: deleteTeacher,
  },
  teacherMiddleware
);

applyRoute(
  "/classes/:id",
  {
    get: getAClass,
    patch: updateClass,
    delete: deleteClass,
  },
  adminMiddleware
);

applyRoute(
  "/students/class/:id",
  {
    get: getAllStudentsInAClass,
  },
  adminMiddleware
);

applyRoute(
  "/student/results/:id",
  {
    get: getAllResults,
    post: addResult,
    patch: updateResult,
    delete: deleteResult,
  },
  adminMiddleware
);

applyRoute(
  "/students",
  {
    get: getAllStudents,
  },
  adminMiddleware
);

applyRoute(
  "/teachers",
  {
    post: createNewTeacher,
    get: getAllTeachers,
  },
  validateTeacherRegistration,
  adminMiddleware
);

applyRoute(
  "/classes",
  {
    get: getAllClasses,
    post: addNewClass,
    delete: deleteClass,
  },
  adminMiddleware
);

applyRoute(
  "/admin/:id",
  {
    get: getAdmin,
    patch: updateAdmin,
    delete: deleteAdmin,
  },
  adminMiddleware
);

applyRoute(
  "/admin",
  {
    get: getAllAdmins,
    post: createNewAdmin,
  },
  validateAdminRegistration,
  adminMiddleware
);

module.exports = router;
