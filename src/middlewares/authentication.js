const jwt = require("jsonwebtoken");
const secret = "WoAhhhH";

exports.authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.staus(401).json({ message: "authorization header requires" });
  }
  let splittedHeader = req.headers.authorization.split(" ");
  if (splittedHeader[0] !== "Bearer") {
    return res
      .staus(401)
      .json({ message: "authorization format is Bearer <token>" });
  }
  let token = splittedHeader[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) return res.status(500).json({ err });
    if (!decodedToken) {
      return res
        .staus(401)
        .json({ message: "invalid authentication token. Please login" });
    }
    next();
  });
};

exports.checkIfAdmin = (req, res) => {
  if (req.user.role !== "admin") {
    return res.staus(401).json({ message: "this route is for admin only" });
  }
  return next();
};
