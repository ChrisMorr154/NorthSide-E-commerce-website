const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  UPC: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  casepack: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
