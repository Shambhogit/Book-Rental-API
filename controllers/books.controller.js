import Book from "../models/book.model.js";
import { validationResult } from "express-validator";

async function addNewBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const bookExists = await Book.findOne({ title: req.body.title });
        if (bookExists) {
            return res.status(400).json({ success: false, errors: 'Book already exists' });
        }

        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });

    }
}

async function getAllBooks(req, res) {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, totalRecords: books.length, books });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

async function deleteBook(req, res) {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        await Book.deleteOne({ _id: id });

        return res.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export {
    addNewBook,
    getAllBooks,
    deleteBook,
}