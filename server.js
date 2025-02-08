const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.log("❌ MongoDB Connection Error:", error));


// Group Schema & Model
const groupSchema = new mongoose.Schema({
  name: String,
  members: [String], // Array of member names or IDs
});

const Group = mongoose.model("Group", groupSchema);

// Routes
app.post("/groups", async (req, res) => {
  try {
    const { name, members } = req.body;
    const newGroup = new Group({ name, members });
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
