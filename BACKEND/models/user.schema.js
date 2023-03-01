const { default: mongoose, model } = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: Array,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
