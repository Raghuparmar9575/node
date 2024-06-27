const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const person = await Person.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!person) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findByIdAndDelete(id);
    if (!person) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
