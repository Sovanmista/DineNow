const mongoose = require("mongoose");
// const ordernameSchema= mongoose.Schema({
//     ordername: String
// })
const ordersSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String,
  orders: [String],
  payment: Number,
  cancel: Boolean,
  complete: String
});
const orderModel = mongoose.model("orders", ordersSchema);
module.exports = orderModel;
