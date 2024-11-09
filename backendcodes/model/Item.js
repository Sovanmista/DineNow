const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: Number,
});
const User = new mongoose.Model("User", userSchema);
module.exports = User;
