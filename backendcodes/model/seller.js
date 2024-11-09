const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: Number,
});
const User = new mongoose.model("Seller", sellerSchema);
module.exports = User;
