const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

// Getting All Subscribers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One Subscriber
router.get("/:id", getCustomer, (req, res) => {
  res.send(res.customer);
});

// Creating Subscriber
router.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    currentBalance: req.body.currentBalance,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating Subscriber
// Patch best then put in case you wanna just update what use insert
router.patch("/:id", getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.currentBalance != null) {
    res.customer.currentBalance = req.body.currentBalance;
  }
  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting Subscriber
router.delete("/:id", getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: "Deleted customer" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);

    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;
