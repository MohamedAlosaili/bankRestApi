const mongoose = require("mongoose");
const Author = require("./author");

// Books Schema

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  author: Author.schema,
  genre: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
});

module.exports = new mongoose.model("Books", booksSchema);
