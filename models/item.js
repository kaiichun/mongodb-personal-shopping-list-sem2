const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

const Item = model("Item", itemSchema);
module.exports = Item;
