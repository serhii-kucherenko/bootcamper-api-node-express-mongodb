const express = require("express");
const router = express.Router({ mergeParams: true });
const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(protect, createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
