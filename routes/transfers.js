const express = require("express");
const transfer = require("../models/transfer");
const router = express.Router();
const Transfer = require("../models/transfer");

// Get All Transfers
router.get("/", async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One Transfer
router.get("/:id", getTransfer, (req, res) => {
  res.send(res.transfer);
});

// Create Transfer
router.post("/", async (req, res) => {
  const transfer = new Transfer({
    amount: req.body.amount,
    sender: {
      name: req.body.sender.name,
      id: req.body.sender.id,
    },
    receiver: {
      name: req.body.receiver.name,
      id: req.body.receiver.id,
    },
  });

  try {
    const newTransfer = await transfer.save();
    res.status(201).json(newTransfer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Transfer
router.patch("/:id", getTransfer, async (req, res) => {
  if (req.body.amount != null) {
    res.transfer.amount = req.body.amount;
  }
  if (req.body.sender != null) {
    res.transfer.sender.name = req.body.sender.name;
    res.transfer.sender.id = req.body.sender.id;
  }
  if (req.body.receiver != null) {
    res.transfer.receiver.name = req.body.receiver.name;
    res.transfer.receiver.id = req.body.receiver.id;
  }

  try {
    console.log(transfer);
    const updatedTransfer = await res.transfer.save();
    res.json(updatedTransfer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Transfer
router.delete("/:id", getTransfer, async (req, res) => {
  try {
    await res.transfer.remove();
    res.json({ message: "Transfer Deleted" });
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
});

async function getTransfer(req, res, next) {
  let transfer;
  try {
    transfer = await Transfer.findById(req.params.id);

    if (transfer == null) {
      res.status(404).json({ message: "Cannot find transfer" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.transfer = transfer;
  next();
}

module.exports = router;
