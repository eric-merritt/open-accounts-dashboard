// routes/profile.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// GET /profile
router.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.redirect("/"); // kick them out if not logged in
  }

  try {
    const user = await User.findById(req.user.sub).lean();
    if (!user) {
      return res.status(404).send("User not found");
    }

    delete user.passwordHash; // never send this to views

    res.render("profile", {
      title: "Your Profile",
      header: "Open Accounts Dashboard",
      user: { ...user, isLoggedIn: true }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;