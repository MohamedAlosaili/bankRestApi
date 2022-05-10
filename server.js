require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const booksroutes = require("./routes/books");
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/books", booksroutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected To Database"));

app.listen(PORT, () => console.log("Server started at PORT: ", PORT));
// some coment
