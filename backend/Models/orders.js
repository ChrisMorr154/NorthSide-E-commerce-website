const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  POnumber: { type: String, required: true },
  userID: { type: String, required: false },
  customerName: { type: String, required: true },
  shiptoName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  totalAmount: { type: String, required: true },
  items: { type: String, required: true },
  createdDate: { type: Date, required: true },
});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
