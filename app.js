const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

// MongoDB URI (ডিরেক্ট কোডে যুক্ত করা হয়েছে)
const MONGO_URI = "mongodb+srv://bot:bot@cluster0.jabg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3000; // সরাসরি পোর্ট নম্বর উল্লেখ করা হয়েছে

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.render("index", { users });
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

// Add a user (for testing purpose)
app.post("/add-user", async (req, res) => {
  const { firstName, lastName, photoUrl } = req.body;
  try {
    const newUser = new User({ firstName, lastName, photoUrl });
    await newUser.save();
    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send("Error adding user");
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));