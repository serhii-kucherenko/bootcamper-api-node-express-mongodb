const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");
const { admin, user } = require("../types/roles");
const { authorize, protect } = require("../middleware/auth");
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require("../controllers/reviews");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    getReviews
  )
  .post(protect, authorize(user, admin), createReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize(user, admin), updateReview)
  .delete(protect, authorize(user, admin), deleteReview);

module.exports = router;
