const { CartModel } = require("../models/cart.schema");
const CartRouter = require("express").Router();
const jwt = require("jsonwebtoken");

CartRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  var { userId } = jwt.verify(token, "dermstore");
  try {
    const cart = await CartModel.find({ userId });
    res.send({ msg: "all cart items are here", cart });
  } catch (error) {
    res.send({ msg: "error in getting cart items", error });
  }
});

CartRouter.post("/add", (req, res) => {
  const body = req.body;
  const token = req.headers.authorization;
  var { userId } = jwt.verify(token, "dermstore");
  try {
    const cart = new CartModel({ ...body, userId });
    cart.save();
    res.send({ msg: "added cart item" });
  } catch (error) {
    res.send({ msg: "error in adding cart item", error });
  }
});

CartRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const itemId = req.params.id;
  const cartItem = await CartModel.findById({ _id: itemId });
  const userInCart = cartItem.userId;
  const userMakingReq = req.body.userId;
  try {
    if (userInCart == userMakingReq) {
      await CartModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "cart item updated" });
    } else {
      res.send({ msg: "you'r not allowed to update" });
    }
  } catch (error) {
    res.send({ msg: "error in updating cart item", error });
  }
});

CartRouter.patch("/delete/:id", async (req, res) => {
  const itemId = req.params.id;
  const cartItem = await CartModel.findById({ _id: itemId });
  const userInCart = cartItem.userId;
  const userMakingReq = req.body.userId;
  try {
    if (userInCart == userMakingReq) {
      res.send({ msg: "deleted cart item" });
    } else {
      res.send({ msg: "you'r not allowed to delete" });
    }
  } catch (error) {
    res.send({ msg: "error in deleting cart item", error });
  }
});

module.exports = { CartRouter };
