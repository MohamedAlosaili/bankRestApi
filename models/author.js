const mongoose = require("mongoose");

// Author Schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  age: {
    type: Number,
    min: 10,
    max: 100,
  },
});

module.exports = new mongoose.model("Author", authorSchema);
