require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected To Database"));

app.listen(PORT, () => console.log("Server started at PORT: ", PORT));
// some coment
