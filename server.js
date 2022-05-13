// env import
require("dotenv").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// Mongodb connnection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => logger.info("Connected To Database"))
  .catch((error) => logger.error(error.message));
// const db = mongoose.connection;
// db.on("error", (error) => logger.log("error", error));
// db.once("open", () => logger.log("info", "Connected To Database"));

app.use(cors());
// Allow server to accept JSON
app.use(express.json());

// create  a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

// routers
const customersRouter = require("./routes/customers");
app.use("/customers", customersRouter);
const transactionRouter = require("./routes/transfers");
app.use("/transfers", transactionRouter);

// Server port
app.listen(PORT, () => logger.info(`Server started at ${PORT}`));
