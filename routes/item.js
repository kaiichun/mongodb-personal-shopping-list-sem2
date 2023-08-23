const express = require("express");
const router = express.Router();

// import model into router
const Item = require("../models/item");

/* list all the Items */
router.get("/", async (request, response) => {
  const { purchased, priority } = request.query;
  let filter = {};
  if (purchased || priority) {
    if (purchased) {
      filter.purchased = purchased;
    }
    if (priority) {
      filter.priority = priority;
    }
  }

  response.send(await Item.find(filter));
});

/* get specific Item by id */
router.get("/:id", async (request, response) => {
  const data = await Item.findOne({ _id: request.params.id });
  response.send(data);
});

/* create new Item route */
router.post("/", async (request, response) => {
  // create a placeholder for a new Item
  const newItem = new Item({
    name: request.body.name,
    quantity: request.body.quantity,
    unit: request.body.unit,
    priority: request.body.priority,
    purchased: request.body.purchased,
  });
  // save the Item into mongodb
  await newItem.save();
  response.send(newItem);
});

/* update a Item */
router.put("/:id", async (request, response) => {
  // get Item id
  const Item_id = request.params.id;
  // update the Item
  const updatedItem = await Item.findByIdAndUpdate(Item_id, request.body, {
    new: true,
  });
  response.send(updatedItem);
});

/* delete a Item */
router.delete("/:id", async (request, response) => {
  // get Item id
  const Item_id = request.params.id;
  // delete the Item
  const deletedItem = await Item.findByIdAndDelete(Item_id);
  response.send(deletedItem);
});

module.exports = router;
