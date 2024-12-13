const express = require("express");
const { Customer } = require("../Models/customers");
const router = express.Router();

// Get customers
router.get("/", async (req, res) => {
  try {
    const customerList = await Customer.find();
    res.status(200).json(customerList);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Get a single customer by id
router.get("/:id", async (req, res) => {
  try {
    const customer_id = req.params.id;
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Create a new customer
router.post("/create", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).send("Customer saved to the database!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update a customer
router.put("/update/:id", async (req, res) => {
  try {
    const customer_id = req.params.id;
    const updatedCustomer = await Customer.findByIdAndUpdate(customer_id, req.body, { new: true, runValidators: true });
    if (!updatedCustomer) {
      return res.status(404).send("Customer not found");
    }
    res.status(200).send("Customer updated successfully!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete a customer
router.delete("/delete/:id", async (req, res) => {
  try {
    const customer_id = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customer_id);
    if (!deletedCustomer) {
      return res.status(404).send("Customer not found");
    }
    res.status(200).send("Customer deleted!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Add a new shipping address to a customer
router.post("/:id/shippingAddresses", async (req, res) => {
  try {
    const customer_id = req.params.id;
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    customer.shippingAddresses.push(req.body);
    await customer.save();
    res.status(201).send("Shipping address added!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update a shipping address
router.put("/:customerId/shippingAddresses/:addressId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const addressId = req.params.addressId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    const address = customer.shippingAddresses.id(addressId);
    if (!address) {
      return res.status(404).send("Shipping address not found");
    }

    Object.assign(address, req.body);
    await customer.save();
    res.status(200).send("Shipping address updated!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete a shipping address
router.delete("/:customerId/shippingAddresses/:addressId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const addressId = req.params.addressId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    const address = customer.shippingAddresses.id(addressId);
    if (!address) {
      return res.status(404).send("Shipping address not found");
    }

    address.remove();
    await customer.save();
    res.status(200).send("Shipping address deleted!");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
