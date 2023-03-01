const { default: mongoose } = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: String,
  item: Object,
  quantity: Number,
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = { CartModel };
