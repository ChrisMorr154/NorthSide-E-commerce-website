const mongoose = require("mongoose");

// Define a schema for the shipping address
const shippingAddressSchema = new mongoose.Schema({
  shipName: {
    type: String,
    required: true,
  },
  shipAddress: {
    type: String,
    required: true,
  },
  shipCity: {
    type: String,
    required: true,
  },
  shipState: {
    type: String,
    required: true,
  },
  shipZip: {
    type: String,
    required: true,
  },
});

// Define the customer schema with an array of shipping addresses
const customerSchema = new mongoose.Schema({
  custName: {
    type: String,
    required: true,
  },
  custNo: {
    type: String,
    required: true,
  },
  shippingAddresses: [shippingAddressSchema],
});

// Create the customer model
const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
