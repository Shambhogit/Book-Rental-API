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

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid book ID format' });
        }

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

async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid book ID format' });
        }

        const existingBook = await Book.findById(id);
        if (!existingBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        if (updateFields.title && updateFields.title !== existingBook.title) {
            const titleExists = await Book.findOne({
                title: { $regex: `^${updateFields.title}$`, $options: 'i' },
                _id: { $ne: id } 
            });
            if (titleExists) {
                return res.status(400).json({ success: false, message: 'Another book with this title already exists' });
            }
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });

    } catch (error) {
        console.error('Error updating book:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export {
    addNewBook,
    getAllBooks,
    deleteBook,
    updateBook,
}