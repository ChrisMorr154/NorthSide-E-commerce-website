const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("../Models/products");
const router = express.Router();

// Get products
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Get a single product by id
router.get("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Post new product
router.post("/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      stock: req.body.stock,
      brand: req.body.brand,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      images: req.body.images,
      UPC: req.body.UPC,
      color: req.body.color,
      casepack: req.body.casepack,
      gender: req.body.gender,
    });

    await newProduct.save();
    res.status(201).send("Product saved to the database!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


// Update a product
router.put("/update/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(product_id, {
      title: req.body.data.title,
      description: req.body.data.description,
      price: req.body.data.price,
      discountPercentage: req.body.data.discountPercentage,
      rating: req.body.data.rating,
      brand: req.body.data.brand,
      category: req.body.data.category,
      thumbnail: req.body.data.thumbnail,
      images: req.body.data.images,
      UPC: req.body.UPC,
      color: req.body.color,
      casepack: req.body.casepack,
      gender: req.body.gender,
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.status(200).send("Product updated successfully!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete a product
router.delete("/delete/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(product_id);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product deleted!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
