// controllers/authRoutes.js
const express = require("express");
const { loginUser, logoutUser } = require("./authController");
const router = express.Router();

router.post("/", loginUser);
router.post("/logout", logoutUser);

module.exports = router;