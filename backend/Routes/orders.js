const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const { Order } = require("../Models/orders");
const { generateOrderXML } = require('../util/orderTemplates');
const router = express.Router();

// Post new order
router.post("/create", async (req, res) => {
  console.log("Request Body:", req.body);

  const orderData = req.body.data;

  if (!orderData) {
    return res.status(400).send('Bad Request: No data provided.');
  }

  const newOrder = new Order({
    POnumber: orderData.POnumber,
    userID: orderData.userID,
    customerName: orderData.customerName,
    shiptoName: orderData.shiptoName,
    address: orderData.address,
    city: orderData.city,
    state: orderData.state,
    country: orderData.country,
    zipCode: orderData.zipCode,
    totalAmount: orderData.totalAmount,
    items: JSON.stringify(orderData.items),
    createdDate: orderData.createdDate,
  });

  try {
    await newOrder.save();
    console.log("Order saved to database");

    // Generate the XML content
    const xmlContent = generateOrderXML(orderData);
    console.log("XML Content:", xmlContent);

    // Define the file path
    const ordersDir = path.join(__dirname, '..', '..', 'orders');
    if (!fs.existsSync(ordersDir)) {
      console.log("Orders directory does not exist, creating now...");
      fs.mkdirSync(ordersDir);
    }
    const filePath = path.join(ordersDir, `${orderData.POnumber}.xml`);
    console.log("File Path:", filePath);

    // Save the XML file
    fs.writeFileSync(filePath, xmlContent);
    console.log("XML file saved successfully");

    res.send("Order saved to the database and XML file created!");
  } catch (error) {
    console.error("Error saving order or XML:", error.message);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

// Get Order XML
router.get('/xml/:POnumber', (req, res) => {
  const { POnumber } = req.params;
  const filePath = path.join(__dirname, '..', '..', 'orders', `${POnumber}.xml`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Get orders for a user
router.get("/:userId", async (req, res) => {
  const userID = req.params.userId;

  try {
    const orderList = await Order.find({ userID: userID });
    res.send(orderList);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

module.exports = router;
