const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.json());

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

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
