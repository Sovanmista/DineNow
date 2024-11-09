const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  cart: [cartSchema],
});
const User = new mongoose.model("User", userSchema);
module.exports = User;
