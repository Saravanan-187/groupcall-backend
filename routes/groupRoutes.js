const express = require("express");
const Group = require("../models/Group");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { name, members } = req.body;

  if (!name) return res.status(400).json({ error: "Group name is required" });

  try {
    const newGroup = new Group({ name, members });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: "Could not create group" });
  }
});

module.exports = router;
