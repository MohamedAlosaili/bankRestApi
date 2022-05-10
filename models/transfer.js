const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  sender: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  receiver: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  transferDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transfer", transferSchema);
