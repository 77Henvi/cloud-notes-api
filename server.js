const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MDB Connected!"))
    .catch((err) => console.log("error", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const User = require("./models/User");

app.get("/test-user", async (req, res) => {
  const user = await User.create({
    email: "test@gmail.com",
    password: "1234",
  });

  res.json(user);
});

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const authMiddleware = require("./middleware/auth");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Succesfully Authorized",
    user: req.user,
  });
});

const noteRoutes = require("./routes/notes");

app.use("/api/notes", noteRoutes);