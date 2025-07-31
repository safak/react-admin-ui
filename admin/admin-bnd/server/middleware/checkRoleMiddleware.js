const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');


module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized (no token)" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Forbidden (no role)" });
      }

      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Unauthorized (token error)" });
    }
  }
};




