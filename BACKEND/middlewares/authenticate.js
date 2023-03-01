const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "dermstore", (err, decoded) => {
      if (err) {
        res.send("not authorized");
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.send("please login first");
  }
};

module.exports = { authenticate };
