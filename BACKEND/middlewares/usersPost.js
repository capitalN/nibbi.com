const jwt = require("jsonwebtoken");

const usersPost = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "dermstore", (err, decoded) => {
      if (err) {
        res.status(500).send("not authorized");
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(500).send("please login first");
  }
};

module.exports = { usersPost };
