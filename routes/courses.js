const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

router
  .route("/")
  .get(getCourses)
  .post(createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
