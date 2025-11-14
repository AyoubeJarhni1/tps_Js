import express from "express";
import authMiddleware from "../midlleware/authMiddleware.js";

const router = express.Router();

const books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" },
];

router.get("/", authMiddleware, (req, res) => {
  res.json(books);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Titre et auteur requis" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

export default router;
