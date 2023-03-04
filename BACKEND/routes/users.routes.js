// /users/register ==> To register a new user.
// /users/login ==> For logging in generating a token

const UserRouter = require("express").Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authenticate");

const { UserModel } = require("../models/user.schema");

// register
UserRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const payload = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length) {
      res.status(500).send({ msg: "user already exist please login" });
    } else {
      bcrypt.hash(password, 5, (err, hash) => {
        if (err) {
          res
            .status(500)
            .send({ msg: "ERROR, register error (bcrypt)", error: err });
        } else {
          const user = new UserModel({ ...payload, password: hash });
          user.save();
          res.send({ msg: `you are registered successfully` });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "ERROR, register error", error });
  }
});

// login
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await UserModel.find({ email });
    if (user) {
      const hash = user.password;
      const token = jwt.sign({ userId: user._id }, "dermstore");
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          res.send({
            msg: "login success",
            user: user,
            token,
          });
        } else {
          res.status(500).send({ msg: "ERROR, wrong credentials", error: err });
        }
      });
    } else {
      res.status(500).send({ msg: "ERROR, user not found, please login" });
    }
  } catch (error) {
    res.status(500).send({ msg: "ERROR, login failed", error });
  }
});

// getting users
UserRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.send({ msg: "getting all user ERROR", error });
  }
});

module.exports = { UserRouter };

// npm i mongoose express dotenv bcrypt jsonwebtoken cors
