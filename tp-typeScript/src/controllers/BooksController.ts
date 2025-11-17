import { Request, Response } from "express";
import bookModel from "../models/bookModel";


export const addBook = async (req: Request, res: Response) => {
  try {
    const book = new bookModel(req.body);
    book.finished = book.pagesRead >= book.numberOfPages;
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const getBooks = async (req: Request, res: Response) => {
  const books = await bookModel.find();
  res.json(books);
};


export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
