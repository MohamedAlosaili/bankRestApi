const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatarImg: {
    type: String,
    default:
      "https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png",
  },
  email: {
    type: String,
    required: true,
  },
  currentBalance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
