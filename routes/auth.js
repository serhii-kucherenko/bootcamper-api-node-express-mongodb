const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getMe,
  forgotPassword,
  login,
  register,
  resetPassword,
  updateDetails,
  updatePassword
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resettoken", resetPassword);
router.get("/me", protect, getMe);
router.put("/update-details", protect, updateDetails);
router.put("/update-password", protect, updatePassword);

module.exports = router;
