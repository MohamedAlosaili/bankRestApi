const express = require("express");
const router = express.Router();
const Book = require("../models/books");

// POST: Create New
router.post("/", (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: {
      name: req.body.author.name,
      age: req.body.author.age,
    },
    genre: req.body.genre,
  });

  book
    .save()
    .then((book) => res.send(book))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
