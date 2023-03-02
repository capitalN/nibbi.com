const { default: mongoose } = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: String,
  quantity: Number,
  cartId: Number,
  item: Object,
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = { CartModel };
