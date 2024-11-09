const mongoose = require("mongoose");
const foodschema = new mongoose.Schema({
  name: String,
  price: Number,
  tags: String,
});
const FoodModel = mongoose.model("FoodModel", foodschema);
module.exports = FoodModel;
