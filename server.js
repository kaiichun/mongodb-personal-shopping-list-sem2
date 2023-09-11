const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup the cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,PSOT,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/personalshoppinglist")
  .then(() => console.log("MongoDB Connected Success..."))
  .catch((err) => console.log(err));

// routes
const itemRouter = require("./routes/item");
app.use("/items", itemRouter);

app.get("/", (request, response) => {
  response.send("<a href='/items'>Shopping Item</a>");
});

app.listen(9999, () => {
  console.log("Server is running on port 9999");
});
