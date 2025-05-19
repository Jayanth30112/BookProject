const express = require("express");
const Books = require("../models/Books");

// Extract static model methods
const {
  find,
  deleteMany,
  findOne,
  updateOne,
  deleteOne: _deleteOne,
} = require("../models/Books");

const router = express.Router();

// GET /books – Get all books
router.get("/", async (req, res) => {
  try {
    const foundBooks = await Books.find();
    res.json(foundBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /books – Add a new book
router.post("/", async (req, res) => {
  try {
    const book = new Books(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /books/:id – Get book by ID
router.get("/edit/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /books/:id – Update a book
router.put("/edit/:id", async (req, res) => {
  try {
    const updated = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Book not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /books/:id – Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Books.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
