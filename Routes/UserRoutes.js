const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
