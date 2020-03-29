const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getMe, login, register } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
