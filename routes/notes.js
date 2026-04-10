const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const authMiddleware = require("../middleware/auth");


// . . Create Note
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    userId: req.user.id, 
    title,
    content,
  });

  res.json(note);
});

//. .  Get my notes
router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({
    userId: req.user.id, 
  });

  res.json(notes);
});

// . .  Delete note
router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id, 
  });

  res.json({ message: "Note deleted" });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id,
    },
    { title, content },
    { new: true }
  );

  res.json(note);
});

module.exports = router;