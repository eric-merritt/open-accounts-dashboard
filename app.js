// app.js
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const requireUser = require("./middleware/authMiddleware");

const app = express();

// === Middleware ===
app.use(helmet()); // sets secure HTTP headers
app.use(cookieParser()); // lets us read cookies like JWT
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form submissions
app.use(express.static(path.join(__dirname, "public"))); // serve CSS/JS/images

// === Views ===
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// === Attach user from JWT for every request ===
app.use(requireUser);

// === Routes ===
app.use("/", authRoutes);   // POST /login, POST /logout
app.use("/", profileRoutes); // GET /profile

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    header: "Open Accounts Dashboard",
    user: { isLoggedIn: !!req.user }
  });
});

module.exports = app;

