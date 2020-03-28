const express = require("express");
const router = express.Router();
const courseRouter = require("./courses");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps");

// Re-route into other resource routes
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = router;
