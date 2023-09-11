const express = require("express");
const router = express.Router();

// import model into router
const Item = require("../models/item");

/* list all the Items */
router.get("/", async (request, response) => {
  try {
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
    response.status(200).send(await Item.find(filter));
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* get specific Item by id */
router.get("/:id", async (request, response) => {
  try {
    const data = await Item.findOne({ _id: request.params.id });
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* create new Item route */
router.post("/", async (request, response) => {
  try {
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
    response.status(200).send(newItem);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* update a Item */
router.put("/:id", async (request, response) => {
  try {
    // get Item id try {
    const Item_id = request.params.id;
    // update the Item
    const updatedItem = await Item.findByIdAndUpdate(Item_id, request.body, {
      new: true,
    });
    response.status(200).send(updatedItem);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.put("/:id/purchased", async (request, response) => {
  try {
    const items_id = request.params.id;
    const result = await Item.findByIdAndUpdate(
      items_id,
      { purchased: true },
      {
        new: true, // return the modified data
      }
    );
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.put("/:id/unpurchased", async (request, response) => {
  try {
    const items_id = request.params.id;
    const result2 = await Item.findByIdAndUpdate(
      items_id,
      { purchased: false },
      {
        new: false, // return the modified data
      }
    );
    response.status(200).send(result2);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* delete a Item */
router.delete("/:id", async (request, response) => {
  try {
    // get Item id
    const Item_id = request.params.id;
    // delete the Item
    const deletedItem = await Item.findByIdAndDelete(Item_id);
    response.status(200).send(deletedItem);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
