const express = require('express');
const app = express();
const path = require('path');

const authController = require('./controllers/authController');


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"./public")));

app.use("/login", authController);

app.get("/", (req, res) => {
  res.render("index", {
    header: "Open Accounts Dashboard",
    user: { isLoggedIn: !!req.user }
  });
});

app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/");
  res.render("profile", { user: req.user });
});


module.exports = app;




