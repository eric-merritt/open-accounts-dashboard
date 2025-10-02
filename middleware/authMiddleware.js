const jwt = require("jsonwebtoken");

const requireUser =  (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next(); // let through for /login etc
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }

  next();
};

module.exports = requireUser;