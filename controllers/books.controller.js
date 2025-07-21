import Book from "../models/book.model.js";
import { validationResult } from "express-validator";

async function addNewBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

export {
    addNewBook,
}