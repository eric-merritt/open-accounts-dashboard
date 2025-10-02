// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Look up user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie (httpOnly so client-side JS can’t read it)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // send only over HTTPS in prod
      sameSite: "strict",
      maxAge: 3600000 // 1 hour
    });

    // Respond with basic user info (no passwordHash)
    res.json({
      success: true,
      user: {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.logoutUser = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error" });
  }
};