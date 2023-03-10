const { CartModel } = require("../models/cart.schema");
const CartRouter = require("express").Router();
const jwt = require("jsonwebtoken");

CartRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const { userId } = req.body;
  try {
    const cart = await CartModel.find({ userId });
    res.send(cart);
  } catch (error) {
    res.status(500).send({ msg: "error in getting cart items", error });
  }
});

CartRouter.post("/add",async (req, res) => {
  const body = req.body;
  const { userId } = req.body;
  try {
    const item = await CartModel.create({ ...body, userId })
    res.send(item)
  } catch (error) {
    res.status(500).send({ msg: "error in adding cart item", error });
  }
});

CartRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const itemId = req.params.id;
  try {
    let item = await CartModel.findByIdAndUpdate({ _id: itemId }, payload, {
      new: true,
    });
    res.send(item);
  } catch (error) {
    res.status(500).send({ msg: "error in updating cart item", error });
  }
});

CartRouter.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id;
  const cartItem = await CartModel.findByIdAndDelete({ _id: itemId });
  const userInCart = cartItem.userId;
  const userMakingReq = req.body.userId;
  try {
    if (userInCart == userMakingReq) {
      res.send({ msg: "deleted cart item" });
    } else {
      res.status(500).send({ msg: "you'r not authorized to delete this item" });
    }
  } catch (error) {
    res.status(500).send({ msg: "error in deleting cart item", error });
  }
});

module.exports = { CartRouter };
